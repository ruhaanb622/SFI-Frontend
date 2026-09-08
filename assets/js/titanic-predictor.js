import { pythonURI } from './api/config.js';

const form = document.getElementById('titanic-form');

if (!form) {
  // Allow the module to be loaded globally without failing on unrelated pages.
} else {
  const predictBtn = document.getElementById('predict-btn');
  const resetBtn = document.getElementById('reset-btn');
  const resultsCard = document.getElementById('results-card');
  const errorMsg = document.getElementById('error-msg');
  const apiUrlInput = document.getElementById('api-url');
  const weightsSection = document.getElementById('weights-section');
  const weightsList = document.getElementById('weights-list');

  const manifestSummary = document.getElementById('manifest-summary');
  const manifestClass = document.getElementById('manifest-class');
  const manifestParty = document.getElementById('manifest-party');
  const manifestPort = document.getElementById('manifest-port');
  const manifestFare = document.getElementById('manifest-fare');
  const travelModeBadge = document.getElementById('travel-mode-badge');

  const resultTitle = document.getElementById('result-title');
  const resultBadge = document.getElementById('result-badge');
  const resultCopy = document.getElementById('result-copy');
  const survivalRing = document.getElementById('survival-ring');
  const surviveProb = document.getElementById('survive-prob');
  const surviveProbDetail = document.getElementById('survive-prob-detail');
  const dieProb = document.getElementById('die-prob');
  const surviveBar = document.getElementById('survive-bar');
  const meterLabel = document.getElementById('meter-label');

  const defaultValues = {
    name: 'Avery Dawson',
    pclass: '2',
    sex: 'male',
    age: '30',
    fare: '16.00',
    embarked: 'S',
    sibsp: '0',
    parch: '0',
  };

  const presets = {
    atlantic_suite: {
      name: 'Eleanor Whitmore',
      pclass: '1',
      sex: 'female',
      age: '42',
      fare: '83.48',
      embarked: 'C',
      sibsp: '1',
      parch: '1',
    },
    engine_room: {
      name: 'Thomas Reed',
      pclass: '3',
      sex: 'male',
      age: '24',
      fare: '8.05',
      embarked: 'S',
      sibsp: '0',
      parch: '0',
    },
    family_crossing: {
      name: 'Lucy Bennett',
      pclass: '2',
      sex: 'female',
      age: '11',
      fare: '26.00',
      embarked: 'S',
      sibsp: '1',
      parch: '2',
    },
  };

  const featureNames = {
    pclass: 'Passenger class',
    sex: 'Sex',
    age: 'Age',
    sibsp: 'Siblings / spouse count',
    parch: 'Parents / children count',
    fare: 'Fare',
    alone: 'Traveling alone',
    embarked_C: 'Embarked at Cherbourg',
    embarked_Q: 'Embarked at Queenstown',
    embarked_S: 'Embarked at Southampton',
  };

  apiUrlInput.value = `${pythonURI}/api/titanic/predict`;

  form.addEventListener('input', updateManifest);
  form.addEventListener('submit', handleSubmit);
  resetBtn.addEventListener('click', resetForm);

  document.querySelectorAll('[data-preset]').forEach((button) => {
    button.addEventListener('click', () => {
      applyValues(presets[button.dataset.preset]);
      hideError();
      updateManifest();
    });
  });

  updateManifest();

  function applyValues(values) {
    Object.entries(values).forEach(([key, value]) => {
      const field = form.elements.namedItem(key);
      if (field) {
        field.value = value;
      }
    });
  }

  function resetForm() {
    applyValues(defaultValues);
    hideError();
    resultsCard.classList.add('hidden');
    updateManifest();
  }

  function serializePassenger() {
    const sibsp = parseInteger(form.elements.sibsp.value);
    const parch = parseInteger(form.elements.parch.value);
    const name = form.elements.name.value.trim() || 'Unnamed Passenger';

    return {
      name,
      pclass: parseInteger(form.elements.pclass.value),
      sex: form.elements.sex.value,
      age: parseInteger(form.elements.age.value),
      sibsp,
      parch,
      fare: parseFloatValue(form.elements.fare.value),
      embarked: form.elements.embarked.value,
      alone: sibsp + parch === 0,
    };
  }

  function parseInteger(value) {
    const parsed = Number.parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function parseFloatValue(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function passengerNarrative(passenger) {
    const partySize = passenger.sibsp + passenger.parch + 1;
    const travelMode = partySize === 1 ? 'solo travel profile' : `party of ${partySize}`;

    return `${passenger.name} boards from ${portLabel(passenger.embarked)} with a ${classLabel(passenger.pclass).toLowerCase()} ticket and a ${travelMode}.`;
  }

  function updateManifest() {
    const passenger = serializePassenger();
    const partySize = passenger.sibsp + passenger.parch + 1;
    const solo = partySize === 1;

    manifestSummary.textContent = passengerNarrative(passenger);
    manifestClass.textContent = classLabel(passenger.pclass);
    manifestParty.textContent = `${partySize} ${partySize === 1 ? 'passenger' : 'passengers'}`;
    manifestPort.textContent = portLabel(passenger.embarked);
    manifestFare.textContent = formatPercentCurrency(passenger.fare);

    if (solo) {
      travelModeBadge.textContent = 'Solo Traveler';
      travelModeBadge.className = 'inline-flex w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100';
    } else {
      travelModeBadge.textContent = 'Traveling With Company';
      travelModeBadge.className = 'inline-flex w-fit rounded-full border border-amber-300/30 bg-amber-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-amber-100';
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    hideError();

    const passenger = serializePassenger();
    const apiUrl = apiUrlInput.value.trim();

    if (!apiUrl) {
      showError('Set a prediction endpoint before sending the passenger manifest.');
      return;
    }

    predictBtn.disabled = true;
    predictBtn.textContent = 'Running Prediction...';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passenger),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();
      renderResults(passenger, data);
    } catch (error) {
      showError(`${error.message}. Make sure the Flask backend from the notebook is running.`);
      resultsCard.classList.add('hidden');
    } finally {
      predictBtn.disabled = false;
      predictBtn.textContent = 'Run Notebook Prediction';
    }
  }

  function renderResults(passenger, data) {
    const survive = clampProbability(data.survive);
    const die = clampProbability(data.die, 1 - survive);
    const surviveText = `${(survive * 100).toFixed(1)}%`;
    const dieText = `${(die * 100).toFixed(1)}%`;

    resultsCard.classList.remove('hidden');
    surviveProb.textContent = surviveText;
    surviveProbDetail.textContent = surviveText;
    dieProb.textContent = dieText;
    surviveBar.style.width = surviveText;
    meterLabel.textContent = meterCopy(survive);
    survivalRing.style.background = `conic-gradient(#10b981 0 ${survive * 360}deg, #e2e8f0 ${survive * 360}deg 360deg)`;

    resultTitle.textContent = verdictTitle(survive);
    resultCopy.textContent = `${passenger.name} posts a ${surviveText} survival probability from ${portLabel(passenger.embarked)} with a ${classLabel(passenger.pclass).toLowerCase()} ticket.`;

    if (survive >= 0.5) {
      resultBadge.textContent = 'Leaning Survive';
      resultBadge.className = 'inline-flex w-fit rounded-full bg-emerald-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white';
    } else {
      resultBadge.textContent = 'High Risk';
      resultBadge.className = 'inline-flex w-fit rounded-full bg-rose-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white';
    }

    renderWeights(data.weights);
    resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function clampProbability(value, fallback = 0) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }
    return Math.min(1, Math.max(0, parsed));
  }

  function renderWeights(weights) {
    weightsList.innerHTML = '';

    if (!weights || typeof weights !== 'object' || !Object.keys(weights).length) {
      weightsSection.classList.add('hidden');
      return;
    }

    const entries = Object.entries(weights)
      .filter(([, weight]) => Number.isFinite(Number(weight)))
      .sort((a, b) => Number(b[1]) - Number(a[1]));

    if (!entries.length) {
      weightsSection.classList.add('hidden');
      return;
    }

    weightsSection.classList.remove('hidden');
    const maxWeight = Math.max(...entries.map(([, weight]) => Number(weight)), 0);

    entries.forEach(([feature, weight]) => {
      const numericWeight = Number(weight);
      const row = document.createElement('div');
      const width = maxWeight > 0 ? (numericWeight / maxWeight) * 100 : 0;

      row.className = 'space-y-2';
      row.innerHTML = `
        <div class="flex items-center justify-between gap-4 text-sm">
          <span class="font-medium text-slate-700">${featureNames[feature] || feature}</span>
          <span class="font-semibold text-slate-900">${(numericWeight * 100).toFixed(1)}%</span>
        </div>
        <div class="h-3 overflow-hidden rounded-full bg-slate-100">
          <div class="h-full rounded-full bg-gradient-to-r from-cyan-500 to-slate-900" style="width: ${width.toFixed(1)}%"></div>
        </div>
      `;

      weightsList.appendChild(row);
    });
  }

  function verdictTitle(probability) {
    if (probability >= 0.7) {
      return 'Strong survival signal';
    }
    if (probability >= 0.5) {
      return 'Model leans toward survival';
    }
    if (probability >= 0.35) {
      return 'Outcome is close to a coin flip';
    }
    return 'Model reads this as a high-risk profile';
  }

  function meterCopy(probability) {
    if (probability >= 0.7) {
      return 'Clear survival edge';
    }
    if (probability >= 0.5) {
      return 'Narrow survival edge';
    }
    if (probability >= 0.35) {
      return 'Near even split';
    }
    return 'Risk outweighs survival';
  }

  function classLabel(value) {
    if (Number(value) === 1) return '1st Class';
    if (Number(value) === 2) return '2nd Class';
    return '3rd Class';
  }

  function portLabel(value) {
    if (value === 'C') return 'Cherbourg';
    if (value === 'Q') return 'Queenstown';
    return 'Southampton';
  }

  function formatPercentCurrency(value) {
    return `$${Number(value).toFixed(2)}`;
  }

  function hideError() {
    errorMsg.classList.add('hidden');
    errorMsg.textContent = '';
  }

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove('hidden');
  }
}
