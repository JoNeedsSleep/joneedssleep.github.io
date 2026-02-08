---
layout: default
---

<div class="container">
    <div class="left-column">
        <h1 class="name">Jo J. Jiao</h1>
        <button id="darkModeButton" class="theme-toggle" aria-label="Toggle dark mode"></button>
        <div class="social-links">
            <a>jojiao [at] uchicago [dot] edu</a>
            <a>LinkedIn</a>
            <a>GitHub</a>
        </div>
    </div>
    <div class="right-column">
        <p>
            Hi there! I'm Jo. As of winter 2026, I am a MATS fellow mentored by Alex Turner and Alex Cloud as part of Team Shard. Outside of AI Safety research, I study mathematics and philosophy at UChicago, where I co-started and organized the AI Safety Group at XLab.
        </p>
        <p>
            I am interested in learning and generalization dynamics of machine learning models, especially as it pertains to (mis)alignment. I am currently working on elicitation. Previously, I researched value generalization from reinforcement learning with James Evans and Austin Kozlowski at UChicago Knowledge Lab.
        </p>
        <details>
        <summary>Feedback</summary>
        <p>
        I want to be the best version of myself possible. If you see a way I can improve (in how I think, how I treat people, how I engage with the world), let me know. I promise to 1) take your feedback seriously, 2) not guess who you are, 3) assume good faith.
        </p>
        </details>
        <details>
        <summary>More</summary>
        <p>
        I enjoy thinking about thinking. My most recent experiment is using spaced repetition systems to help compress and schematize mathematical knowledge. If you have thoughts on this, I would love to compare notes.
        </p>
        <p>
            The thinkers, writers, and artists who have most shaped me are Immanuel Kant, Alice Munro, Jorge Luis Borges, and Judit Reigl. For me, they represent structure, restraint, imagination, and rhythm.
        </p>
        <p>
            Meditation is a central part of my life. I practice two lineages: Vipassana in the tradition of Goenka, and Taoism, from my time at the Five Immortals Temple.
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