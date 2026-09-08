// ════════════════════════════════════════════════════
// Detect Engine – Model Loading & Classification
// Single Responsibility: Load TF.js models, run inference,
// map raw predictions to SFI categories, crop regions.
// ════════════════════════════════════════════════════

const DetectEngine = (() => {
  let cocoModel = null;
  let mnetModel = null;
  let _cocoReady = false;
  let _mnetReady = false;

  // Centralized tuning knobs (frozen to prevent accidental mutation).
  const CONFIG = Object.freeze({
    GLOBAL_MNET_WEIGHT: 0.8,    // weight for whole-image MobileNet matches
    COCO_WEIGHT: 0.3,           // weight for COCO-SSD class matches
    REGION_MNET_WEIGHT: 1.0,    // weight for per-region MobileNet matches
    REGION_SCORE_GATE: 0.25,    // min coco score to classify a region
    RESULT_FLOOR: 0.05,         // legacy lower bound on category score
    CONF_K: 1.2,                // saturating constant for confidence map
    CONF_MAX: 95,               // confidence ceiling (%)
    MIN_CONFIDENT_SCORE: 0.35,  // drop categories below this raw score
    MAX_REGIONS: 6,             // cap on regions classified per image
    REGION_CONCURRENCY: 3,      // promise-pool width for region classify
    FRAME_SCORE_GATE: 0.3       // coco gate for the fast live-frame path
  });

  function isReady() { return _cocoReady; }
  function isDegraded() { return _cocoReady && !_mnetReady; }

  // Whole-token matcher: single-word keys match a whole token of the
  // (comma/space-split) label; multi-word keys may substring-match.
  // Kills false hits like 'net'->'bassinet', 'web'->'spider web'.
  function labelMatchesKey(label, key) {
    const k = key.toLowerCase();
    if (k.includes(' ')) return label.toLowerCase().includes(k);
    return label.toLowerCase().split(/[\s,]+/).includes(k);
  }

  async function loadModels(onProgress) {
    try {
      onProgress('Loading TensorFlow.js runtime…', 15);
      await tf.ready();
    } catch (err) {
      console.error('TensorFlow.js runtime failed to initialize:', err);
      onProgress('Failed to load models — check your connection and refresh', -1);
      return false;
    }

    onProgress('Loading object detection model (COCO-SSD)…', 35);
    try {
      cocoModel = await cocoSsd.load({ base: 'lite_mobilenet_v2' });
      _cocoReady = true;
    } catch (err) {
      console.error('COCO-SSD load failed:', err);
    }

    onProgress('Loading classification model (MobileNet)…', 70);
    try {
      mnetModel = await mobilenet.load({ version: 2, alpha: 1.0 });
      _mnetReady = true;
    } catch (err) {
      console.error('MobileNet load failed:', err);
    }

    if (_cocoReady && _mnetReady) {
      onProgress('Models ready — upload an image or start your camera', 100);
      return true;
    }
    if (_cocoReady) {
      onProgress('Models ready (boxes-only mode — classification unavailable)', 100);
      return true;
    }
    onProgress('Failed to load models — check your connection and refresh', -1);
    return false;
  }

  async function runDetection(imgEl) {
    const [cocoResults, mnetResults] = await Promise.all([
      (_cocoReady && cocoModel) ? cocoModel.detect(imgEl) : Promise.resolve([]),
      (_mnetReady && mnetModel) ? mnetModel.classify(imgEl, 10) : Promise.resolve([])
    ]);
    return { cocoResults, mnetResults };
  }

  async function classifyRegions(imgEl, cocoResults) {
    // Degraded mode (no MobileNet): boxes-only, no region classification.
    if (!_mnetReady || !mnetModel) return [];

    const candidates = cocoResults
      .filter(d => d.score >= CONFIG.REGION_SCORE_GATE)
      .sort((a, b) => b.score - a.score)
      .slice(0, CONFIG.MAX_REGIONS);

    if (candidates.length === 0) return [];

    async function classifyOne(det) {
      try {
        const cropped = cropRegion(imgEl, det.bbox);
        const cropClass = await mnetModel.classify(cropped, 5);
        return { bbox: det.bbox, cocoClass: det.class, cocoScore: det.score, mnetClasses: cropClass };
      } catch (e) {
        return { bbox: det.bbox, cocoClass: det.class, cocoScore: det.score, mnetClasses: [] };
      }
    }

    // Bounded-concurrency promise pool: shared cursor, N workers each
    // pulling the next index until the candidate list is exhausted.
    const regions = new Array(candidates.length);
    let cursor = 0;
    const width = Math.min(CONFIG.REGION_CONCURRENCY, candidates.length);
    const workers = [];
    for (let w = 0; w < width; w++) {
      workers.push((async () => {
        let i;
        while ((i = cursor++) < candidates.length) {
          regions[i] = await classifyOne(candidates[i]);
        }
      })());
    }
    await Promise.all(workers);
    return regions;
  }

  function cropRegion(imgEl, bbox) {
    const [x, y, w, h] = bbox;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(w, 10);
    canvas.height = Math.max(h, 10);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(imgEl, x, y, w, h, 0, 0, canvas.width, canvas.height);
    return canvas;
  }

  function mapToSFI(globalMnet, regionClassifications) {
    const scores = {};
    SFI_CATEGORIES.forEach(cat => { scores[cat.name] = { score: 0, matches: [], cat, hits: 0 }; });

    globalMnet.forEach(pred => {
      const label = pred.className.toLowerCase();
      SFI_CATEGORIES.forEach(cat => {
        cat.mnetKeys.forEach(key => {
          if (labelMatchesKey(label, key)) {
            scores[cat.name].score += pred.probability * CONFIG.GLOBAL_MNET_WEIGHT;
            scores[cat.name].hits++;
            if (!scores[cat.name].matches.includes('image: ' + pred.className)) {
              scores[cat.name].matches.push('image: ' + pred.className);
            }
          }
        });
      });
    });

    regionClassifications.forEach(region => {
      SFI_CATEGORIES.forEach(cat => {
        cat.cocoKeys.forEach(key => {
          if (labelMatchesKey(region.cocoClass, key)) {
            scores[cat.name].score += region.cocoScore * CONFIG.COCO_WEIGHT;
            scores[cat.name].hits++;
          }
        });
      });

      region.mnetClasses.forEach(pred => {
        const label = pred.className.toLowerCase();
        SFI_CATEGORIES.forEach(cat => {
          cat.mnetKeys.forEach(key => {
            if (labelMatchesKey(label, key)) {
              scores[cat.name].score += pred.probability * CONFIG.REGION_MNET_WEIGHT;
              scores[cat.name].hits++;
              if (!scores[cat.name].matches.includes('region: ' + pred.className)) {
                scores[cat.name].matches.push('region: ' + pred.className);
              }
            }
          });
        });
      });
    });

    // Boost gating: only categories with >=1 real keyword match get boost,
    // so a lone boost can never manufacture a result on its own.
    SFI_CATEGORIES.forEach(cat => {
      if (scores[cat.name].hits > 0) scores[cat.name].score += cat.boost;
    });

    // Absolute saturating confidence + drop unrelated categories.
    const results = Object.values(scores)
      .filter(r => r.hits > 0 && r.score > CONFIG.RESULT_FLOOR && r.score >= CONFIG.MIN_CONFIDENT_SCORE)
      .sort((a, b) => b.score - a.score);

    results.forEach(r => {
      r.confidence = Math.round(Math.min(CONFIG.CONF_MAX, 100 * (1 - Math.exp(-CONFIG.CONF_K * r.score))));
    });

    return results;
  }

  function matchRegionToCategory(region, fallbackCat) {
    let bestCat = null;
    let bestScore = 0;

    SFI_CATEGORIES.forEach(cat => {
      let regionScore = 0;
      cat.cocoKeys.forEach(key => {
        if (labelMatchesKey(region.cocoClass, key)) regionScore += region.cocoScore;
      });
      region.mnetClasses.forEach(pred => {
        const label = pred.className.toLowerCase();
        cat.mnetKeys.forEach(key => {
          if (labelMatchesKey(label, key)) regionScore += pred.probability;
        });
      });
      if (regionScore > bestScore) {
        bestScore = regionScore;
        bestCat = cat;
      }
    });

    return bestCat || fallbackCat;
  }

  // Fast COCO-SSD-only path for the live camera loop. Returns raw coco
  // detections above a small score gate, in SOURCE pixel coords.
  async function detectFrame(el) {
    if (!_cocoReady || !cocoModel) return [];
    let dets;
    try {
      dets = await cocoModel.detect(el);
    } catch (e) {
      return [];
    }
    return dets
      .filter(d => d.score >= CONFIG.FRAME_SCORE_GATE)
      .map(d => ({ bbox: d.bbox, class: d.class, score: d.score }));
  }

  return {
    loadModels, isReady, isDegraded, runDetection, classifyRegions,
    mapToSFI, matchRegionToCategory, detectFrame
  };
})();
