let displayScreen = document.getElementById('displayScreen');
let startBtn = document.getElementById('start');
let submitBtn = document.getElementById('submitBtn');
let alredyClicked = false;
let solved = false;
//----------------------------------Event Listners

// Reminder: add disable for button in submit button
// On submit grab the input value
// displayScreen.innerHTML = ''; will empty box and generate new boxes
submitBtn.addEventListener('click', startTheProcess)

//On start disable all buttons and enjoy lol
startBtn.addEventListener('click', async (e)=>{
    if(alredyClicked){
        startTheProcess(e);
        document.getElementById('startIcon').innerHTML = 'play_arrow'
        alredyClicked = false;
        return;
    }
    e.preventDefault();
    if(solved){
        e.preventDefault();
        document.getElementById('prompt').innerHTML = "It's alredy sorted 😅";   
        return;
    }
    alredyClicked = true;
    document.getElementById('startIcon').innerHTML = 'stop'
    let n_run = document.getElementById('noOfBox').value;
    let boxes = document.getElementsByClassName('box');
    let speed = 1000;
    if(!document.getElementById('fast').selected) speed = 4000;
    if(n_run>100 && speed === 4000) document.getElementById('prompt').innerHTML = "It will be very slow 😬";
    submitBtn.disabled = true;
    let j;
    let i;
   
    try{
    for(i = 0 ; i < n_run; i++){
        for(j = 0 ; j < n_run-1-i ; j++){
            boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, violet)";
            boxes[j+1].style.backgroundImage = "linear-gradient(70deg, blue, cyan)"
            let jheight = parseFloat(boxes[j].style.height);
            let j1height = parseFloat(boxes[j+1].style.height);
            await waitTill(speed/n_run);
            if(!alredyClicked)return;
            if(jheight > j1height){
                let temp = jheight;
                jheight = j1height;
                j1height = temp;
                boxes[j].style.height = jheight+"%";
                boxes[j+1].style.height = j1height+"%";
                boxes[j].style.backgroundImage = "linear-gradient(70deg, blue, cyan)";
                boxes[j+1].style.backgroundImage = "linear-gradient(70deg, blue, violet)";      
            }
            boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)"; 
            boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)"; 
        }
    }
    solved = true;
    if(n_run>100 && speed === 4000) document.getElementById('prompt').innerHTML = "🥵 Welp it was painful";
}
catch(e){
    
}
finally{
    boxes[j].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)"; 
    boxes[j+1].style.backgroundImage = "linear-gradient(0deg, rgb(34, 34, 34), lightgrey)";
    document.getElementById('startIcon').innerHTML = 'play_arrow'
    alredyClicked = false;
    startBtn.disabled = false;
    submitBtn.disabled = false;
}
})

//-----------------------------------Functions:

//
function startTheProcess(e){
    let n_run = document.getElementById('noOfBox').value;
    if(n_run <5 || n_run>1000) return;
    startBtn.disabled = true
    document.getElementById('prompt').innerHTML = ""
    e.preventDefault();
    displayScreen.innerHTML = ''
    for(let i = 0 ; i< n_run; i++){
        generateElement(n_run)
    }
    startBtn.disabled = false
    solved = false;
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

    //let pressedStop = false;
    //let shuffled = false;
    //stopBtn.disabled = true;
    
    // startBtn.disabled = false;
    // stopBtn.disabled = true;
    // submitBtn.disabled = false;
    // shuffled = true;

    //if(!shuffled) return;
    // submitBtn.disabled  = true;
    // startBtn.disabled = true;
    // stopBtn.disabled = false;

    //on stop exit whole function;
    // stopBtn.addEventListener('click', (e)=>{
    //     pressedStop = true;
    //     startTheProcess(e);
    //     submitBtn.disabled  = false;
    //     startBtn.disabled = false;
    //     pressedStop = false;
    //     shuffled = true;
    // })

*/