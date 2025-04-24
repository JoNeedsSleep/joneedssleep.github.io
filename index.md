---
layout: default
---

<div class="container">
    <div class="left-column">
        <h1 class="name">Jo J. Jiao</h1>
        <button id="darkModeButton" class="theme-toggle" aria-label="Toggle dark mode"></button>
        <div class="social-links">
            <a href="https://linkedin.com/in/jojiao">LinkedIn</a>
            <a href="https://github.com/JoNeedsSleep">GitHub</a>
            <a>jojiao [at] uchicago [dot] edu</a>
            <a href="https://joneedssleep.substack.com/">Substack</a>
        </div>
    </div>
    <div class="right-column">
        <p>
            Hello! I'm Jo, undergrad at UChicago studying math and philosophy. 
        </p>
        <p>
            I want your feedback - and I want to make it easy for you. You can share your thoughts anonymously <a href="https://www.admonymous.co/joneedssleep">here</a>. I promise to 1) take what you say seriously, 2) not guess who you are, 3) assume the best of intentions.
        </p>
        <p>
            Some things in my head: AI Safety, Meditation, Kant, emergence, ZFC, Borges, religion, understanding deception/consciousness, my time at <a href="https://www.uwc.org/">UWC</a>, <a href="https://chicagoalignment.com/">organizing stuff</a>
        </p>
        <p>
            Now your turn: what's 1) the question you woke up to 2) your favourite art piece (<a href="https://www.judit-reigl.com/en/exhibitions/65/works/artworks-24892-judit-reigl-centre-de-dominance-1958/">here's mine</a>), and 3) a cool pattern you found in Conway's Game--
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