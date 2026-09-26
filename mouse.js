document.addEventListener("DOMContentLoaded", () => {
  // スマホではネズミを表示しない
  if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return;
  }

  const walkFrames = [
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

  let walkFrame = 0;
  let danceFrame = 0;
  let danceCount = 0;

  let animationTimer = null;
  let stopTimer = null;

  // 歩く
function startWalking() {
  // すでに歩いているなら何もしない
  if (animationTimer) return;

  walkFrame = 0;
  mouse.src = walkFrames[walkFrame];

  animationTimer = setInterval(() => {
    walkFrame = (walkFrame + 1) % walkFrames.length;
    mouse.src = walkFrames[walkFrame];
  }, 120);
}
  // ダンス
  function startDancing() {
    clearInterval(animationTimer);

    danceFrame = 0;
    danceCount = 0;

    mouse.src = danceFrames[danceFrame];

    animationTimer = setInterval(() => {
      danceFrame++;

      if (danceFrame >= danceFrames.length) {
        danceFrame = 0;
        danceCount++;
      }

      // 約3周したら待機
      if (danceCount >= 3) {
        clearInterval(animationTimer);
        animationTimer = null;
        mouse.src = idleImage;
        return;
      }

      mouse.src = danceFrames[danceFrame];
    }, 180);
  }

  // スクロール
function handleScroll() {
  // ダンス開始待ちのタイマーをキャンセル
  clearTimeout(stopTimer);

  // スクロール中は歩く
  startWalking();

  // スクロールが止まったら少し待ってダンス
  stopTimer = setTimeout(() => {
    startDancing();
  }, 500);
}

  window.addEventListener("scroll", handleScroll);
});