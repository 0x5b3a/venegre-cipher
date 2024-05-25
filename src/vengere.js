import { keyword } from "./elements";

// key word
const KEYWORD = "HELLO"

//alphabets
export const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

//numbers
export const NUMBERS = "0123456789"

// generating key pair alphabet
const KEY_ALPHABET = String(mergeUniqueStrings([NUMBERS,KEYWORD,ALPHABETS]))


// text to encrypt
const TO_ENC = "hello new js".split(" ").join("").toUpperCase()

let vmat = generateVMatrix(KEY_ALPHABET)

let encKey = createENC_KEY(TO_ENC,KEYWORD)

let cipher = encryption(TO_ENC,encKey,KEY_ALPHABET,vmat)

/* *********************** FUNCTIONS ************************ */


function pop_unshift(str) {
    /* remove first element and add it to the last place */

    let tmpArr = [...str];

    // remove the first element and save it's value
    let firstElement = tmpArr.shift()

    // add the firsrt element to the last
    tmpArr.push(firstElement)

    // return new array
    return tmpArr.join("")
}

/******** recursive function to generate vengere matrix ************/

function generateTable(tableHolder,str,loop_count=1,loopCounter=0) {
    if (loopCounter == loop_count) {
        return 0;
    }
        let tmp = pop_unshift(str);
        tableHolder.push(tmp);
        loopCounter++;

        generateTable(tableHolder,tmp,loop_count,loopCounter)
}


/* ***************************** EXPORT FUNCTIONS **************************** */

export function encryption(TO_ENC,ENC_KEY,KEY_ALPHABET,venegreMatrix) {
    /* Encrypts given text using vengre cipher */
    let encodedText = ""
    for (let index = 0; index < TO_ENC.length; index++) {
        let row = KEY_ALPHABET.indexOf(ENC_KEY[index])
        let col = KEY_ALPHABET.indexOf(TO_ENC[index])
        encodedText += venegreMatrix[row][col]
    }
    return encodedText;
}

export function decryption(encodedText,ENC_KEY,KEY_ALPHABET,venegreMatrix) {
    /* DCYRPTS GIVEN VENGERE CIPHER */
    let decodedText = ""
    for (let index = 0; index < encodedText.length; index++) {

        let row = KEY_ALPHABET.indexOf(ENC_KEY[index])
        let VrowNum = venegreMatrix[row].indexOf(encodedText[index])
        let orignalText = KEY_ALPHABET[VrowNum]
        decodedText += orignalText
    }
    return decodedText;
}

export function generateVMatrix(KEY_ALPHABET){
    /* Generate Venegre Matrix */
    let venegreMatrix = [];
    venegreMatrix.push(KEY_ALPHABET)
    generateTable(venegreMatrix,KEY_ALPHABET,KEY_ALPHABET.length-1)

    return venegreMatrix;
}

export function mergeUniqueStrings(array = []) {
    /* merge given strings to create a new string without any duplicates */
    let uniqueSet =[];
    for (const key of array) {
        uniqueSet.push(Array.from(new Set(key.split(""))).join(""));
    }
    return Array.from(new Set(uniqueSet.join(""))).join("")
}

export function createENC_KEY(text,keyword) {

    let ENC_KEY =""

    // generate enc letter key
    let checkLenght = 0
    for (const letter of text) {
        if (checkLenght == keyword.length) {
            checkLenght = 0
        }
        ENC_KEY += keyword[checkLenght]
        checkLenght++
    }
    return ENC_KEY;
}