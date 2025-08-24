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
            Hello! I'm Jo, undergrad at UChicago studying math and philosophy. I'm currently doing research to better understand how RL on narrow tasks change LLM's safety-relevant behaviours, fortunately mentored by James Evans and Austin Kozlawski at <a href="https://knowledgelab.org/">Knowledge Lab</a>. 
        </p>
        <p>
            I co-started and co-lead the <a href="https://uchicagoaisafety.com/">AI Safety Group</a> at <a href="https://xrisk.uchicago.edu/">UChicago XLab</a>. Always happy to talk about any aspects of the group, and let me know if I can be helpful in any way.
        </p>
        <p>
            I want your feedback - and I want to make it easy for you. You can share your thoughts anonymously <a href="https://www.admonymous.co/joneedssleep">here</a>. I promise to 1) take what you say seriously, 2) not guess who you are, 3) assume the best of intentions.
        </p>
        <p>
            A list of things in my headspace: AI Safety, meditation, <a href="http://bewelltuned.com/tune_your_cognitive_strategies">metacognition</a>, Kant, Borges, my time at <a href="https://www.uwc.org/">UWC</a>.
        </p>
        <p>
            Now <a href="https://www.admonymous.co/joneedssleep">your turn</a>: what's 1) the question you woke up to 2) your favourite art piece (<a href="https://joneedssleep.github.io/judit-reigl/">here's mine</a>), or 3) a cool pattern you found in Conway's Game--
        </p>
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