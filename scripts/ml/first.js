let mobileNetClassifier;
let video;

const canvas = document.getElementById("video");

function modelReady() {
  console.log("MobileNet model is ready");
  mobileNetClassifier.predict(results);
}

function results(error, result) {
  var p = document.getElementById("p1");
  if (error) {
    p.innerHTML = "Unexpected error! Please refresh the page.";
  } else {
    console.log(result[0]);

    predicted_labels = result[0].label;
    prediction_confidence = result[0].confidence * 100;
    prediction_confidence = prediction_confidence.toFixed(2);

    if (result[0].confidence < 0.5) {
      p.innerHTML = "Unable to predict. (" + predicted_labels + " <50% confidence)";
    } else {
      p.innerHTML = "Prediction is: " + predicted_labels + " (" + prediction_confidence + ")";
    }
  }
  mobileNetClassifier.predict(results);
}

function setup() {
  createCanvas(600, 450, P2D, canvas);
  video = createCapture(VIDEO);
  video.hide();
  mobileNetClassifier = ml5.imageClassifier('MobileNet', video, modelReady);
}

function draw() {
  img = image(video, 0, 0, width, height);
}