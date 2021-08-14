let box1 = document.getElementById('box1');
let box2 = document.getElementById('box2');
let submit = document.getElementById('submitBtn');


submit.addEventListener('click', (e) => {
    let input = document.getElementById('inputText').value;
    if(input > 2000 || input < 10) return;  
    e.preventDefault();
    box1.innerHTML = "";
    box2.innerHTML = ""
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
});

