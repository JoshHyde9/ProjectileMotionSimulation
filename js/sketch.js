var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine = Engine.create();

let width = window.innerWidth;
let height = window.innerHeight;

let VinitVelocity, HinitVelocity, angle;

var wind = Math.random() / 5;

var render = Render.create({
  element: document.body,
  engine: engine,
  options: {
    width: width,
    height: height,
    wireframes: false,
    background: "rgb(50,50,50)"
  }
});

var ground = Bodies.rectangle(0, height - 30, width * 2, 60, {
  isStatic: true,
  render: {
    fillStyle: "grey"
  }
});

var ball = Bodies.circle(80, height - 100, 15, {
  restitution: 1,
  frictionAir: wind,
  mass: 0.8,
  render: {
    fillStyle: "white"
  }
});

var stand = Bodies.rectangle(80, height - 80, 60, 40, {
  isStatic: true,
  mass: 1,
  render: {
    fillStyle: "blue"
  }
});

engine.world.gravity.y = 9.8;

World.add(engine.world, [ground, ball, stand]);
Engine.run(engine);
Render.run(render);

let t, a, v, s;

document.getElementById("wind").innerHTML = ((wind * 100) / 1.852).toFixed(3);

$(".yeet").on("click", function() {
  Body.applyForce(
    ball,
    { x: ball.position.x, y: ball.position.y },
    { x: 0.09, y: -0.2 }
  );
  timer = setInterval(time, 1);
});

function time() {
  let d = new Date();
  let ms = d.getMilliseconds();
  t = ms / 1000;
}

setInterval(function() {
  v = ball.speed / 3.6;
  document.getElementById("speed").innerHTML = v.toFixed(3);
}, 1);

setInterval(function() {
  let yPos = Math.round(ball.position.y);

  if (yPos == 677) {
    ball.isStatic = true;
    if (timer) {
      clearInterval(timer);
      calculations();
      document.getElementById("acc").innerHTML = a.toFixed(3);
      document.getElementById("dist").innerHTML = s.toFixed(3);
    }
  }
}, 10);

function calculations() {
  a = v / t;
  s = (1 / 2) * a * Math.pow(t, 2);
  return a, s;
}
