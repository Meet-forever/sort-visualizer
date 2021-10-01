let displayScreen = document.getElementById("displayScreen");
let startBtn = document.getElementById("start");
let submitBtn = document.getElementById("submitBtn");
let alreadyClicked = false;
let solved = false;
let promptThis = document.getElementById("prompt");
let countthis = 0; // It's whole exsistence is to count merge sort's recursion to check if the boxes are sorted or not
let sortHeading = document.getElementById('written-heading');
let sortDetail = document.getElementById('paragraph-content');
let worstCase = document.getElementById('worst-case');
let bestCase = document.getElementById('best-case');
let averageCase = document.getElementById('average-case');
let imageHandler = document.getElementById('imageHandler')
let themeBtn = document.getElementById("theme-btn");
let themeCheck = false;
let root = document.documentElement;
//----------------------------------Event Listners


//on page load it will create 10 boxes
window.addEventListener('load', ()=>{
  for (let i = 0; i < 10; i++) {
    generateElement(10);
  }
})

//Starting process will execute and it will create new boxes based on user need
submitBtn.addEventListener("click", startTheProcess);

themeBtn.addEventListener('click', (e)=>{
  e.preventDefault();
  if(themeCheck === false){
    document.getElementById('theme').innerText = "light_mode";
    root.style.setProperty('--headcolor', "rgb(110, 110, 110)");
    root.style.setProperty('--backcolor', "rgb(146, 146, 146)");
    root.style.setProperty('--bodycolor', "rgb(119, 119, 119)");
    root.style.setProperty('--fontcolor', "rgb(0, 0, 0)");
    themeCheck = true;
  }
  else{
    document.getElementById('theme').innerText = "dark_mode";
    root.style.setProperty('--headcolor', "rgb(27, 27, 27)");
    root.style.setProperty('--backcolor', "rgb(0, 0, 0)");
    root.style.setProperty('--bodycolor', "rgb(34, 34, 34)");
    root.style.setProperty('--fontcolor', "rgb(255, 255, 255)");
    themeCheck = false;
  }
})

function changeThisWholeThing(){
  let sortCurrentValue = document.getElementById('currentSortType').value;  
  switch(true){
    case  sortCurrentValue === 'Bubble Sort':
      changeBubbleContent();
      break;
    case sortCurrentValue === 'Selection Sort':
      changeSelectionContent();
      break;
    case sortCurrentValue === 'Insertion Sort':
      changeInsertionContent();
      break;
    case sortCurrentValue === 'Merge Sort':
      changeMergeContent();
      break;
  }
}

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
  let boxes = document.getElementsByClassName("box");
  let currentSortHeader = document.getElementById('currentSortType').value; 
  switch (true) {
    case currentSortHeader === "Bubble Sort":
      await BubbleSort(boxes, boxLen);
      changeBubbleContent();
      break;
    case currentSortHeader === "Selection Sort":
      await SelectionSort(boxes, boxLen);
      changeSelectionContent();
      break;
    case currentSortHeader === "Insertion Sort":
      await InsertionSort(boxes, boxLen);
      changeInsertionContent();
      break;
    case currentSortHeader === "Merge Sort":
      await MergeSort(boxes,0, boxLen-1, e);
      changeMergeContent();
      if(countthis === 0) solved = true;
      else countthis = 0;
      break;
  }
  TurnOff();
});

// Change content


//-----------------------------------Functions:

//Turn all this before sorting
function TurnOn() {
  promptThis.innerText = "";
  submitBtn.disabled = true;
  alreadyClicked = true;
  document.getElementById("startIcon").innerHTML = "stop";
}
//Turn off all this after sorting
function TurnOff() {
  submitBtn.disabled = false;
  alreadyClicked = false;
  document.getElementById("startIcon").innerHTML = "play_arrow";
}
function check() {
  if (alreadyClicked) {
    TurnOff();
    return true;
  } else {
    return false;
  }
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//Bubble Sort()
async function BubbleSort(boxes, boxLen) {
  let i, j;
  for (i = 0; i < boxLen; i++) {
    for (j = 0; j < boxLen- 1 - i; j++) {
    boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, violet)";
    boxes[j+1].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
      await waitTill(document.getElementById('speedLevel').value);
      if(!alreadyClicked){
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
        await waitTill(document.getElementById('speedLevel').value);
      }
        boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)"; 
        boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    }
  }
  solved = true;
}

function changeBubbleContent(){
  sortHeading.innerText = 'Bubble Sort';
  sortDetail.innerHTML = `Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list.
  <br/><br/> This simple algorithm performs poorly in real world use and is used primarily as an educational tool. More efficient algorithms such as quicksort, timsort, or merge sort are used by the sorting libraries built into popular programming languages such as Python and Java.`;
  worstCase.innerHTML = `O(n<sup>2</sup>)`;
  averageCase.innerHTML = `O(n<sup>2</sup>)`;
  bestCase.innerHTML = `O(n)`;
  imageHandler.src = 'https://res.cloudinary.com/practicaldev/image/fetch/s--C0CI1OCj--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/ubhywp9xh8zk6on4caql.gif';
}





// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//Selection Sort
async function SelectionSort(boxes, boxLen) {
  let i, j;  
  for(i = 0; i < boxLen ; i++){
    let min_index = i;
    await waitTill(document.getElementById('speedLevel').value)
    for(j = i+1 ; j < boxLen; j++){
      if(!alreadyClicked){
        promptThis.innerHTML = "";
        solved = false;
        return;
      }
      if(parseFloat(boxes[min_index].style.height) > parseFloat(boxes[j].style.height)){
        min_index = j;
      }
      boxes[min_index].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
      boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, violet)";
      await waitTill(document.getElementById('speedLevel').value)
      boxes[min_index].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
      boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    }
    let temp = boxes[min_index].style.height;
    boxes[min_index].style.height = boxes[i].style.height;
    boxes[i].style.height = temp;
  }
  solved = true;
}
function changeSelectionContent(){
  sortHeading.innerText = 'Selection Sort';
  sortDetail.innerHTML  = `In computer science, selection sort is an in-place comparison sorting algorithm. It has an O(n2) time complexity, which makes it inefficient on large lists, and generally performs worse than the similar insertion sort. Selection sort is noted for its simplicity and has performance advantages over more complicated algorithms in certain situations, particularly where auxiliary memory is limited.
  <br/><br/>The algorithm divides the input list into two parts: a sorted sublist of items which is built up from left to right at the front (left) of the list and a sublist of the remaining unsorted items that occupy the rest of the list. Initially, the sorted sublist is empty and the unsorted sublist is the entire input list. The algorithm proceeds by finding the smallest (or largest, depending on sorting order) element in the unsorted sublist, exchanging (swapping) it with the leftmost unsorted element (putting it in sorted order), and moving the sublist boundaries one element to the right.`;
  worstCase.innerHTML = `O(n<sup>2</sup>)`;
  averageCase.innerHTML = `O(n<sup>2</sup>)`;
  bestCase.innerHTML = `O(n<sup>2</sup>)`;
  imageHandler.src = "https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif";  
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
// Insertion Sort
async function InsertionSort(boxes, boxLen) {
  let i, j;
  for(i = 1 ; i < boxLen; i++){
    j = i - 1;
    let temp = boxes[i].style.height;
    await waitTill(document.getElementById('speedLevel').value);
    if(!alreadyClicked){
      promptThis.innerHTML = "";
      solved = false;
      return;
    }
    while(j >= 0 && parseFloat(temp) < parseFloat(boxes[j].style.height)){
      boxes[i].style.backgroundImage = "linear-gradient(70deg, red, tomato)";
      boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
      boxes[j+1].style.backgroundimage = "linear-gradient(70deg, blue, violet)";
      boxes[j+1].style.height = boxes[j].style.height;
      await waitTill(document.getElementById('speedLevel').value);
      boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
      boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
      j--;
    }
    boxes[i].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    boxes[j+1].style.height = temp;
  }
  solved = true;
}

function changeInsertionContent(){
  sortHeading.innerText = 'Insertion Sort';
  sortDetail.innerHTML = `Insertion sort iterates, consuming one input element each repetition, and grows a sorted output list. At each iteration, insertion sort removes one element from the input data, finds the location it belongs within the sorted list, and inserts it there. It repeats until no input elements remain.
  <br/><br/>Sorting is typically done in-place, by iterating up the array, growing the sorted list behind it. At each array-position, it checks the value there against the largest value in the sorted list (which happens to be next to it, in the previous array-position checked). If larger, it leaves the element in place and moves to the next. If smaller, it finds the correct position within the sorted list, shifts all the larger values up to make a space, and inserts into that correct position.`;
  worstCase.innerHTML = `O(n<sup>2</sup>)`;
  averageCase.innerHTML = `O(n<sup>2</sup>)`;
  bestCase.innerHTML = `O(n)`;
  imageHandler.src = "https://upload.wikimedia.org/wikipedia/commons/9/9c/Insertion-sort-example.gif";
}

// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------
//Merge Sort
async function MergeSort(boxes,left, right, e) {
  if(left < right){
    await waitTill(document.getElementById('speedLevel').value);
    let midPoint = Math.floor(left + (right - left)/2);
    countthis++;
    await MergeSort(boxes, left, midPoint, e);
    await MergeSort(boxes, midPoint+1, right, e);
    await merge(boxes, left, midPoint, right);
  }

}
//After reaching to one box through recursion it will start merging the boxes in a sorted manner
async function merge(boxes, left, midpoint, right){

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
  if(!alreadyClicked){
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
  await waitTill(document.getElementById('speedLevel').value);
  boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
  k++;
}

while(i < leftArrayLength){
  boxes[k].style.backgroundImage ="linear-gradient(70deg, blue, cyan)" ;
  await waitTill(document.getElementById('speedLevel').value);
  boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
  boxes[k++].style.height = Left[i++]; 
}
while(j < rightArrayLength){
  boxes[k].style.backgroundImage ="linear-gradient(70deg, blue, cyan)" ;
  await waitTill(document.getElementById('speedLevel').value);
  boxes[k].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
  boxes[k++].style.height = Right[j++];
}
countthis--;
}
function changeMergeContent(){
  sortHeading.innerText = 'Merge Sort';
  sortDetail.innerHTML = `In computer science, merge sort (also commonly spelled as mergesort) is an efficient, general-purpose, and comparison-based sorting algorithm. Most implementations produce a stable sort, which means that the order of equal elements is the same in the input and output. Merge sort is a divide and conquer algorithm that was invented by John von Neumann in 1945.
  <br/><br/>
  Conceptually, a merge sort works as follows:
  <br/>1) Divide the unsorted list into n sublists, each containing one element (a list of one element is considered sorted).
  <br/>2) Repeatedly merge sublists to produce new sorted sublists until there is only one sublist remaining. This will be the sorted list.`;
  worstCase.innerHTML = `O(nlog(n))`;
  averageCase.innerHTML = `O(nlog(n))`;
  bestCase.innerHTML = `O(nlog(n))`;
  imageHandler.src = "https://upload.wikimedia.org/wikipedia/commons/c/cc/Merge-sort-example-300px.gif";
}



// ------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------

// Processing functions


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
  let randheight = Math.random() * 99 + 2;
  let setwidth = 100 / nfactor;
  createElement.style.width = setwidth + "%";
  createElement.style.height = Math.floor(randheight) + "%";
  displayScreen.appendChild(createElement);
}

//Delay for-loop
async function waitTill(ms) {
  return new Promise((res) => {
    setTimeout(() => res(""), ms);
  });
}
