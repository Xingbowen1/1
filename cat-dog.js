let model = null;

const fileEl = document.getElementById('file');
const btnEl = document.getElementById('btn');
const statusEl = document.getElementById('status');
const outEl = document.getElementById('out');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function setStatus(text) {
  statusEl.textContent = `状态：${text}`;
}

function setOut(text) {
  outEl.textContent = `结果：${text}`;
}

function drawImageToCanvas(img) {
  // Fit within 520px width for nice UI, keep aspect ratio
  const maxW = 520;
  let w = img.naturalWidth || img.width;
  let h = img.naturalHeight || img.height;
  const scale = Math.min(1, maxW / w);
  w = Math.round(w * scale);
  h = Math.round(h * scale);

  canvas.width = w;
  canvas.height = h;
  ctx.clearRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
}

function drawBoxes(preds) {
  ctx.lineWidth = 2;
  ctx.font = '14px -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Arial';

  preds.forEach((p) => {
    const [x, y, w, h] = p.bbox;
    const label = `${p.class} ${(p.score * 100).toFixed(1)}%`;

    ctx.strokeStyle = p.class === 'cat' ? '#10b981' : p.class === 'dog' ? '#3b82f6' : '#f59e0b';
    ctx.fillStyle = ctx.strokeStyle;

    ctx.strokeRect(x, y, w, h);
    const textW = ctx.measureText(label).width;
    const textH = 18;
    const pad = 4;
    const boxX = x;
    const boxY = Math.max(0, y - textH - 2);
    ctx.fillRect(boxX, boxY, textW + pad * 2, textH);
    ctx.fillStyle = '#fff';
    ctx.fillText(label, boxX + pad, boxY + 14);
  });
}

function bestCatDog(preds) {
  const cats = preds.filter((p) => p.class === 'cat');
  const dogs = preds.filter((p) => p.class === 'dog');
  const bestCat = cats.sort((a, b) => b.score - a.score)[0] || null;
  const bestDog = dogs.sort((a, b) => b.score - a.score)[0] || null;

  if (!bestCat && !bestDog) return { type: 'unknown', score: 0 };
  if (bestCat && !bestDog) return { type: 'cat', score: bestCat.score };
  if (!bestCat && bestDog) return { type: 'dog', score: bestDog.score };
  return bestCat.score >= bestDog.score ? { type: 'cat', score: bestCat.score } : { type: 'dog', score: bestDog.score };
}

async function loadModel() {
  setStatus('加载 TensorFlow.js…');
  await tf.ready();
  setStatus('加载 coco-ssd 模型…');
  model = await cocoSsd.load();
  setStatus('模型已就绪');
  btnEl.disabled = false;
  btnEl.textContent = '开始识别';
}

let currentImg = null;

fileEl.addEventListener('change', async () => {
  const file = fileEl.files?.[0];
  if (!file) return;

  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    currentImg = img;
    drawImageToCanvas(img);
    setOut('已选择图片，点击“开始识别”。');
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

btnEl.addEventListener('click', async () => {
  if (!model) return;
  if (!currentImg) {
    setOut('请先选择一张图片。');
    return;
  }

  btnEl.disabled = true;
  const oldText = btnEl.textContent;
  btnEl.textContent = '识别中…';
  setOut('识别中，请稍等…');

  try {
    // Re-draw clean image then run detection
    drawImageToCanvas(currentImg);
    const preds = await model.detect(canvas);

    // Draw cat/dog boxes only (keeps UI focused)
    const catDog = preds.filter((p) => p.class === 'cat' || p.class === 'dog');
    drawBoxes(catDog);

    const best = bestCatDog(catDog);
    if (best.type === 'unknown') {
      setOut('没有检测到猫或狗（你可以换一张更清晰、主体更大的图片再试）。');
    } else {
      const label = best.type === 'cat' ? '猫' : '狗';
      setOut(`${label}（置信度 ${(best.score * 100).toFixed(1)}%）`);
    }
  } catch (e) {
    setOut(`识别失败：${e?.message || String(e)}`);
  } finally {
    btnEl.disabled = false;
    btnEl.textContent = oldText;
  }
});

loadModel().catch((e) => {
  setStatus(`模型加载失败：${e?.message || String(e)}`);
  btnEl.disabled = true;
  btnEl.textContent = '加载失败';
});

