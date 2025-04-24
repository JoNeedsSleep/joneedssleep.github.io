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
            Hello! I'm Jo, sophomore at UChicago studying math and philosophy. 
        </p>
        <p>
            I want your feedback - and I want to make it easy for you. You can share your thoughts anonymously <a href="https://www.admonymous.co/joneedssleep">here</a>. I promise to 1) take what you say seriously, 2) not guess who you are, 3) assume the best of intentions.
        </p>
        <p>
            Talk to me about: AI Safety, Meditation, Kant, emergence, Borges, my time at <a href="https://www.uwc.org/">UWC</a>, religion, understanding deception/consciousness, <a href="https://chicagoalignment.com/">organizing stuff</a>, your favourite painting (<a href="https://www.judit-reigl.com/en/exhibitions/65/works/artworks-24892-judit-reigl-centre-de-dominance-1958/">here's mine</a>), and cool patterns you find in Conway's Game--
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

<script src="{{ site.baseurl }}/assets/js/game-of-life.js"></script> 