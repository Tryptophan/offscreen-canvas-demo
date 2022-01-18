window.addEventListener("DOMContentLoaded", () => {
  // https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas

  let onscreenCanvas = document.getElementById("onscreen");
  let offscreenCanvas = document.getElementById("offscreen");

  let onscreenCanvasFPS = document.getElementById("onscreen-fps");
  let offscreenCanvasFPS = document.getElementById("offscreen-fps");

  let offscreen = offscreenCanvas.transferControlToOffscreen();
  let worker = new Worker("offscreen.js");
  worker.postMessage({ canvas: offscreen }, [offscreen]);

  worker.onmessage = (event) => {
    offscreenCanvasFPS.innerHTML = event.data;
  };

  animate(onscreenCanvas.getContext("2d"), onscreenCanvasFPS, new Date());
});
