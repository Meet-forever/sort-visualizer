let displayScreen = document.getElementById('displayScreen');
let startBtn = document.getElementById('start');
let submitBtn = document.getElementById('submitBtn');
let stopBtn = document.getElementById('stop');
let pressedStop = false;
let shuffled = false;

//----------------------------------Event Listners

// Reminder: add disable for button in submit button
//On submit grab the input value
// displayScreen.innerHTML = ''; will empty box and generate new boxes
submitBtn.addEventListener('click', (e)=>{
    let n_run = document.getElementById('noOfBox').value;
    if(n_run <5 || n_run>1000) return;
    e.preventDefault();
    displayScreen.innerHTML = ''
    runNTimes(n_run);
    shuffled = true;   
})

//On start disable all buttons and enjoy lol
startBtn.addEventListener('click', async (e)=>{
    e.preventDefault();
    if(!shuffled) return;
    submitBtn.disabled  = true;
    startBtn.disabled = true;
    let n_run = document.getElementById('noOfBox').value;
    let boxes = document.getElementsByClassName('box');
    let j;
    let i;
    let speed = 1000;
    if(!document.getElementById('fast').selected){
        speed = 2000;
    } 
    console.log(speed);
    for(i = 0 ; i < n_run; i++){
        for(j = 0 ; j < n_run-1-i ; j++){
            if(pressedStop) {
                submitBtn.disabled  = false;
                startBtn.disabled = false;
                shuffled = false;
                pressedStop = false;
                return;
            }
            boxes[j].style.backgroundImage = "linear-gradient(70deg, lightblue, cyan)";
            await waitTill(1000/n_run);
            let jheight = parseFloat(boxes[j].style.height);
            let j1height = parseFloat(boxes[j+1].style.height);
            if(jheight > j1height){
                let temp = jheight;
                jheight = j1height;
                j1height = temp;
                boxes[j].style.height = jheight+"%";
                boxes[j+1].style.height = j1height+"%";      
            }
           boxes[j].style.backgroundImage = "linear-gradient(70deg, rgb(34, 34, 34), lightgrey)"; 
        }
    }
    submitBtn.disabled  = false;
    startBtn.disabled = false;
    shuffled = false;
})

//on stop exit whole function;
stopBtn.addEventListener('click', ()=>{
    pressedStop = true;

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

/* Error Zone = number of error I made in code haha...

 // let eleWidthi = choosonOne[0].style.width;
    // let eleWidthj = choosonOne[1].style.width;
    
    // let widthi = parseInt(eleWidthi);
    // console.log(eleWidthi)
    // eleWidthj = eleWidthi  


    // intervalj = setInterval(function(){
    //     if(i>10-1){
    //         clearInterval(intervalj);
    //     }
    //     intervalj1 = setInterval(() => {
    //         if(j> 10-i-1){
    //             clearInterval(intervalj1);
    //         }
    //             let eleWidthj = choosonOne[j].style.width;
    //             console.log(eleWidthj);
    //             let widthj = parseInt(eleWidthj)
    //             let widthj1 = parseInt(choosonOne[j+1].style.width)
    //         if(widthj > widthj1){
    //             let temp = choosonOne[(j+1)].style.width;
    //             choosonOne[(j+1)].style.width = eleWidthj;
    //             choosonOne[j].style.width = temp;
    //         }
    //         console.log("j is running")
    //         j++;
    //     },1000)
    //     console.log("i is running");
    //     i++;
    // },1000);

*/