// Piano Synthesizer & Keyboard
(function () {
  "use strict";

  var OCTAVE_NOTES = [
    { note: "C", type: "white" },
    { note: "C#", type: "black" },
    { note: "D", type: "white" },
    { note: "D#", type: "black" },
    { note: "E", type: "white" },
    { note: "F", type: "white" },
    { note: "F#", type: "black" },
    { note: "G", type: "white" },
    { note: "G#", type: "black" },
    { note: "A", type: "white" },
    { note: "A#", type: "black" },
    { note: "B", type: "white" },
  ];

  var KEY_MAP = {
    a: "C3", s: "D3", d: "E3", f: "F3", g: "G3", h: "A3", j: "B3",
    k: "C4", l: "D4", ";": "E4", "'": "F4",
    w: "C#3", e: "D#3", t: "F#3", y: "G#3", u: "A#3",
    o: "C#4", p: "D#4",
  };

  var BLACK_KEY_OFFSETS = { "C#": 0.65, "D#": 1.75, "F#": 3.65, "G#": 4.72, "A#": 5.8 };

  function buildKeys() {
    var keys = [];
    for (var oct = 2; oct <= 5; oct++) {
      for (var i = 0; i < OCTAVE_NOTES.length; i++) {
        var tmpl = OCTAVE_NOTES[i];
        keys.push({ id: tmpl.note + oct, note: tmpl.note, octave: oct, type: tmpl.type });
      }
    }
    return keys;
  }

  var ALL_KEYS = buildKeys();
  var WHITE_KEYS = ALL_KEYS.filter(function (k) { return k.type === "white"; });
  var BLACK_KEYS = ALL_KEYS.filter(function (k) { return k.type === "black"; });

  // ── Synth ──
  function Synth() {
    this.ctx = null;
    this.active = {};
    this.masterGain = null;
    this.compressor = null;
  }

  Synth.prototype.init = function () {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.value = -24;
    this.compressor.knee.value = 12;
    this.compressor.ratio.value = 4;
    this.compressor.connect(this.ctx.destination);
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.35;
    this.masterGain.connect(this.compressor);
  };

  Synth.prototype.noteToFreq = function (note, octave) {
    var s = { C: -9, "C#": -8, D: -7, "D#": -6, E: -5, F: -4, "F#": -3, G: -2, "G#": -1, A: 0, "A#": 1, B: 2 };
    return 440 * Math.pow(2, (s[note] + (octave - 4) * 12) / 12);
  };

  Synth.prototype.play = function (id, note, octave) {
    this.init();
    if (this.active[id]) return;
    var freq = this.noteToFreq(note, octave);
    var now = this.ctx.currentTime;
    var decayTime = Math.max(0.4, 2.5 - (octave - 2) * 0.4);

    var osc1 = this.ctx.createOscillator();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(freq, now);

    var osc2 = this.ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(freq * 2, now);
    var gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.25, now);
    osc2.connect(gain2);

    var osc3 = this.ctx.createOscillator();
    osc3.type = "sine";
    osc3.frequency.setValueAtTime(freq * 3, now);
    var gain3 = this.ctx.createGain();
    gain3.gain.setValueAtTime(0.1, now);
    osc3.connect(gain3);

    var osc4 = this.ctx.createOscillator();
    osc4.type = "sine";
    osc4.frequency.setValueAtTime(freq * 4, now);
    var gain4 = this.ctx.createGain();
    gain4.gain.setValueAtTime(0.04, now);
    osc4.connect(gain4);

    var env = this.ctx.createGain();
    env.gain.setValueAtTime(0, now);
    env.gain.linearRampToValueAtTime(0.6, now + 0.005);
    env.gain.exponentialRampToValueAtTime(0.35, now + 0.08);
    env.gain.exponentialRampToValueAtTime(0.001, now + decayTime);

    var filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(Math.min(freq * 8, 12000), now);
    filter.frequency.exponentialRampToValueAtTime(Math.max(freq * 2, 400), now + decayTime * 0.7);
    filter.Q.value = 0.7;

    osc1.connect(env);
    gain2.connect(env);
    gain3.connect(env);
    gain4.connect(env);
    env.connect(filter);
    filter.connect(this.masterGain);

    osc1.start(now); osc2.start(now); osc3.start(now); osc4.start(now);
    var stopTime = now + decayTime + 0.1;
    osc1.stop(stopTime); osc2.stop(stopTime); osc3.stop(stopTime); osc4.stop(stopTime);

    this.active[id] = { oscs: [osc1, osc2, osc3, osc4], env: env, filter: filter, stopTime: stopTime };
  };

  Synth.prototype.stop = function (id) {
    var n = this.active[id];
    if (!n) return;
    var now = this.ctx.currentTime;
    n.env.gain.cancelScheduledValues(now);
    n.env.gain.setValueAtTime(n.env.gain.value, now);
    n.env.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    n.oscs.forEach(function (o) { try { o.stop(now + 0.2); } catch (e) {} });
    delete this.active[id];
  };

  // ── State ──
  var synth = new Synth();
  var labelMode = false;
  var activeKeys = {};
  var visibleLabels = {};
  ALL_KEYS.forEach(function (k) { visibleLabels[k.id] = true; });

  // ── DOM refs (filled in init) ──
  var keyElements = {};
  var labelElements = {};

  // ── Helpers ──
  function getKeyById(id) {
    return ALL_KEYS.find(function (k) { return k.id === id; }) || null;
  }

  function updateKeyVisual(key) {
    var el = keyElements[key.id];
    var labelEl = labelElements[key.id];
    if (!el) return;
    var isActive = !!activeKeys[key.id];
    var hasLabel = !!visibleLabels[key.id];
    var inner = el.querySelector(".piano-key-inner");

    if (key.type === "white") {
      if (labelMode) {
        inner.style.background = hasLabel
          ? "linear-gradient(180deg, #f2eeff 0%, #e8e0f8 40%, #ddd5ef 100%)"
          : "linear-gradient(180deg, #fefefe 0%, #f5f3f8 40%, #edebf2 100%)";
        inner.style.boxShadow = "0 4px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.9) inset";
        inner.style.transform = "none";
      } else if (isActive) {
        inner.style.background = "linear-gradient(180deg, #d8d0e8 0%, #b8a8d8 100%)";
        inner.style.boxShadow = "0 2px 6px rgba(100,60,180,0.3) inset, 0 1px 2px rgba(0,0,0,0.1)";
        inner.style.transform = "scaleY(0.985)";
      } else {
        inner.style.background = "linear-gradient(180deg, #fefefe 0%, #f0edf5 40%, #e4dded 100%)";
        inner.style.boxShadow = "0 4px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.9) inset";
        inner.style.transform = "none";
      }
      if (labelEl) {
        labelEl.style.display = hasLabel ? "" : "none";
        labelEl.style.color = (isActive && !labelMode) ? "rgba(80,40,160,0.8)" : "rgba(100,80,140,0.55)";
      }
    } else {
      if (labelMode) {
        inner.style.background = hasLabel
          ? "linear-gradient(180deg, #352a4a 0%, #251c3a 70%, #1c1530 100%)"
          : "linear-gradient(180deg, #2a2235 0%, #1c1628 70%, #14101e 100%)";
        inner.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset";
        inner.style.transform = "none";
      } else if (isActive) {
        inner.style.background = "linear-gradient(180deg, #4a3570 0%, #3a2858 80%, #2d1f48 100%)";
        inner.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3) inset, 0 0 8px rgba(120,80,200,0.2)";
        inner.style.transform = "scaleY(0.97)";
      } else {
        inner.style.background = "linear-gradient(180deg, #2a2235 0%, #1c1628 70%, #14101e 100%)";
        inner.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset";
        inner.style.transform = "none";
      }
      if (labelEl) {
        labelEl.style.display = hasLabel ? "" : "none";
      }
    }
  }

  function pressKey(key) {
    if (labelMode) {
      visibleLabels[key.id] = !visibleLabels[key.id];
      updateKeyVisual(key);
      return;
    }
    synth.play(key.id, key.note, key.octave);
    activeKeys[key.id] = true;
    updateKeyVisual(key);
  }

  function releaseKey(key) {
    if (labelMode) return;
    synth.stop(key.id);
    delete activeKeys[key.id];
    updateKeyVisual(key);
  }

  // ── Build DOM ──
  function buildPiano() {
    var container = document.getElementById("piano-keys");
    var whiteKeyWidth = 100 / WHITE_KEYS.length;

    // White keys
    WHITE_KEYS.forEach(function (key, i) {
      var wrapper = document.createElement("div");
      wrapper.className = "piano-key-wrapper white-key-wrapper";
      wrapper.style.position = "absolute";
      wrapper.style.left = (i * whiteKeyWidth) + "%";
      wrapper.style.width = whiteKeyWidth + "%";
      wrapper.style.height = "100%";
      wrapper.style.padding = "0 0.8px";
      wrapper.style.boxSizing = "border-box";
      wrapper.style.cursor = "pointer";

      var inner = document.createElement("div");
      inner.className = "piano-key-inner";
      inner.style.width = "100%";
      inner.style.height = "100%";
      inner.style.borderRadius = "0 0 6px 6px";
      inner.style.background = "linear-gradient(180deg, #fefefe 0%, #f0edf5 40%, #e4dded 100%)";
      inner.style.boxShadow = "0 4px 8px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.9) inset";
      inner.style.transition = "all 0.06s ease";
      inner.style.transformOrigin = "top";
      inner.style.display = "flex";
      inner.style.alignItems = "flex-end";
      inner.style.justifyContent = "center";
      inner.style.paddingBottom = "10px";

      var label = document.createElement("span");
      label.className = "piano-label";
      label.textContent = key.note;
      label.style.fontSize = "clamp(11px, 1.4vw, 16px)";
      label.style.fontWeight = "700";
      label.style.color = "rgba(100,80,140,0.55)";
      label.style.letterSpacing = "0.02em";
      label.style.transition = "color 0.1s";

      inner.appendChild(label);
      wrapper.appendChild(inner);
      container.appendChild(wrapper);

      keyElements[key.id] = wrapper;
      labelElements[key.id] = label;

      wrapper.addEventListener("mousedown", function () { pressKey(key); });
      wrapper.addEventListener("mouseup", function () { releaseKey(key); });
      wrapper.addEventListener("mouseleave", function () { if (activeKeys[key.id]) releaseKey(key); });
      wrapper.addEventListener("touchstart", function (e) { e.preventDefault(); pressKey(key); }, { passive: false });
      wrapper.addEventListener("touchend", function (e) { e.preventDefault(); releaseKey(key); }, { passive: false });
    });

    // Black keys
    BLACK_KEYS.forEach(function (key) {
      var octOff = (key.octave - 2) * 7;
      var left = ((octOff + BLACK_KEY_OFFSETS[key.note]) / WHITE_KEYS.length) * 100;

      var wrapper = document.createElement("div");
      wrapper.className = "piano-key-wrapper black-key-wrapper";
      wrapper.style.position = "absolute";
      wrapper.style.left = left + "%";
      wrapper.style.width = (whiteKeyWidth * 0.58) + "%";
      wrapper.style.height = "62%";
      wrapper.style.zIndex = "2";
      wrapper.style.cursor = "pointer";

      var inner = document.createElement("div");
      inner.className = "piano-key-inner";
      inner.style.width = "100%";
      inner.style.height = "100%";
      inner.style.borderRadius = "0 0 5px 5px";
      inner.style.background = "linear-gradient(180deg, #2a2235 0%, #1c1628 70%, #14101e 100%)";
      inner.style.boxShadow = "0 4px 10px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset";
      inner.style.transition = "all 0.06s ease";
      inner.style.transformOrigin = "top";
      inner.style.display = "flex";
      inner.style.alignItems = "flex-end";
      inner.style.justifyContent = "center";
      inner.style.paddingBottom = "8px";

      var label = document.createElement("span");
      label.className = "piano-label";
      label.textContent = key.note.replace("#", "\u266F");
      label.style.fontSize = "clamp(9px, 1.2vw, 13px)";
      label.style.fontWeight = "700";
      label.style.color = "#ffffff";
      label.style.letterSpacing = "0.02em";
      label.style.transition = "color 0.1s";

      inner.appendChild(label);
      wrapper.appendChild(inner);
      container.appendChild(wrapper);

      keyElements[key.id] = wrapper;
      labelElements[key.id] = label;

      wrapper.addEventListener("mousedown", function (e) { e.stopPropagation(); pressKey(key); });
      wrapper.addEventListener("mouseup", function (e) { e.stopPropagation(); releaseKey(key); });
      wrapper.addEventListener("mouseleave", function () { if (activeKeys[key.id]) releaseKey(key); });
      wrapper.addEventListener("touchstart", function (e) { e.preventDefault(); e.stopPropagation(); pressKey(key); }, { passive: false });
      wrapper.addEventListener("touchend", function (e) { e.preventDefault(); e.stopPropagation(); releaseKey(key); }, { passive: false });
    });
  }

  // ── Controls ──
  function updateModeUI() {
    var modeBtn = document.getElementById("mode-btn");
    var banner = document.getElementById("label-banner");
    var pianoBox = document.getElementById("piano-box");

    if (labelMode) {
      modeBtn.innerHTML = "&#9998;  Label Mode ON";
      modeBtn.style.border = "1px solid rgba(160,140,200,0.4)";
      modeBtn.style.background = "linear-gradient(135deg, rgba(130,90,210,0.25), rgba(90,60,180,0.15))";
      modeBtn.style.color = "#c8b8f0";
      banner.style.display = "block";
      pianoBox.style.border = "1px solid rgba(130,90,210,0.2)";
      document.querySelectorAll(".piano-key-wrapper").forEach(function (el) {
        el.style.cursor = "crosshair";
      });
    } else {
      modeBtn.textContent = "\uD83C\uDFB9  Play Mode";
      modeBtn.style.border = "1px solid rgba(160,140,200,0.15)";
      modeBtn.style.background = "rgba(255,255,255,0.03)";
      modeBtn.style.color = "rgba(180,170,200,0.4)";
      banner.style.display = "none";
      pianoBox.style.border = "1px solid rgba(255,255,255,0.04)";
      document.querySelectorAll(".piano-key-wrapper").forEach(function (el) {
        el.style.cursor = "pointer";
      });
    }

    ALL_KEYS.forEach(function (k) { updateKeyVisual(k); });
  }

  // ── Init ──
  document.addEventListener("DOMContentLoaded", function () {
    buildPiano();

    document.getElementById("mode-btn").addEventListener("click", function () {
      labelMode = !labelMode;
      updateModeUI();
    });

    document.getElementById("show-all-btn").addEventListener("click", function () {
      ALL_KEYS.forEach(function (k) { visibleLabels[k.id] = true; });
      ALL_KEYS.forEach(updateKeyVisual);
    });

    document.getElementById("hide-all-btn").addEventListener("click", function () {
      ALL_KEYS.forEach(function (k) { visibleLabels[k.id] = false; });
      ALL_KEYS.forEach(updateKeyVisual);
    });

    // Keyboard events
    window.addEventListener("keydown", function (e) {
      if (e.repeat) return;
      var id = KEY_MAP[e.key.toLowerCase()];
      if (!id) return;
      var key = getKeyById(id);
      if (key) pressKey(key);
    });

    window.addEventListener("keyup", function (e) {
      var id = KEY_MAP[e.key.toLowerCase()];
      if (!id) return;
      var key = getKeyById(id);
      if (key) releaseKey(key);
    });
  });
})();
