// function bubbleSort(array) {
//   for (let i = 0; i < array.length - 1; i++) {
//     for (let j = 0; j < array.length - i - 1; j++) {
//       if (array[j] > array[j + 1]) {
//         [array[j], array[j + 1]] = [array[j + 1], array[j]]; // Swap elements
//       }
//     }
//   }
//   return array;
// }

function quickSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const pivotIndex = Math.floor(array.length / 2);
  const pivot = array[pivotIndex];

  const left = array.filter((el) => el < pivot);
  const right = array.filter((el) => el > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}

class Rectangles {
  constructor(arr) {
    this.list = arr;
    this.n = arr.length;
    this.i = 0;
    this.j = 0;
    this.l = width / this.n;
    this.h = (height - 20) / Math.max(...this.list);

    this.bubSor = this.list;
  }
  showBubble() {
    for (let k = 0; k < this.n; k++) {
      if (k == this.j) fill(200, 0, 0);
      else if (k >= this.n - this.i) fill(0, 200, 0);
      else fill(200);
      rect(k * this.l, height, this.l, -this.list[k] * this.h);
      fill(100, 100, 255);
      textSize(this.l * 0.8);
      text(String(this.list[k]), k * this.l, height - this.list[k] * this.h - 5);
    }

  }
  showQuick() {
    for (let k = 0; k < this.n; k++) {
      rect(k * this.l, height, this.l, -this.list[k] * this.h);
    }
  }
  bubbleSort() {
    if (this.i < this.n - 1) {
      if (this.j < this.n - this.i - 1) {
        if (this.bubSor[this.j] > this.bubSor[this.j + 1]) {
          [this.bubSor[this.j], this.bubSor[this.j + 1]] = [this.bubSor[this.j + 1], this.bubSor[this.j]];
        }
        this.j++;
      }
      else {
        this.j = 0;
        this.i++;
      }
    }
    else {
      this.j = N + 1;
      this.i = N + 1;
    }
  }
  quickSort(quiSor = this.list) {
    let pivotIndex, pivot, left, right;
    if (quiSor.length > 1) {
      pivotIndex = Math.floor(quiSor.length / 2);
      pivot = quiSor[pivotIndex];
      left = quiSor.filter((el) => el < pivot);
      right = quiSor.filter((el) => el > pivot);
      quiSor = [...quickSort(left), pivot, ...quickSort(right)];
      console.log(quiSor);
    }
  }
}

let a, nums;
const N = 80;

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  nums = [];
  for (let i = 1; i <= N; i++) nums.push(i);
  nums = shuffleArray(nums);
  a = new Rectangles(nums);
}

function draw() {
  background(30);
  a.showBubble();
  a.bubbleSort();
  a.quickSort();
}