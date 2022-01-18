let w = 4000;
let h = 4000;
let tot = 50;
let colors = [
  "#ff0000",
  "#ff7f00",
  "#ffff00",
  "#00ff00",
  "#0000ff",
  "#4b0082",
  "#8b00ff",
];

let fpsPoll = 0;

function animate(ctx, lastTime) {
  ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < tot; ++i) {
    let x = (Math.random() * w) | 0;
    let y = (Math.random() * h) | 0;
    let r = (Math.random() * i) | (0 + 3);

    ctx.fillStyle = colors[i % colors.length];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "rgba(0, 0, 0, 0.6)";

    ctx.beginPath();
    ctx.arc(x, y, r - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  // Calculate fps (only every 10 frames)
  if (fpsPoll >= 10) {
    let currentTime = new Date();
    fps = Math.round(1000 * fpsPoll / (currentTime - lastTime));
    postMessage(fps);
    lastTime = currentTime;
    fpsPoll = 0;
  }
  fpsPoll++;

  requestAnimationFrame(animate.bind(animate, ctx, lastTime));
}

onmessage = function (evt) {
  let canvas = evt.data.canvas;
  let ctx = canvas.getContext("2d");

  animate(ctx, new Date());
};
