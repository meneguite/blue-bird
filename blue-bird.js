var myGamePiece;
var myObstacles = [];
var myScore;

const appWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 646;
const appHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 360;

var myGameArea = {
  speed: -1,
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = appWidth;
    this.canvas.height = appHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function() {
    clearInterval(this.interval);
  }
};

function startGame() {
  const imageFile =
    "data:image/png;base64,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";
  myGamePiece = new component(30, 30, imageFile, 10, 120, "image");
  myScore = new component("12px", "Consolas", "black", appWidth - 100, 15, "text");
  myGameArea.start();
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image") {
    this.image = new Image();
    this.image.src = color;
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.update = function() {
    ctx = myGameArea.context;
    if (this.type == "image") {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else if (this.type == "text") {
      ctx.font = this.width + " " + this.height;
      ctx.fillStyle = color;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    var crash = true;
    if (mybottom < othertop || mytop > otherbottom || myright < otherleft || myleft > otherright) {
      crash = false;
    }
    return crash;
  };
}

function restartGame() {
  document.getElementById("filter-background").style.display = "none";
  document.getElementById("restart-button").style.display = "none";
  myGameArea.stop();
  myGameArea.clear();
  myObstacles = [];
  myScore = {};
  startGame();
}

function updateGameArea() {
  var x, height, gap, minHeight, maxHeight, minGap, maxGap;
  for (i = 0; i < myObstacles.length; i += 1) {
    if (myGamePiece.crashWith(myObstacles[i])) {
      myGameArea.stop();
      document.getElementById("filter-background").style.display = "block";
      document.getElementById("restart-button").style.display = "block";
      return;
    }
  }
  myGameArea.clear();
  myGameArea.frameNo += 1;
  if (myGameArea.frameNo == 1 || everyinterval(150)) {
    x = myGameArea.canvas.width;
    minHeight = 20;
    maxHeight = 200;
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    minGap = 50;
    maxGap = 200;
    gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
    myObstacles.push(new component(18, height, "#1E90FF", x, 0));
    myObstacles.push(new component(18, x - height - gap, "#1E90FF", x, height + gap));
  }

  for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].speedX = -1;
    myObstacles[i].newPos();
    myObstacles[i].update();
  }
  myScore.text = "SCORE: " + myGameArea.frameNo;
  myScore.update();
  myGamePiece.newPos();
  myGamePiece.update();
}

function everyinterval(n) {
  return (myGameArea.frameNo / n) % 1 == 0;
}

function moveup() {
  myGamePiece.speedY = -1;
}

function movedown() {
  myGamePiece.speedY = 1;
}

function moveleft() {
  myGamePiece.speedX = -1;
}

function moveright() {
  myGamePiece.speedX = 1;
}

function clearmove() {
  myGamePiece.speedX = 0;
  myGamePiece.speedY = 0;
}

window.addEventListener("keypress", event => {
  clearmove();
  switch (event.key) {
    case "w":
      moveup();
      break;
    case "s":
      movedown();
      break;
    case "d":
      moveright();
      break;
    case "a":
      moveleft();
      break;
  }
});

function insideInstalledApp() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function forceScreenSize(width, height) {
  if (insideInstalledApp()) {
    window.addEventListener("resize", () => {
      window.resizeTo(width, height);
    });
  }
}

forceScreenSize(appWidth, appHeight + 40);
