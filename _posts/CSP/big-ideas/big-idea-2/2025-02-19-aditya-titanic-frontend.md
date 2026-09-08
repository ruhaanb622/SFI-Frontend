---
layout: post
title: Titanic Survival Predictor
description: Interactive frontend for the Titanic ML model - predict your survival chances!
courses: { csp: {week: 25} }
permalink: /titanic/predictor-aditya 
---

<style>
  .titanic-container {
    max-width: 700px;
    margin: 0 auto;
    font-family: inherit;
  }
  .form-card {
    background: #1e1e2f;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
  }
  .form-card h2 {
    color: #50fa7b;
    margin-top: 0;
  }
  .form-row {
    display: flex;
    gap: 16px;
    margin-bottom: 14px;
    flex-wrap: wrap;
  }
  .form-group {
    flex: 1;
    min-width: 140px;
  }
  .form-group label {
    display: block;
    margin-bottom: 4px;
    color: #ccc;
    font-size: 0.9em;
  }
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #444;
    border-radius: 6px;
    background: #2c2c3c;
    color: #e4e4e4;
    font-size: 1em;
    box-sizing: border-box;
  }
  .form-group input:focus,
  .form-group select:focus {
    outline: none;
    border-color: #50fa7b;
  }
  #predict-btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, #ff7f50, #ff5c1a);
    color: #fff;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.15s, box-shadow 0.15s;
    margin-top: 8px;
  }
  #predict-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255,92,26,0.4);
  }
  #predict-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
  .results-card {
    background: #1e1e2f;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.4);
    display: none;
  }
  .results-card h2 {
    color: #ffb347;
    margin-top: 0;
  }
  .prob-container {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }
  .prob-box {
    flex: 1;
    text-align: center;
    padding: 16px;
    border-radius: 10px;
  }
  .prob-box.survive {
    background: rgba(80, 250, 123, 0.15);
    border: 2px solid #50fa7b;
  }
  .prob-box.die {
    background: rgba(255, 85, 85, 0.15);
    border: 2px solid #ff5555;
  }
  .prob-box .prob-label {
    font-size: 0.9em;
    color: #ccc;
    margin-bottom: 6px;
  }
  .prob-box .prob-value {
    font-size: 2em;
    font-weight: bold;
  }
  .prob-box.survive .prob-value { color: #50fa7b; }
  .prob-box.die .prob-value { color: #ff5555; }
  .bar-container {
    margin-bottom: 20px;
  }
  .bar-bg {
    height: 28px;
    background: rgba(255,85,85,0.3);
    border-radius: 14px;
    overflow: hidden;
    position: relative;
  }
  .bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #50fa7b, #3ad68a);
    border-radius: 14px;
    transition: width 0.8s ease;
  }
  .bar-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
    color: #999;
    margin-top: 4px;
  }
  .weights-section h3 {
    color: #bd93f9;
    margin-bottom: 10px;
  }
  .weight-row {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }
  .weight-label {
    width: 110px;
    font-size: 0.9em;
    color: #ccc;
  }
  .weight-bar-bg {
    flex: 1;
    height: 18px;
    background: #2c2c3c;
    border-radius: 9px;
    overflow: hidden;
    margin: 0 10px;
  }
  .weight-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #bd93f9, #9b6dff);
    border-radius: 9px;
    transition: width 0.6s ease;
  }
  .weight-value {
    width: 55px;
    text-align: right;
    font-size: 0.9em;
    color: #e4e4e4;
  }
  .error-msg {
    background: rgba(255,85,85,0.15);
    border: 1px solid #ff5555;
    color: #ff5555;
    padding: 12px;
    border-radius: 8px;
    margin-top: 12px;
    display: none;
  }
  .api-config {
    margin-bottom: 16px;
  }
  .api-config label {
    color: #ccc;
    font-size: 0.85em;
  }
  .api-config input {
    width: 100%;
    padding: 6px 10px;
    border: 1px solid #444;
    border-radius: 6px;
    background: #2c2c3c;
    color: #e4e4e4;
    font-size: 0.9em;
    box-sizing: border-box;
    margin-top: 4px;
  }
</style>

<div class="titanic-container">

  <div class="form-card">
    <h2>Would You Have Survived the Titanic?</h2>
    <p style="color:#aaa; margin-top:0;">Enter your passenger details below and find out your survival chances using machine learning.</p>

    <div class="api-config">
      <label for="api-url">Backend API URL</label>
      <input type="text" id="api-url" value="http://127.0.0.1:8587/api/titanic/predict" placeholder="http://127.0.0.1:8587/api/titanic/predict">
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" value="Your Name" />
      </div>
      <div class="form-group">
        <label for="pclass">Passenger Class</label>
        <select id="pclass">
          <option value="1">1st Class</option>
          <option value="2" selected>2nd Class</option>
          <option value="3">3rd Class</option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="sex">Sex</label>
        <select id="sex">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input type="number" id="age" value="30" min="0" max="100" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="sibsp">Siblings/Spouses Aboard</label>
        <input type="number" id="sibsp" value="0" min="0" max="10" />
      </div>
      <div class="form-group">
        <label for="parch">Parents/Children Aboard</label>
        <input type="number" id="parch" value="0" min="0" max="10" />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="fare">Fare Paid ($)</label>
        <input type="number" id="fare" value="16.00" min="0" max="600" step="0.01" />
      </div>
      <div class="form-group">
        <label for="embarked">Port of Embarkation</label>
        <select id="embarked">
          <option value="S">Southampton</option>
          <option value="C">Cherbourg</option>
          <option value="Q">Queenstown</option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label for="alone">Traveling Alone?</label>
        <select id="alone">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
    </div>

    <button id="predict-btn">Predict My Survival</button>
    <div class="error-msg" id="error-msg"></div>
  </div>

  <div class="results-card" id="results-card">
    <h2>Prediction Results</h2>
    <p id="results-name" style="color:#ccc; margin-top:0;"></p>

    <div class="prob-container">
      <div class="prob-box survive">
        <div class="prob-label">Survival Chance</div>
        <div class="prob-value" id="survive-prob">—</div>
      </div>
      <div class="prob-box die">
        <div class="prob-label">Death Chance</div>
        <div class="prob-value" id="die-prob">—</div>
      </div>
    </div>

    <div class="bar-container">
      <div class="bar-bg">
        <div class="bar-fill" id="survive-bar" style="width: 0%"></div>
      </div>
      <div class="bar-labels">
        <span>0% Survival</span>
        <span>100% Survival</span>
      </div>
    </div>

    <div class="weights-section">
      <h3>Feature Importance</h3>
      <p style="color:#888; font-size:0.85em; margin-top:0;">How much each factor matters in the prediction model:</p>
      <div id="weights-container"></div>
    </div>
  </div>

</div>

<script>
  const predictBtn = document.getElementById('predict-btn');
  const resultsCard = document.getElementById('results-card');
  const errorMsg = document.getElementById('error-msg');

  // Feature display names
  const featureNames = {
    pclass: 'Class',
    sex: 'Sex',
    age: 'Age',
    sibsp: 'Siblings/Spouse',
    parch: 'Parents/Children',
    fare: 'Fare',
    alone: 'Alone',
    embarked_C: 'Cherbourg',
    embarked_Q: 'Queenstown',
    embarked_S: 'Southampton'
  };

  predictBtn.addEventListener('click', async function () {
    errorMsg.style.display = 'none';
    predictBtn.disabled = true;
    predictBtn.textContent = 'Predicting...';

    const sibsp = parseInt(document.getElementById('sibsp').value);
    const parch = parseInt(document.getElementById('parch').value);
    const aloneSelect = document.getElementById('alone').value;
    const isAlone = (sibsp === 0 && parch === 0) || aloneSelect === 'true';

    const passenger = {
      name: document.getElementById('name').value,
      pclass: parseInt(document.getElementById('pclass').value),
      sex: document.getElementById('sex').value,
      age: parseInt(document.getElementById('age').value),
      sibsp: sibsp,
      parch: parch,
      fare: parseFloat(document.getElementById('fare').value),
      embarked: document.getElementById('embarked').value,
      alone: isAlone
    };

    const apiUrl = document.getElementById('api-url').value.trim();

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passenger)
      });

      if (!response.ok) {
        throw new Error('Server responded with status ' + response.status);
      }

      const data = await response.json();
      displayResults(passenger, data);
    } catch (err) {
      errorMsg.textContent = 'Error: ' + err.message + '. Make sure the Flask backend is running.';
      errorMsg.style.display = 'block';
      resultsCard.style.display = 'none';
    } finally {
      predictBtn.disabled = false;
      predictBtn.textContent = 'Predict My Survival';
    }
  });

  function displayResults(passenger, data) {
    resultsCard.style.display = 'block';

    const survivePct = (data.survive * 100).toFixed(1);
    const diePct = (data.die * 100).toFixed(1);

    document.getElementById('results-name').textContent =
      'Results for ' + passenger.name + ':';
    document.getElementById('survive-prob').textContent = survivePct + '%';
    document.getElementById('die-prob').textContent = diePct + '%';
    document.getElementById('survive-bar').style.width = survivePct + '%';

    // Render feature weights if provided
    const container = document.getElementById('weights-container');
    container.innerHTML = '';

    if (data.weights) {
      const maxWeight = Math.max(...Object.values(data.weights));
      for (const [feature, weight] of Object.entries(data.weights)) {
        const pct = (weight * 100).toFixed(1);
        const barWidth = maxWeight > 0 ? ((weight / maxWeight) * 100).toFixed(1) : 0;
        const displayName = featureNames[feature] || feature;

        const row = document.createElement('div');
        row.className = 'weight-row';
        row.innerHTML =
          '<span class="weight-label">' + displayName + '</span>' +
          '<div class="weight-bar-bg"><div class="weight-bar-fill" style="width:' + barWidth + '%"></div></div>' +
          '<span class="weight-value">' + pct + '%</span>';
        container.appendChild(row);
      }
    }

    resultsCard.scrollIntoView({ behavior: 'smooth' });
  }
</script>
