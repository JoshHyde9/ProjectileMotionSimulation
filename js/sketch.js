var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine = Engine.create();

let width = window.innerWidth;
let height = window.innerHeight;

var min = 0.1;
var max = 0.008;
var wind = Math.random() * (+max - +min) + +min;
document.getElementById("wind").innerHTML = ((wind * 1000) / 1.852).toFixed(3);

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: "../img/background.jpg"
  }
});

var ground = Bodies.rectangle(0, height - 30, width * 2, 60, {
  isStatic: true,
  render: {
    sprite: {
      texture: "../img/grass.jpg",
      xOffset: -0.25 * 2,
      yOffset: 0.008
    }
  }
});

var ball = Bodies.circle(80, height - 100, 15, {
  restitution: 1,
  frictionAir: wind,
  mass: 1,
  render: {
    sprite: {
      texture: "../img/ball.png"
    }
  }
});

var stand = Bodies.rectangle(80, height - 80, 60, 40, {
  isStatic: true,
  mass: 1,
  render: {
    sprite: {
      texture: "../img/stand.jpg"
    }
  }
});

engine.world.gravity.y = 9.8;

World.add(engine.world, [ground, ball, stand]);
Engine.run(engine);
Render.run(render);

let t, a, v, s;
let time, start, end;
let rotate;

$(".yeet").on("click", function() {
  Body.applyForce(ball, ball.position, {
    x: 0.13,
    y: -0.2
  });

  rotate = setInterval(function() {
    Body.rotate(ball, Math.PI / 12);
  }, 100);

  start = new Date();
  time = setInterval(function() {
    let totTime = Date.now() - start;
    t = (totTime / 1000).toFixed(3);
  }, 1);
});

setInterval(function() {
  v = ball.speed / 3.6;
  document.getElementById("speed").innerHTML = v.toFixed(3);
}, 1);

setInterval(function() {
  let yPos = Math.round(ball.position.y);

  if (yPos == 677) {
    ball.isStatic = true;
    clearInterval(time);
    clearInterval(rotate);
    calculations();
    document.getElementById("acc").innerHTML = a.toFixed(3);
    document.getElementById("dist").innerHTML = s.toFixed(3);
  }
}, 10);

function calculations() {
  a = v / t;
  s = (1 / 2) * a * Math.pow(t, 2);
  return a, s;
}
