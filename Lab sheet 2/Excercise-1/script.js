// 1. Get the canvas element and its context
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// 2. Display a filled rectangle
ctx.fillStyle = 'skyblue';
ctx.fillRect(50, 50, 150, 100); // (x, y, width, height)

// 3. Display a filled circle
ctx.beginPath();
ctx.arc(350, 100, 50, 0, Math.PI * 2); // (x, y, radius, startAngle, endAngle)
ctx.fillStyle = 'coral';
ctx.fill();

// 4. Display a straight line
ctx.beginPath();
ctx.moveTo(50, 200);  // Starting point
ctx.lineTo(450, 200); // Ending point
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.stroke();

// 5. Display the text "HTML5 Canvas"
ctx.font = '30px Arial';
ctx.fillStyle = 'darkblue';
ctx.fillText('HTML5 Canvas', 150, 260); // (text, x, y)