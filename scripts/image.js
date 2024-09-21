let img;

function setup() {
  let c = createCanvas(260, 200);
  
  background(0);

  // Create a file input element to allow the user to upload an image
  let fileInput = createFileInput(handleFile);
  fileInput.id("inp");
  // fileInput.position(0, 0);  // Position it on the webpage
}

function handleFile(file) {
  // Check if the uploaded file is an image
  if (file.type === 'image') {
    // Create a p5 image object from the file
    img = loadImage(file.data, img => {
      // Display the image on the canvas, resizing it to fit the canvas dimensions

      resizeCanvas(2 * img.width, img.height); // Resize canvas to match the image dimensions
      image(img, 0, 0, width / 2, height);
      let processed_img = process(img);
      image(processed_img, width / 2, 0, width / 2, height);
    });
  } else {
    console.log('Not an image file!');
    text("Not an image file", width / 2, height / 2);
  }
}
function process(image) {

}

function draw() {
  // Optionally add custom drawing behavior here
}