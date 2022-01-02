const canvas = document.getElementById('drawing-board');
const toolBar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPaiting = false;
let lineWidth = 5;
let startX;
let StartY;

toolBar.addEventListener('click', e => {

  if (e.target.id === 'clear') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

});

toolBar.addEventListener('change', e => {

  if (e.target.id === 'stroke') {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === 'lineWidth') {
    lineWidth = e.target.value;
  }

});

const draw = (e) => {
  if (!isPaiting) {
    return;
  }

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
};

canvas.addEventListener('mousedown', (e) => {

  isPaiting = true;
  startX = e.clientX;
  startY = e.clientY;

});

canvas.addEventListener('mouseup', e => {
  isPaiting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener('mousemove', draw);