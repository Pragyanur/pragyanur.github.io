let img, modifiedImg;

function setup() {
  createCanvas(250, 200);
  background(21, 81, 104);
  fill(255);
  textSize(16);
  translate(width / 3, height / 4);

  // Create a file input element to allow the user to upload an image
  let fileInput = createFileInput(handleFile);
  fileInput.id("inp");
  // fileInput.position(0, 0);  // Position it on the webpage
  // Create the "Submit" button
  submitButton = createButton('Submit');
  submitButton.mousePressed(applyFilter); // Attach the function to be called when the button is clicked

}

function applyFilter() {
  // Check if there's an image uploaded
  if (modifiedImg) {
    modifiedImg.filter(GRAY); // Apply a grayscale filter to the copied image
    image(modifiedImg, 0, 0); // Display the modified image on the canvas
  } else {
    console.log('No image uploaded to modify!');
  }
}

function handleFile(file) {
  // Check if the uploaded file is an image
  if (file.type === 'image') {
    // Load the image and adjust canvas size to match the image dimensions
    img = loadImage(file.data, img => {
      resizeCanvas(img.width, img.height); // Resize canvas to match the image dimensions
      image(img, 0, 0); // Display the image at its original size
      modifiedImg = img.get(); // Create a copy of the image to modify later
    });
  } else {
    console.log('Not an image file!');
  }
}

// function handleFile(file) {
//   // Check if the uploaded file is an image
//   if (file.type === 'image') {
//     // Create a p5 image object from the file
//     img = loadImage(file.data, img => {
//       if (windowWidth > windowHeight) {
//         let width_image = (2 / 5) * windowWidth;
//         let height_image = calcHeight(width_image, img);
//         resizeCanvas(width_image, height_image);
//         image(img, 0, 0, width / 2, height);
//         process(img, width / 2, 0, width / 2, height);
//       }
//       else {
//         let width_image = (5 / 6) * windowWidth;
//         let height_image = calcHeight(width_image, img);
//         resizeCanvas(width_image, height_image);
//         image(img, 0, 0, width, height / 2);
//         process(img, 0, height / 2, width, height / 2);
//       }
//     });
//   } else {
//     console.log('Not an image file!');
//     // text("Not an image file", width / 2, height / 2);
//   }
// }

function calcHeight(width, image) {
  let fac = image.height / image.width;
  return fac * width;
}

function process(img, x, y, sx, sy) {
  let processed_img = createImage(img.height, img.width);
  processed_img.loadPixels();
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      index = (x + y * img.width) * 4;
      // Color inversion
      // Other effects needed here
      let r = 255 - img.pixels[index];
      let g = 255 - img.pixels[index + 1];
      let b = 255 - img.pixels[index + 2];
      let a = img.pixels[index + 3];
      processed_img.pixels[index] = r;
      processed_img.pixels[index + 1] = g;
      processed_img.pixels[index + 2] = b;
      processed_img.pixels[index + 3] = a;
    }
  }
  processed_img.updatePixels();
  image(processed_img, x, y, sx, sy);
}

function draw() {
}