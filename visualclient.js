(() => {
  // Prevent duplicate launch
  if (window.__VISUAL_CLIENT__) {
    window.__VISUAL_CLIENT__.destroy();
  }

  const VC = {};
  window.__VISUAL_CLIENT__ = VC;

  // =========================
  // ROOT
  // =========================
  const root = document.createElement("div");
  root.id = "visual-client-root";
  document.documentElement.appendChild(root);

  const shadow = root.attachShadow({ mode: "open" });

  shadow.innerHTML = `
    <style>
      * {
        box-sizing: border-box;
        font-family: Inter, Arial, sans-serif;
      }

      #menu {
        position: fixed;
        top: 90px;
        left: 60px;
        width: 340px;

        background: rgba(15, 15, 20, .96);
        color: white;

        border: 1px solid rgba(255,255,255,.15);
        border-radius: 16px;

        box-shadow:
          0 20px 60px rgba(0,0,0,.5),
          0 0 25px rgba(130,80,255,.15);

        overflow: hidden;
        z-index: 2147483647;

        backdrop-filter: blur(20px);
      }

      #header {
        padding: 15px 17px;
        cursor: move;

        background:
          linear-gradient(
            120deg,
            rgba(120,70,255,.95),
            rgba(40,160,255,.95)
          );

        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .title {
        font-size: 16px;
        font-weight: 800;
      }

      .version {
        opacity: .75;
        font-size: 11px;
      }

      .tabs {
        display: flex;
        gap: 5px;
        padding: 9px;
        background: rgba(255,255,255,.03);
      }

      .tab {
        flex: 1;
        border: 0;
        padding: 8px;
        border-radius: 9px;
        cursor: pointer;

        background: rgba(255,255,255,.06);
        color: #bbb;

        transition: .15s;
      }

      .tab:hover {
        background: rgba(255,255,255,.12);
      }

      .tab.active {
        background: rgba(120,80,255,.35);
        color: white;
      }

      .page {
        padding: 13px;
        max-height: 450px;
        overflow-y: auto;
      }

      .page.hidden {
        display: none;
      }

      .section-title {
        font-size: 11px;
        opacity: .55;
        margin: 9px 3px;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .row {
        background: rgba(255,255,255,.055);
        padding: 10px 11px;
        margin-bottom: 7px;

        border-radius: 10px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        gap: 10px;
      }

      .row span {
        font-size: 13px;
      }

      button.action {
        width: 100%;
        padding: 10px;

        border: 0;
        border-radius: 10px;

        background: rgba(125,85,255,.25);
        color: white;

        cursor: pointer;
        margin-bottom: 7px;

        transition: .15s;
      }

      button.action:hover {
        background: rgba(125,85,255,.45);
        transform: translateY(-1px);
      }

      input[type="text"],
      input[type="number"] {
        width: 120px;

        background: rgba(0,0,0,.35);
        color: white;

        border: 1px solid rgba(255,255,255,.12);
        border-radius: 7px;

        padding: 6px 8px;
        outline: none;
      }

      input[type="range"] {
        width: 120px;
      }

      input[type="checkbox"] {
        accent-color: rgb(125,85,255);
        width: 17px;
        height: 17px;
      }

      #footer {
        padding: 9px;
        text-align: center;
        font-size: 10px;
        opacity: .35;
      }

      #close {
        border: 0;
        background: rgba(0,0,0,.25);
        color: white;

        width: 27px;
        height: 27px;

        border-radius: 7px;
        cursor: pointer;
      }

      #close:hover {
        background: rgba(255,70,70,.7);
      }

      ::-webkit-scrollbar {
        width: 5px;
      }

      ::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.2);
        border-radius: 10px;
      }
    </style>

    <div id="menu">

      <div id="header">

        <div>
          <div class="title">⚡ VORTEX VISUAL CLIENT</div>
          <div class="version">v1.0 • client-side only</div>
        </div>

        <button id="close">✕</button>

      </div>

      <div class="tabs">
        <button class="tab active" data-page="visuals">Visuals</button>
        <button class="tab" data-page="hud">HUD</button>
        <button class="tab" data-page="fun">Fun</button>
      </div>


      <!-- VISUALS -->

      <div class="page" id="visuals">

        <div class="section-title">Page effects</div>

        <div class="row">
          <span>🌈 Rainbow</span>
          <input id="rainbow" type="checkbox">
        </div>

        <div class="row">
          <span>🌑 Darker page</span>
          <input id="dark" type="checkbox">
        </div>

        <div class="row">
          <span>⚫ Grayscale</span>
          <input id="gray" type="checkbox">
        </div>

        <div class="row">
          <span>🔄 Invert</span>
          <input id="invert" type="checkbox">
        </div>

        <div class="row">
          <span>🌫 Blur</span>
          <input id="blur" type="checkbox">
        </div>

        <div class="row">
          <span>🔎 Zoom</span>
          <input
            id="zoom"
            type="range"
            min="80"
            max="130"
            value="100"
          >
        </div>

        <button id="resetVisuals" class="action">
          Reset visuals
        </button>

      </div>


      <!-- HUD -->

      <div class="page hidden" id="hud">

        <div class="section-title">Overlay HUD</div>

        <div class="row">
          <span>📊 Show HUD</span>
          <input id="showHud" type="checkbox">
        </div>

        <div class="row">
          <span>🎮 Name</span>
          <input id="playerName" type="text" value="Player">
        </div>

        <div class="row">
          <span>⭐ Fake score</span>
          <input id="fakeScore" type="number" value="999999">
        </div>

        <div class="row">
          <span>🔥 Fake streak</span>
          <input id="fakeStreak" type="number" value="100">
        </div>

        <div class="row">
          <span>⚡ FPS counter</span>
          <input id="fpsToggle" type="checkbox">
        </div>

      </div>


      <!-- FUN -->

      <div class="page hidden" id="fun">

        <div class="section-title">Effects</div>

        <button id="confetti" class="action">
          🎉 Confetti
        </button>

        <button id="shake" class="action">
          💥 Screen shake
        </button>

        <button id="spin" class="action">
          🌀 Spin page
        </button>

        <button id="flash" class="action">
          ⚡ Flash
        </button>

        <button id="resetEverything" class="action">
          ♻ Reset everything
        </button>

      </div>

      <div id="footer">
        INSERT = hide/show • Visual effects only
      </div>

    </div>
  `;


  // =========================
  // HELPERS
  // =========================

  const $ = id => shadow.getElementById(id);

  let hidden = false;

  let filters = {
    dark: false,
    gray: false,
    invert: false,
    blur: false
  };


  function updateFilters() {

    let filter = "";

    if (filters.dark)
      filter += " brightness(0.65)";

    if (filters.gray)
      filter += " grayscale(1)";

    if (filters.invert)
      filter += " invert(1)";

    if (filters.blur)
      filter += " blur(3px)";

    document.documentElement.style.filter = filter;
  }


  // =========================
  // TABS
  // =========================

  shadow.querySelectorAll(".tab").forEach(tab => {

    tab.onclick = () => {

      shadow.querySelectorAll(".tab").forEach(t =>
        t.classList.remove("active")
      );

      shadow.querySelectorAll(".page").forEach(p =>
        p.classList.add("hidden")
      );

      tab.classList.add("active");

      $(tab.dataset.page).classList.remove("hidden");
    };

  });


  // =========================
  // DRAG MENU
  // =========================

  const menu = $("menu");
  const header = $("header");

  let dragging = false;
  let dx = 0;
  let dy = 0;

  header.addEventListener("mousedown", e => {

    dragging = true;

    dx = e.clientX - menu.offsetLeft;
    dy = e.clientY - menu.offsetTop;

  });

  document.addEventListener("mousemove", e => {

    if (!dragging) return;

    menu.style.left = (e.clientX - dx) + "px";
    menu.style.top = (e.clientY - dy) + "px";

  });

  document.addEventListener("mouseup", () => {
    dragging = false;
  });


  // =========================
  // RAINBOW
  // =========================

  let rainbowTimer;

  $("rainbow").onchange = e => {

    clearInterval(rainbowTimer);

    if (!e.target.checked) {
      document.documentElement.style.hueRotate = "";
      return;
    }

    let hue = 0;

    rainbowTimer = setInterval(() => {

      hue += 3;

      document.documentElement.style.filter =
        `hue-rotate(${hue}deg)`;

    }, 30);

  };


  // =========================
  // FILTERS
  // =========================

  $("dark").onchange = e => {
    filters.dark = e.target.checked;
    updateFilters();
  };

  $("gray").onchange = e => {
    filters.gray = e.target.checked;
    updateFilters();
  };

  $("invert").onchange = e => {
    filters.invert = e.target.checked;
    updateFilters();
  };

  $("blur").onchange = e => {
    filters.blur = e.target.checked;
    updateFilters();
  };


  // =========================
  // ZOOM
  // =========================

  $("zoom").oninput = e => {

    document.body.style.zoom =
      e.target.value + "%";

  };


  // =========================
  // HUD
  // =========================

  const hud = document.createElement("div");

  Object.assign(hud.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "rgba(10,10,15,.88)",
    color: "white",
    padding: "14px 18px",
    borderRadius: "12px",
    zIndex: "2147483646",
    fontFamily: "Arial",
    fontSize: "14px",
    display: "none",
    boxShadow: "0 10px 30px rgba(0,0,0,.4)",
    backdropFilter: "blur(15px)"
  });

  document.documentElement.appendChild(hud);


  let fps = 0;

  function updateHud() {

    hud.innerHTML = `
      <b>⚡ VORTEX HUD</b>
      <br><br>

      👤 ${$("playerName").value}
      <br>

      ⭐ Score:
      <b>${$("fakeScore").value}</b>
      <br>

      🔥 Streak:
      <b>${$("fakeStreak").value}</b>

      ${
        $("fpsToggle").checked
        ? `<br>📊 FPS: <b>${fps}</b>`
        : ""
      }
    `;

  }


  $("showHud").onchange = e => {

    hud.style.display =
      e.target.checked ? "block" : "none";

    updateHud();
  };


  [
    "playerName",
    "fakeScore",
    "fakeStreak",
    "fpsToggle"

  ].forEach(id => {

    $(id).addEventListener("input", updateHud);
    $(id).addEventListener("change", updateHud);

  });


  // =========================
  // FPS
  // =========================

  let frames = 0;
  let lastFPS = performance.now();

  function fpsLoop() {

    frames++;

    const now = performance.now();

    if (now - lastFPS >= 1000) {

      fps = frames;

      frames = 0;
      lastFPS = now;

      updateHud();
    }

    requestAnimationFrame(fpsLoop);
  }

  fpsLoop();


  // =========================
  // CONFETTI
  // =========================

  $("confetti").onclick = () => {

    for (let i = 0; i < 120; i++) {

      const piece =
        document.createElement("div");

      Object.assign(piece.style, {

        position: "fixed",

        left:
          Math.random() * innerWidth + "px",

        top: "-20px",

        width: "8px",
        height: "12px",

        background:
          `hsl(${Math.random()*360},100%,60%)`,

        zIndex: 2147483645,

        pointerEvents: "none",

        transform:
          `rotate(${Math.random()*360}deg)`,

        transition:
          `top ${2 + Math.random()*3}s linear,
           transform 3s linear`

      });

      document.documentElement.appendChild(piece);

      requestAnimationFrame(() => {

        piece.style.top =
          innerHeight + 30 + "px";

        piece.style.transform =
          `rotate(${Math.random()*1000}deg)`;

      });

      setTimeout(() => {
        piece.remove();
      }, 5000);

    }

  };


  // =========================
  // SHAKE
  // =========================

  $("shake").onclick = () => {

    let amount = 0;

    const timer = setInterval(() => {

      document.body.style.transform =
        `translate(
          ${Math.random()*15-7}px,
          ${Math.random()*15-7}px
        )`;

      amount++;

      if (amount > 20) {

        clearInterval(timer);

        document.body.style.transform = "";

      }

    }, 30);

  };


  // =========================
  // SPIN
  // =========================

  $("spin").onclick = () => {

    document.body.style.transition =
      "transform 1s";

    document.body.style.transform =
      "rotate(360deg)";

    setTimeout(() => {

      document.body.style.transition = "";
      document.body.style.transform = "";

    }, 1000);

  };


  // =========================
  // FLASH
  // =========================

  $("flash").onclick = () => {

    const flash =
      document.createElement("div");

    Object.assign(flash.style, {

      position: "fixed",
      inset: "0",

      background: "white",

      zIndex: 2147483644,

      pointerEvents: "none",

      opacity: "1",

      transition: "opacity .4s"

    });

    document.documentElement.appendChild(flash);

    requestAnimationFrame(() => {
      flash.style.opacity = "0";
    });

    setTimeout(() => {
      flash.remove();
    }, 500);

  };


  // =========================
  // RESET
  // =========================

  function resetVisuals() {

    document.documentElement.style.filter = "";
    document.documentElement.style.hueRotate = "";

    document.body.style.zoom = "";
    document.body.style.transform = "";
    document.body.style.transition = "";

    clearInterval(rainbowTimer);

    filters = {
      dark: false,
      gray: false,
      invert: false,
      blur: false
    };

    $("rainbow").checked = false;
    $("dark").checked = false;
    $("gray").checked = false;
    $("invert").checked = false;
    $("blur").checked = false;

    $("zoom").value = 100;

  }


  $("resetVisuals").onclick =
    resetVisuals;


  $("resetEverything").onclick = () => {

    resetVisuals();

    $("showHud").checked = false;
    $("fpsToggle").checked = false;

    hud.style.display = "none";

  };


  // =========================
  // INSERT TOGGLE
  // =========================

  function keyHandler(e) {

    if (e.key === "Insert") {

      hidden = !hidden;

      menu.style.display =
        hidden ? "none" : "block";

    }

  }

  document.addEventListener(
    "keydown",
    keyHandler
  );


  // =========================
  // DESTROY
  // =========================

  VC.destroy = () => {

    clearInterval(rainbowTimer);

    resetVisuals();

    document.removeEventListener(
      "keydown",
      keyHandler
    );

    hud.remove();
    root.remove();

    delete window.__VISUAL_CLIENT__;

    console.log(
      "%cVortex Visual Client unloaded.",
      "color:#a78bfa;font-weight:bold"
    );

  };


  $("close").onclick =
    VC.destroy;


  console.log(
    "%c⚡ VORTEX VISUAL CLIENT LOADED",
    "font-size:18px;color:#9b7bff;font-weight:bold"
  );

})();
