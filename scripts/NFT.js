let img1, img2;

function preload() {
  img1 = createImg("/store/nfts_animation.gif", 'book worm nft gif');
  img2 = createImg("/store/rare_worms.gif", 'rare worms nfts gif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 100);

  img1.style("border-radius: 20px; box-shadow: 5px 5px 0px rgb(20,20,20, 0.5);");
  img2.style("border-radius: 20px; box-shadow: 5px 5px 0px rgb(20,20,20, 0.5);");
}

function draw() {
  let hue = 100 * abs(sin((frameCount / 500) % 360));
  background(hue, 100, 95);
  let padding;
  padding = width > height ? height / 20 : width / 10;
  let s;
  s = height / 2 - padding;
  img1.size(s, s);
  img1.position(width / 2 - s/1.7, padding/1.25);
  img2.size(s, s);
  img2.position(width / 2 - s/2.5, height / 2 + padding / 5);
}