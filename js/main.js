var canvas = document.createElement('canvas'),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
document.body.appendChild(canvas);

context.fillStyle = '#34495e';
context.fillRect(0, 0, width, height);
