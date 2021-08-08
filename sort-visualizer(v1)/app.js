let displayScreen = document.getElementById('displayScreen');
let startBtn = document.getElementById('start');
let submitBtn = document.getElementById('submitBtn');
let shuffleBtn = document.getElementById('shuffle');



//----------------------------------Event Listners

//On submit grab the input value
// displayScreen.innerHTML = ''; will empty box and generate new boxes
submitBtn.addEventListener('click', (e)=>{
    let n_run = document.getElementById('noOfBox').value;
    if(n_run <5 || n_run>1000) return;
    e.preventDefault();
    displayScreen.innerHTML = ''
    runNTimes(n_run);   
})

startBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    let n_run = document.getElementById('noOfBox').value;
    let boxes = document.getElementsByClassName('box');
    let j;
    let i;
    for(i = 0 ; i < n_run; i++){
        for(j = 0 ; j < n_run + 1-i ; j++){
            let jheight = parseFloat(boxes[j].style.height);
            let j1height = parseFloat(boxes[j+1].style.height);
            if(jheight > j1height){
                let temp = jheight;
                jheight = j1height;
                j1height = temp;
                boxes[j].style.width = jheight+"%";
                boxes[j+1].style.width = j1height+"%";
            }
        }
    }
})


//-----------------------------------Functions:
//Run n times
async function runNTimes(n_time){
    for(let i = 0 ; i< n_time; i++){
        await waitTill(5);
        generateElement(n_time)
    }
}


// generate single random box
function generateElement(nfactor){
    let createElement = document.createElement('div');
    createElement.className = 'box'
    let randheight = Math.random()*99 + 1;
    let setwidth = 100/nfactor;
    createElement.style.width = setwidth+"%"
    createElement.style.height = randheight+"%"
    displayScreen.appendChild(createElement)
}

//Delay for-loop
async function waitTill(ms){
    return new Promise(res=>{
        setTimeout(()=>res(''), ms);
    })
}