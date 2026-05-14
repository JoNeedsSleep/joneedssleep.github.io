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
            Hi there! I'm Jo. I believe we are at an inflection point in history, and I work on AI safety to help the transition go well.
        </p>
        <p>
            As of spring 2026, I am a MATS fellow mentored by Alex Turner and Alex Cloud as part of Team Shard. Outside of AI Safety research, I study mathematics and philosophy at UChicago, where I co-started and led the AI Safety Group at XLab.
        </p>
        <p>
            I am interested in the learning and generalization dynamics of machine learning models, especially as it pertains to (mis)alignment.
        </p>
        <details>
        <summary>Feedback</summary>
        <p>
        Direct feedback is very helpful, and we give it less than we should. A good friend once pointed out I made sweeping claims too easily. I was taken aback at first, but he was right that I generalized more than my evidence supported. His feedback pushed me to be more precise and grounded in my arguments. I want more of that.
        </p>
        <p>
        If you see something I could improve on, I'd love to hear it. You can also give feedback anonymously <a href="https://www.admonymous.co/joneedssleep">here</a>. And if you'd like candid feedback from me, let me know.
        </p>
        </details>
        <details>
        <summary>More</summary>
        <p>
            The thinkers, writers, and artists who have most shaped me are Immanuel Kant, Alice Munro, Jorge Luis Borges, and <a href="https://joneedssleep.github.io/judit-reigl/">Judit Reigl</a>. For me, they represent structure, restraint, imagination, and rhythm.
        </p>
        <p>
            Meditation is a central part of my life. I practice two lineages: Vipassana in the tradition of Goenka, and Taoism, from my time at the Five Immortals Temple.
        </p>
        <p>
            I have <a href="https://www.givingwhatwecan.org/pledge">pledged</a> 10% of my income to charity.
        </p>
        </details>
        <details>
        <summary>Recently</summary>
        <p>
            I recently took part in Temptemus Papam, a 100+ people 1492 papal conclave simulation run by Prof. Ada Palmer. I wrote many a letter, dressed up as a cardinal, and dreamed about 15th century sistine Realpolitik. It is such a joy to read Machiavelli and understand the families and city-states and the political currents that shaped his thoughts; or see a portrait by Raphael and be so moved not just by his mastery but by <a href="https://en.wikipedia.org/wiki/Portrait_of_Guidobaldo_da_Montefeltro">the subject</a>; plus Dante, Shakespeare, Michelangelo, and so many other spectacular talents. If you think of literature, art or music that you enjoy from the Italian Renaissance, I would be delighted to hear you talk about it!
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