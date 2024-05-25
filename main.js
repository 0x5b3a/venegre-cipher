import { app, toDecryptBtn, dynamicLabel, toEncryptBtn, inputBox, showBox, keyword } from './src/elements';
import { createGrid } from './src/grid';
import { chars, randomChar } from './src/random';

import { ALPHABETS, NUMBERS, createENC_KEY, encryption, mergeUniqueStrings, decryption, generateVMatrix } from './src/vengere';

import './src/createIcons'
/* #################### GRID ########################## */

// get grid parent
const grid = document.getElementById("grid")

// create dynamic grid
createGrid(grid)

// get grid tiles
let tiles = document.querySelectorAll(".tile")

// re-generate grid whenerver the window size is changed
window.onresize = () => {
    
    createGrid(grid)
    
    // get new grid-tiles
    tiles = document.querySelectorAll(".tile")

}

/* ######### INTERVAL & MATRIX CHARS ASSIGNMENT ########### */

// defines varaible for interval
let interval;

// defines delay for interval
let delay = 500

// immediate assign letters to tiles on window load
handleInterval()

// start interval
interval = setInterval(handleInterval,delay)


// re-start interval whenever body size is changed
document.body.addEventListener("resize",()=>{
    handleInterval()
    interval = setInterval(handleInterval,delay)
    if (interval) {
        clearInterval(interval)
        interval = setInterval(handleInterval,delay)
    } else {
        interval = setInterval(handleInterval,delay)
    }
})

/* ######################### MAIN LOGIC ################## */
let KEYWORD;
let TEXT;
toDecryptBtn.onclick = e =>{
    e.preventDefault();
    KEYWORD = String(keyword.value).split(" ").join("").toUpperCase();
    TEXT = String(inputBox.value).split(" ").join("").toUpperCase();
    if (KEYWORD && TEXT && isAlphanumeric(TEXT) && isAlphanumeric(KEYWORD)) {

        const ENC_KEY = createENC_KEY(TEXT,KEYWORD);

        const KEY_STR = mergeUniqueStrings([NUMBERS,KEYWORD,ALPHABETS])
        
        const VMAT = generateVMatrix(KEY_STR);

        const DECTEXT =decryption(TEXT,ENC_KEY,KEY_STR,VMAT)
        showBox.innerText = DECTEXT;
        showBox.style.color = "hsl(0, 96%, 60%)";
        dynamicLabel.innerText = "Decrypted Text";
    } else {
        alert("ONLY ALPHABETS AND NUMBERS ARE ALLOWED")
    }
}

toEncryptBtn.onclick = e =>{
    e.preventDefault()
    KEYWORD = String(keyword.value).split(" ").join("").toUpperCase();
    TEXT = String(inputBox.value).split(" ").join("").toUpperCase();
    if (KEYWORD && TEXT && isAlphanumeric(TEXT) && isAlphanumeric(KEYWORD)) {

        const ENC_KEY = createENC_KEY(TEXT,KEYWORD);

        const KEY_STR = mergeUniqueStrings([NUMBERS,KEYWORD,ALPHABETS])
        
        const VMAT = generateVMatrix(KEY_STR);

        const ENCTEXT = encryption(TEXT,ENC_KEY,KEY_STR,VMAT)
        showBox.innerText = ENCTEXT;
        dynamicLabel.innerText = "Encrypted Text"
        showBox.style.color = "hsl(120, 70%, 60%)";
    } else {
        alert("ONLY ALPHABETS AND NUMBERS ARE ALLOWED")
    }
}



/******************** FUNCTIONS ************************/
function handleInterval() {
    /* set random opacity to each grid-tile & assign random letter to each grid-tile */
    tiles.forEach((e)=>{
        e.style.setProperty("--opacity",(Math.random()* 0.4).toPrecision(1)/3)
        e.innerHTML = randomChar(chars)
    })
}

function isAlphanumeric(str) {
    /********** CHECK STRING IS ALPHA-NUMERIC ***********/
    return /^[a-zA-Z0-9]+$/.test(str);
}


const links = document.querySelectorAll(".link-item")
links.forEach((e)=>{
   e.style.setProperty("--color",e.dataset.color)
})