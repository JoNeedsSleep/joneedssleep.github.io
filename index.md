---
layout: default
---

<div class="container">
    <div class="left-column">
        <h1 class="name">Jo J. Jiao</h1>
        <button id="darkModeButton" class="theme-toggle" aria-label="Toggle dark mode"></button>
        <div class="social-links">
            <a>jojiao [at] uchicago [dot] edu</a>
            <a href="https://linkedin.com/in/jojiao">LinkedIn</a>
            <a href="https://github.com/JoNeedsSleep">GitHub</a>
        </div>
    </div>
    <div class="right-column">
        <p>
            Hi there! I'm Jo. As of fall 2025, I study mathematics and philosophy at UChicago and do research in AI Safety.
        </p>
        <p>
            I am interested in learning and generalization dynamics of machine learning models, especially as it pertains to (mis)alignment. Currently, I'm working to better understand how reinforcement learning on narrow, real-world objectives shift model values, fortunately mentored by James Evans and Austin Kozlowski at UChicago <a href="https://knowledgelab.org/">Knowledge Lab</a>.
        </p>
        <details>
        <summary>Feedback</summary>
        <p>
        I want to be the best version of myself possible. If you see a way I can improve (in how I think, how I treat people, how I engage with the world), let me know <a href="https://www.admonymous.co/joneedssleep">here</a>. I promise to 1) take your feedback seriously, 2) not guess who you are, 3) assume good faith.
        </p>
        </details>
        <details>
        <summary>More</summary>
        <p>
            The thinker, writer, and artist I admire most are Kant, Borges, and <a href="https://joneedssleep.github.io/judit-reigl/">Judit Reigl</a>. To me, they represent structure, imagination, and rhythm.
        </p>
        </details>
        <div class="game-controls">
            <button id="startButton">Start Game of Life</button>
            <button id="drawButton">Draw Mode</button>
            <button id="clearButton">Clear</button>
        </div>
    </div>
</div>

<canvas id="gameCanvas"></canvas>
<canvas id="interactionCanvas"></canvas>

<script src="/assets/js/game-of-life.js"></script> 