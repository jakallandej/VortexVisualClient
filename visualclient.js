(() => {
  // ============================================================
  // VORTEX VISUAL CLIENT
  // BETA v1.1
  // Visual / client-side effects only
  // ============================================================

  if (window.__VORTEX_VISUAL_CLIENT__) {
    window.__VORTEX_VISUAL_CLIENT__.destroy();
  }

  const VC = {};
  window.__VORTEX_VISUAL_CLIENT__ = VC;

  // CHANGE THIS IF YOUR REPO URL IS DIFFERENT
  const LATEST_URL =
    "https://github.com/jakallandei/VortexVisualClient";

  const original = {
    htmlFilter: document.documentElement.style.filter,
    bodyZoom: document.body.style.zoom,
    bodyTransform: document.body.style.transform,
    bodyTransition: document.body.style.transition
  };

  // ============================================================
  // ROOT
  // ============================================================

  const root = document.createElement("div");
  root.id = "__vortex_visual_client_root";
  document.documentElement.appendChild(root);

  const shadow = root.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>

      * {
        box-sizing: border-box;
        font-family:
          Inter,
          ui-sans-serif,
          system-ui,
          -apple-system,
          BlinkMacSystemFont,
          "Segoe UI",
          Arial,
          sans-serif;
      }

      :host {
        --accent: 130, 88, 255;
      }

      #menu {
        position: fixed;

        top: 90px;
        left: 60px;

        width: 370px;

        background:
          linear-gradient(
            180deg,
            rgba(18,18,25,.98),
            rgba(11,11,16,.98)
          );

        color: white;

        border:
          1px solid rgba(255,255,255,.12);

        border-radius: 18px;

        overflow: hidden;

        z-index: 2147483647;

        box-shadow:
          0 25px 80px rgba(0,0,0,.65),
          0 0 40px rgba(var(--accent), .12);

        backdrop-filter: blur(24px);

        user-select: none;

        animation:
          menuIn .20s ease-out;
      }

      @keyframes menuIn {

        from {
          opacity: 0;
          transform:
            scale(.96)
            translateY(8px);
        }

        to {
          opacity: 1;
          transform:
            scale(1)
            translateY(0);
        }

      }

      #header {
        padding: 15px 16px;

        cursor: move;

        display: flex;
        align-items: center;
        justify-content: space-between;

        background:
          linear-gradient(
            120deg,
            rgba(var(--accent), .92),
            rgba(40,150,255,.88)
          );
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .logo {
        width: 34px;
        height: 34px;

        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: center;

        background:
          rgba(0,0,0,.25);

        font-size: 18px;

        box-shadow:
          inset 0 0 12px
          rgba(255,255,255,.08);
      }

      .title {
        font-size: 15px;
        font-weight: 850;
        letter-spacing: .3px;
      }

      .version {
        margin-top: 2px;

        font-size: 10px;

        opacity: .72;

        letter-spacing: .7px;
      }

      #close {
        width: 29px;
        height: 29px;

        border: 0;

        border-radius: 8px;

        background:
          rgba(0,0,0,.22);

        color: white;

        cursor: pointer;

        font-size: 14px;

        transition: .15s;
      }

      #close:hover {
        background:
          rgba(255,65,75,.8);

        transform: scale(1.05);
      }

      #latest {
        display: block;

        margin:
          10px 11px 4px;

        padding: 9px 10px;

        border-radius: 10px;

        text-align: center;

        text-decoration: none;

        color: white;

        font-size: 11px;
        font-weight: 800;

        letter-spacing: .7px;

        background:
          linear-gradient(
            90deg,
            rgba(var(--accent), .18),
            rgba(40,160,255,.14)
          );

        border:
          1px solid
          rgba(var(--accent), .28);

        cursor: pointer;

        transition: .15s;
      }

      #latest:hover {
        background:
          rgba(var(--accent), .28);

        border-color:
          rgba(var(--accent), .6);

        transform: translateY(-1px);
      }

      .tabs {
        display: flex;

        gap: 5px;

        padding: 9px;

        border-bottom:
          1px solid
          rgba(255,255,255,.05);
      }

      .tab {
        flex: 1;

        border: 0;

        padding: 8px 5px;

        border-radius: 9px;

        cursor: pointer;

        color:
          rgba(255,255,255,.55);

        background:
          rgba(255,255,255,.045);

        font-size: 11px;
        font-weight: 650;

        transition: .15s;
      }

      .tab:hover {
        color: white;

        background:
          rgba(255,255,255,.09);
      }

      .tab.active {
        color: white;

        background:
          rgba(var(--accent), .27);

        box-shadow:
          inset 0 0 0 1px
          rgba(var(--accent), .22);
      }

      .page {
        padding: 12px;

        max-height: 460px;

        overflow-y: auto;
      }

      .page.hidden {
        display: none;
      }

      .section-title {
        margin:
          8px 4px 7px;

        color:
          rgba(255,255,255,.38);

        font-size: 10px;

        font-weight: 750;

        letter-spacing: 1.2px;

        text-transform: uppercase;
      }

      .row {
        min-height: 43px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 10px;

        padding:
          9px 11px;

        margin-bottom: 7px;

        border-radius: 11px;

        background:
          rgba(255,255,255,.047);

        border:
          1px solid
          rgba(255,255,255,.035);

        transition: .15s;
      }

      .row:hover {
        background:
          rgba(255,255,255,.065);
      }

      .row span {
        font-size: 12px;
      }

      .label {
        display: flex;
        align-items: center;
        gap: 7px;
      }

      input[type="text"],
      input[type="number"] {

        width: 125px;

        padding: 6px 8px;

        outline: none;

        color: white;

        background:
          rgba(0,0,0,.32);

        border:
          1px solid
          rgba(255,255,255,.10);

        border-radius: 8px;
      }

      input[type="text"]:focus,
      input[type="number"]:focus {

        border-color:
          rgba(var(--accent), .65);

      }

      input[type="range"] {
        width: 125px;

        accent-color:
          rgb(var(--accent));
      }

      input[type="checkbox"] {

        width: 17px;
        height: 17px;

        accent-color:
          rgb(var(--accent));

        cursor: pointer;
      }

      input[type="color"] {

        width: 38px;
        height: 26px;

        padding: 0;

        border: 0;

        border-radius: 6px;

        background: transparent;

        cursor: pointer;
      }

      button.action {

        width: 100%;

        padding: 10px;

        margin-bottom: 7px;

        border: 0;

        border-radius: 10px;

        cursor: pointer;

        color: white;

        background:
          rgba(var(--accent), .20);

        border:
          1px solid
          rgba(var(--accent), .15);

        font-size: 12px;

        font-weight: 650;

        transition: .15s;
      }

      button.action:hover {

        background:
          rgba(var(--accent), .34);

        transform:
          translateY(-1px);
      }

      .beta-row {

        position: relative;

        overflow: hidden;

        opacity: .37;

        filter:
          grayscale(1);

        pointer-events: none;

        background:
          rgba(0,0,0,.55);
      }

      .beta-row::after {

        content: "COMING SOON";

        position: absolute;

        right: 9px;

        top: 50%;

        transform:
          translateY(-50%);

        padding: 4px 7px;

        border-radius: 6px;

        font-size: 8px;

        font-weight: 900;

        letter-spacing: .8px;

        color:
          rgba(255,255,255,.7);

        background:
          rgba(0,0,0,.85);

        border:
          1px solid
          rgba(255,255,255,.12);
      }

      .beta-info {

        padding: 10px;

        margin-bottom: 10px;

        border-radius: 11px;

        background:
          rgba(255,180,40,.06);

        border:
          1px solid
          rgba(255,180,40,.14);

        color:
          rgba(255,255,255,.52);

        font-size: 10px;

        line-height: 1.45;
      }

      #footer {

        padding:
          10px;

        text-align: center;

        border-top:
          1px solid
          rgba(255,255,255,.05);

        font-size: 9px;

        letter-spacing: .4px;

        color:
          rgba(255,255,255,.3);
      }

      .key {
        padding:
          2px 5px;

        margin:
          0 2px;

        border-radius: 4px;

        color:
          rgba(255,255,255,.75);

        background:
          rgba(255,255,255,.08);

        border:
          1px solid
          rgba(255,255,255,.08);
      }

      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-track {
        background: transparent;
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 20px;

        background:
          rgba(255,255,255,.17);
      }

    </style>


    <div id="menu">

      <div id="header">

        <div class="brand">

          <div class="logo">
            ⚡
          </div>

          <div>

            <div class="title">
              VORTEX VISUAL CLIENT
            </div>

            <div class="version">
              BETA v1.1 • VISUAL ONLY
            </div>

          </div>

        </div>

        <button id="close">
          ✕
        </button>

      </div>


      <a
        id="latest"
        href="#"
      >
        ↗ GET LATEST VERSION!
      </a>


      <div class="tabs">

        <button
          class="tab active"
          data-page="visuals"
        >
          VISUALS
        </button>

        <button
          class="tab"
          data-page="hud"
        >
          HUD
        </button>

        <button
          class="tab"
          data-page="fun"
        >
          FUN
        </button>

        <button
          class="tab"
          data-page="beta"
        >
          BETA
        </button>

      </div>


      <!-- ========================= -->
      <!-- VISUALS -->
      <!-- ========================= -->

      <div
        class="page"
        id="visuals"
      >

        <div class="section-title">
          Page effects
        </div>


        <div class="row">

          <span class="label">
            🌈 Rainbow
          </span>

          <input
            id="rainbow"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            🌑 Darker Page
          </span>

          <input
            id="dark"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            ⚫ Grayscale
          </span>

          <input
            id="gray"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            🔄 Invert
          </span>

          <input
            id="invert"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            🌫 Blur
          </span>

          <input
            id="blur"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            🎯 Crosshair
          </span>

          <input
            id="crosshair"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            📺 Scanlines
          </span>

          <input
            id="scanlines"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            🌒 Vignette
          </span>

          <input
            id="vignette"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span class="label">
            🔎 Page Zoom
          </span>

          <input
            id="zoom"
            type="range"
            min="80"
            max="130"
            value="100"
          >

        </div>


        <div class="section-title">
          Client
        </div>


        <div class="row">

          <span class="label">
            🎨 Accent
          </span>

          <input
            id="accent"
            type="color"
            value="#8258ff"
          >

        </div>


        <button
          id="resetVisuals"
          class="action"
        >
          ♻ RESET VISUALS
        </button>

      </div>


      <!-- ========================= -->
      <!-- HUD -->
      <!-- ========================= -->

      <div
        class="page hidden"
        id="hud"
      >

        <div class="section-title">
          Overlay
        </div>


        <div class="row">

          <span>
            ⚡ Show HUD
          </span>

          <input
            id="showHud"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span>
            👤 Name
          </span>

          <input
            id="playerName"
            type="text"
            value="Player"
          >

        </div>


        <div class="row">

          <span>
            ⭐ Fake Score
          </span>

          <input
            id="fakeScore"
            type="number"
            value="999999"
          >

        </div>


        <div class="row">

          <span>
            🔥 Fake Streak
          </span>

          <input
            id="fakeStreak"
            type="number"
            value="100"
          >

        </div>


        <div class="row">

          <span>
            📊 FPS
          </span>

          <input
            id="fpsToggle"
            type="checkbox"
            checked
          >

        </div>


        <div class="row">

          <span>
            🕒 Clock
          </span>

          <input
            id="clockToggle"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span>
            ⏱ Session Time
          </span>

          <input
            id="sessionToggle"
            type="checkbox"
          >

        </div>


        <div class="row">

          <span>
            ⚡ Vortex Watermark
          </span>

          <input
            id="watermarkToggle"
            type="checkbox"
          >

        </div>

      </div>


      <!-- ========================= -->
      <!-- FUN -->
      <!-- ========================= -->

      <div
        class="page hidden"
        id="fun"
      >

        <div class="section-title">
          Effects
        </div>


        <button
          id="confetti"
          class="action"
        >
          🎉 CONFETTI
        </button>


        <button
          id="shake"
          class="action"
        >
          💥 SCREEN SHAKE
        </button>


        <button
          id="spin"
          class="action"
        >
          🌀 SPIN PAGE
        </button>


        <button
          id="flash"
          class="action"
        >
          ⚡ SCREEN FLASH
        </button>


        <button
          id="party"
          class="action"
        >
          🌈 PARTY MODE
        </button>


        <button
          id="resetEverything"
          class="action"
        >
          ♻ RESET EVERYTHING
        </button>

      </div>


      <!-- ========================= -->
      <!-- BETA -->
      <!-- ========================= -->

      <div
        class="page hidden"
        id="beta"
      >

        <div class="beta-info">

          ⚠ These features are still being developed.

          <br>

          They are disabled in this build.

        </div>


        <div class="section-title">
          Experimental
        </div>


        <div class="row beta-row">

          <span>
            🪽 Fake Fly Visual
          </span>

        </div>


        <div class="row beta-row">

          <span>
            👤 Player Clone
          </span>

        </div>


        <div class="row beta-row">

          <span>
            🎮 Custom Avatar Overlay
          </span>

        </div>


        <div class="row beta-row">

          <span>
            ✨ Player Trail
          </span>

        </div>


        <div class="row beta-row">

          <span>
            🖼 Custom Background
          </span>

        </div>


        <div class="row beta-row">

          <span>
            🎭 Theme Presets
          </span>

        </div>


        <div class="row beta-row">

          <span>
            🔊 Client Sounds
          </span>

        </div>


        <div class="row beta-row">

          <span>
            💾 Saved Configs
          </span>

        </div>

      </div>


      <div id="footer">

        Press

        <span class="key">
          RIGHT SHIFT
        </span>

        to open / close

      </div>

    </div>
  `;


  const $ = id =>
    shadow.getElementById(id);


  const menu =
    $("menu");


  // ============================================================
  // MENU STARTS HIDDEN
  // ============================================================

  let hidden = true;

  menu.style.display =
    "none";


  // ============================================================
  // LATEST VERSION LINK
  // ============================================================

  $("latest").onclick = e => {

    e.preventDefault();

    window.open(
      LATEST_URL,
      "_blank",
      "noopener,noreferrer"
    );

  };


  // ============================================================
  // TABS
  // ============================================================

  shadow
    .querySelectorAll(".tab")
    .forEach(tab => {

      tab.onclick = () => {

        shadow
          .querySelectorAll(".tab")
          .forEach(t =>
            t.classList.remove("active")
          );


        shadow
          .querySelectorAll(".page")
          .forEach(page =>
            page.classList.add("hidden")
          );


        tab.classList.add(
          "active"
        );


        $(tab.dataset.page)
          .classList.remove(
            "hidden"
          );

      };

    });


  // ============================================================
  // DRAGGING
  // ============================================================

  const header =
    $("header");


  let dragging = false;

  let dragX = 0;
  let dragY = 0;


  function mouseDown(e) {

    if (
      e.target.id === "close"
    ) return;


    dragging = true;


    dragX =
      e.clientX -
      menu.offsetLeft;


    dragY =
      e.clientY -
      menu.offsetTop;

  }


  function mouseMove(e) {

    if (!dragging)
      return;


    const maxX =
      window.innerWidth -
      menu.offsetWidth;


    const maxY =
      window.innerHeight -
      50;


    const x =
      Math.max(
        0,
        Math.min(
          maxX,
          e.clientX - dragX
        )
      );


    const y =
      Math.max(
        0,
        Math.min(
          maxY,
          e.clientY - dragY
        )
      );


    menu.style.left =
      x + "px";


    menu.style.top =
      y + "px";

  }


  function mouseUp() {

    dragging = false;

  }


  header.addEventListener(
    "mousedown",
    mouseDown
  );


  document.addEventListener(
    "mousemove",
    mouseMove
  );


  document.addEventListener(
    "mouseup",
    mouseUp
  );


  // ============================================================
  // FILTER SYSTEM
  // ============================================================

  const filters = {

    dark: false,
    gray: false,
    invert: false,
    blur: false,
    rainbow: false

  };


  let hue = 0;


  function buildFilter() {

    let value = "";


    if (filters.rainbow) {

      value +=
        ` hue-rotate(${hue}deg)`;

    }


    if (filters.dark) {

      value +=
        " brightness(.65)";

    }


    if (filters.gray) {

      value +=
        " grayscale(1)";

    }


    if (filters.invert) {

      value +=
        " invert(1)";

    }


    if (filters.blur) {

      value +=
        " blur(3px)";

    }


    document.documentElement
      .style.filter =
      value.trim();

  }


  let rainbowFrame;


  function rainbowLoop() {

    hue =
      (hue + 1.6) % 360;


    buildFilter();


    rainbowFrame =
      requestAnimationFrame(
        rainbowLoop
      );

  }


  $("rainbow").onchange =
    e => {

      filters.rainbow =
        e.target.checked;


      cancelAnimationFrame(
        rainbowFrame
      );


      if (
        filters.rainbow
      ) {

        rainbowLoop();

      } else {

        hue = 0;

        buildFilter();

      }

    };


  $("dark").onchange =
    e => {

      filters.dark =
        e.target.checked;

      buildFilter();

    };


  $("gray").onchange =
    e => {

      filters.gray =
        e.target.checked;

      buildFilter();

    };


  $("invert").onchange =
    e => {

      filters.invert =
        e.target.checked;

      buildFilter();

    };


  $("blur").onchange =
    e => {

      filters.blur =
        e.target.checked;

      buildFilter();

    };


  // ============================================================
  // ZOOM
  // ============================================================

  $("zoom").oninput =
    e => {

      document.body.style.zoom =
        `${e.target.value}%`;

    };


  // ============================================================
  // ACCENT
  // ============================================================

  function hexToRGB(hex) {

    hex =
      hex.replace("#", "");


    return {

      r:
        parseInt(
          hex.substring(0,2),
          16
        ),

      g:
        parseInt(
          hex.substring(2,4),
          16
        ),

      b:
        parseInt(
          hex.substring(4,6),
          16
        )

    };

  }


  $("accent").oninput =
    e => {

      const rgb =
        hexToRGB(
          e.target.value
        );


      root.style.setProperty(
        "--accent",
        `${rgb.r}, ${rgb.g}, ${rgb.b}`
      );

    };


  // ============================================================
  // CROSSHAIR
  // ============================================================

  const crosshair =
    document.createElement(
      "div"
    );


  Object.assign(
    crosshair.style,
    {

      position:
        "fixed",

      left:
        "50%",

      top:
        "50%",

      width:
        "20px",

      height:
        "20px",

      transform:
        "translate(-50%,-50%)",

      pointerEvents:
        "none",

      zIndex:
        "2147483640",

      display:
        "none"

    }
  );


  crosshair.innerHTML = `

    <div style="
      position:absolute;
      width:2px;
      height:20px;
      left:9px;
      top:0;
      background:white;
      box-shadow:0 0 5px black;
    "></div>

    <div style="
      position:absolute;
      height:2px;
      width:20px;
      top:9px;
      left:0;
      background:white;
      box-shadow:0 0 5px black;
    "></div>

  `;


  document.documentElement
    .appendChild(
      crosshair
    );


  $("crosshair").onchange =
    e => {

      crosshair.style.display =
        e.target.checked
          ? "block"
          : "none";

    };


  // ============================================================
  // SCANLINES
  // ============================================================

  const scanlines =
    document.createElement(
      "div"
    );


  Object.assign(
    scanlines.style,
    {

      position:
        "fixed",

      inset:
        "0",

      pointerEvents:
        "none",

      zIndex:
        "2147483639",

      display:
        "none",

      backgroundImage:
        "repeating-linear-gradient(to bottom, rgba(255,255,255,.03) 0px, rgba(255,255,255,.03) 1px, transparent 1px, transparent 4px)"

    }
  );


  document.documentElement
    .appendChild(
      scanlines
    );


  $("scanlines").onchange =
    e => {

      scanlines.style.display =
        e.target.checked
          ? "block"
          : "none";

    };


  // ============================================================
  // VIGNETTE
  // ============================================================

  const vignette =
    document.createElement(
      "div"
    );


  Object.assign(
    vignette.style,
    {

      position:
        "fixed",

      inset:
        "0",

      pointerEvents:
        "none",

      zIndex:
        "2147483638",

      display:
        "none",

      background:
        "radial-gradient(circle, transparent 48%, rgba(0,0,0,.72) 120%)"

    }
  );


  document.documentElement
    .appendChild(
      vignette
    );


  $("vignette").onchange =
    e => {

      vignette.style.display =
        e.target.checked
          ? "block"
          : "none";

    };


  // ============================================================
  // HUD
  // ============================================================

  const hud =
    document.createElement(
      "div"
    );


  Object.assign(
    hud.style,
    {

      position:
        "fixed",

      top:
        "18px",

      right:
        "18px",

      minWidth:
        "160px",

      padding:
        "13px 15px",

      borderRadius:
        "12px",

      background:
        "rgba(12,12,18,.88)",

      color:
        "white",

      border:
        "1px solid rgba(255,255,255,.1)",

      fontFamily:
        "Arial, sans-serif",

      fontSize:
        "12px",

      lineHeight:
        "1.65",

      boxShadow:
        "0 12px 40px rgba(0,0,0,.45)",

      backdropFilter:
        "blur(15px)",

      pointerEvents:
        "none",

      display:
        "none",

      zIndex:
        "2147483642"

    }
  );


  document.documentElement
    .appendChild(
      hud
    );


  const watermark =
    document.createElement(
      "div"
    );


  Object.assign(
    watermark.style,
    {

      position:
        "fixed",

      left:
        "15px",

      top:
        "15px",

      padding:
        "7px 10px",

      borderRadius:
        "8px",

      background:
        "rgba(10,10,15,.78)",

      border:
        "1px solid rgba(255,255,255,.1)",

      color:
        "white",

      font:
        "700 11px Arial",

      letterSpacing:
        ".4px",

      pointerEvents:
        "none",

      display:
        "none",

      zIndex:
        "2147483641"

    }
  );


  watermark.textContent =
    "⚡ VORTEX BETA v1.1";


  document.documentElement
    .appendChild(
      watermark
    );


  const sessionStart =
    Date.now();


  let fps = 0;


  function formatSession() {

    const seconds =
      Math.floor(
        (
          Date.now() -
          sessionStart
        ) / 1000
      );


    const minutes =
      Math.floor(
        seconds / 60
      );


    const remaining =
      seconds % 60;


    return (
      `${minutes}:` +
      String(
        remaining
      ).padStart(
        2,
        "0"
      )
    );

  }


  function updateHud() {

    const rows = [];


    rows.push(
      `<b>⚡ VORTEX HUD</b>`
    );


    rows.push(
      `👤 ${escapeHTML(
        $("playerName").value
      )}`
    );


    rows.push(
      `⭐ Score: <b>${escapeHTML(
        $("fakeScore").value
      )}</b>`
    );


    rows.push(
      `🔥 Streak: <b>${escapeHTML(
        $("fakeStreak").value
      )}</b>`
    );


    if (
      $("fpsToggle").checked
    ) {

      rows.push(
        `📊 FPS: <b>${fps}</b>`
      );

    }


    if (
      $("clockToggle").checked
    ) {

      rows.push(
        `🕒 ${new Date()
          .toLocaleTimeString()}`
      );

    }


    if (
      $("sessionToggle").checked
    ) {

      rows.push(
        `⏱ ${formatSession()}`
      );

    }


    hud.innerHTML =
      rows.join("<br>");

  }


  function escapeHTML(value) {

    return String(value)

      .replaceAll(
        "&",
        "&amp;"
      )

      .replaceAll(
        "<",
        "&lt;"
      )

      .replaceAll(
        ">",
        "&gt;"
      )

      .replaceAll(
        '"',
        "&quot;"
      )

      .replaceAll(
        "'",
        "&#039;"
      );

  }


  $("showHud").onchange =
    e => {

      hud.style.display =
        e.target.checked
          ? "block"
          : "none";


      updateHud();

    };


  $("watermarkToggle").onchange =
    e => {

      watermark.style.display =
        e.target.checked
          ? "block"
          : "none";

    };


  [
    "playerName",
    "fakeScore",
    "fakeStreak",
    "fpsToggle",
    "clockToggle",
    "sessionToggle"

  ].forEach(
    id => {

      $(id)
        .addEventListener(
          "input",
          updateHud
        );


      $(id)
        .addEventListener(
          "change",
          updateHud
        );

    }
  );


  // ============================================================
  // FPS LOOP
  // ============================================================

  let frames =
    0;


  let fpsTime =
    performance.now();


  let fpsRAF;


  function fpsLoop() {

    frames++;


    const now =
      performance.now();


    if (
      now - fpsTime >= 1000
    ) {

      fps =
        frames;


      frames =
        0;


      fpsTime =
        now;


      updateHud();

    }


    fpsRAF =
      requestAnimationFrame(
        fpsLoop
      );

  }


  fpsLoop();


  const hudTimer =
    setInterval(
      updateHud,
      1000
    );


  // ============================================================
  // CONFETTI
  // ============================================================

  $("confetti").onclick =
    () => {

      for (
        let i = 0;
        i < 100;
        i++
      ) {

        const piece =
          document.createElement(
            "div"
          );


        Object.assign(
          piece.style,
          {

            position:
              "fixed",

            width:
              `${5 + Math.random() * 6}px`,

            height:
              `${7 + Math.random() * 9}px`,

            left:
              `${Math.random() * innerWidth}px`,

            top:
              "-25px",

            background:
              `hsl(${Math.random() * 360},100%,60%)`,

            transform:
              `rotate(${Math.random() * 360}deg)`,

            pointerEvents:
              "none",

            zIndex:
              "2147483637",

            transition:
              `top ${2 + Math.random() * 2.5}s linear, transform ${2 + Math.random() * 2}s linear`

          }
        );


        document.documentElement
          .appendChild(
            piece
          );


        requestAnimationFrame(
          () => {

            piece.style.top =
              `${innerHeight + 40}px`;


            piece.style.transform =
              `rotate(${700 + Math.random() * 900}deg)`;

          }
        );


        setTimeout(
          () =>
            piece.remove(),
          5000
        );

      }

    };


  // ============================================================
  // SHAKE
  // ============================================================

  $("shake").onclick =
    () => {

      let count = 0;


      const timer =
        setInterval(
          () => {

            document.body
              .style.transform =
              `translate(${Math.random() * 14 - 7}px, ${Math.random() * 14 - 7}px)`;


            count++;


            if (
              count >= 22
            ) {

              clearInterval(
                timer
              );


              document.body
                .style.transform =
                original.bodyTransform;

            }

          },
          30
        );

    };


  // ============================================================
  // SPIN
  // ============================================================

  $("spin").onclick =
    () => {

      document.body
        .style.transition =
        "transform .85s ease";


      document.body
        .style.transform =
        "rotate(360deg) scale(.92)";


      setTimeout(
        () => {

          document.body
            .style.transition =
            original.bodyTransition;


          document.body
            .style.transform =
            original.bodyTransform;

        },
        900
      );

    };


  // ============================================================
  // FLASH
  // ============================================================

  $("flash").onclick =
    () => {

      const flash =
        document.createElement(
          "div"
        );


      Object.assign(
        flash.style,
        {

          position:
            "fixed",

          inset:
            "0",

          background:
            "white",

          opacity:
            "1",

          pointerEvents:
            "none",

          zIndex:
            "2147483636",

          transition:
            "opacity .4s"

        }
      );


      document.documentElement
        .appendChild(
          flash
        );


      requestAnimationFrame(
        () => {

          flash.style.opacity =
            "0";

        }
      );


      setTimeout(
        () =>
          flash.remove(),
        450
      );

    };


  // ============================================================
  // PARTY MODE
  // ============================================================

  $("party").onclick =
    () => {

      $("rainbow").checked =
        true;


      filters.rainbow =
        true;


      cancelAnimationFrame(
        rainbowFrame
      );


      rainbowLoop();


      $("confetti").click();

    };


  // ============================================================
  // RESET
  // ============================================================

  function resetVisuals() {

    cancelAnimationFrame(
      rainbowFrame
    );


    filters.dark =
      false;


    filters.gray =
      false;


    filters.invert =
      false;


    filters.blur =
      false;


    filters.rainbow =
      false;


    hue = 0;


    document.documentElement
      .style.filter =
      original.htmlFilter;


    document.body
      .style.zoom =
      original.bodyZoom;


    document.body
      .style.transform =
      original.bodyTransform;


    document.body
      .style.transition =
      original.bodyTransition;


    $("rainbow").checked =
      false;


    $("dark").checked =
      false;


    $("gray").checked =
      false;


    $("invert").checked =
      false;


    $("blur").checked =
      false;


    $("crosshair").checked =
      false;


    $("scanlines").checked =
      false;


    $("vignette").checked =
      false;


    $("zoom").value =
      100;


    crosshair.style.display =
      "none";


    scanlines.style.display =
      "none";


    vignette.style.display =
      "none";

  }


  $("resetVisuals").onclick =
    resetVisuals;


  $("resetEverything").onclick =
    () => {

      resetVisuals();


      $("showHud").checked =
        false;


      $("watermarkToggle").checked =
        false;


      hud.style.display =
        "none";


      watermark.style.display =
        "none";

    };


  // ============================================================
  // RIGHT SHIFT
  // ============================================================

  function keyHandler(e) {

    if (
      e.code !==
      "ShiftRight"
    ) {

      return;

    }


    if (
      e.repeat
    ) {

      return;

    }


    hidden =
      !hidden;


    menu.style.display =
      hidden
        ? "none"
        : "block";

  }


  document.addEventListener(
    "keydown",
    keyHandler
  );


  // ============================================================
  // STARTUP NOTIFICATION
  // ============================================================

  const notification =
    document.createElement(
      "div"
    );


  Object.assign(
    notification.style,
    {

      position:
        "fixed",

      right:
        "22px",

      bottom:
        "22px",

      width:
        "285px",

      padding:
        "15px 17px",

      borderRadius:
        "13px",

      color:
        "white",

      background:
        "rgba(13,13,19,.96)",

      border:
        "1px solid rgba(140,100,255,.35)",

      boxShadow:
        "0 18px 50px rgba(0,0,0,.55)",

      backdropFilter:
        "blur(18px)",

      zIndex:
        "2147483647",

      fontFamily:
        "Arial, sans-serif",

      fontSize:
        "12px",

      lineHeight:
        "1.5",

      transition:
        "opacity .4s ease, transform .4s ease"

    }
  );


  notification.innerHTML = `

    <div style="
      font-weight:800;
      margin-bottom:4px;
      font-size:13px;
    ">
      ⚡ VORTEX VISUAL CLIENT
    </div>

    <div style="
      color:rgba(255,255,255,.65);
    ">
      BETA v1.1 successfully loaded
    </div>

    <div style="
      margin-top:8px;
    ">
      Press
      <b style="color:#b9a3ff;">
        RIGHT SHIFT
      </b>
      to open the client.
    </div>

  `;


  document.documentElement
    .appendChild(
      notification
    );


  setTimeout(
    () => {

      notification.style.opacity =
        "0";


      notification.style.transform =
        "translateY(12px)";

    },
    3800
  );


  setTimeout(
    () => {

      notification.remove();

    },
    4300
  );


  // ============================================================
  // CLOSE
  // ============================================================

  $("close").onclick =
    () => {

      hidden = true;

      menu.style.display =
        "none";

    };


  // ============================================================
  // DESTROY
  // ============================================================

  VC.destroy =
    () => {

      cancelAnimationFrame(
        rainbowRAF
      );

      cancelAnimationFrame(
        fpsRAF
      );


      clearInterval(
        hudTimer
      );


      document.removeEventListener(
        "keydown",
        keyHandler
      );


      document.removeEventListener(
        "mousemove",
        mouseMove
      );


      document.removeEventListener(
        "mouseup",
        mouseUp
      );


      header.removeEventListener(
        "mousedown",
        mouseDown
      );


      resetVisuals();


      crosshair.remove();
      scanlines.remove();
      vignette.remove();
      hud.remove();
      watermark.remove();
      notification.remove();
      root.remove();


      delete window
        .__VORTEX_VISUAL_CLIENT__;


      console.log(
        "%c⚡ Vortex Visual Client unloaded",
        "color:#9b7bff;font-weight:bold"
      );

    };


  console.log(
    "%c⚡ VORTEX VISUAL CLIENT BETA v1.1 LOADED",
    "font-size:16px;color:#9b7bff;font-weight:bold"
  );


  console.log(
    "%cPress RIGHT SHIFT to open the menu",
    "color:#aaa"
  );

})();
