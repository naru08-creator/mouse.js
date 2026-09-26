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

let walkTimer = null;
let danceTimer = null;
let stopTimer = null;

// 歩く
function startWalking() {
  // ダンス中なら中断
  clearInterval(danceTimer);
  danceTimer = null;

  // すでに歩いているなら再スタートしない
  if (walkTimer) return;

  walkFrame = 0;
  mouse.src = walkFrames[walkFrame];

  walkTimer = setInterval(() => {
    walkFrame = (walkFrame + 1) % walkFrames.length;
    mouse.src = walkFrames[walkFrame];
  }, 120);
}

// ダンス
function startDancing() {
  // 歩きを止める
  clearInterval(walkTimer);
  walkTimer = null;

  // すでにダンス中なら何もしない
  if (danceTimer) return;

  danceFrame = 0;
  danceCount = 0;
  mouse.src = danceFrames[danceFrame];

  danceTimer = setInterval(() => {
    danceFrame++;

    // 4枚目までいったら1周
    if (danceFrame >= danceFrames.length) {
      danceFrame = 0;
      danceCount++;
    }

    // 3周したら待機画像へ
    if (danceCount >= 3) {
      clearInterval(danceTimer);
      danceTimer = null;
      mouse.src = idleImage;
      return;
    }

    mouse.src = danceFrames[danceFrame];
  }, 180);
}

// スクロール
function handleScroll() {
  // ダンス開始待ちをリセット
  clearTimeout(stopTimer);

  // スクロール中はすぐ歩く
  startWalking();

  // スクロールが止まったら500ms後にダンス
  stopTimer = setTimeout(() => {
    startDancing();
  }, 500);
}

window.addEventListener("scroll", handleScroll);

});