let gifts = [];
let girl;
let score = 0;
let currentGift = null;
let text_size = 30;
let animations = {}; // Container for all your GIFs
let currentAnimation;
let isMovingLeft = false;
let isMovingRight = false;
let reactionTimer = 1000;
let state = "disappointed";

function preload() {
  // Use loadImage so the GIF becomes part of the p5 canvas
  animations.runleft = loadImage('../store/game-store/run-left.gif');
  animations.runright = loadImage('../store/game-store/run-right.gif');
  animations.content = loadImage('../store/game-store/content.gif');
  animations.angry = loadImage('../store/game-store/angry.gif');
  animations.disappointed = loadImage('../store/game-store/disappointed.gif');
  bgImg = loadImage('../store/bg.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  currentAnimation = animations.disappointed;
  // animations.disappointed.loop();

  // Initializing the girl object
  girl = {
    x: width / 2,
    y: height - 100,
    w: 100,
    h: 100,
    speed: 5
  };
}

function draw() {
  // background(200,250,255); // Alice Blue
  image(bgImg, 0, 0, width, height);  
  // Draw the "Ground"
  fill(100, 200, 100);
  noStroke();
  rect(0, height - 20, width, 20);

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
  text("Gifts worth Rs. " + score + "/-", width/2, height/2);
  pop();
  

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
  // isMovingLeft = false;
  // isMovingRight = false;

  // If a gift is currently being "charged" by holding the mouse
  if (currentGift) {
    currentGift.size += 1; // Increase size while holding
    currentGift.size = constrain(currentGift.size, 10, 60); // Set a max size limit
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
      time_to_reach: 9999,
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
  }
  


  // --- USER LOGIC END ---

  //gif logic

  // --- ANIMATION SELECTION ---
  // If the timer has run out, go back to normal walking

  // --- DRAW THE SELECTED GIF ---
  // imageMode(CENTER);
  // imageMode(CORNER);

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
    if (d < 40) {
      gifts.splice(i, 1);
      score += g.size;
      text_size = 35;
      
      // TRIGGER REACTION
      state = "content"; 
      reactionTimer = millis() + 1500; // Smile for 1.5 seconds
    } 
    // Remove if it hits the ground (Miss)
    else if (g.y > height - 40) {
      gifts.splice(i, 1);
      
      // TRIGGER REACTION
      state = "angry"; 
      reactionTimer = millis() + 1000; // Stay angry for 1 second
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
    currentGift.fallSpeed = random(exp(currentGift.size/30), exp(currentGift.size/30));
    // Add it to the main array so it starts falling
    gifts.push(currentGift);
    
    // Clear the temporary gift
    currentGift = null;
  }
}