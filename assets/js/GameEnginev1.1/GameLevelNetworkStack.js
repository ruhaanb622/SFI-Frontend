// GameLevelNetworkStack.js - Packet Runner: Journey Through the Network Stack
// CB Unit 4 Networking Gamification - OSI 7-Layer / TCP/IP 5-Layer / MTU
import GamEnvBackground from './essentials/GameEnvBackground.js';
import Player from './essentials/Player.js';
import Npc from './essentials/Npc.js';

class GameLevelNetworkStack {
  constructor(gameEnv) {
    const width = gameEnv.innerWidth;
    const height = gameEnv.innerHeight;
    const path = gameEnv.path;

    // ═══════════════════════════════════════════
    //  GAME STATE (shared across all NPCs via closure)
    // ═══════════════════════════════════════════
    const state = {
      score: 0,
      lives: 3,
      quizOpen: false,
      completedLayers: new Set(),
      // Track which question index each layer is on
      layerQuestionIndex: { 7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      packetBytes: 0,
      questionsAnswered: 0,
      questionsCorrect: 0,
      gameOver: false,
      hudCreated: false
    };

    // Header bytes added per layer when completed
    const LAYER_HEADERS = {
      7: { name: 'HTTP Payload', bytes: 1400, color: '#4A90D9' },
      6: { name: 'TLS Record', bytes: 5, color: '#9B59B6' },
      5: { name: 'Session', bytes: 0, color: '#1ABC9C' },
      4: { name: 'TCP Header', bytes: 20, color: '#E67E22' },
      3: { name: 'IP Header', bytes: 20, color: '#27AE60' },
      2: { name: 'Eth Hdr+CRC', bytes: 18, color: '#E74C3C' },
      1: { name: 'Signal Bits', bytes: 0, color: '#95A5A6' }
    };

    // ═══════════════════════════════════════════
    //  QUESTION BANK
    // ═══════════════════════════════════════════
    const questions = {
      7: [
        {
          q: "What protocol does a web browser use to request a webpage?",
          opts: ["TCP", "HTTP/HTTPS", "Ethernet", "IP"],
          ans: 1,
          info: "HTTP/HTTPS are Application layer protocols. Your browser sends HTTP GET requests to fetch pages from servers."
        },
        {
          q: "What does DNS resolve?",
          opts: ["MAC addresses to IPs", "Ports to protocols", "Domain names to IP addresses", "Sessions to sockets"],
          ans: 2,
          info: "DNS translates names like 'flask.opencodingsociety.com' into IPs like '3.233.212.71' so packets know where to go."
        },
        {
          q: "Which JavaScript method makes asynchronous HTTP requests?",
          opts: ["document.write()", "console.log()", "fetch()", "alert()"],
          ans: 2,
          info: "fetch() is the modern Web API for making HTTP requests. Example: fetch('https://api.example.com/users')"
        }
      ],
      6: [
        {
          q: "What does TLS/SSL provide for HTTPS connections?",
          opts: ["IP routing", "Encryption & authentication", "MAC addressing", "Port management"],
          ans: 1,
          info: "TLS (Transport Layer Security) encrypts data between client and server. Certbot manages TLS certificates for your deployment."
        },
        {
          q: "What port does HTTPS use by default?",
          opts: ["80", "8080", "443", "22"],
          ans: 2,
          info: "HTTPS uses port 443. HTTP uses port 80. Nginx listens on 443 and proxies to your internal app ports (e.g., localhost:8587)."
        }
      ],
      5: [
        {
          q: "What protocol enables real-time bidirectional communication?",
          opts: ["HTTP", "FTP", "WebSocket", "SMTP"],
          ans: 2,
          info: "WebSocket upgrades an HTTP connection to allow two-way real-time communication — used for live chat, notifications, and collaborative editing."
        },
        {
          q: "What HTTP status code indicates a successful WebSocket upgrade?",
          opts: ["200 OK", "101 Switching Protocols", "301 Redirect", "404 Not Found"],
          ans: 1,
          info: "Status 101 means the server accepted the WebSocket upgrade. The connection switches from HTTP to a persistent WebSocket channel."
        }
      ],
      4: [
        {
          q: "Which transport protocol guarantees reliable, ordered delivery?",
          opts: ["UDP", "IP", "TCP", "ICMP"],
          ans: 2,
          info: "TCP (Transmission Control Protocol) provides reliable, ordered delivery using acknowledgments and retransmissions. UDP is faster but unreliable."
        },
        {
          q: "How many steps are in the TCP handshake?",
          opts: ["2 (SYN, ACK)", "3 (SYN, SYN-ACK, ACK)", "4 (SYN, SYN-ACK, ACK, FIN)", "1 (CONNECT)"],
          ans: 1,
          info: "TCP uses a 3-way handshake: Client sends SYN → Server replies SYN-ACK → Client sends ACK. Connection established!"
        },
        {
          q: "What does Nginx do as a reverse proxy in your deployment?",
          opts: ["Encrypts data at Layer 6", "Maps external ports (443) to internal app ports", "Creates MAC addresses", "Transmits electrical signals"],
          ans: 1,
          info: "Nginx listens on port 443 and forwards traffic to backend apps (e.g., Flask on :8587, Spring on :8085). It also handles SSL termination and CORS."
        }
      ],
      3: [
        {
          q: "How many bytes is a standard IPv4 header?",
          opts: ["14 bytes", "4 bytes", "20 bytes", "8 bytes"],
          ans: 2,
          info: "A standard IPv4 header is 20 bytes, containing source IP, destination IP, TTL, protocol type, and other routing information."
        },
        {
          q: "Which AWS service hosts your backend server?",
          opts: ["S3 (Storage)", "Route 53 (DNS)", "EC2 (Compute)", "Lambda (Serverless)"],
          ans: 2,
          info: "EC2 (Elastic Compute Cloud) provides virtual servers. Your Flask/Spring backends run on EC2 instances, reachable via public IP addresses."
        },
        {
          q: "In the TCP/IP 5-layer model, OSI layers 5, 6, and 7 map to which single layer?",
          opts: ["Transport", "Internet", "Physical", "Application"],
          ans: 3,
          info: "TCP/IP combines OSI layers 5 (Session), 6 (Presentation), and 7 (Application) into one Application layer. TCP/IP is a standard; OSI is a guideline."
        }
      ],
      2: [
        {
          q: "What type of addressing does the Data Link layer use?",
          opts: ["IP addresses", "Port numbers", "MAC addresses", "Domain names"],
          ans: 2,
          info: "Layer 2 uses MAC (Media Access Control) addresses — unique 48-bit hardware identifiers burned into network interface cards."
        },
        {
          q: "What is the standard Ethernet MTU (Maximum Transmission Unit)?",
          opts: ["1460 bytes", "1500 bytes", "1518 bytes", "576 bytes"],
          ans: 1,
          info: "Ethernet MTU is 1500 bytes — the max payload an Ethernet frame can carry. The full frame (header + payload + CRC) is up to 1518 bytes."
        },
        {
          q: "What does the CRC checksum at the end of an Ethernet frame provide?",
          opts: ["Encryption", "Routing", "Error detection", "Compression"],
          ans: 2,
          info: "CRC (Cyclic Redundancy Check) is a 4-byte value that detects transmission errors. If the computed CRC doesn't match, the frame is discarded."
        }
      ],
      1: [
        {
          q: "What does Layer 1 (Physical) of the OSI model transmit?",
          opts: ["HTTP packets", "Ethernet frames", "Raw bits / electrical signals", "TCP segments"],
          ans: 2,
          info: "The Physical layer converts data into raw bits and transmits them as electrical signals (copper), light pulses (fiber), or radio waves (wireless)."
        },
        {
          q: "Which of these is NOT a physical transmission medium?",
          opts: ["Fiber optic cable", "Copper twisted pair", "TCP segment", "Wireless radio waves"],
          ans: 2,
          info: "TCP segments are Layer 4 (Transport) data units, not physical media. Physical media include cables, fiber optics, and wireless radio frequencies."
        }
      ]
    };

    const totalQuestions = Object.values(questions).reduce((sum, qs) => sum + qs.length, 0);

    // ═══════════════════════════════════════════
    //  CSS INJECTION (runs once)
    // ═══════════════════════════════════════════
    let cssInjected = false;
    function injectCSS() {
      if (cssInjected) return;
      cssInjected = true;
      const style = document.createElement('style');
      style.id = 'network-quiz-styles';
      style.textContent = `
        .nq-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(0,0,0,0.8);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
          animation: nqFadeIn 0.3s ease;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        @keyframes nqFadeIn { from { opacity:0; } to { opacity:1; } }
        .nq-box {
          background: linear-gradient(135deg, #1a1a3e, #0d1b2a);
          border: 2px solid rgba(255,255,255,0.15);
          border-radius: 16px; padding: 28px 32px;
          max-width: 620px; width: 90%;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          color: #e0e0e0;
        }
        .nq-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 18px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .nq-layer-badge {
          padding: 6px 14px; border-radius: 20px;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.5px;
        }
        .nq-progress { font-size: 0.8rem; color: #889; margin-left: auto; }
        .nq-question {
          font-size: 1.1rem; line-height: 1.6;
          margin-bottom: 20px; color: #fff;
        }
        .nq-options { display: flex; flex-direction: column; gap: 10px; }
        .nq-opt {
          padding: 14px 18px;
          background: rgba(255,255,255,0.05);
          border: 2px solid rgba(255,255,255,0.12);
          border-radius: 10px; cursor: pointer;
          font-size: 0.95rem; color: #ccc;
          text-align: left; transition: all 0.2s;
        }
        .nq-opt:hover:not(.nq-disabled) {
          background: rgba(0,200,100,0.1);
          border-color: #00cc66; color: #fff;
          transform: translateX(4px);
        }
        .nq-opt.nq-correct {
          background: rgba(0,200,100,0.2) !important;
          border-color: #00cc66 !important; color: #00ff88 !important;
        }
        .nq-opt.nq-wrong {
          background: rgba(255,60,60,0.2) !important;
          border-color: #ff4444 !important; color: #ff6666 !important;
        }
        .nq-opt.nq-disabled { pointer-events: none; opacity: 0.45; }
        .nq-feedback {
          margin-top: 16px; padding: 14px; border-radius: 8px;
          font-size: 0.9rem; line-height: 1.5; display: none;
        }
        .nq-feedback.nq-show { display: block; }
        .nq-feedback.nq-fb-correct {
          background: rgba(0,200,100,0.1);
          border: 1px solid rgba(0,200,100,0.3); color: #88ffbb;
        }
        .nq-feedback.nq-fb-wrong {
          background: rgba(255,60,60,0.1);
          border: 1px solid rgba(255,60,60,0.3); color: #ff8888;
        }
        .nq-btn-row { margin-top: 16px; text-align: center; }
        .nq-btn {
          padding: 10px 28px; border-radius: 8px;
          font-weight: 700; cursor: pointer;
          border: 2px solid #00cc66; background: #00cc66;
          color: #0a0a1a; font-size: 0.85rem;
          transition: all 0.2s;
        }
        .nq-btn:hover { background: #00ff88; transform: scale(1.05); }

        /* HUD */
        .nq-hud {
          position: absolute; top: 8px; left: 50%; transform: translateX(-50%);
          z-index: 9000; pointer-events: none;
          display: flex; gap: 12px; align-items: flex-start;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .nq-hud-card {
          background: rgba(10,10,30,0.88);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 8px 14px;
          backdrop-filter: blur(6px); text-align: center;
          min-width: 80px;
        }
        .nq-hud-label {
          font-size: 0.55rem; text-transform: uppercase;
          letter-spacing: 1.5px; color: #778; margin-bottom: 2px;
        }
        .nq-hud-val {
          font-size: 1.2rem; font-weight: 700; color: #fff;
        }
        .nq-lives { display: flex; gap: 3px; justify-content: center; }
        .nq-heart { font-size: 1rem; }
        .nq-heart.nq-lost { opacity: 0.2; }

        /* Packet panel */
        .nq-packet-panel {
          position: absolute; top: 8px; right: 12px;
          z-index: 9000; pointer-events: none; width: 180px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .nq-packet-card {
          background: rgba(10,10,30,0.88);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 10px 12px;
          backdrop-filter: blur(6px);
        }
        .nq-packet-title {
          font-size: 0.55rem; text-transform: uppercase;
          letter-spacing: 1.5px; color: #778;
          text-align: center; margin-bottom: 8px;
        }
        .nq-packet-seg {
          padding: 4px 6px; border-radius: 4px;
          font-size: 0.65rem; font-weight: 600;
          text-align: center; margin-bottom: 3px;
          opacity: 0.2; transition: all 0.5s;
        }
        .nq-packet-seg.nq-active { opacity: 1; }

        /* MTU bar */
        .nq-mtu-panel {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          z-index: 9000; pointer-events: none; width: 420px; max-width: 90%;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .nq-mtu-card {
          background: rgba(10,10,30,0.88);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 8px 14px;
          backdrop-filter: blur(6px);
        }
        .nq-mtu-header {
          display: flex; justify-content: space-between;
          font-size: 0.6rem; color: #889; margin-bottom: 4px;
        }
        .nq-mtu-track {
          width: 100%; height: 14px; background: #1a1a2e;
          border-radius: 7px; overflow: hidden; position: relative;
        }
        .nq-mtu-fill {
          height: 100%; border-radius: 7px;
          transition: width 0.6s ease; background: linear-gradient(90deg, #00cc66, #00ff88);
        }
        .nq-mtu-fill.nq-warn { background: linear-gradient(90deg, #ffaa00, #ff8800); }
        .nq-mtu-fill.nq-danger { background: linear-gradient(90deg, #ff4444, #cc0000); }

        /* Layer instruction panel */
        .nq-instructions {
          position: absolute; bottom: 40px; left: 12px;
          z-index: 9000; pointer-events: none; width: 200px;
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .nq-instr-card {
          background: rgba(10,10,30,0.88);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px; padding: 10px 12px;
          backdrop-filter: blur(6px); font-size: 0.7rem;
          color: #aab; line-height: 1.5;
        }
        .nq-instr-card kbd {
          background: rgba(255,255,255,0.1);
          padding: 1px 5px; border-radius: 3px;
          border: 1px solid rgba(255,255,255,0.2);
          font-size: 0.6rem;
        }

        /* Comparison table overlay */
        .nq-compare-overlay {
          position: fixed; inset: 0; z-index: 10001;
          background: rgba(0,0,0,0.85);
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px);
          font-family: 'Segoe UI', system-ui, sans-serif;
        }
        .nq-compare-box {
          background: linear-gradient(135deg, #1a1a3e, #0d1b2a);
          border: 2px solid rgba(0,200,100,0.3);
          border-radius: 16px; padding: 24px; max-width: 720px; width: 95%;
        }
        .nq-compare-box h2 {
          font-size: 0.9rem; color: #00cc66;
          text-align: center; margin-bottom: 14px;
        }
        .nq-compare-table {
          width: 100%; border-collapse: collapse; font-size: 0.78rem;
        }
        .nq-compare-table th {
          background: rgba(0,200,100,0.12); padding: 7px 10px;
          text-align: center; color: #00cc66; font-size: 0.65rem;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .nq-compare-table td {
          padding: 6px 10px; border: 1px solid rgba(255,255,255,0.08);
          text-align: center; color: #bbb;
        }
        .nq-compare-note {
          color: #889; font-size: 0.75rem; margin-top: 10px; text-align: center; line-height: 1.6;
        }
        .nq-compare-note strong { color: #6cb4e8; }
        .nq-compare-note em { color: #bb8fd8; font-style: normal; }

        /* Victory overlay */
        .nq-victory-overlay {
          position: fixed; inset: 0; z-index: 10002;
          background: linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a2e 100%);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          font-family: 'Segoe UI', system-ui, sans-serif;
          animation: nqFadeIn 0.5s ease;
        }
        .nq-victory-grade {
          font-size: 4rem; margin-bottom: 8px;
        }
        .nq-victory-title {
          font-size: 1.8rem; font-weight: 700;
          margin-bottom: 6px;
        }
        .nq-victory-score {
          font-size: 2.5rem; font-weight: 700; color: #ffd700;
          margin-bottom: 16px;
        }
        .nq-victory-breakdown {
          font-size: 0.95rem; color: #aab; line-height: 2;
          text-align: left; margin-bottom: 20px;
        }
        .nq-victory-breakdown span { color: #ffd700; font-weight: 700; }
      `;
      document.head.appendChild(style);
    }

    // ═══════════════════════════════════════════
    //  HUD FUNCTIONS
    // ═══════════════════════════════════════════
    function createHUD(container) {
      if (state.hudCreated) return;
      state.hudCreated = true;
      injectCSS();

      // Top center HUD
      const hud = document.createElement('div');
      hud.className = 'nq-hud';
      hud.id = 'nq-hud';
      hud.innerHTML = `
        <div class="nq-hud-card">
          <div class="nq-hud-label">Score</div>
          <div class="nq-hud-val" id="nq-score" style="color:#ffd700;">0</div>
        </div>
        <div class="nq-hud-card">
          <div class="nq-hud-label">Lives</div>
          <div class="nq-lives" id="nq-lives">
            <span class="nq-heart">&#10084;</span>
            <span class="nq-heart">&#10084;</span>
            <span class="nq-heart">&#10084;</span>
          </div>
        </div>
        <div class="nq-hud-card">
          <div class="nq-hud-label">Layers</div>
          <div class="nq-hud-val" id="nq-layers" style="color:#00cc66;">0 / 7</div>
        </div>
        <div class="nq-hud-card">
          <div class="nq-hud-label">Questions</div>
          <div class="nq-hud-val" id="nq-questions">${state.questionsCorrect} / ${totalQuestions}</div>
        </div>
      `;
      container.appendChild(hud);

      // Packet visualization panel (right side)
      const packetPanel = document.createElement('div');
      packetPanel.className = 'nq-packet-panel';
      packetPanel.id = 'nq-packet-panel';
      const segments = [
        { key: 2, label: 'Ethernet Hdr (14B)', color: '#E74C3C' },
        { key: 3, label: 'IP Header (20B)', color: '#27AE60' },
        { key: 4, label: 'TCP Header (20B)', color: '#E67E22' },
        { key: 5, label: 'Session Mgmt', color: '#1ABC9C' },
        { key: 6, label: 'TLS Record (5B)', color: '#9B59B6' },
        { key: 7, label: 'HTTP Payload', color: '#4A90D9' },
        { key: 'crc', label: 'CRC Checksum (4B)', color: '#E74C3C' }
      ];
      packetPanel.innerHTML = `
        <div class="nq-packet-card">
          <div class="nq-packet-title">Packet Builder</div>
          ${segments.map(s => `
            <div class="nq-packet-seg" id="nq-seg-${s.key}"
                 style="background:${s.color}33; color:${s.color};">
              ${s.label}
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(packetPanel);

      // MTU bar (bottom center)
      const mtuPanel = document.createElement('div');
      mtuPanel.className = 'nq-mtu-panel';
      mtuPanel.id = 'nq-mtu-panel';
      mtuPanel.innerHTML = `
        <div class="nq-mtu-card">
          <div class="nq-mtu-header">
            <span style="color:#e88; font-weight:600;">MTU TRACKER</span>
            <span id="nq-mtu-bytes">0 / 1518 bytes</span>
          </div>
          <div class="nq-mtu-track">
            <div class="nq-mtu-fill" id="nq-mtu-fill" style="width:0%"></div>
          </div>
        </div>
      `;
      container.appendChild(mtuPanel);

      // Instructions panel (bottom left)
      const instr = document.createElement('div');
      instr.className = 'nq-instructions';
      instr.id = 'nq-instructions';
      instr.innerHTML = `
        <div class="nq-instr-card">
          <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd> Move<br>
          <kbd>E</kbd> Talk to NPCs<br>
          <kbd>Tab</kbd> OSI vs TCP/IP table<br>
          Visit all 7 layer NPCs!
        </div>
      `;
      container.appendChild(instr);
    }

    function updateHUD() {
      const scoreEl = document.getElementById('nq-score');
      const livesEl = document.getElementById('nq-lives');
      const layersEl = document.getElementById('nq-layers');
      const questionsEl = document.getElementById('nq-questions');
      const mtuBytes = document.getElementById('nq-mtu-bytes');
      const mtuFill = document.getElementById('nq-mtu-fill');

      if (scoreEl) scoreEl.textContent = state.score;
      if (layersEl) layersEl.textContent = `${state.completedLayers.size} / 7`;
      if (questionsEl) questionsEl.textContent = `${state.questionsCorrect} / ${totalQuestions}`;

      if (livesEl) {
        const hearts = livesEl.querySelectorAll('.nq-heart');
        hearts.forEach((h, i) => {
          h.classList.toggle('nq-lost', i >= state.lives);
        });
      }

      // MTU bar
      const maxFrame = 1518;
      if (mtuBytes) mtuBytes.textContent = `${state.packetBytes} / ${maxFrame} bytes`;
      if (mtuFill) {
        const pct = Math.min(100, (state.packetBytes / maxFrame) * 100);
        mtuFill.style.width = pct + '%';
        mtuFill.classList.remove('nq-warn', 'nq-danger');
        if (pct > 90) mtuFill.classList.add('nq-danger');
        else if (pct > 60) mtuFill.classList.add('nq-warn');
      }

      // Packet segments
      for (const layer of [7, 6, 5, 4, 3, 2, 1]) {
        const seg = document.getElementById(`nq-seg-${layer}`);
        if (seg) seg.classList.toggle('nq-active', state.completedLayers.has(layer));
      }
      // CRC segment activates with layer 2
      const crcSeg = document.getElementById('nq-seg-crc');
      if (crcSeg) crcSeg.classList.toggle('nq-active', state.completedLayers.has(2));
    }

    // ═══════════════════════════════════════════
    //  QUIZ OVERLAY
    // ═══════════════════════════════════════════
    function showQuiz(layer) {
      if (state.quizOpen || state.gameOver) return;

      const layerQs = questions[layer];
      const qIndex = state.layerQuestionIndex[layer];

      // All questions for this layer answered
      if (qIndex >= layerQs.length) {
        if (!state.completedLayers.has(layer)) {
          completeLayer(layer);
        }
        showCompletedMessage(layer);
        return;
      }

      state.quizOpen = true;
      const q = layerQs[qIndex];
      const layerNames = {
        7: 'Application', 6: 'Presentation', 5: 'Session',
        4: 'Transport', 3: 'Network', 2: 'Data Link', 1: 'Physical'
      };
      const headerInfo = LAYER_HEADERS[layer];

      const overlay = document.createElement('div');
      overlay.className = 'nq-overlay';
      overlay.id = 'nq-quiz-overlay';
      overlay.innerHTML = `
        <div class="nq-box">
          <div class="nq-header">
            <span class="nq-layer-badge" style="background:${headerInfo.color}33; color:${headerInfo.color}; border:1px solid ${headerInfo.color}66;">
              Layer ${layer} — ${layerNames[layer]}
            </span>
            <span class="nq-progress">Q${qIndex + 1} of ${layerQs.length}</span>
          </div>
          <div class="nq-question">${q.q}</div>
          <div class="nq-options" id="nq-opts">
            ${q.opts.map((opt, i) => `
              <div class="nq-opt" data-idx="${i}">${String.fromCharCode(65 + i)}) ${opt}</div>
            `).join('')}
          </div>
          <div class="nq-feedback" id="nq-feedback"></div>
          <div class="nq-btn-row" id="nq-btn-row" style="display:none;">
            <button class="nq-btn" id="nq-continue-btn">Continue</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      // Option click handlers
      const opts = overlay.querySelectorAll('.nq-opt');
      opts.forEach(opt => {
        opt.addEventListener('click', () => {
          const idx = parseInt(opt.dataset.idx);
          const isCorrect = idx === q.ans;
          handleAnswer(overlay, opts, idx, q, layer, isCorrect);
        });
      });
    }

    function handleAnswer(overlay, opts, chosen, q, layer, isCorrect) {
      // Disable all options
      opts.forEach(o => o.classList.add('nq-disabled'));

      // Highlight correct/wrong
      opts[q.ans].classList.add('nq-correct');
      if (!isCorrect) opts[chosen].classList.add('nq-wrong');

      // Update state
      state.questionsAnswered++;
      if (isCorrect) {
        state.questionsCorrect++;
        state.score += 100;
      } else {
        state.lives = Math.max(0, state.lives - 1);
      }
      state.layerQuestionIndex[layer]++;

      // Show feedback
      const fb = overlay.querySelector('#nq-feedback');
      fb.className = `nq-feedback nq-show ${isCorrect ? 'nq-fb-correct' : 'nq-fb-wrong'}`;
      fb.innerHTML = isCorrect
        ? `<strong>Correct! +100 pts</strong><br>${q.info}`
        : `<strong>Wrong!</strong><br>${q.info}`;

      // Show continue button
      const btnRow = overlay.querySelector('#nq-btn-row');
      btnRow.style.display = 'block';
      const contBtn = overlay.querySelector('#nq-continue-btn');
      contBtn.addEventListener('click', () => {
        overlay.remove();
        state.quizOpen = false;

        // Check if this layer is now complete
        if (state.layerQuestionIndex[layer] >= questions[layer].length && !state.completedLayers.has(layer)) {
          completeLayer(layer);
        }

        updateHUD();
        checkVictory();
        checkGameOver();
      });

      updateHUD();
    }

    function completeLayer(layer) {
      state.completedLayers.add(layer);
      const header = LAYER_HEADERS[layer];
      state.packetBytes += header.bytes;
      // Layer 2 also adds CRC (4 bytes)
      if (layer === 2) state.packetBytes += 4;
      state.score += 50; // bonus for completing a layer
      updateHUD();
    }

    function showCompletedMessage(layer) {
      const layerNames = {
        7: 'Application', 6: 'Presentation', 5: 'Session',
        4: 'Transport', 3: 'Network', 2: 'Data Link', 1: 'Physical'
      };
      const headerInfo = LAYER_HEADERS[layer];
      const overlay = document.createElement('div');
      overlay.className = 'nq-overlay';
      overlay.innerHTML = `
        <div class="nq-box" style="text-align:center;">
          <div style="font-size:2.5rem; margin-bottom:10px;">&#9989;</div>
          <div style="font-size:1.2rem; font-weight:700; color:${headerInfo.color}; margin-bottom:8px;">
            Layer ${layer} — ${layerNames[layer]}
          </div>
          <div style="color:#00cc66; font-weight:600; margin-bottom:8px;">COMPLETED!</div>
          <div style="color:#889; font-size:0.9rem; margin-bottom:16px;">
            ${headerInfo.bytes > 0
              ? `+${headerInfo.bytes} bytes added to your packet (${headerInfo.name})`
              : `${headerInfo.name} — logical layer (no additional bytes)`}
            ${layer === 2 ? '<br>+4 bytes CRC checksum appended' : ''}
          </div>
          <button class="nq-btn" onclick="this.closest('.nq-overlay').remove()">OK</button>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    function checkVictory() {
      if (state.completedLayers.size === 7 && !state.gameOver) {
        state.gameOver = true;
        setTimeout(() => showVictory(), 600);
      }
    }

    function checkGameOver() {
      if (state.lives <= 0 && !state.gameOver) {
        state.gameOver = true;
        setTimeout(() => showDefeat(), 600);
      }
    }

    function showVictory() {
      const accuracy = totalQuestions > 0 ? Math.round((state.questionsCorrect / totalQuestions) * 100) : 0;
      let grade, gradeColor, gradeEmoji;
      if (accuracy >= 95) { grade = 'A+'; gradeColor = '#ffd700'; gradeEmoji = '&#127942;'; }
      else if (accuracy >= 85) { grade = 'A'; gradeColor = '#00ff88'; gradeEmoji = '&#11088;'; }
      else if (accuracy >= 75) { grade = 'B'; gradeColor = '#4a90d9'; gradeEmoji = '&#128640;'; }
      else if (accuracy >= 65) { grade = 'C'; gradeColor = '#e67e22'; gradeEmoji = '&#128161;'; }
      else { grade = 'D'; gradeColor = '#e74c3c'; gradeEmoji = '&#128218;'; }

      const overlay = document.createElement('div');
      overlay.className = 'nq-victory-overlay';
      overlay.innerHTML = `
        <div class="nq-victory-grade">${gradeEmoji}</div>
        <div class="nq-victory-title" style="color:${gradeColor};">
          PACKET TRANSMITTED! — Grade: ${grade}
        </div>
        <div class="nq-victory-score">${state.score} pts</div>
        <div class="nq-victory-breakdown">
          Correct answers: <span>${state.questionsCorrect} / ${totalQuestions}</span><br>
          Accuracy: <span>${accuracy}%</span><br>
          Lives remaining: <span>${state.lives} / 3</span><br>
          Layers completed: <span>${state.completedLayers.size} / 7</span><br>
          Packet size: <span>${state.packetBytes} bytes</span> (MTU limit: 1518)
        </div>
        <div style="color:#889; font-size:0.85rem; max-width:500px; text-align:center; line-height:1.6; margin-bottom:20px;">
          Your packet traveled from the <strong style="color:#4a90d9;">Application layer</strong> (HTTP request)
          all the way down to the <strong style="color:#95a5a6;">Physical layer</strong> (electrical signals),
          getting encapsulated at each step — just like a real request from
          <em>pages.opencodingsociety.com</em> to <em>flask.opencodingsociety.com</em>.
        </div>
        <button class="nq-btn" onclick="this.closest('.nq-victory-overlay').remove();">Close</button>
      `;
      document.body.appendChild(overlay);
    }

    function showDefeat() {
      const overlay = document.createElement('div');
      overlay.className = 'nq-victory-overlay';
      overlay.innerHTML = `
        <div class="nq-victory-grade">&#128683;</div>
        <div class="nq-victory-title" style="color:#ff4444;">PACKET CORRUPTED!</div>
        <div class="nq-victory-score">${state.score} pts</div>
        <div class="nq-victory-breakdown">
          You ran out of lives.<br>
          Correct answers: <span>${state.questionsCorrect}</span><br>
          Layers completed: <span>${state.completedLayers.size} / 7</span>
        </div>
        <div style="color:#889; font-size:0.85rem; max-width:450px; text-align:center; line-height:1.6; margin-bottom:20px;">
          Too many errors corrupted your packet! Review the OSI model and try again.
        </div>
        <button class="nq-btn" style="background:#ff4444; border-color:#ff4444;" onclick="location.reload();">Try Again</button>
      `;
      document.body.appendChild(overlay);
    }

    // ═══════════════════════════════════════════
    //  COMPARISON TABLE (Tab key)
    // ═══════════════════════════════════════════
    let compareOpen = false;
    function toggleCompare() {
      if (state.quizOpen) return;
      const existing = document.getElementById('nq-compare');
      if (existing) { existing.remove(); compareOpen = false; return; }
      compareOpen = true;
      const overlay = document.createElement('div');
      overlay.className = 'nq-compare-overlay';
      overlay.id = 'nq-compare';
      overlay.innerHTML = `
        <div class="nq-compare-box">
          <h2>OSI 7-Layer Model vs TCP/IP 5-Layer Model</h2>
          <table class="nq-compare-table">
            <thead><tr>
              <th>OSI #</th><th>OSI Name</th><th>TCP/IP #</th><th>TCP/IP Name</th><th>Protocols</th>
            </tr></thead>
            <tbody>
              <tr><td>7</td><td>Application</td><td rowspan="3">5</td><td rowspan="3">Application</td><td>HTTP, DNS, FTP</td></tr>
              <tr><td>6</td><td>Presentation</td><td>TLS/SSL, JPEG</td></tr>
              <tr><td>5</td><td>Session</td><td>WebSocket, RPC</td></tr>
              <tr><td>4</td><td>Transport</td><td>4</td><td>Transport</td><td>TCP, UDP, Nginx</td></tr>
              <tr><td>3</td><td>Network</td><td>3</td><td>Internet</td><td>IP, ICMP, AWS</td></tr>
              <tr><td>2</td><td>Data Link</td><td>2</td><td>Data Link</td><td>Ethernet, MAC</td></tr>
              <tr><td>1</td><td>Physical</td><td>1</td><td>Physical</td><td>Cables, Signals</td></tr>
            </tbody>
          </table>
          <div class="nq-compare-note">
            OSI is a 7-layer <em>guideline</em> (conceptual reference model).<br>
            TCP/IP is a 5-layer <strong>standard</strong> (actually implemented in real systems).<br>
            OSI layers 5-7 collapse into TCP/IP layer 5 (Application).
          </div>
          <div style="text-align:center; margin-top:14px;">
            <button class="nq-btn" onclick="document.getElementById('nq-compare').remove();">Close</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    // ═══════════════════════════════════════════
    //  AI NPC INTERACTION
    // ═══════════════════════════════════════════
    function showAiChat() {
      if (state.quizOpen) return;
      state.quizOpen = true;

      const remaining = 7 - state.completedLayers.size;
      const missingLayers = [7,6,5,4,3,2,1].filter(l => !state.completedLayers.has(l));
      const layerNames = { 7:'Application', 6:'Presentation', 5:'Session', 4:'Transport', 3:'Network', 2:'Data Link', 1:'Physical' };

      let aiMessage;
      if (remaining === 0) {
        aiMessage = "Incredible work, Packet Runner! You've mastered all 7 layers of the OSI model. Your packet is fully encapsulated and ready for transmission. Remember: the TCP/IP model combines layers 5-7 into one Application layer — it's the standard used in real networks, while OSI is the conceptual guideline.";
      } else if (remaining <= 2) {
        aiMessage = `Almost there! You just need ${remaining} more layer${remaining > 1 ? 's' : ''}: ${missingLayers.map(l => `Layer ${l} (${layerNames[l]})`).join(', ')}. Each layer adds encapsulation headers to your packet — that's how data travels through the network stack!`;
      } else {
        aiMessage = `Welcome, Packet Runner! You're building a real network packet from scratch. Visit the NPC at each layer to answer quiz questions and add headers to your packet. So far you've completed ${state.completedLayers.size}/7 layers. Try Layer ${missingLayers[0]} (${layerNames[missingLayers[0]]}) next!`;
      }

      const overlay = document.createElement('div');
      overlay.className = 'nq-overlay';
      overlay.innerHTML = `
        <div class="nq-box" style="border-color: rgba(170,100,255,0.4);">
          <div class="nq-header" style="border-color: rgba(170,100,255,0.2);">
            <span style="font-size:1.5rem;">&#129302;</span>
            <div>
              <div style="font-weight:700; color:#cc88ff;">NetWise AI Oracle</div>
              <div style="font-size:0.75rem; color:#889;">Adaptive Network Intelligence</div>
            </div>
          </div>
          <div style="font-size:0.95rem; line-height:1.7; color:#d0d0e0; margin-bottom:20px;">
            ${aiMessage}
          </div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div class="nq-opt" style="border-color:rgba(170,100,255,0.3); color:#cc88ff;"
                 id="nq-ai-explain">Explain the OSI vs TCP/IP model difference</div>
            <div class="nq-opt" style="border-color:rgba(170,100,255,0.3); color:#cc88ff;"
                 id="nq-ai-mtu">Tell me about MTU and packet sizes</div>
            <div class="nq-opt" style="border-color:rgba(170,100,255,0.3); color:#cc88ff;"
                 id="nq-ai-deploy">How does this relate to our deployment?</div>
            <div class="nq-opt" style="border-color:rgba(170,100,255,0.3); color:#cc88ff;"
                 id="nq-ai-close">Thanks, that's all!</div>
          </div>
          <div class="nq-feedback" id="nq-ai-response" style="border-color:rgba(170,100,255,0.3); color:#cc88ff;"></div>
        </div>
      `;
      document.body.appendChild(overlay);

      const responseEl = overlay.querySelector('#nq-ai-response');

      overlay.querySelector('#nq-ai-explain').addEventListener('click', () => {
        responseEl.className = 'nq-feedback nq-show';
        responseEl.style.background = 'rgba(170,100,255,0.1)';
        responseEl.innerHTML = `<strong>OSI vs TCP/IP:</strong><br>
          The OSI model has 7 layers and is a <em>conceptual guideline</em> — great for learning.<br>
          The TCP/IP model has 5 layers and is the actual <em>standard</em> implemented in real networks.<br><br>
          Key difference: OSI layers 5 (Session), 6 (Presentation), and 7 (Application) are combined into a single Application layer in TCP/IP.<br><br>
          Both models agree on layers 1-4: Physical, Data Link, Network, and Transport.`;
      });

      overlay.querySelector('#nq-ai-mtu').addEventListener('click', () => {
        responseEl.className = 'nq-feedback nq-show';
        responseEl.style.background = 'rgba(170,100,255,0.1)';
        responseEl.innerHTML = `<strong>MTU (Maximum Transmission Unit):</strong><br>
          Standard Ethernet MTU = <strong>1500 bytes</strong> (max payload in one frame)<br><br>
          <strong>Packet breakdown:</strong><br>
          &#8226; Ethernet Header: 14 bytes (MAC addresses + type)<br>
          &#8226; IP Header: 20 bytes (source/dest IP, TTL, etc.)<br>
          &#8226; TCP Header: 20 bytes (ports, sequence numbers, flags)<br>
          &#8226; Application Payload: up to <strong>1460 bytes</strong><br>
          &#8226; Ethernet CRC: 4 bytes<br>
          &#8226; Total frame: up to <strong>1518 bytes</strong><br><br>
          If your data exceeds the MTU, IP fragmentation splits it into multiple packets!`;
      });

      overlay.querySelector('#nq-ai-deploy').addEventListener('click', () => {
        responseEl.className = 'nq-feedback nq-show';
        responseEl.style.background = 'rgba(170,100,255,0.1)';
        responseEl.innerHTML = `<strong>Your Deployment Stack:</strong><br>
          When a student visits <em>pages.opencodingsociety.com</em>:<br><br>
          &#8226; <strong>L7 Application:</strong> Browser sends HTTP GET, JavaScript calls fetch() to your Flask/Spring API<br>
          &#8226; <strong>L6 Presentation:</strong> TLS/SSL encrypts the request (Certbot manages certs)<br>
          &#8226; <strong>L5 Session:</strong> TCP connection maintained; WebSocket for real-time features<br>
          &#8226; <strong>L4 Transport:</strong> Nginx receives on port 443, proxies to localhost:8587 (Flask) or :8085 (Spring)<br>
          &#8226; <strong>L3 Network:</strong> DNS resolves to AWS EC2 IP (e.g., 3.233.212.71), IP routing delivers packets<br>
          &#8226; <strong>L2 Data Link:</strong> Ethernet frames with MAC addresses hop between switches/routers<br>
          &#8226; <strong>L1 Physical:</strong> Electrical signals over fiber/copper/wireless<br><br>
          <strong>CORS:</strong> Nginx validates origin headers (e.g., opencodingsociety.com) before forwarding to your backend.<br>
          <strong>Docker:</strong> Your backend runs in containers for isolation and reproducibility.`;
      });

      overlay.querySelector('#nq-ai-close').addEventListener('click', () => {
        overlay.remove();
        state.quizOpen = false;
      });
    }

    // ═══════════════════════════════════════════
    //  BACKGROUND
    // ═══════════════════════════════════════════
    const image_data_bg = {
      name: 'network-world',
      greeting: "Welcome to the Network Stack! Walk to each layer's NPC and press E to test your knowledge.",
      src: path + "/images/gamify/city.png",
      pixels: { height: 654, width: 966 }
    };

    // ═══════════════════════════════════════════
    //  PLAYER
    // ═══════════════════════════════════════════
    const PLAYER_SCALE = 5;
    const sprite_data_player = {
      id: 'PacketRunner',
      greeting: "I'm the Packet Runner! Help me traverse all 7 layers of the OSI model!",
      src: path + "/images/gamify/chillguy.png",
      SCALE_FACTOR: PLAYER_SCALE,
      STEP_FACTOR: 1000,
      ANIMATION_RATE: 50,
      INIT_POSITION: { x: 0.02, y: 0.05 },
      pixels: { height: 384, width: 512 },
      orientation: { rows: 3, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      downRight: { row: 1, start: 0, columns: 3, rotate: Math.PI / 16 },
      downLeft: { row: 2, start: 0, columns: 3, rotate: -Math.PI / 16 },
      left: { row: 2, start: 0, columns: 3 },
      right: { row: 1, start: 0, columns: 3 },
      up: { row: 3, start: 0, columns: 3 },
      upLeft: { row: 2, start: 0, columns: 3, rotate: Math.PI / 16 },
      upRight: { row: 1, start: 0, columns: 3, rotate: -Math.PI / 16 },
      hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
      keypress: { up: 87, left: 65, down: 83, right: 68 }
    };

    // ═══════════════════════════════════════════
    //  HELPER: create NPC quiz interact function
    // ═══════════════════════════════════════════
    function makeQuizInteract(layer) {
      return function () {
        if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
          this.dialogueSystem.closeDialogue();
        }
        showQuiz(layer);
      };
    }

    function makeQuizReaction(greetText) {
      return function () {
        if (this.dialogueSystem) {
          this.showReactionDialogue();
        }
      };
    }

    // ═══════════════════════════════════════════
    //  LAYER NPCs
    // ═══════════════════════════════════════════

    // Layer 7 — Application (Octocat: represents web/APIs)
    const npc_L7 = {
      id: 'L7 Application',
      greeting: "I'm the Application Layer guardian! I handle HTTP requests, DNS resolution, and web APIs. Press E to test your knowledge!",
      src: path + "/images/gamify/octocat.png",
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 100,
      pixels: { height: 301, width: 801 },
      INIT_POSITION: { x: 0.12, y: 0.08 },
      orientation: { rows: 1, columns: 4 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "Layer 7 handles protocols like HTTP, HTTPS, DNS, FTP, and SMTP.",
        "When you type a URL, DNS resolves it to an IP address at this layer.",
        "JavaScript's fetch() API operates at the Application layer.",
        "Flask and Spring APIs process HTTP requests at Layer 7."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(7)
    };

    // Layer 6 — Presentation (Robot: data transformation)
    const npc_L6 = {
      id: 'L6 Presentation',
      greeting: "I'm the Presentation Layer! I handle encryption, compression, and data formatting. TLS/SSL lives here!",
      src: path + "/images/gamify/robot.png",
      SCALE_FACTOR: 10,
      ANIMATION_RATE: 100,
      pixels: { height: 316, width: 627 },
      INIT_POSITION: { x: 0.5, y: 0.1 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "I translate data between application format and network format.",
        "TLS/SSL encryption happens at Layer 6 — that's the S in HTTPS!",
        "Certbot manages your TLS certificates for encrypted connections.",
        "Data compression and character encoding (like UTF-8) happen here."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(6)
    };

    // Layer 5 — Session (Tux: Linux/session management)
    const npc_L5 = {
      id: 'L5 Session',
      greeting: "I'm the Session Layer! I manage connections between applications — establishing, maintaining, and terminating them.",
      src: path + "/images/gamify/tux.png",
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 50,
      pixels: { height: 256, width: 352 },
      INIT_POSITION: { x: 0.85, y: 0.15 },
      orientation: { rows: 8, columns: 11 },
      down: { row: 5, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "I keep track of who's talking to whom in network conversations.",
        "WebSocket connections are maintained at the Session layer.",
        "HTTP status 101 means upgrading from HTTP to a WebSocket session!",
        "Session tokens help servers remember your login state."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(5)
    };

    // Layer 4 — Transport (Computer: ports and reliable delivery)
    const npc_L4 = {
      id: 'L4 Transport',
      greeting: "I'm the Transport Layer! TCP and UDP live here. I handle port numbers, segmentation, and Nginx manages traffic at this layer!",
      src: path + "/images/gamify/computer.png",
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 100,
      pixels: { height: 479, width: 521 },
      INIT_POSITION: { x: 0.15, y: 0.38 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "TCP guarantees delivery; UDP is faster but best-effort.",
        "TCP uses a 3-way handshake: SYN → SYN-ACK → ACK.",
        "Nginx listens on port 443 and proxies to your internal app ports.",
        "Port 443 = HTTPS, Port 80 = HTTP, Port 22 = SSH."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(4)
    };

    // Layer 3 — Network (R2D2: routing/navigation)
    const npc_L3 = {
      id: 'L3 Network',
      greeting: "Beep boop! I'm the Network Layer! I handle IP addressing and routing — finding the best path through the internet!",
      src: path + "/images/gamify/r2_idle.png",
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 100,
      pixels: { width: 505, height: 223 },
      INIT_POSITION: { x: 0.55, y: 0.45 },
      orientation: { rows: 1, columns: 3 },
      down: { row: 0, start: 0, columns: 3 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "IP packets carry source and destination addresses for routing.",
        "A standard IPv4 header is 20 bytes long.",
        "AWS EC2 instances get public IPs so they're reachable on the internet.",
        "Routers operate at Layer 3, making forwarding decisions based on IP."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(3)
    };

    // Layer 2 — Data Link (Chicken: frames/hops)
    const npc_L2 = {
      id: 'L2 DataLink',
      greeting: "Bawk! I guard the Data Link Layer! Ethernet frames, MAC addresses, and CRC error detection — that's my domain!",
      src: path + "/images/gamify/chicken.png",
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 100,
      pixels: { height: 400, width: 400 },
      INIT_POSITION: { x: 0.8, y: 0.6 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "Ethernet frames wrap IP packets with MAC addresses and a CRC.",
        "MAC addresses are 48-bit hardware IDs unique to each NIC.",
        "The Ethernet MTU is 1500 bytes — that's the max payload per frame.",
        "Switches operate at Layer 2, forwarding frames by MAC address."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(2)
    };

    // Layer 1 — Physical (Wizard: signal magic)
    const npc_L1 = {
      id: 'L1 Physical',
      greeting: "I am the keeper of the Physical Layer! Raw bits become electrical signals, light pulses, and radio waves here!",
      src: path + "/images/gamify/wizard.png",
      SCALE_FACTOR: 5,
      ANIMATION_RATE: 100,
      pixels: { height: 185, width: 163 },
      INIT_POSITION: { x: 0.4, y: 0.72 },
      orientation: { rows: 1, columns: 1 },
      down: { row: 0, start: 0, columns: 1 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "I transform digital bits into signals that travel through cables and air.",
        "Fiber optic cables use light pulses — they're fast and long-range!",
        "Wi-Fi uses radio waves at 2.4 GHz or 5 GHz frequencies.",
        "Network Interface Cards (NICs) bridge the digital and physical worlds."
      ],
      reaction: makeQuizReaction(),
      interact: makeQuizInteract(1)
    };

    // AI NPC — NetWise Oracle
    const npc_AI = {
      id: 'NetWise Oracle',
      greeting: "I am the NetWise Oracle — your AI guide through the network stack. Press E for hints, explanations, and deployment knowledge!",
      src: path + "/images/gamify/animwizard.png",
      SCALE_FACTOR: 8,
      ANIMATION_RATE: 100,
      pixels: { height: 307, width: 813 },
      INIT_POSITION: { x: 0.15, y: 0.65 },
      orientation: { rows: 3, columns: 7 },
      down: { row: 1, start: 0, columns: 6 },
      hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
      dialogues: [
        "Ask me about OSI vs TCP/IP, MTU calculations, or your deployment!",
        "I can explain how Nginx, Docker, CORS, and Certbot work in your stack.",
        "Need a hint? I know which layers you haven't completed yet.",
        "The TCP/IP model is the standard; OSI is the guideline — remember that!"
      ],
      reaction: function () {
        if (this.dialogueSystem) {
          this.showReactionDialogue();
        }
      },
      interact: function () {
        if (this.dialogueSystem && this.dialogueSystem.isDialogueOpen()) {
          this.dialogueSystem.closeDialogue();
        }
        showAiChat();
      }
    };

    // ═══════════════════════════════════════════
    //  CLASS LIST (what the engine instantiates)
    // ═══════════════════════════════════════════
    this.classes = [
      { class: GamEnvBackground, data: image_data_bg },
      { class: Player, data: sprite_data_player },
      { class: Npc, data: npc_L7 },
      { class: Npc, data: npc_L6 },
      { class: Npc, data: npc_L5 },
      { class: Npc, data: npc_L4 },
      { class: Npc, data: npc_L3 },
      { class: Npc, data: npc_L2 },
      { class: Npc, data: npc_L1 },
      { class: Npc, data: npc_AI }
    ];

    // ═══════════════════════════════════════════
    //  STORE REFERENCES for initialize/destroy
    // ═══════════════════════════════════════════
    this._gameEnv = gameEnv;
    this._state = state;
    this._toggleCompare = toggleCompare;
    this._createHUD = createHUD;
    this._tabHandler = null;
  }

  // Called after all game objects are created
  initialize() {
    const container = this._gameEnv.gameContainer || document.getElementById('gameContainer');
    if (container) {
      this._createHUD(container);
    }

    // Tab key for comparison table
    this._tabHandler = (e) => {
      if (e.key === 'Tab') {
        e.preventDefault();
        this._toggleCompare();
      }
    };
    document.addEventListener('keydown', this._tabHandler);
  }

  // Called when level is destroyed
  destroy() {
    if (this._tabHandler) {
      document.removeEventListener('keydown', this._tabHandler);
    }
    // Clean up HUD elements
    ['nq-hud', 'nq-packet-panel', 'nq-mtu-panel', 'nq-instructions', 'nq-compare', 'nq-quiz-overlay'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.remove();
    });
    // Clean up any open overlays
    document.querySelectorAll('.nq-overlay, .nq-compare-overlay, .nq-victory-overlay').forEach(el => el.remove());
    // Clean up injected CSS
    const style = document.getElementById('network-quiz-styles');
    if (style) style.remove();
  }
}

export default GameLevelNetworkStack;
