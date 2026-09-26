document.addEventListener("DOMContentLoaded", () => {
  // スマホではネズミを表示しない
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return;
  }

  const walkFrames = [
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211249.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211253.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211256.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211240.png"
  ];

  const danceFrames = [
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211312.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211316.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211232.png",
    "https://cdn-ak.f.st-hatena.com/images/fotolife/e/erupyon/20260926/20260926211236.png"
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
  let isDancing = false;

  // 歩くアニメーション
  function startWalking() {
    if (isDancing) {
      isDancing = false;
    }

    if (animationTimer) {
      clearInterval(animationTimer);
    }

    frame = 0;
    animationTimer = setInterval(() => {
      mouse.src = walkFrames[frame];
      frame = (frame + 1) % walkFrames.length;
    }, 120);
  }

  // 待機状態
  function stopWalking() {
    clearInterval(animationTimer);
    animationTimer = null;
    frame = 0;
    mouse.src = idleImage;
  }

  // ダンス開始
  function startDancing() {
    if (isDancing) return;

    isDancing = true;
    frame = 0;

    clearInterval(animationTimer);

    animationTimer = setInterval(() => {
      mouse.src = danceFrames[frame];
      frame = (frame + 1) % danceFrames.length;
    }, 180);
  }

  // スクロールしたら歩く
  function handleScroll() {
    startWalking();

    clearTimeout(stopTimer);

    stopTimer = setTimeout(() => {
      stopWalking();

      // スクロールが止まったら少し待って踊る
      stopTimer = setTimeout(() => {
        startDancing();
      }, 500);

    }, 300);
  }

  window.addEventListener("scroll", handleScroll);
});