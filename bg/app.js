const clickMe = document.querySelector(".click_me");
const background = document.querySelector('.main_container');
const txtColor = document.querySelector('.color_number');

const simpleBtn = document.querySelector('.simple');
const hexBtn = document.querySelector('.hex');


const colors = ["#D74829","#5BC321","#0D1E71","#0D1E71",'#ED3A9F'];

let hexNum = '';
let hexNumFull = [];
let randomHexUp = '';

hexBtn.addEventListener('click', ()=>{
    simpleBtn.classList.remove('selected');
    hexBtn.classList.add('selected');
    
});

simpleBtn.addEventListener('click', ()=>{
    hexBtn.classList.remove('selected');
    simpleBtn.classList.add('selected');
    
});

clickMe.addEventListener('click', checkMode);


function checkMode() {
    let selected = document.querySelector('.selected');

    if (selected.classList.contains('simple')){
        changeBg();
    } else if (selected.classList.contains('hex')){
        changeRandomBg();
    }
    
}





function changeBg() {
    const pickedColor = Math.floor(Math.random() * colors.length)
    console.log(pickedColor);
    background.style.backgroundColor = colors[pickedColor];
    
    txtColor.innerHTML = colors[pickedColor]
};



function changeRandomBg() {
    randomColor();

    background.style.backgroundColor = randomHexUp;
    txtColor.innerHTML = randomHexUp;
    
    hexNumFull = [];

}


function randomColor() {

    for (let i = 0; i < 3; i++) {
        let rgbNum = Math.floor(Math.random() * 255 + 1);
        
        if (rgbNum <= 15) {
            hexNum = '0' + rgbNum.toString(16);
        } else {
            hexNum = rgbNum.toString(16);
        };

        hexNumFull.push(hexNum);    
    }

    let randomHex = "#" + hexNumFull[0] + hexNumFull[1] + hexNumFull[2];

    randomHexUp = randomHex.toUpperCase();
       
}








