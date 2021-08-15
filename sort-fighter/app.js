let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let submit = document.getElementById('submitBtn');
let start =  document.getElementById('startBtn');

submit.addEventListener('click', (e) => {
    let input = document.getElementById('inputText').value;
    if(input > 400 || input < 10) return;  
    e.preventDefault();
    createBox(box1, box2, input);
});

start.addEventListener('click', (e) => {
    let input = document.getElementById('inputText').value;
    if(input > 400 || input < 10) return;  
    e.preventDefault();
    let option1 = document.getElementById('option1').value;
    let option2 = document.getElementById('option2').value;
    switch(option1){
        case 'bubble':  bubbleSort(box1);
                        break;
        case 'insertion' :  insertionSort(box1);
                        break;    
        case 'selection' :  selectionSort(box1);
                        break;
            
    }
    switch(option2){
        case 'bubble':  bubbleSort(box2);
                        break;
        case 'insertion' : insertionSort(box2);
                        break;
        case 'selection' :  selectionSort(box2);
                        break;
    }
})

function createBox(box1, box2, input){
    box1.innerHTML = "";
    box2.innerHTML = "";
    for(let i = 0 ; i < input ; i++){
        let newelement = document.createElement('div');
        newelement.className = 'box';
        let width = 100/input;
        let randomHeight = Math.random()*100 +1;
        newelement.style.height = randomHeight + "%";
        newelement.style.width =  width+"%";
        box1.appendChild(newelement);   
    }  
    box2.innerHTML = box1.innerHTML;
}

async function bubbleSort(someBox){
    stopAllThis();
    let box = someBox.getElementsByClassName('box');
    let input = document.getElementById('inputText').value;
    let i, j;
    for(i = 0 ; i < input ; i++){
        for(j = 0; j < (input-1)-i; j++){
                let heightj = parseFloat(box[j].style.height)
                let heightj1 = parseFloat(box[j+1].style.height);
                box[j].style.backgroundColor = 'red';
                box[j+1].style.backgroundColor = 'green';
                if(heightj > heightj1){
                    let temp = box[j].style.height;
                    box[j].style.height = box[j+1].style.height;
                    box[j+1].style.height = temp;
                    box[j].style.backgroundColor = 'green';
                    box[j+1].style.backgroundColor = 'red';
                }
                await waitForMe(0);
                box[j].style.backgroundColor = 'black';
                box[j+1].style.backgroundColor = 'black'; 
        }
    }

}

async function insertionSort(gimmeBox){
    stopAllThis();
    let box = gimmeBox.getElementsByClassName('box');
    let input = document.getElementById('inputText').value;
    for(let i = 1 ; i < input ; i++){
        let unPureTemp = box[i].style.height;
        let temp = parseFloat(box[i].style.height)
        let j = i-1;

        while(j >= 0 && temp < parseFloat(box[j].style.height)){
            box[i].style.backgroundColor = "red"
            box[j+1].style.height = box[j].style.height;
            box[j].style.backgroundColor = "lightblue"
            box[j+1].style.backgroundColor = "yellow"
            j--;
            await waitForMe(0);
            box[j+1].style.backgroundColor = "black"
            box[j+2].style.backgroundColor = "black"
        }
        box[i].style.backgroundColor = "black"
        box[j+1].style.height = unPureTemp;
    }
}

async function selectionSort(changethisBox){
    stopAllThis();
    let box = changethisBox.getElementsByClassName('box');
    let input = document.getElementById('inputText').value;
    let i, j;
    for( i = 0 ; i< input ; i++){
        let min_index = i;
        for( j = i+1; j < input ; j++){
            let min_indexHeight = parseFloat(box[min_index].style.height); 
            let currentJHeight = parseFloat(box[j].style.height);
            if(min_indexHeight > currentJHeight){
               min_index =  j;
            }
            box[min_index].style.backgroundColor = 'red';
            box[j].style.backgroundColor = 'yellow';
            await waitForMe(0);
            box[min_index].style.backgroundColor = 'black';
            box[j].style.backgroundColor = 'black';
        }
        let temp = box[min_index].style.height;
        box[min_index].style.height = box[i].style.height;
        box[i].style.height = temp;
    }

}
function stopAllThis(){
    submit.disabled = true;
}
async function waitForMe(ms){
    return new Promise(res=>{
        setTimeout(()=>res(''), ms)
    })
}