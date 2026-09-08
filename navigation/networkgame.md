---
layout: opencs
title: Packet Runner
permalink: /networkgame
---

<style>
html, body { height: 100%; }
#gameContainer { width: 100%; height: 85vh; margin: 0; position: relative; overflow: hidden; }
#gameCanvas { width: 100%; height: 100%; display: block; }
#gameContainer, #gameCanvas { background: #0a0a2e; }
</style>

<div id="gameContainer">
    <canvas id='gameCanvas'></canvas>
</div>

<script type="module">
    import Game from '{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/Game.js';
    import GameControl from '{{site.baseurl}}/assets/js/GameEnginev1.1/essentials/GameControl.js';
    import GameLevelNetworkStack from '{{site.baseurl}}/assets/js/GameEnginev1.1/GameLevelNetworkStack.js';

    const environment = {
        path: "{{site.baseurl}}",
        gameContainer: document.getElementById("gameContainer"),
        gameCanvas: document.getElementById("gameCanvas"),
        gameLevelClasses: [GameLevelNetworkStack]
    };

    Game.main(environment, GameControl);
</script>
