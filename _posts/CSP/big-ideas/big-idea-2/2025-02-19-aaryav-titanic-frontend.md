---
layout: tailwindPost
title: Titanic Survival Predictor - Aaryav
description: Tailwind frontend for the Titanic notebook predictor.
courses: { csp: {week: 25} }
permalink: /titanic/predictor-aaryav
show_reading_time: false
---

<div class="relative isolate overflow-hidden bg-[linear-gradient(180deg,_#f8fafc_0%,_#eff6ff_45%,_#f8fafc_100%)] text-slate-900">
  <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(245,158,11,0.12),_transparent_28%)]"></div>
  <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

  <div class="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
    <section class="overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_30px_90px_rgba(15,23,42,0.10)]">
      <div class="grid lg:grid-cols-[1.08fr_0.92fr]">
        <div class="p-6 sm:p-8 lg:p-10">
          <div class="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-800">
            Notebook Frontend
          </div>

          <div class="mt-6 space-y-4">
            <p class="text-sm font-semibold uppercase tracking-[0.34em] text-slate-500">
              Titanic Survival Predictor
            </p>
            <h1 class="max-w-3xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
              Cleaner layout, clearer form flow, and a better read on the model output.
            </h1>
            <p class="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              This page sends the same passenger payload to the notebook-backed Flask route, but the interface is now organized around three things: building the record, reviewing the live manifest, and reading the prediction without visual clutter.
            </p>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Prediction Route</p>
              <p class="mt-3 text-lg font-semibold text-slate-950">POST <code>/api/titanic/predict</code></p>
              <p class="mt-2 text-sm leading-6 text-slate-600">Returns <code>die</code> and <code>survive</code> probabilities from the notebook-trained model.</p>
            </div>
            <div class="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Notebook Parity</p>
              <p class="mt-3 text-lg font-semibold text-slate-950">Derived <code>alone</code> + encoded port</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">The frontend still mirrors the notebook preprocessing flow before the request is sent.</p>
            </div>
          </div>

          <div class="mt-8 flex flex-wrap gap-3">
            <a
              href="{{ site.baseurl }}/ml/titanic"
              class="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Open Notebook
            </a>
            <a
              href="#prediction-console"
              class="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Jump to Predictor
            </a>
          </div>
        </div>

        <div class="border-t border-slate-200 bg-slate-950 p-6 text-white sm:p-8 lg:border-l lg:border-t-0 lg:p-10">
          <div class="overflow-hidden rounded-[30px] border border-white/10 bg-slate-900">
            <img
              src="{{ site.baseurl }}/images/javaml/titanic.jpg"
              alt="Titanic at sea"
              class="h-64 w-full object-cover opacity-80"
            >
          </div>

          <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div class="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Inputs Passed Through</p>
              <p class="mt-3 text-3xl font-semibold text-white">9 fields</p>
              <p class="mt-2 text-sm leading-6 text-slate-300">Name, class, sex, age, fare, embarkation, family counts, and a derived solo-travel flag.</p>
            </div>
            <div class="rounded-[28px] border border-white/10 bg-gradient-to-br from-cyan-400/20 to-amber-300/10 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Design Direction</p>
              <p class="mt-3 text-3xl font-semibold text-white">Less noise</p>
              <p class="mt-2 text-sm leading-6 text-slate-200">The right rail handles preview and results so the form can stay focused and readable.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid gap-px border-t border-slate-200 bg-slate-200 md:grid-cols-3">
        <div class="bg-white p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">Step 1</p>
          <h2 class="mt-3 text-xl font-semibold text-slate-950">Build the passenger</h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">Fill in class, age, fare, departure port, and family details in a tighter form layout.</p>
        </div>
        <div class="bg-white p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">Step 2</p>
          <h2 class="mt-3 text-xl font-semibold text-slate-950">Review the manifest</h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">The live summary updates before any API request so you can spot mistakes early.</p>
        </div>
        <div class="bg-white p-6">
          <p class="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-700">Step 3</p>
          <h2 class="mt-3 text-xl font-semibold text-slate-950">Read the output</h2>
          <p class="mt-2 text-sm leading-6 text-slate-600">The result card separates the survival signal, meter, and optional model weights.</p>
        </div>
      </div>
    </section>

    <section id="prediction-console" class="mt-8 grid gap-6 xl:grid-cols-[1.14fr_0.86fr]">
      <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:p-8">
        <div class="flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Passenger Builder</p>
            <h2 class="mt-2 text-3xl font-semibold text-slate-950">Build a boarding record</h2>
          </div>
          <p class="max-w-md text-sm leading-6 text-slate-500">
            The form is grouped by identity, ticket details, and travel group so the record reads clearly before submission.
          </p>
        </div>

        <form id="titanic-form" class="mt-8 space-y-8">
          <section class="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div class="flex flex-col gap-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Section 01</p>
              <h3 class="text-2xl font-semibold text-slate-950">Passenger identity</h3>
              <p class="text-sm leading-6 text-slate-500">Start with the rider name and the core demographics used by the model.</p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Passenger name</span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value="Avery Dawson"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
              </label>

              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Passenger class</span>
                <select
                  id="pclass"
                  name="pclass"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
                  <option value="1">1st Class</option>
                  <option value="2" selected>2nd Class</option>
                  <option value="3">3rd Class</option>
                </select>
              </label>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Sex</span>
                <select
                  id="sex"
                  name="sex"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </label>

              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Age</span>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  max="100"
                  value="30"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
              </label>
            </div>
          </section>

          <section class="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div class="flex flex-col gap-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Section 02</p>
              <h3 class="text-2xl font-semibold text-slate-950">Ticket and departure</h3>
              <p class="text-sm leading-6 text-slate-500">These fields influence the economic and embarkation signals passed into the backend.</p>
            </div>

            <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.9fr]">
              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Fare</span>
                <input
                  id="fare"
                  name="fare"
                  type="number"
                  min="0"
                  max="600"
                  step="0.01"
                  value="16.00"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
              </label>

              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Embarked</span>
                <select
                  id="embarked"
                  name="embarked"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
                  <option value="S" selected>Southampton</option>
                  <option value="C">Cherbourg</option>
                  <option value="Q">Queenstown</option>
                </select>
              </label>

              <div class="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">Prepared for model</p>
                <p class="mt-2 text-sm leading-6 text-slate-600">The selected port becomes notebook-style encoded columns when the request is assembled.</p>
              </div>
            </div>
          </section>

          <section class="space-y-5 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <div class="flex flex-col gap-2">
              <p class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Section 03</p>
              <h3 class="text-2xl font-semibold text-slate-950">Travel group</h3>
              <p class="text-sm leading-6 text-slate-500">The solo-travel signal is derived automatically from these family counts.</p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Siblings / spouses</span>
                <input
                  id="sibsp"
                  name="sibsp"
                  type="number"
                  min="0"
                  max="10"
                  value="0"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
              </label>

              <label class="block space-y-2">
                <span class="text-sm font-medium text-slate-700">Parents / children</span>
                <input
                  id="parch"
                  name="parch"
                  type="number"
                  min="0"
                  max="10"
                  value="0"
                  class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
                >
              </label>
            </div>
          </section>

          <section class="overflow-hidden rounded-[28px] bg-slate-950 text-white">
            <div class="border-b border-white/10 px-5 py-5 sm:px-6">
              <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Quick Loadouts</p>
                  <h3 class="mt-2 text-2xl font-semibold">Try a starting passenger</h3>
                </div>
                <p class="max-w-md text-sm leading-6 text-slate-300">These presets fill the form immediately so you can test the model route faster.</p>
              </div>
            </div>

            <div class="grid gap-3 p-5 sm:p-6 md:grid-cols-3">
              <button
                type="button"
                data-preset="atlantic_suite"
                class="preset-btn rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <span class="block text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Atlantic Suite</span>
                <span class="mt-3 block text-sm leading-6 text-slate-300">Higher-fare first-class traveler with family aboard and a Cherbourg departure.</span>
              </button>

              <button
                type="button"
                data-preset="engine_room"
                class="preset-btn rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <span class="block text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Engine Room</span>
                <span class="mt-3 block text-sm leading-6 text-slate-300">Low-fare third-class passenger traveling alone out of Southampton.</span>
              </button>

              <button
                type="button"
                data-preset="family_crossing"
                class="preset-btn rounded-3xl border border-white/10 bg-white/5 px-4 py-4 text-left transition hover:border-cyan-300/40 hover:bg-cyan-300/10"
              >
                <span class="block text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100">Family Crossing</span>
                <span class="mt-3 block text-sm leading-6 text-slate-300">Second-class child profile with parents and a midrange family ticket.</span>
              </button>
            </div>
          </section>

          <div class="flex flex-col gap-3 border-t border-slate-200 pt-2 sm:flex-row">
            <button
              id="predict-btn"
              type="submit"
              class="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Run Notebook Prediction
            </button>
            <button
              id="reset-btn"
              type="button"
              class="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-100"
            >
              Reset Fields
            </button>
          </div>

          <p id="error-msg" class="hidden rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"></p>
        </form>
      </section>

      <div class="space-y-6 xl:sticky xl:top-24 xl:self-start">
        <section class="overflow-hidden rounded-[32px] border border-slate-900 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
          <div class="border-b border-white/10 px-6 py-5">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">Live Manifest</p>
                <h2 class="mt-2 text-3xl font-semibold text-white">Passenger summary</h2>
              </div>
              <span id="travel-mode-badge" class="inline-flex w-fit rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-100">
                Solo Traveler
              </span>
            </div>
          </div>

          <div class="space-y-6 px-6 py-6">
            <div class="rounded-[28px] border border-white/10 bg-white/5 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Manifest readout</p>
              <p id="manifest-summary" class="mt-3 text-base leading-7 text-slate-200">
                Avery Dawson boards from Southampton with a second-class ticket and a solo travel profile.
              </p>
            </div>

            <div class="grid gap-3 sm:grid-cols-2">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Cabin tier</p>
                <p id="manifest-class" class="mt-2 text-xl font-semibold text-white">2nd Class</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Party size</p>
                <p id="manifest-party" class="mt-2 text-xl font-semibold text-white">1 passenger</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Departure port</p>
                <p id="manifest-port" class="mt-2 text-xl font-semibold text-white">Southampton</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">Fare signal</p>
                <p id="manifest-fare" class="mt-2 text-xl font-semibold text-white">$16.00</p>
              </div>
            </div>

            <div class="rounded-[28px] border border-white/10 bg-slate-900 p-5">
              <label for="api-url" class="text-sm font-medium text-slate-200">Prediction endpoint</label>
              <input
                id="api-url"
                type="text"
                class="mt-3 w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              >
              <p class="mt-3 text-xs leading-5 text-slate-400">
                Defaults to the local Flask service on <code>localhost:8587</code> and falls back to the deployed Flask host elsewhere.
              </p>
            </div>
          </div>
        </section>

        <section id="results-card" class="hidden overflow-hidden rounded-[32px] border border-emerald-200 bg-white text-slate-900 shadow-[0_24px_80px_rgba(15,23,42,0.10)]">
          <div class="border-b border-emerald-200 bg-emerald-50/70 px-6 py-5">
            <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">Prediction Output</p>
                <h2 id="result-title" class="mt-2 text-3xl font-semibold text-slate-950">
                  Awaiting result
                </h2>
              </div>
              <span id="result-badge" class="inline-flex w-fit rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white">
                Not Run
              </span>
            </div>
          </div>

          <div class="space-y-6 px-6 py-6">
            <p id="result-copy" class="text-base leading-7 text-slate-700">
              Run the predictor to see the model output.
            </p>

            <div class="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
              <div class="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <div id="survival-ring" class="mx-auto flex h-40 w-40 items-center justify-center rounded-full bg-slate-200">
                  <div class="flex h-28 w-28 flex-col items-center justify-center rounded-full bg-white text-center shadow-sm">
                    <span class="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Survive</span>
                    <span id="survive-prob" class="mt-2 text-3xl font-semibold text-slate-950">0.0%</span>
                  </div>
                </div>
              </div>

              <div class="space-y-4">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Survival chance</p>
                    <p id="survive-prob-detail" class="mt-3 text-3xl font-semibold text-slate-950">0.0%</p>
                  </div>
                  <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                    <p class="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">Death chance</p>
                    <p id="die-prob" class="mt-3 text-3xl font-semibold text-slate-950">0.0%</p>
                  </div>
                </div>

                <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div class="flex items-center justify-between text-sm text-slate-500">
                    <span>Outcome meter</span>
                    <span id="meter-label">50 / 50 split</span>
                  </div>
                  <div class="mt-4 h-4 overflow-hidden rounded-full bg-rose-200">
                    <div id="survive-bar" class="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all duration-700" style="width: 0%"></div>
                  </div>
                </div>
              </div>
            </div>

            <div id="weights-section" class="hidden rounded-[28px] border border-slate-200 bg-slate-50 p-5">
              <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 class="text-xl font-semibold text-slate-950">Global feature weights</h3>
                  <p class="mt-1 text-sm text-slate-500">
                    Rendered only if the backend sends <code>weights</code>. These are model-level importances, not passenger-specific explanations.
                  </p>
                </div>
                <span class="inline-flex w-fit rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm">
                  Decision Tree View
                </span>
              </div>

              <div id="weights-list" class="mt-5 space-y-3"></div>
            </div>
          </div>
        </section>

        <section class="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-7">
          <div class="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-700">Notebook Pipeline</p>
              <h2 class="mt-2 text-3xl font-semibold text-slate-950">What this page is hosting</h2>
            </div>
            <a
              href="{{ site.baseurl }}/ml/titanic"
              class="inline-flex w-fit items-center justify-center rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
            >
              Read Notebook
            </a>
          </div>

          <div class="mt-6 space-y-4">
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">1. Load data</p>
              <p class="mt-3 text-lg font-semibold text-slate-950">Seaborn Titanic dataset</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">The notebook starts from the standard Titanic dataset and narrows the columns used for training.</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">2. Clean inputs</p>
              <p class="mt-3 text-lg font-semibold text-slate-950">Binary + one-hot preprocessing</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">Sex and alone become numeric fields, while embarkation is encoded across dedicated feature columns.</p>
            </div>
            <div class="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">3. Predict</p>
              <p class="mt-3 text-lg font-semibold text-slate-950">Logistic regression via Flask</p>
              <p class="mt-2 text-sm leading-6 text-slate-600">The page sends the same notebook-shaped payload to <code>/api/titanic/predict</code> and renders the returned probabilities.</p>
            </div>
          </div>

          <div class="mt-6 rounded-[28px] border border-slate-200 bg-slate-950 p-5 text-sm leading-7 text-slate-200">
            <p><span class="font-semibold text-white">Notebook source:</span> <code>_notebooks/CSP/big-ideas/big-idea-2/2025-02-19-pandas-ml_titanic.ipynb</code></p>
            <p class="mt-3"><span class="font-semibold text-white">Payload sent:</span> <code>name</code>, <code>pclass</code>, <code>sex</code>, <code>age</code>, <code>sibsp</code>, <code>parch</code>, <code>fare</code>, <code>embarked</code>, and the derived <code>alone</code> value.</p>
          </div>
        </section>
      </div>
    </section>
  </div>
</div>

<script type="module" src="{{ site.baseurl }}/assets/js/titanic-predictor.js"></script>
