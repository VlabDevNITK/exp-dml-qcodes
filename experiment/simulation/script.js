let simsubscreennum = 0;
let temp = 0;


const questionOptions = [
    { id: 1, text: "QRA?", code: "--.- .-. .- ..--..", question: "What is the name (or call sign) of your station?"},
    { id: 2, text: "QRG?", code: "--.- .-. --. ..--..", question: "Will you tell me my exact frequency (or that of...)?"},
    { id: 3, text: "QRH?", code: "--.- .-. .... ..--..", question: "Does my frequency vary?"},
    { id: 4, text: "QRI?", code: "--.- .-. .. ..--..", question: "How is the tone of my transmission?"},
    { id: 5, text: "QRJ?", code: "--.- .-. .--- ..--..", question: "How many voice contacts do you want to make?"},
    { id: 6, text: "QRK?", code: "--.- .-. -.- ..--..", question: "What is the readability of my signals?"},
    { id: 7, text: "QRL?", code: "--.- .-. .-.. ..--..", question: "Are you busy? \nIs the frequency in use?"},
    { id: 8, text: "QRM?", code: "--.- .-. -- ..--..", question: "Do you have interference?"},
    { id: 9, text: "QRN?", code: "--.- .-. -. ..--..", question: "Are you troubled by static?"},
    { id: 10, text: "QRO?", code: "--.- .-. --- ..--..", question: "Shall I increase power?"},
    { id: 11, text: "QRP?", code: "--.- .-. .--. ..--..", question: "Shall I decrease power?"},
    { id: 12, text: "QRQ?", code: "--.- .-. --.- ..--..", question: "Shall I send Master?"},
    { id: 13, text: "QRS?", code: "--.- .-. ... ..--..", question: "Shall I send more slowly?"},
    { id: 14, text: "QRT?", code: "--.- .-. - ..--..", question: "Shall I cease or suspend operation? \n shutoff the radio ?"},
    { id: 15, text: "QRU?", code: "--.- .-. ..- ..--..", question: "Do you have you anything for me?"},
    { id: 16, text: "QRV?", code: "--.- .-. ...- ..--..", question: "Are you ready?"},
    { id: 17, text: "QRW?", code: "--.- .-. .-- ..--..", question: "Shall I advise...that you are calling him on...kHz?"},
    { id: 18, text: "QRX?", code: "--.- .-. -..- ..--..", question: "When will you call me back?"},
    { id: 19, text: "QRZ?", code: "--.- .-. --.. ..--..", question: "Who was calling me?"},
    { id: 20, text: "QSA?", code: "--.- ... .- ..--..", question: "What is the strength of my signals?"},
    { id: 21, text: "QSB?", code: "--.- ... -... ..--..", question: "Is my signal fading?"},
    { id: 22, text: "QSD?", code: "--.- ... -.. ..--..", question: "Is my keying defective?"},
    { id: 23, text: "QSG?", code: "--.- ... --. ..--..", question: "Shall I send ... telegrams (messages) at a time?"},
    { id: 24, text: "QSK?", code: "--.- ... -.- ..--..", question: "Can you hear me between your signals?"},
    { id: 25, text: "QSL?", code: "--.- ... .-.. ..--..", question: "Can you confirm reception?"},
    { id: 26, text: "QSM?", code: "--.- ... -- ..--..", question: "Shall I repeat the last telegram (message) which I sent you, or some previous telegram (message)?"},
    { id: 27, text: "QSN?", code: "--.- ... -. ..--..", question: "Did you hear me (or ... (call sign)) on .. kHz (or MHz)?"},
    { id: 28, text: "QSO?", code: "--.- ... --- ..--..", question: "Can you make contact with...(me)?"},
    { id: 29, text: "QSP?", code: "--.- ... .--. ..--..", question: "Will you relay a message to ...?"},
    { id: 30, text: "QSR?", code: "--.- ... .-. ..--..", question: "Do you want me to repeat my call?"},
    { id: 31, text: "QSS?", code: "--.- ... ... ..--..", question: "What working frequency will you use?"},
    { id: 32, text: "QST?", code: "--.- ... - ..--..", question: "-"},
    { id: 33, text: "QSU?", code: "--.- ... ..- ..--..", question: "Shall I send or reply on this frequency or on.....kHz with ...emission of class?"},
    { id: 34, text: "QSW?", code: "--.- ... .-- ..--..", question: "Will you send on this frequency or on ...khz with...emission of class?"},
    { id: 35, text: "QSX?", code: "--.- ... -..- ..--..", question: "Can you listen on...?"},
    { id: 36, text: "QSY?", code: "--.- ... -.-- ..--..", question: "Shall I start transmitting on another frequency?"},
    { id: 37, text: "QSZ?", code: "--.- ... --.. ..--..", question: "Shall I send each word or group twice?"},
    { id: 38, text: "QTA?", code: "--.- - .- ..--..", question: "Shall I cancel telegram (message) No.	as if it had not been sent? "},
    { id: 39, text: "QTC?", code: "--.- - -.-. ..--..", question: "Do you have a message for me?"},
    { id: 40, text: "QTH?", code: "--.- - .... ..--..", question: "What is your location (latitude and longitude or by name of the location)?"},
    { id: 41, text: "QTR?", code: "--.- - .-. ..--..", question: "What is the exact time?"},
    { id: 42, text: "QTU?", code: "	--.- - ..- ..--..", question: "At what times are you operating?"},
    { id: 43, text: "QTX?", code: "--.- - -..- ..--..", question: "Will you keep your station open for further communication with me until further notice (or until... hours)?"},
    { id: 44, text: "QUA?", code: "--.- ..- .- ..--..", question: "Have you news of ... (call sign)?"},
    { id: 45, text: "QUC?", code: "--.- ..- -.-. ..--..", question: "What is the number (or other indication) of the last message you received from me (or from ... (call sign))?"},
    { id: 46, text: "QUD?", code: "--.- ..- -.. ..--..", question: "Have you received the urgency signal sent by ... (call sign of mobile station)?"},
    { id: 47, text: "QUE?", code: "--.- ..- . ..--..", question: "Can you speak in ... (language), - with interpreter if necessary; if so, on what frequencies?"},
    { id: 48, text: "QUF?", code: "--.- ..- ..-. ..--..", question: "Have you received the distress signal sent by ... (call sign of mobile station)?"}
];


const answerOptions = [
    { id: 1, text: "QRA", code: "--.- .-. .-", question: "The name (or call sign) of my station iS ..."},
    { id: 2, text: "QRG", code: "--.- .-. --.", question: "Your exact frequency (or that of... ) is ... kHz (or MHz)."},
    { id: 3, text: "QRH", code: "--.- .-. ....", question: "Your frequency varies."},
    { id: 4, text: "QRI", code: "--.- .-. ..", question: "The tone of your transmission is....  \n1.Good \n2.Variable \n3.Bad"},
    { id: 5, text: "QRJ", code: "--.- .-. .---", question: "I want to make ... voice contacts."},
    { id: 6, text: "QRK", code: "--.- .-. -.-", question: "The readability of your signals is: \n1:Bad \n2:Fairly bad \n3:Reasonably good \n4:Good \n5:Excellent"},
    { id: 7, text: "QRL", code: "--.- .-. .-..", question: "I am busy. \nThe frequency  is in use."},
    { id: 8, text: "QRM", code: "--.- .-. --", question: "i am interfered with. \n1:I am not all interfered with \n2:Slightly \n3:Moderately \n4:Strongly \n5:very strongly"},
    { id: 9, text: "QRN", code: "--.- .-. -.", question: "I am bothered by atmospherics \n1:Not at all \n2:Slightly \n3:Moderately \n4:Strongly \n5:Very Strongly"},
    { id: 10, text: "QRO", code: "--.- .-. ---", question: "Increase power."},
    { id: 11, text: "QRP", code: "--.- .-. .--.", question: "Decrease power."},
    { id: 12, text: "QRQ", code: "--.- .-. --.-", question: "Send faster (... wpm)"},
    { id: 13, text: "QRS", code: "--.- .-. ...", question: "Send more slowly (... wpm)"},
    { id: 14, text: "QRT", code: "--.- .-. -", question: "I am suspending operation./n shutting off the radio"},
    { id: 15, text: "QRU", code: "--.- .-. ..-", question: "I have nothing for you."},
    { id: 16, text: "QRV", code: "--.- .-. ...-", question: "I am ready."},
    { id: 17, text: "QRW", code: "--.- .-. .--", question: "Please advise...that I am calling him on kHz."},
    { id: 18, text: "QRX", code: "--.- .-. -..-", question: "Please standby/ I will call you again at ... (hours) on ... kHz (or MHz)"},
    { id: 19, text: "QRZ", code: "--.- .-. --..", question: "You are being called by ... on ... kHz (or MHz)"},
    { id: 20, text: "QSA", code: "--.- ... .-", question: "The strength of your signals is: \n1:Bad \n2:Fairly bad \n3:Reasonable good \n4:Good \n5:Excellent"},
    { id: 21, text: "QSB", code: "--.- ... -...", question: "Your signal is fading."},
    { id: 22, text: "QSD", code: "--.- ... -..", question: "Your keying is defective."},
    { id: 23, text: "QSG", code: "--.- ... --.", question: "Send ... telegrams (messages) at a time."},
    { id: 24, text: "QSK", code: "--.- ... -.-", question: "I can hear you between my signals."},
    { id: 25, text: "QSL", code: "--.- ... .-..", question: "I confirm reception."},
    { id: 26, text: "QSM", code: "--.- ... --", question: "Repeat the last telegram (message) which you sent me (or telegrams messages) numbers ...)."},
    { id: 27, text: "QSN", code: "--.- ... -.", question: "I did hear you (or ... (call sign)) on ..kHz (or MHz)."},
    { id: 28, text: "QSO", code: "--.- ... ---", question: "I can make contact with...(you)."},
    { id: 29, text: "QSP", code: "--.- ... .--.", question: "I will relay a message to ... ."},
    { id: 30, text: "QSR", code: "--.- ... .-.", question: "Please repeat your call; I did not hear you."},
    { id: 31, text: "QSS", code: "--.- ... ---", question: "I will use the working frequency ... kHz (or MHz)."},
    { id: 32, text: "QST", code: "--.- ... -", question: "Here is a broadcast message to all amateurs."},
    { id: 33, text: "QSU", code: "--.- ... ..-", question: "Send or reply on this frequency or on...kHz with...emission of class."},
    { id: 34, text: "QSW", code: "--.- ... .--", question: "I am going to send on this frequency or on...kHz with...emission of class."},
    { id: 35, text: "QSX", code: "--.- ... -..-", question: "Listen on..."},
    { id: 36, text: "QSY", code: "--.- ... -.--", question: "Start transmitting on...  \nAlso:change frequency(to...)."},
    { id: 37, text: "QSZ", code: "--.- ... --..", question: "Send each word or group twice."},
    { id: 38, text: "QTA", code: "--.- - .-", question: "Cancel telegram (message) No. as if it had not been sent."},
    { id: 39, text: "QTC", code: "--.- - -.-.", question: "I have a message for you."},
    { id: 40, text: "QTH", code: "--.- - ....", question: "My location is...latitude and longitude \nor:my location is..."},
    { id: 41, text: "QTR", code: "--.- - .-.", question: "The exact time is..."},
    { id: 42, text: "QTU", code: "	--.- - ..-", question: "I am operating from ... to ... hours."},
    { id: 43, text: "QTX", code: "--.- - -..-", question: "I will keep my station open for further communication with you until further notice (or until ... hours)."},
    { id: 44, text: "QUA", code: "--.- ..- .-", question: "Here is news of ... (call sign)."},
    { id: 45, text: "QUC", code: "--.- ..- -.-.", question: "The number (or other indication) of the last message I received from you (or from ... (call sign)) is ..."},
    { id: 46, text: "QUD", code: "--.- ..- -..", question: "I have received the urgency signal sent by ... (call sign of mobile station) at ... hours."},
    { id: 47, text: "QUE", code: "--.- ..- .", question: "I can speak in ... (language) on ... kHz (or MHz)."},
    { id: 48, text: "QUF", code: "--.- ..- ..-.", question: "I have received the distress signal sent by ... (call sign of mobile station) at ... hours."},
];


//for nav next
function navNext() {
    const inputElement = document.getElementById('dropdown');
    const selectedOptionId = inputElement.value;
    const mandatoryMessage = document.getElementById('mandatoryMessage');

    if (selectedOptionId === "") {
        mandatoryMessage.style.display = 'block';
        // setTimeout(function () {
        //     mandatoryMessage.style.display = 'none';
        // }, 3000);
    } else {
        mandatoryMessage.style.display = 'none';
        for (let temp = 0; temp < 2; temp++) {
            document.getElementById('canvas' + temp).style.visibility = 'hidden';
        }
        simsubscreennum += 1;
        document.getElementById('canvas' + simsubscreennum).style.visibility = 'visible';
        document.getElementById('nextButton').style.visibility = 'hidden';
    }
}



//for result box and q box
function select() {
    const inputElement1 = document.getElementById('dropdown');
    const inputElement2 = document.getElementById('dropdown2');
    const toggle1 = document.getElementById('toggle');
    const toggle2 = document.getElementById('toggle2');
    const resultbox = document.getElementById('resultbox');
   
    const qbox = document.getElementById('qbox');
    const resultbox1 = document.getElementById('resultbox1');
    
  
  
    
    const selectedOptionId1 = inputElement1.value;
    const selectedOptionId2 = inputElement2.value;

    let selectedOption1 = null;
    let selectedOption2 = null;

    if (toggle1.checked) {
        selectedOption1 = answerOptions.find(option => option.id === parseInt(selectedOptionId1));
      
    } else {
        selectedOption1 = questionOptions.find(option => option.id === parseInt(selectedOptionId1));
    }

    if (toggle2.checked) {
        selectedOption2 = answerOptions.find(option => option.id === parseInt(selectedOptionId2));
        
    } else {
        selectedOption2 = questionOptions.find(option => option.id === parseInt(selectedOptionId2));
        
    }

    if (inputElement2.value) {
        if (selectedOption2) {
            resultbox.textContent = selectedOption2.text;
            qbox.innerHTML = selectedOption2.question.replace(/\n/g, '<br>'); // Replace \n with <br> for line breaks
            
            console.log(qbox.innerHTML);
           
           
           
           
        }
    } else if (selectedOption1) {
        resultbox.textContent = selectedOption1.text;
        qbox.innerHTML = selectedOption1.question.replace(/\n/g, '<br>'); // Replace \n with <br> for line breaks
        console.log(qbox.innerHTML);
        console.log(resultbox1.textContent );
       
    } else {
        resultbox.textContent = "";
        qbox.textContent = "";
    }

    // Update resultbox1
    if (selectedOption2) {
        resultbox1.textContent = selectedOption2.text;
        console.log(resultbox1.textContent );
     
        loopButton.style.display = "none";
       
        

    } else if (selectedOption1) {
        resultbox1.textContent = selectedOption1.text;
        loopButton.style.display = "none";
     
       
        
    } else {
        resultbox1.textContent = "";
    }
}

document.getElementById('dropdown').onchange = select;
document.getElementById('dropdown2').onchange = select;
document.getElementById('toggle').onchange = select;
document.getElementById('toggle2').onchange = select;
select();

document.getElementById('dropdown').onchange = select;
document.getElementById('dropdown2').onchange = select;
document.getElementById('toggle').onchange = select;
document.getElementById('toggle2').onchange = select;
select();








//for dropdown and toggle 
const dropdown1 = document.getElementById("dropdown");
const toggle1 = document.getElementById("toggle");
const dropdown2 = document.getElementById("dropdown2");
const toggle2 = document.getElementById("toggle2");

let selectedOptionId1 = null;
let selectedOptionId2 = null;

function updateDropdownOptions(dropdown, toggle, selectedOptionId) {
    dropdown.innerHTML = "";
    const allOptions = toggle.checked ? answerOptions : questionOptions;

    allOptions.forEach((option) => {
        const optionElement = document.createElement("option");
        optionElement.value = option.id;
        optionElement.textContent = option.text;
        dropdown.appendChild(optionElement);

        if (option.id === selectedOptionId) {
            dropdown.value = option.id;
            enablePlayButton();
        }
    });
}

function synchronizeDropdowns() {
    dropdown2.value = dropdown1.value;
    selectedOptionId2 = parseInt(dropdown2.value);
    updateDropdownOptions(dropdown2, toggle2, selectedOptionId2);
}

function synchronizeToggles() {
    toggle2.checked = toggle1.checked;
    updateDropdownOptions(dropdown1, toggle1, selectedOptionId1);
    updateDropdownOptions(dropdown2, toggle2, selectedOptionId2);
}

toggle1.addEventListener("change", function () {
    if (dropdown1.value !== "") {
        synchronizeToggles();
        selectedOptionId1 = parseInt(dropdown1.value);
        updateDropdownOptions(dropdown1, toggle1, selectedOptionId1);
    } else {
        mandatoryMessage.style.display = 'block';
        setTimeout(function () {
            mandatoryMessage.style.display = 'none';
        }, 4000);
        toggle1.checked = !toggle1.checked;
    }
});

toggle2.addEventListener("change", function () {
    if (dropdown2.value !== "") {
        toggle1.checked = toggle2.checked;
        selectedOptionId2 = parseInt(dropdown2.value);
        updateDropdownOptions(dropdown2, toggle2, selectedOptionId2);
        synchronizeToggles();
    }
});

dropdown1.addEventListener("change", function () {
    selectedOptionId1 = parseInt(dropdown1.value);
    synchronizeDropdowns();
});

dropdown2.addEventListener("change", function () {
    selectedOptionId2 = parseInt(dropdown2.value);
    synchronizeToggles();
});

selectedOptionId1 = parseInt(dropdown1.value);
selectedOptionId2 = parseInt(dropdown2.value);

updateDropdownOptions(dropdown1, toggle1, selectedOptionId1);
updateDropdownOptions(dropdown2, toggle2, selectedOptionId2);
synchronizeToggles();



function fadeInBox() {
    const boxElement = document.querySelector('.box');
    if (boxElement) {
        boxElement.classList.add('fadeIn');
    }
}

// Call the function when needed
// Call the function after a delay of 2 seconds
setTimeout(fadeInBox, 1800);




// for audio and morse code
// for audio and morse code
let codeIndex = 0;
let playMorseCode = false;
let loopButton = document.getElementById("loop-button");
let codeInterval;
let audioContext;

// Add this line to hide the loop button initially
loopButton.style.display = "none";


function initializeAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function createOscillator(frequency) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, 0);
    oscillator.connect(audioContext.destination);
    return oscillator;
}

function audioPlaybackFinished() {
    if (codeIndex >= code.length) {
        loopButton.style.display = "block";
    }
}

function select2() {
    const inputElement = document.getElementById('dropdown');
    const selectedOptionId = inputElement.value;
    const resultbox = document.getElementById('codebox');
    // console.log("Selected Q code is :" +resultbox1.textContent);
    // console.log("Selected Q code is :" +resultbox.textContent);

   

    const selectedOption = toggle.checked
        ? answerOptions.find(option => option.id === parseInt(selectedOptionId))
        : questionOptions.find(option => option.id === parseInt(selectedOptionId));

    if (selectedOption && playMorseCode) {
        code = selectedOption.code; // Assuming 'code' is a global variable
        codeIndex = 0;
        clearInterval(codeInterval);

        codeInterval = setInterval(function () {
            if (codeIndex < code.length) {
                const currentChar = code[codeIndex];
                resultbox.textContent = code.substring(0, codeIndex + 1);

                if (currentChar === '.') {
                    playDot();
                } else if (currentChar === '-') {
                    playDash();
                }

                codeIndex++;
            } else {
                clearInterval(codeInterval);
                loopButton.style.display = "block";
                enablePlayButton();
            }
        }, 1000);
    } else {
        resultbox.textContent = "";
    }
}

function playDot() {
    const dotOscillator = createOscillator(600);
    dotOscillator.start();
    dotOscillator.stop(audioContext.currentTime + 0.1);
}

function playDash() {
    const dashOscillator = createOscillator(600);
    dashOscillator.start();
    dashOscillator.stop(audioContext.currentTime + 0.3);
}

document.getElementById('dropdown').onchange = select2;

function play() {
    if (!playMorseCode) {
        initializeAudio();
        playMorseCode = true;
        select2();
    }
}

function enablePlayButton() {
    playMorseCode = false;
    if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().then(() => {
            // Close the audio context
        });
    }
}

const playButton = document.getElementById("play");
playButton.addEventListener("click", play);







//for nav previous and reset

let dotAudioElement;
let dashAudioElement;

function resetCurrentPage() {
    if (simsubscreennum === 1) {
    } 
    else if (simsubscreennum === 2) {
    }

    clearInterval(codeInterval);
    if (dotAudioElement) {
        dotAudioElement.pause();
        dotAudioElement.currentTime = 0;
    }
    if (dashAudioElement) {
        dashAudioElement.pause();
        dashAudioElement.currentTime = 0;
    }
}

function clearSelectionsOnCurrentPage() {
    const inputElement = document.getElementById("dropdown");
    inputElement.value = "";
    const codebox = document.getElementById("codebox");
    codebox.innerText = "";
}

function resetLoopButton() {
    loopButton.style.display = "none";
}

function navPrev() {
    clearSelectionsOnCurrentPage();
    resetCurrentPage();
    resetLoopButton();
    document.getElementById("canvas" + simsubscreennum).style.visibility = "hidden";
    simsubscreennum -= 1;
    document.getElementById("canvas" + simsubscreennum).style.visibility = "visible";
    if (simsubscreennum === 0) {
        document.getElementById("nextButton").style.visibility = "hidden";
    }
}

const prevButton = document.getElementById("prevButton");
// prevButton.addEventListener("click", navPrev);