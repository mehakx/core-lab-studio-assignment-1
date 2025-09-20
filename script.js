// sketch.js
// p5.js collage demo

let covers = [];     // array to hold image objects
let imgPaths = [
  "assets/vogue1.jpg",
  "assets/vogue2.jpg",
  "assets/vogue3.jpg",
  "assets/vogue4.jpg",
  "assets/vogue5.jpg",
  "assets/vogue6.jpg"
];
let tiles = [];      // array for positioning info

function preload() {
  // preload images so they’re ready
  for (let path of imgPaths) {
    covers.push(loadImage(path));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  noStroke();
  initTiles();
}

function draw() {
  background(15); // dark bg

  // draw each tile
  for (let i = 0; i < tiles.length; i++) {
    let t = tiles[i];
    let d = dist(mouseX, mouseY, t.x, t.y);

    // hover effect → scale up if close to mouse
    let scaleAmt = 1;
    if (d < 100) {
      scaleAmt = 1.2;
      fill(255, 40); // soft glow behind
      ellipse(t.x, t.y, t.w * 1.4, t.h * 1.4);
    }

    push();
    translate(t.x, t.y);
    scale(scaleAmt);
    image(t.img, 0, 0, t.w, t.h);
    pop();
  }
}

// initialize tile positions
function initTiles() {
  tiles = [];
  for (let img of covers) {
    let w = random(160, 240);
    let h = (img.height / img.width) * w; // keep aspect ratio
    let x = random(w / 2, width - w / 2);
    let y = random(h / 2, height - h / 2);

    tiles.push({ img, x, y, w, h });
  }
}

// reshuffle on click
function mousePressed() {
  initTiles();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initTiles();
}
