// a simple 8 ball based on the math.random lib, using an array of x amount of elements sourced from the page's base. 

// global variables and constants 

// main json url
const url = "https://mm-e.github.io/js_MME_magic8ball/assets/json/answers.json"
// for local dev: const url = "../assets/json/answers.json"


let vUser = localStorage.getItem("username");
let vhasAsked = false;
const oButtonAsk = document.getElementById('button-ask');
const oAnswerBox = document.getElementById('bottom-box');
const oBallSpace = document.getElementById('ball-space');
const oTopText = document.getElementById('activityShow');

// functions  

function doSaveName(vNameValue) {
    if (document.getElementById('name-box').value == "" || document.getElementById('name-box').value == "\"\"") {
        alert("I need a name. Try again and then hit save.");
        return false;
    } else{
        localStorage.setItem("username", JSON.stringify(vNameValue));
        location.reload();
        return true;
    }
}

function doAsk() {
    let vSelection = 0; // random index based on the length of the array of answers
    try {
        if (document.getElementById('question-box').value == "") {
            oAnswerBox.innerHTML = say(`You need to ask something. Try again.`)
            vhasAsked = true;
            setTimeout(() => {
                sayHi();
                vhasAsked = false;
            }, 1500);
            return false; // exit function
        }
    } catch {
        
    }
    if (vhasAsked) { 
        //exit the function because this user needs to restart
        location.reload(); // reload page
        return false; // exit function
    }
    oButtonAsk.innerText="Reset"
    vhasAsked = true;
    vSelection = Math.ceil(Math.random() * aAnswers.length);
    oAnswerBox.innerHTML = say('Thinking...');
    setTimeout(() => {
        oAnswerBox.innerHTML = say(`Wait for it...`);
    }, 850)
    setTimeout(() => {
        oAnswerBox.innerHTML = say(aAnswers[vSelection].answer);
    }, 1700)
    return true;
}

function say(vMsg) { 
    return `<div class="reg-text" style="padding: 0.0rem; background-color: rgba(255,255,255,0.8); border-radius: 15px;">${vMsg}</div>`
}

function sayHi() {
    if (vUser == "" || vUser == null) {
        oAnswerBox.innerHTML = `
        <div class="reg-text" style="padding: 0.0rem; background-color: rgba(255,255,255,0.8); border-radius: 15px; line-height:1.4rem;">
            <b style="font-size:1rem !important;">Hello. It looks like you are new here. <br> Type your name below and hit save</b><br><br>
            <input type="text"; title="type your name here" class="flex-button" id="name-box">
            <div class="flex-button" title="Hit me to save your name" onclick="doSaveName(document.getElementById('name-box').value)"> 
                Save 
            </div>
        </div>`
    } else {
        oAnswerBox.innerHTML = `
        <div class="reg-text" style="padding: 0.0rem; background-color: rgba(255,255,255,0.8); border-radius: 15px;">
            <b>Hello, ${vUser.toString().slice(1,-1)}.</b><br>
            Ask me a question:<br>
            <input type="text"; title="type your question here" class="flex-button" id="question-box">
        </div>`
        oButtonAsk.addEventListener('click', (event) => {
        try {
            doAsk();
            return event.name;
        } catch {
            return event.name;
        }
        });
    }
}

// main code 

let aAnswers = [];

function getCat() {
    
    (function () {
    fetch('https://catfact.ninja/fact?max_length=140')
    .then(response => response.json())
    .then(json => {
        oTopText.innerHTML = `I know lots about cats too. Did your know that ${json.fact.slice(0,-1)}?`
    })
    })();
    return true;    
}

(function() {
    fetch(url)
    .then(response => response.json())
    .then(json => {
        aAnswers = [...json];
    })
    })();


setTimeout(() => {
    sayHi();
}, 1000)

oAnswerBox.innerHTML = say(`Aligning planets and consulting the oracle...`);

setTimeout(() => {
    setInterval(getCat(),15000)
}, 1000)
