document.addEventListener("DOMContentLoaded", () => { // スマホではネズミを表示しない if (window.innerWidth <= 767) { return; }

  const walkFrames = [
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211249.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211253.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211256.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211240.png"
  ];

  const idleImage =
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211245.png";

  // ネズミを作る
  const mouse = document.createElement("img");
  mouse.src = idleImage;
  mouse.alt = "";
  
  Object.assign(mouse.style, {
    position: "fixed",
    right: "8px",
    bottom: "70px",
    width: "60px",
    height: "auto",
    zIndex: "9999",
    pointerEvents: "none"
  });


  document.body.appendChild(mouse);

  let frame = 0;
  let animationTimer = null;
  let stopTimer = null;

  // 歩くアニメーション
  function startWalking() {
    if (animationTimer) return;

    animationTimer = setInterval(() => {
      mouse.src = walkFrames[frame];
      frame = (frame + 1) % walkFrames.length;
    }, 120);
  }

  // 待機状態に戻す
  function stopWalking() {
    clearInterval(animationTimer);
    animationTimer = null;
    frame = 0;
    mouse.src = idleImage;
  }

  // スクロールしたら歩く
  function handleScroll() {
    startWalking();

    clearTimeout(stopTimer);

    stopTimer = setTimeout(() => {
      stopWalking();
    }, 300);
  }

  window.addEventListener("scroll", handleScroll);

