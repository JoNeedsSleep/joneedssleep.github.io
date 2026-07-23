---
layout: default
title: Writing
permalink: /writing/
---

<style>
    .right-column writing-entry {
        display: block;
        margin-bottom: 2.25rem;
    }

    .right-column writing-entry:first-of-type {
        margin-top: 2rem;
    }

    .right-column writing-entry:last-of-type {
        margin-bottom: 0;
    }

    .right-column writing-entry p {
        margin: 0.2rem 0;
        line-height: 1.3;
    }

    .right-column writing-entry a,
    .right-column writing-entry a:hover,
    .right-column writing-entry a:visited,
    .right-column writing-entry a:visited:hover {
        text-decoration: none;
    }

    .right-column writing-entry a:hover,
    .right-column writing-entry a:visited:hover {
        color: var(--link-hover-color);
    }

    .right-column writing-entry .entry-tag {
        font-size: 0.82em;
        border: 1px solid rgba(136, 136, 136, 0.45);
        border-radius: 999px;
        padding: 0.05em 0.55em;
        white-space: nowrap;
    }

    @media screen and (max-width: 768px) {
        .container.writing-page .right-column {
            margin-top: 0.1rem;
        }

        /* Tighten the gap between the title block and the intro paragraph
           on mobile by removing the intro paragraph's default top margin. */
        .container.writing-page .right-column > p:first-child {
            margin-top: 0;
        }

        .right-column writing-entry:first-of-type {
            margin-top: 1.25rem;
        }
    }
</style>

<script>
    MathJax = {
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']]
        },
        chtml: {
            scale: 0.9
        }
    };
</script>
<script defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>

<div class="container writing-page">
    <div class="left-column">
        <h1 class="name">Writing</h1>
        <button type="button" id="darkModeButton" class="theme-toggle" aria-label="Toggle dark mode" aria-pressed="false">
            <span class="ub-stage">
                <span class="ub-world">
                    <span class="face f-bottom"></span>
                    <span class="face f-front"></span>
                    <span class="face f-back"></span>
                    <span class="face f-left"></span>
                    <span class="face f-right"></span>
                    <span class="arm-root">
                        <span class="arm-lift">
                            <span class="arm-riser">
                                <span class="rface rface-x"></span>
                                <span class="rface rface-x2"></span>
                                <span class="rface rface-y"></span>
                                <span class="rface rface-y2"></span>
                                <span class="rface rface-bottom"></span>
                                <span class="rface rface-top"></span>
                            </span>
                            <span class="arm-finger">
                                <span class="fface fface-top"></span>
                                <span class="fface fface-bottom"></span>
                                <span class="fface fface-front"></span>
                                <span class="fface fface-back"></span>
                                <span class="fface fface-cap-r"></span>
                                <span class="fface fface-cap-l"></span>
                            </span>
                        </span>
                    </span>
                    <span class="face lid-fixed"></span>
                    <span class="lid-hinge">
                        <span class="lid-panel">
                            <span class="face"></span>
                        </span>
                    </span>
                    <span class="switch-bezel"></span>
                    <span class="switch"></span>
                </span>
            </span>
        </button>
        <div class="social-links">
            <a>jojiao [at] uchicago [dot] edu</a>
            <a href="https://jojiao.substack.com">Substack: Jousting at the Junction</a>
        </div>
    </div>
    <div class="right-column">
        <p>I enjoy philosophy and history, doing math, and tinkering with <a href="#" id="uselessMachineLink">Useless Machines</a>. My inbox is always open for feedback (<a href="https://www.admonymous.co/joneedssleep">here</a>) and discussion.</p>
        <writing-entry>
            <p><strong><a href="/asi-wishlist/">An entry on my ASI wishlist</a></strong></p>
            <p><em>The cryptic poem I want to write</em></p>
            <p><span style="color: #888;">July 2026, Berkeley &middot; 2 min read &middot; <span class="entry-tag">#Useless Machine</span></span></p>
        </writing-entry>
        <writing-entry>
            <p><strong><a href="/scav-atm/">In Praise of Serious Play</a></strong></p>
            <p><em>An Automated Tarot Machine for the UChicago SCAV Hunt</em></p>
            <p><span style="color: #888;">May 2026, Hyde Park &middot; 10 min read &middot; <span class="entry-tag">#Useless Machine</span></span></p>
        </writing-entry>
        <writing-entry>
            <p><strong><a href="/quantifying-elicitability/">Notes on Quantifying Elicitibility</a></strong></p>
            <p><em>On Elizabeth Donoway's Excess Description Length</em></p>
            <p><span style="color: #888;">February 2026, Berkeley &middot; 3 min read &middot; <span class="entry-tag">#Research</span> <span class="entry-tag">#AI Safety</span> <span class="entry-tag">#Notes</span></span></p>
        </writing-entry>
        <writing-entry>
            <p><strong><a href="/sqrt2-the-hard-way/">$\sqrt{2}\otimes\sqrt{2} = 2$, the hard way</a></strong></p>
            <p><span style="color: #888;">November 2023, Hyde Park &middot; $\sqrt{222}$ min read &middot; <span class="entry-tag">#Mathematics</span> <span class="entry-tag">#Useless Machine</span> <span class="entry-tag">#Notes</span></span></p>
        </writing-entry>
    </div>
</div>

<script>
    (function() {
        var link = document.getElementById('uselessMachineLink');
        var btn = document.getElementById('darkModeButton');
        if (!link || !btn) return;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            btn.classList.remove('is-playing');
            void btn.offsetWidth;
            btn.classList.add('is-playing');
        });
    })();
</script>
