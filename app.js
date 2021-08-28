let displayScreen = document.getElementById("displayScreen");
let startBtn = document.getElementById("start");
let submitBtn = document.getElementById("submitBtn");
let alredyClicked = false;
let solved = false;
let promptThis = document.getElementById("prompt");
//----------------------------------Event Listners

//on page load it will create 10 boxes
window.addEventListener('load', ()=>{
  for (let i = 0; i < 10; i++) {
    generateElement(10);
  }
})

//Starting process will execute and it will create new boxes based on user need
submitBtn.addEventListener("click", startTheProcess);


//On start disable all buttons and enjoy lol
startBtn.addEventListener("click", async (e) => {
  if(solved){
    promptThis.innerHTML = "It's already sorted 😅"
    return;
  }
  if (check()) {
    startTheProcess(e);
    return;
  }
  TurnOn();
  let boxLen = document.getElementById("noOfBox").value;
  let speed = 700;
  if (!document.getElementById("fast").selected) speed = 6000;
  if (boxLen > 100 && speed === 6000) {
    TurnOff();
    return;
  }
  let boxes = document.getElementsByClassName("box");
  let currentSortHeader = document.getElementById("currentSortType").value;
  switch (true) {
    case currentSortHeader === "Bubble Sort":
      await BubbleSort(boxes, boxLen, (speed/boxLen));
      break;
    case currentSortHeader === "Selection Sort":
      await SelectionSort(boxes, boxLen, (speed/boxLen));
      break;
    case currentSortHeader === "Insertion Sort":
      await InsertionSort(boxes, boxLen, (speed/boxLen));
      break;
    case currentSortHeader === "Merge Sort":
      await MergeSort(boxes,0, boxLen-1, (speed/boxLen), e);
      break;
  }
  TurnOff();
});

//-----------------------------------Functions:

//Turn all this before sorting
function TurnOn() {
  promptThis.innerText = "";
  submitBtn.disabled = true;
  alredyClicked = true;
  document.getElementById("startIcon").innerHTML = "stop";
}
//Turn off all this after sorting
function TurnOff() {
  submitBtn.disabled = false;
  alredyClicked = false;
  document.getElementById("startIcon").innerHTML = "play_arrow";
}
function check() {
  if (alredyClicked) {
    TurnOff();
    return true;
  } else {
    return false;
  }
}

//Bubble Sort()
async function BubbleSort(boxes, boxLen, speed) {
  let i, j;
  for (i = 0; i < boxLen; i++) {
    for (j = 0; j < boxLen- 1 - i; j++) {
    boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, violet)";
    boxes[j+1].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
      await waitTill(speed/boxLen);
      if(!alredyClicked){
        boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)"; 
        boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
        promptThis.innerHTML = "";
        solved = false;
        return;
      }
      if (
        parseFloat(boxes[j].style.height) >
        parseFloat(boxes[j + 1].style.height)
      ) {
        let temp = boxes[j].style.height;
        boxes[j].style.height = boxes[j + 1].style.height;
        boxes[j + 1].style.height = temp;
        boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
        boxes[j+1].style.backgroundImage = "linear-gradient(70deg, blue, violet)"; 
        await waitTill(speed/boxLen);
      }
        boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)"; 
        boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    }
  }
  solved = true;
}
//Selection Sort
async function SelectionSort(boxes, boxLen, speed) {
  let i, j;  
  for(i = 0; i < boxLen ; i++){
    let min_index = i;
    await waitTill(speed)
    for(j = i+1 ; j < boxLen; j++){
      if(!alredyClicked){
        promptThis.innerHTML = "";
        solved = false;
        return;
      }
      if(parseFloat(boxes[min_index].style.height) > parseFloat(boxes[j].style.height)){
        min_index = j;
      }
      boxes[min_index].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
      boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, violet)";
      await waitTill(speed)
      boxes[min_index].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
      boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    }
    let temp = boxes[min_index].style.height;
    boxes[min_index].style.height = boxes[i].style.height;
    boxes[i].style.height = temp;
  }
  solved = true;
}
// Insertion Sort
async function InsertionSort(boxes, boxLen, speed) {
  let i, j;
  for(i = 1 ; i < boxLen; i++){
    j = i - 1;
    let temp = boxes[i].style.height;
    await waitTill(speed);
    while(j >= 0 && parseFloat(temp) < parseFloat(boxes[j].style.height)){
      if(!alredyClicked){
        promptThis.innerHTML = "";
        solved = false;
        return;
      }
      boxes[i].style.backgroundImage = "linear-gradient(70deg, red, tomato)";
      boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
      boxes[j+1].style.backgroundimage = "linear-gradient(70deg, blue, violet)";
      boxes[j+1].style.height = boxes[j].style.height;
      await waitTill(speed);
      boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
      boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
      j--;
    }
    boxes[i].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    boxes[j+1].style.height = temp;
  }
  solved = true;
}
//Merge Sort
async function MergeSort(boxes,left, right, speed, e) {
  if(left < right){
    await waitTill(speed);
    let midPoint = Math.floor(left + (right - left)/2);
    await MergeSort(boxes, left, midPoint, speed, e);
    await MergeSort(boxes, midPoint+1, right, speed, e);
    await merge(boxes, left, midPoint, right, speed, e);
  }

}
//After reaching to one box through recursion it will start merging the boxes in a sorted manner
async function merge(boxes, left, midpoint, right, speed, e){

let leftArrayLength = midpoint - left + 1; 
let rightArrayLength = right - midpoint;
let Left = []
let Right = []

for(let i = 0 ; i < leftArrayLength ; i++){
  Left[i] = boxes[left+i].style.height;
}
for(let j = 0 ; j < rightArrayLength ; j++){
  Right[j] = boxes[midpoint+1+j].style.height;
}
let i= 0, j = 0, k = left;
while(i < leftArrayLength && j < rightArrayLength){
  boxes[k].style.backgroundImage ="linear-gradient(70deg, blue, cyan)" ;
  if(!alredyClicked){
    promptThis.innerHTML = "";
    solved = false;
    boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    return;
  }
  if(parseFloat(Left[i]) <= parseFloat(Right[j])){
    boxes[k].style.height = Left[i++];
  }
  else{
    boxes[k].style.height = Right[j++];
  }
  await waitTill(speed);
  boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
  k++;
}
while(i < leftArrayLength){
  boxes[k].style.backgroundImage ="linear-gradient(70deg, blue, cyan)" ;
  await waitTill(speed);
  boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
  boxes[k++].style.height = Left[i++]; 
}
while(j < rightArrayLength){
  boxes[k].style.backgroundImage ="linear-gradient(70deg, blue, cyan)" ;
  await waitTill(speed);
  boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
  boxes[k++].style.height = Right[j++];
  
}
}

//Generate new array
function startTheProcess(e) {
  let n_run = document.getElementById("noOfBox").value;
  promptThis.innerText = "";
  if (n_run < 5 || n_run > 1000) return;
  startBtn.disabled = true;
  e.preventDefault();
  displayScreen.innerHTML = "";
  for (let i = 0; i < n_run; i++) {
    generateElement(n_run);
  }
  startBtn.disabled = false;
  solved = false;
}

// generate single random box
function generateElement(nfactor) {
  let createElement = document.createElement("div");
  createElement.className = "box";
  let randheight = Math.random() * 99 + 1;
  let setwidth = 100 / nfactor;
  createElement.style.width = setwidth + "%";
  createElement.style.height = randheight + "%";
  displayScreen.appendChild(createElement);
}

//Delay for-loop
async function waitTill(ms) {
  return new Promise((res) => {
    setTimeout(() => res(""), ms);
  });
}
