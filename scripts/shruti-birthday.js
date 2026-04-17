let gifts = [];
let girl;
let score = 0;
let currentGift = null;
let text_size = 30;
let animations = {}; // Container for all your GIFs
let currentAnimation;
let isMovingLeft = false;
let isMovingRight = false;
let reactionTimer = 0;
let state = "disappointed";
let particles = [];
let sprite_size = 150;

function preload() {
  // Use loadImage so the GIF becomes part of the p5 canvas
  animations.runleft = loadGif('../store/game-store/run-left.gif');
  animations.runright = loadGif('../store/game-store/run-right.gif');
  animations.content = loadGif('../store/game-store/content.gif');
  animations.angry = loadGif('../store/game-store/angry.gif');
  animations.disappointed = loadGif('../store/game-store/disappointed.gif');
  bgImg = loadImage('../store/bg3.png');
}

class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 12);
    this.color = color(random(255), random(255), random(255));
    this.speedX = random(-3, 3);
    this.speedY = random(-5, -1); // Burst upwards
    this.gravity = 0.05;
    this.rotation = random(TWO_PI);
    this.spin = random(-0.1, 0.1);
    this.life = 555; // Fade out
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += this.gravity;
    this.rotation += this.spin;
    this.life -= 4; // How fast they disappear
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    fill(red(this.color), green(this.color), blue(this.color), this.life);
    noStroke();
    // Confetti can be rectangles or triangles
    rect(0, 0, this.size, this.size / 2);
    pop();
  }
}

function setup() {
createCanvas(windowWidth, windowHeight);
  
  // Force every GIF in your object to start its internal timer
  for (let key in animations) {
    if (animations[key].loop) {
      animations[key].loop();
    }
  }

  currentAnimation = animations.disappointed;
  // Initializing the girl object
  girl = {
    x: width / 2,
    y: height - sprite_size,
    w: sprite_size,
    h: sprite_size,
    speed: 4
  };
}

function draw() {
  // background(200,250,255); // Alice Blue
  image(bgImg, 0, 0, width, height);  
  push();
  textFont('Comic Sans MS');
  fill(255);
  stroke(155, 155, 220);
  strokeWeight(4);
  textSize(width/55);
  textAlign(CENTER);
  text("Create gifts for Shruti by clicking anywhere", width/2, height/10);
  text("Press and hold to increase size of the gift", width/2, height/7);
  pop();
  
  // Scoreboard
  push();
  textFont('Comic Sans MS');
  fill(255);
  stroke(220, 155, 155);
  strokeWeight(4);
  textSize(text_size);
  if (text_size != 30) {
    text_size -= 0.5;
  }
  textAlign(CENTER);
  text("Gifts worth Rs. " + score + "/-", width/2, height/5);
  pop();
  

// Adjust this number to change difficulty: 
// 60 means 1 gift every second (since p5 runs at 60fps)
  if (frameCount % 60 === 0) {
    let newGift = {
      x: random(50, width - 50), // Random horizontal position
      y: -10,                    // Start just above the screen
      size: random(20, 50),      // Random value/size
      fallSpeed: random(2, 3)    // Random falling speed
    };
    
    gifts.push(newGift);
  }


  // --- ANIMATION STATE LOGIC ---
  // --- 1. DECIDE THE STATE ---
  let newState = "";

  // Priority 1: Reactions (Content/Angry)
  if (millis() < reactionTimer) {
    // If the timer is still active, keep the current reaction state
    // We set this in the collision logic below
    newState = state; 
  } 
  // Priority 2: Movement
  else if (isMovingLeft) {
    newState = "runleft";
  } else if (isMovingRight) {
    newState = "runright";
  } 
  // Priority 3: Idle
  else {
    newState = "disappointed";
  }

  // --- 2. UPDATE THE GIF (The "Gate") ---
  // Only change the animation if the state actually switched
  if (currentAnimation !== animations[newState]) {
    currentAnimation = animations[newState];
    state = newState; // Keep the 'state' variable in sync
    
    // Safety: Reset the GIF to frame 0 so it starts from the beginning
    if (currentAnimation && currentAnimation.reset) {
      currentAnimation.reset();
    }
  }

  // --- 3. DRAW THE GIRL ---
  // Note: Using (girl.x, girl.y) and imageMode(CENTER) is safer
  push();
  imageMode(CENTER);
  image(currentAnimation, girl.x, girl.y, girl.w * 2, girl.h * 2);
  pop();

  // --- 4. RESET FLAGS ---
  isMovingLeft = false;
  isMovingRight = false;

  // If a gift is currently being "charged" by holding the mouse
  if (currentGift) {
    currentGift.size += 1; // Increase size while holding
    currentGift.size = constrain(currentGift.size, 20, 100); // Set a max size limit
    push();
    // Draw the preview of the gift at the mouse position
    fill(254, 234, 201, 150); // Semi-transparent gold
    rectMode(CENTER);
    rect(mouseX, mouseY, currentGift.size, currentGift.size);
    rectMode(CORNER);
    pop();
  }
  
  // --- USER LOGIC START ---
  // Use the 'girl' object and 'gifts' array to move her.
  // Example: girl.x += 2;
  if (gifts.length > 0) {
    fastest = gifts[0];
    closest = gifts[0];
    target = {
      set: false,
      time_to_reach: 99999,
      gift: gifts[0]
    };
    for (let i = gifts.length - 1; i >= 0; i--) {
      let g = gifts[i];
      if (g.fallSpeed > fastest.fallSpeed) {
        fastest = g;
      }
      if (g.y > closest.y) {
        closest = g;
      }

      tc_gift = abs(closest.y - girl.y) / closest.fallSpeed;
      tc_girl = abs(closest.x - girl.x) / girl.speed;

      tf_gift = abs(fastest.y - girl.y) / fastest.fallSpeed;
      tf_girl = abs(fastest.x - girl.x) / girl.speed;

      if (target.set == false) {
        if (tc_girl < tf_girl) {
          target.set = true;
          target.time_to_reach = tc_girl;
          target.gift = closest;
        }
        else {
          target.set = true;
          target.time_to_reach = tf_girl;
          target.gift = fastest;
        }
      }
      else {
        if (target.time_to_reach < tc_girl || target.time_to_reach < tf_girl) {
          target.set = false;
        }
      }
    }
    // girl chases for the target
    if (abs(target.gift.x - girl.x) > 5) { // Only move if she's more than 5px away
    if (target.gift.x > girl.x) {
        girl.x += girl.speed;
        isMovingRight = true;
    } else {
        girl.x -= girl.speed;
        isMovingLeft = true;
    }
  }
    else {
        isMovingRight = false;
        isMovingLeft = false;
    }

  }
  

  // Draw the Girl
  // push();
  // fill(220, 155, 155); // Pink
  // rectMode(CENTER);
  // rect(girl.x, girl.y, girl.w, girl.h);
  // rectMode(CORNER); // Reset to default
  // pop();



  // Manage Gifts
  for (let i = gifts.length - 1; i >= 0; i--) {
    let g = gifts[i];
    
    // Make gift fall
    g.y += g.fallSpeed;
    
    // Draw the gift
    push();
    fill(254, 234, 201); // Gold
    stroke(220, 155, 155);
    strokeWeight(2);
    rect(g.x - g.size/2, g.y - g.size/2, g.size, g.size);
    rect(g.x - g.size/2-1,g.y - g.size/2, g.size+2, g.size/4);
    fill(220,115,115);
    rect(g.x - g.size/10, g.y - g.size/2, g.size/5, g.size);
    textFont('Comic Sans MS');
    textSize(g.size/2, );
    text("/X\\", g.x - g.size/2, g.y - g.size/2);
    pop();

    // Check for "Catch" (Collision)
    // We check if the distance between the center of the girl and gift is small
    let d = dist(girl.x, girl.y, g.x, g.y);
    // Check for "Catch" (Collision)
    if (d < sprite_size/2) {
      gifts.splice(i, 1);
      score += ceil(g.size);
      text_size = text_size*1.2;
      state = "content"; 
      if (g.size > 60)
        reactionTimer = millis() +500; // Smile for 1.5 seconds
      else reactionTimer = millis() +200;
  // --- ADD THIS: Burst of 15 confetti pieces ---
  for (let j = 0; j < 15; j++) {
    particles.push(new Confetti(girl.x, girl.y - 20));
  }
} 
    // Remove if it hits the ground (Miss)
    else if (g.y > height - 40) {
      gifts.splice(i, 1);
      
      // TRIGGER REACTION
      state = "angry"; 
      reactionTimer = millis() + 500; // Stay angry for 1 second
    }
  }
for (let i = particles.length - 1; i >= 0; i--) {
  particles[i].update();
  particles[i].display();
  
  // Remove dead particles to keep the game fast
  if (particles[i].life <= 0) {
    particles.splice(i, 1);
  }
}

}

function mousePressed() {
  // Create the gift but don't add it to the 'gifts' array yet
  currentGift = {
    x: mouseX,
    y: mouseY,
    size: 10, // Starting size
    fallSpeed: random(1, 4)
  };
}

function mouseReleased() {
  if (currentGift) {
    // Update its final position to where the mouse is now
    currentGift.x = mouseX;
    currentGift.y = mouseY;
    currentGift.fallSpeed = random(exp(currentGift.size/60), exp(currentGift.size/60));
    // Add it to the main array so it starts falling
    gifts.push(currentGift);
    
    // Clear the temporary gift
    currentGift = null;
  }
}