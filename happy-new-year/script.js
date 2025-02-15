let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

let cWidth, cHeight;
let shells = [];
let pass = [];

let colors = ['#FF5252', '#FF4081', '#E040FB', '#7C4DFF', '#536DFE', '#448AFF', '#40C4FF', '#18FFFF', '#64FFDA', '#69F0AE', '#B2FF59', '#EEFF41', '#FFFF00', '#FFD740', '#FFAB40', '#FF6E40'];

window.onresize = function () {
  reset();
}
reset();

function reset() {
  cWidth = window.innerWidth;
  cHeight = window.innerHeight;
  c.width = cWidth;
  c.height = cHeight;
}

function newShell() {
  let left = (Math.random() > 0.5);
  let shell = {};
  shell.x = (1 * left);
  shell.y = 1;
  shell.xOff = (0.01 + Math.random() * 0.007) * (left ? 1 : -1);
  shell.yOff = 0.01 + Math.random() * 0.007;
  shell.size = Math.random() * 6 + 3;
  shell.color = colors[Math.floor(Math.random() * colors.length)];

  shells.push(shell);
}

function newPass(shell) {
  let pasCount = Math.ceil(Math.pow(shell.size, 2) * Math.PI);

  for (let i = 0; i < pasCount; i++) {
    let pas = {};
    pas.x = shell.x * cWidth;
    pas.y = shell.y * cHeight;

    let a = Math.random() * 4;
    let s = Math.random() * 10;

    pas.xOff = s * Math.sin((5 - a) * (Math.PI / 2));
    pas.yOff = s * Math.sin(a * (Math.PI / 2));

    pas.color = shell.color;
    pas.size = Math.sqrt(shell.size);

    if (pass.length < 1000) { pass.push(pas); }
  }
}

let lastRun = 0;
Run();
function Run() {
  let dt = 1;
  if (lastRun != 0) {
    dt = Math.min(50, (performance.now() - lastRun));
  }
  lastRun = performance.now();

  //ctx.clearRect(0, 0, cWidth, cHeight);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(0, 0, cWidth, cHeight);

  if ((shells.length < 10) && (Math.random() > 0.96)) {
    newShell();
  }

  for (let ix = 0; ix < shells.length; ix++) {

    let shell = shells[ix];

    ctx.beginPath();
    ctx.arc(
      shell.x * cWidth, shell.y * cHeight,
      shell.size, 0, 2 * Math.PI
    );
    ctx.fillStyle = shell.color;
    ctx.fill();

    shell.x -= shell.xOff;
    shell.y -= shell.yOff;
    shell.xOff -= (shell.xOff * dt * 0.001);
    shell.yOff -= ((shell.yOff + 0.2) * dt * 0.00005);

    if (shell.yOff < -0.005) {
      newPass(shell);
      shells.splice(Number(ix), 1);
    }
  }

  for (let ix in pass) {
    let pas = pass[ix];

    ctx.beginPath();
    ctx.arc(pas.x, pas.y, pas.size, 0, 2 * Math.PI);
    ctx.fillStyle = pas.color;
    ctx.fill();

    pas.x -= pas.xOff;
    pas.y -= pas.yOff;
    pas.xOff -= (pas.xOff * dt * 0.001);
    pas.yOff -= ((pas.yOff + 5) * dt * 0.0005);
    pas.size -= (dt * 0.002 * Math.random())

    if (
      (pas.y > cHeight) || (pas.y < -50) || (pas.size <= 0)
    ) {
      pass.splice(Number(ix), 1);
    }
  }
  requestAnimationFrame(Run);
}