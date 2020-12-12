import _ from './utils.js';

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors1 = ['#EF3D59', '#E17A47', '#EFC958', '#4AB19D', '#344E5C'];

const colors2 = ['#468966', '#FFF0A5', '#FFB03B', '#B64926', '#8E2800'];

const colors3 = ['#949021', '#5EB5E0', '#E0DC47', '#E03143', '#942833'];

const colors4 = ['#D41E21', '#FF751A', '#FECB04', '#04A46A', '#3498DB'];

const colors = [colors1, colors2, colors3, colors4];

const colorArray = colors[_.randomIntFromRange(0, 3)];

// Event Listeners
addEventListener('click', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;

  init();
});

addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  init();
});

const friction = 0.99;
const gravity = 0.05; //downward velocity

// Particle
class Particle {
  constructor(x, y, radius, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = velocity;
    // this.color = `hsl(${Math.random() * 360}, 50%, 50%)`;
    this.color = _.randomColor(colorArray);
    this.alpha = 1;
  }

  draw() {
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = this.alpha;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }

  update() {
    this.draw();
    this.velocity.x *= friction;
    this.velocity.y += gravity;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.006;
  }
}

// Initial trigger
let particles = [];
function init() {
  particles = [];
  const particleCount = 500;
  const radius = Math.random() * 2.5 + 1.5;
  const angle = (Math.PI * 2) / particleCount;
  const amplitude = 7;
  for (let i = 0; i < particleCount; i++) {
    const x = mouse.x;
    const y = mouse.y;
    const velocity = {
      x: Math.cos(angle * i) * Math.random() * amplitude,
      y: Math.sin(angle * i) * Math.random() * amplitude,
    };
    particles.push(new Particle(x, y, radius, velocity));
  }
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    if (particle.alpha > 0) particle.update();
    else particles.splice(index, 1);
  });
}

init();
animate();
