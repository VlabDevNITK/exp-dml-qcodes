let simsubscreennum = 0;
let temp = 0;

function navNext() {
  for (temp = 0; temp < 2; temp++) {
    document.getElementById("canvas" + temp).style.display = "none";
  }

  simsubscreennum += 1;
  //
  document.getElementById("canvas" + simsubscreennum).style.display = "block";
  document.getElementById("nextButton").style.display = "none";
 
}


function validateInput() {
  const inputField = document.getElementById("alphabetInput");
  const errorText = document.getElementById("errorText");
  const hintButton = document.getElementById("hintButton");
  const morseOutput = document.getElementById("morseOutput");
  const outputImg = document.querySelector(".outputImg");
  const playButton = document.getElementById("playButton");
}

function handleInputChange() {
  const input = document.getElementById("alphabetInput");
  const hintButton = document.getElementById("hintButton");
  const isAlphabetic = /^[a-zA-Z]$/.test(input.value);

  if (isAlphabetic) {
    hintButton.style.display = "block";
  } else {
    hintButton.style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("alphabetInput");
  const hintButton = document.getElementById("hintButton");

  document.querySelector(".out").textContent = "";

  validateInput();
});

function disableQBoxes() {
  const qBoxes = document.querySelectorAll(".Q-Box");
  qBoxes.forEach((box) => {
    box.style.pointerEvents = "none"; // Disable clicks
    box.style.cursor = "not-allowed"; // Change cursor to indicate disabled state
    box.style.opacity = "1"; // Optional: make it look disabled
  });
  console.log("disabled");
}

// Function to enable Q-Box elements
function enableQBoxes() {
  const qBoxes = document.querySelectorAll(".Q-Box");
  qBoxes.forEach((box) => {
    box.style.pointerEvents = "auto"; // Enable clicks
    box.style.cursor = "pointer"; // Restore cursor
    box.style.opacity = "1"; // Restore opacity
  });
  console.log("enabled");
}

function removeInvalidCharacters(){
  const input = document.getElementById('searchInput');
  input.value = input.value.replace(/[^a-zA-Z\s]/g,'');
}

// let isFirstCharacter = true;
// let isAnimationCompleted = true;
// let fullMorse = "";
// let clickCount = 0;
// let currentCharIndex = 0;

let isPlaying = false;
async function playMorseSequence() {
  if (isPlaying) return;

  const inputField = document.getElementById("searchInput");
  const userInput = inputField.value.toUpperCase();
  const playButton = document.getElementById("playButton");

  // Check if the input matches any element with class="out"
  const matchesOutClass = Array.from(
    document.getElementsByClassName("out")
  ).some((element) => element.textContent.trim().toUpperCase() === userInput);

  if (!matchesOutClass) {
    // If no match is found, return and do not execute the rest of the function
    playButton.style.cursor = "not-allowed";
    return;
  }

  isPlaying = true;
  // playButton.style.cursor = "pointer";
  playButton.style.cursor = "not-allowed";  // Change cursor to 'not-allowed'
  playButton.disabled = true;  // Disable the button

  // const inputField = document.getElementById('searchInput');
  inputField.disabled = true;

  const toggleBtn = document.getElementById("toggle");
  toggleBtn.disabled = true;

  const backBtn = document.getElementById("backButton");
  backBtn.disabled = true;

  // const userInput = inputField.value.toUpperCase();
  const morseOutput = document.querySelector("#morseOutput");
  morseOutput.textContent = "";
  disableQBoxes(); // Disable Q-Box elements

  let currentCharIndex = 0;

  const intervalDuration = 800;
  const context = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator;

  async function animateMorseCode() {
    if (currentCharIndex < userInput.length) {
      const char = userInput[currentCharIndex];
      if (char in charToMorse) {
        const morseChar = charToMorse[char];
        let morseIndex = 0;

        function playSymbol() {
          if (morseIndex < morseChar.length) {
            const symbol = morseChar[morseIndex];
            oscillator = context.createOscillator();
            oscillator.frequency.value = 600;
            oscillator.connect(context.destination);
            oscillator.start();

            if (symbol === ".") {
              setTimeout(() => {
                oscillator.stop();
                morseOutput.textContent += ".";
              }, 100);
            } else if (symbol === "-") {
              setTimeout(() => {
                oscillator.stop();
                morseOutput.textContent += "-";
              }, 300);
            }

            morseIndex++;
            setTimeout(playSymbol, intervalDuration);
          } else {
            morseOutput.textContent += " ";
            currentCharIndex++;
            setTimeout(animateMorseCode, intervalDuration);
          }
        }

        playSymbol();
      } else {
        morseOutput.textContent += "Invalid character: " + char;
        currentCharIndex++;
        await sleep(intervalDuration);
        setTimeout(animateMorseCode, intervalDuration);
      }
    } else {
      isPlaying = false;
      inputField.disabled = false;
      toggleBtn.disabled = false;
      backBtn.disabled = false;
      
      playButton.disabled = false;  // Re-enable the play button
      playButton.style.cursor = "pointer";  // Change cursor back to 'pointer'
      enableQBoxes(); // Re-enable Q-Box elements
    }
  }

  document.getElementById("playButton").disabled = true;
  animateMorseCode();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}




function updateMorseOutput(alphabet, reset = false) {
  const char = alphabet.toUpperCase();
  const morseCodeMapping = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
  };

  const morseCode = morseCodeMapping[char];
  const morseOutput = document.getElementById("morseOutput");

  if (morseCode) {
    if (reset) {
      morseOutput.textContent = "";
    }
    morseOutput.style.visibility = "visible";
  } else {
    morseOutput.textContent = "";
    morseOutput.style.visibility = "hidden";
  }
}

function updateOutputImg(alphabet) {
  // Implement the logic to show the image for the given alphabet
  const outputImg = document.querySelector(".outputImg");

  // Example logic for updating the image (replace with your actual logic)
  if (alphabet) {
    // Show the image related to the alphabet
    outputImg.style.visibility = "hidden";
  }
}

const charToMorse = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  "?": "..--..",
};

function getMorseCodeForAlphabet(alphabet) {
  const morseCodes = {
    A: ".-", // Morse code for A
    B: "-...", // Morse code for B
    C: "-.-.", // Morse code for C
    D: "-..", // Morse code for D
    E: ".", // Morse code for E
    F: "..-.", // Morse code for F
    G: "--.", // Morse code for G
    H: "....", // Morse code for H
    I: "..", // Morse code for I
    J: ".---", // Morse code for J
    K: "-.-", // Morse code for K
    L: ".-..", // Morse code for L
    M: "--", // Morse code for M
    N: "-.", // Morse code for N
    O: "---", // Morse code for O
    P: ".--.", // Morse code for P
    Q: "--.-", // Morse code for Q
    R: ".-.", // Morse code for R
    S: "...", // Morse code for S
    T: "-", // Morse code for T
    U: "..-", // Morse code for U
    V: "...-", // Morse code for V
    W: ".--", // Morse code for W
    X: "-..-", // Morse code for X
    Y: "-.--", // Morse code for Y
    Z: "--..", // Morse code for Z
  };

  return morseCodes[alphabet] || "";
}

const tableContainer = document.querySelector(".table-container");

const questionOptions = [
  {
    id: "q1",
    text: "QRA?",
    question: "What is the name (or call sign) of your station?",
  },
  {
    id: "q2",
    text: "QRG?",
    question: "Will you tell me my exact frequency (or that of...)?",
  },
  { id: "q3", text: "QRH?", question: "Does my frequency vary?" },
  { id: "q4", text: "QRI?", question: "How is the tone of my transmission?" },
  {
    id: "q5",
    text: "QRJ?",
    question: "How many voice contacts do you want to make?",
  },
  {
    id: "q6",
    text: "QRK?",
    question: "What is the readability of my signals?",
  },
  {
    id: "q7",
    text: "QRL?",
    question: "Are you busy? \nIs the frequency in use?",
  },
  { id: "q8", text: "QRM?", question: "Do you have interference?" },
  { id: "q9", text: "QRN?", question: "Are you troubled by static?" },
  { id: "q10", text: "QRO?", question: "Shall I increase power?" },
  { id: "q11", text: "QRP?", question: "Shall I decrease power?" },
  { id: "q12", text: "QRQ?", question: "Shall I send Master?" },
  { id: "q13", text: "QRS?", question: "Shall I send more slowly?" },
  {
    id: "q14",
    text: "QRT?",
    question: "Shall I cease or suspend operation? \n shutoff the radio ?",
  },
  { id: "q15", text: "QRU?", question: "Do you have anything for me?" },
  { id: "q16", text: "QRV?", question: "Are you ready?" },
  {
    id: "q17",
    text: "QRW?",
    question: "Shall I advise...that you are calling him on...kHz?",
  },
  { id: "q18", text: "QRX?", question: "When will you call me back?" },
  { id: "q19", text: "QRZ?", question: "Who was calling me?" },
  { id: "q20", text: "QSA?", question: "What is the strength of my signals?" },
  { id: "q21", text: "QSB?", question: "Is my signal fading?" },
  { id: "q22", text: "QSD?", question: "Is my keying defective?" },
  {
    id: "q23",
    text: "QSG?",
    question: "Shall I send ... telegrams (messages) at a time?",
  },
  {
    id: "q24",
    text: "QSK?",
    question: "Can you hear me between your signals?",
  },
  { id: "q25", text: "QSL?", question: "Can you confirm reception?" },
  {
    id: "q26",
    text: "QSM?",
    question:
      "Shall I repeat the last telegram (message) which I sent you, or some previous telegram (message)?",
  },
  {
    id: "q27",
    text: "QSN?",
    question: "Did you hear me (or ... (call sign)) on .. kHz (or MHz)?",
  },
  { id: "q28", text: "QSO?", question: "Can you make contact with...(me)?" },
  { id: "q29", text: "QSP?", question: "Will you relay a message to ...?" },
  { id: "q30", text: "QSR?", question: "Do you want me to repeat my call?" },
  { id: "q31", text: "QSS?", question: "What working frequency will you use?" },
  { id: "q32", text: "QST?", question: "Should I repeat the prior message to all amateurs I contact?" },
  {
    id: "q33",
    text: "QSU?",
    question:
      "Shall I send or reply on this frequency or on.....kHz with ...emission of class?",
  },
  {
    id: "q34",
    text: "QSW?",
    question:
      "Will you send on this frequency or on ...khz with...emission of class?",
  },
  { id: "q35", text: "QSX?", question: "Can you listen on...?" },
  {
    id: "q36",
    text: "QSY?",
    question: "Shall I start transmitting on another frequency?",
  },
  {
    id: "q37",
    text: "QSZ?",
    question: "Shall I send each word or group twice?",
  },
  {
    id: "q38",
    text: "QTA?",
    question:
      "Shall I cancel telegram (message) No. as if it had not been sent?",
  },
  { id: "q39", text: "QTC?", question: "Do you have a message for me?" },
  {
    id: "q40",
    text: "QTH?",
    question:
      "What is your location (latitude and longitude or by name of the location)?",
  },
  { id: "q41", text: "QTR?", question: "What is the exact time?" },
  { id: "q42", text: "QTU?", question: "At what times are you operating?" },
  {
    id: "q43",
    text: "QTX?",
    question:
      "Will you keep your station open for further communication with me until further notice (or until... hours)?",
  },
  { id: "q44", text: "QUA?", question: "Have you news of ... (call sign)?" },
  {
    id: "q45",
    text: "QUC?",
    question:
      "What is the number (or other indication) of the last message you received from me (or from ... (call sign))?",
  },
  {
    id: "q46",
    text: "QUD?",
    question:
      "Have you received the urgency signal sent by ... (call sign of mobile station)?",
  },
  {
    id: "q47",
    text: "QUE?",
    question:
      "Can you speak in ... (language), - with interpreter if necessary; if so, on what frequencies?",
  },
  {
    id: "q48",
    text: "QUF?",
    question:
      "Have you received the distress signal sent by ... (call sign of mobile station)?",
  },
];



const answerOptions = [
  {
    id: "q1",
    text: "QRA",
    question: "The name (or call sign) of my station is ...",
  },
  {
    id: "q2",
    text: "QRG",
    question: "Your exact frequency (or that of...) is ... kHz (or MHz).",
  },
  { id: "q3", text: "QRH", question: "Your frequency varies." },
  {
    id: "q4",
    text: "QRI",
    question: "The tone of your transmission is....\n1.Good\n2.Variable\n3.Bad",
  },
  { id: "q5", text: "QRJ", question: "I want to make ... voice contacts." },
  {
    id: "q6",
    text: "QRK",
    question:
      "The readability of your signals is:\n1:Bad\n2:Fairly bad\n3:Reasonably good\n4:Good\n5:Excellent",
  },
  { id: "q7", text: "QRL", question: "I am busy.\nThe frequency is in use." },
  {
    id: "q8",
    text: "QRM",
    question:
      "I am interfered with.\n1:I am not at all interfered with\n2:Slightly\n3:Moderately\n4:Strongly\n5:Very strongly",
  },
  {
    id: "q9",
    text: "QRN",
    question:
      "I am bothered by atmospherics: \n1:Not at all\n2:Slightly\n3:Moderately\n4:Strongly\n5:Very Strongly",
  },
  { id: "q10", text: "QRO", question: "Increase power." },
  { id: "q11", text: "QRP", question: "Decrease power." },
  { id: "q12", text: "QRQ", question: "Send faster (... wpm)" },
  { id: "q13", text: "QRS", question: "Send more slowly (... wpm)" },
  {
    id: "q14",
    text: "QRT",
    question: "I am suspending operation.\nShutting off the radio",
  },
  { id: "q15", text: "QRU", question: "I have nothing for you." },
  { id: "q16", text: "QRV", question: "I am ready." },
  {
    id: "q17",
    text: "QRW",
    question: "Please advise...that I am calling him on kHz.",
  },
  {
    id: "q18",
    text: "QRX",
    question:
      "Please standby. I will call you again at ... (hours) on ... kHz (or MHz)",
  },
  {
    id: "q19",
    text: "QRZ",
    question: "You are being called by ... on ... kHz (or MHz)",
  },
  {
    id: "q20",
    text: "QSA",
    question:
      "The strength of your signals is:\n1:Bad\n2:Fairly bad\n3:Reasonable good\n4:Good\n5:Excellent",
  },
  { id: "q21", text: "QSB", question: "Your signal is fading." },
  { id: "q22", text: "QSD", question: "Your keying is defective." },
  {
    id: "q23",
    text: "QSG",
    question: "Send ... telegrams (messages) at a time.",
  },
  { id: "q24", text: "QSK", question: "I can hear you between my signals." },
  { id: "q25", text: "QSL", question: "I confirm reception." },
  {
    id: "q26",
    text: "QSM",
    question:
      "Repeat the last telegram (message) which you sent me (or telegrams messages) numbers ...).",
  },
  {
    id: "q27",
    text: "QSN",
    question: "I did hear you (or ... (call sign)) on ..kHz (or MHz).",
  },
  { id: "q28", text: "QSO", question: "I can make contact with...(you)." },
  { id: "q29", text: "QSP", question: "I will relay a message to ... ." },
  {
    id: "q30",
    text: "QSR",
    question: "Please repeat your call; I did not hear you.",
  },
  {
    id: "q31",
    text: "QSS",
    question: "I will use the working frequency ... kHz (or MHz).",
  },
  {
    id: "q32",
    text: "QST",
    question: "Here is a broadcast message to all amateurs.",
  },
  {
    id: "q33",
    text: "QSU",
    question:
      "Send or reply on this frequency or on...kHz with...emission of class.",
  },
  {
    id: "q34",
    text: "QSW",
    question:
      "I am going to send on this frequency or on...kHz with...emission of class.",
  },
  { id: "q35", text: "QSX", question: "Listen on..." },
  {
    id: "q36",
    text: "QSY",
    question: "Start transmitting on...\nAlso:change frequency(to...).",
  },
  { id: "q37", text: "QSZ", question: "Send each word or group twice." },
  {
    id: "q38",
    text: "QTA",
    question: "Cancel telegram (message) No. as if it had not been sent.",
  },
  { id: "q39", text: "QTC", question: "I have .... telegrams (messages) for you." },
  {
    id: "q40",
    text: "QTH",
    question: "My location is...latitude and longitude\nor:my location is...",
  },
  { id: "q41", text: "QTR", question: "The exact time is..." },
  { id: "q42", text: "QTU", question: "I am operating from ... to ... hours." },
  {
    id: "q43",
    text: "QTX",
    question:
      "I will keep my station open for further communication with you until further notice (or until ... hours).",
  },
  { id: "q44", text: "QUA", question: "Here is news of ... (call sign)." },
  {
    id: "q45",
    text: "QUC",
    question:
      "The number (or other indication) of the last message I received from you (or from ... (call sign)) is ...",
  },
  {
    id: "q46",
    text: "QUD",
    question:
      "I have received the urgency signal sent by ... (call sign of mobile station) at ... hours.",
  },
  {
    id: "q47",
    text: "QUE",
    question: "I can speak in ... (language) on ... kHz (or MHz).",
  },
  {
    id: "q48",
    text: "QUF",
    question:
      "I have received the distress signal sent by ... (call sign of mobile station) at ... hours.",
  },
];



document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggle");
  const searchInput = document.getElementById("searchInput");
  const outputSpan = document.querySelector(".out");
  const questOutput = document.getElementById("questOutput");
  const answerOutput = document.getElementById("answerOutput");

  toggle.addEventListener("change", function () {
    const qBoxes = document.querySelectorAll(".Q-Box");

    qBoxes.forEach((box) => {
      if (this.checked) {
        // Remove the question mark
        box.textContent = box.textContent.replace(/\?$/, "");
        const morseOutput = document.querySelector("#morseOutput");
        morseOutput.textContent = "";
        
      } else {
        // Add the question mark back
        if (!box.textContent.endsWith("?")) {
          box.textContent += "?";
          const morseOutput = document.querySelector("#morseOutput");
          morseOutput.textContent = "";
        }
      }

      // Update the searchInput and outputSpan if the box text matches the current input
      if (
        searchInput.value.replace(/\?$/, "") ===
        box.textContent.replace(/\?$/, "")
      ) {
        searchInput.value = box.textContent;
        outputSpan.textContent = box.textContent;
      }
    });

    // Update questOutput and answerOutput based on toggle state
    updateOutputs();
  });

  searchInput.addEventListener("input", function () {
    if (toggle.checked) {
      // If in answer mode, remove question marks from input
      this.value = this.value.replace(/\?/, "");
    }
  });

  function updateOutputs() {
    const qBoxes = document.querySelectorAll(".Q-Box");
    const currentText = searchInput.value;
  
    // Function to update UI elements
    function showUIElements() {
      const menuContainer = document.querySelector(".menu-container");
      const morsePlay = document.querySelector(".morsePlay");
      const audText = document.querySelector(".text3");
      const meanText = document.getElementById("meaningText");
      const backBtn = document.getElementById("backButton");
  
      menuContainer.style.display = "none";
      morsePlay.style.display = "grid";
      audText.style.display = "flex";
      meanText.style.display = "block";
      backBtn.style.display = "block";
    }
  
    if (toggle.checked) {
      // In answer mode
      const answerOption = answerOptions.find(
        (option) => option.text === currentText
      );
      if (answerOption) {
        // Replace \n with <br> for HTML new lines
        const formattedAnswer = answerOption.question.replace(/\n/g, "<br>");
        answerOutput.innerHTML = formattedAnswer;
        questOutput.textContent = "";
        answerOutput.style.display = "block";
        questOutput.style.display = "none";
        morseOutput.textContent = ""; // Clear Morse code output
  
        // Update meaning text
        meaningText.textContent = `The meaning of '${currentText}' is shown below.
`;
        
        // Update UI elements
        showUIElements();
      } else {
        questOutput.textContent = "";
        answerOutput.textContent = "";
      }
    } else {
      // In question mode
      const questionOption = questionOptions.find(
        (option) => option.text === currentText
      );
      if (questionOption) {
        questOutput.innerHTML = questionOption.question.replace(/\n/g, "<br>");
        answerOutput.textContent = "";
        questOutput.style.display = "block";
        answerOutput.style.display = "none";
        morseOutput.textContent = ""; // Clear Morse code output
  
        // Update meaning text
        meaningText.textContent = `The meaning of '${currentText}' is shown below.
`;
        
        // Update UI elements
        showUIElements();
      } else {
        questOutput.textContent = "";
        answerOutput.textContent = "";
      }
    }
  }
  

  outputSpan.textContent = searchInput.value ? searchInput.value : "";

  setupQBoxClicks();
});

function filterQcodes() {
  const input = document
    .getElementById("searchInput")
    .value.toUpperCase()
    .trim();
  const qBoxes = document.querySelectorAll(".Q-Box");
  const errorMessage = document.getElementById("errorMessage");

  const menuContainer = document.querySelector(".menu-container");
  const questOutput = document.getElementById("questOutput");
  const answerOutput = document.getElementById("answerOutput");
  const meanText = document.getElementById("meaningText");
  const playButton = document.getElementById("playButton");
  const backBtn = document.getElementById("backButton");

  // const outputSpan =document.querySelector('out');
  let hasMatch = false;

  qBoxes.forEach((box) => {
    if (box.textContent.toUpperCase().includes(input)) {
      box.style.display = "block";
      hasMatch = true;
    } else {
      box.style.display = "none";
    }
  });

  if (hasMatch) {
    errorMessage.style.display = "none";
    menuContainer.style.display = "flex";
    playButton.style.display = "block";

    // meanText.style.display="block";
    // questOutput.style.display ="block";
  } else {
    errorMessage.style.display = "block";
    menuContainer.style.display = "none";
    questOutput.style.display = "none";
    answerOutput.style.display = "none";
    meanText.style.display = "none";
    playButton.style.display = "none";
    backBtn.style.display = "none";
  }
}

// Function to handle Q-Box clicks
function setupQBoxClicks() {
  const qBoxes = document.querySelectorAll(".Q-Box");
  const searchInput = document.getElementById("searchInput");
  const outputSpan = document.querySelector(".out");
  const morseOutput = document.getElementById("morseOutput");
  const backButton = document.getElementById("backButton");
  const menuContainer = document.querySelector(".menu-container");
  const morsePlay = document.querySelector(".morsePlay");
  const audText = document.querySelector(".text3");
  const questOutput = document.getElementById("questOutput");
  const answerOutput = document.getElementById("answerOutput");
  const meanText = document.getElementById("meaningText");

  const questionOptions = [
    {
      id: "q1",
      text: "QRA?",
      question: "What is the name (or call sign) of your station?",
    },
    {
      id: "q2",
      text: "QRG?",
      question: "Will you tell me my exact frequency (or that of...)?",
    },
    { id: "q3", text: "QRH?", question: "Does my frequency vary?" },
    { id: "q4", text: "QRI?", question: "How is the tone of my transmission?" },
    {
      id: "q5",
      text: "QRJ?",
      question: "How many voice contacts do you want to make?",
    },
    {
      id: "q6",
      text: "QRK?",
      question: "What is the readability of my signals?",
    },
    {
      id: "q7",
      text: "QRL?",
      question: "Are you busy? \nIs the frequency in use?",
    },
    { id: "q8", text: "QRM?", question: "Do you have interference?" },
    { id: "q9", text: "QRN?", question: "Are you troubled by static?" },
    { id: "q10", text: "QRO?", question: "Shall I increase power?" },
    { id: "q11", text: "QRP?", question: "Shall I decrease power?" },
    { id: "q12", text: "QRQ?", question: "Shall I send Master?" },
    { id: "q13", text: "QRS?", question: "Shall I send more slowly?" },
    {
      id: "q14",
      text: "QRT?",
      question: "Shall I cease or suspend operation? \n shutoff the radio ?",
    },
    { id: "q15", text: "QRU?", question: "Do you have you anything for me?" },
    { id: "q16", text: "QRV?", question: "Are you ready?" },
    {
      id: "q17",
      text: "QRW?",
      question: "Shall I advise...that you are calling him on...kHz?",
    },
    { id: "q18", text: "QRX?", question: "When will you call me back?" },
    { id: "q19", text: "QRZ?", question: "Who is calling me?" },
    {
      id: "q20",
      text: "QSA?",
      question: "What is the strength of my signals?",
    },
    { id: "q21", text: "QSB?", question: "Are my signals fading?" },
    { id: "q22", text: "QSD?", question: "Is my keying defective?" },
    {
      id: "q23",
      text: "QSG?",
      question: "Shall I send ... telegrams (messages) at a time?",
    },
    {
      id: "q24",
      text: "QSK?",
      question: "Can you hear me between your signals?",
    },
    { id: "q25", text: "QSL?", question: "Can you confirm reception?" },
    {
      id: "q26",
      text: "QSM?",
      question:
        "Shall I repeat the last telegram (message) which I sent you, or some previous telegram (message)?",
    },
    {
      id: "q27",
      text: "QSN?",
      question: "Did you hear me (or ... (call sign)) on .. kHz (or MHz)?",
    },
    { id: "q28", text: "QSO?", question: "Can you make contact with...(me)?" },
    { id: "q29", text: "QSP?", question: "Will you relay a message to ...?" },
    { id: "q30", text: "QSR?", question: "Do you want me to repeat my call?" },
    {
      id: "q31",
      text: "QSS?",
      question: "What working frequency will you use?",
    },
    {
      id: "q32",
      text: "QST?",
      question: "Should I repeat the prior message to all amateurs I contact?",
    },
    {
      id: "q33",
      text: "QSU?",
      question:
        "Shall I send or reply on this frequency or on.....kHz with ...emission of class?",
    },
    {
      id: "q34",
      text: "QSW?",
      question:
        "Will you send on this frequency or on ...khz with...emission of class?",
    },
    { id: "q35", text: "QSX?", question: "Can you listen on...?" },
    {
      id: "q36",
      text: "QSY?",
      question: "Shall I start transmitting on another frequency?",
    },
    {
      id: "q37",
      text: "QSZ?",
      question: "Shall I send each word or group twice?",
    },
    {
      id: "q38",
      text: "QTA?",
      question:
        "Shall I cancel telegram (message) No. as if it had not been sent?",
    },
    { id: "q39", text: "QTC?", question: "Do you have a message for me?" },
    {
      id: "q40",
      text: "QTH?",
      question:
        "What is your location (latitude and longitude or by name of the location)?",
    },
    { id: "q41", text: "QTR?", question: "What is the exact time?" },
    { id: "q42", text: "QTU?", question: "At what times are you operating?" },
    {
      id: "q43",
      text: "QTX?",
      question:
        "Will you keep your station open for further communication with me until further notice (or until... hours)?",
    },
    { id: "q44", text: "QUA?", question: "Have you news of ... (call sign)?" },
    {
      id: "q45",
      text: "QUC?",
      question:
        "What is the number (or other indication) of the last message you received from me (or from ... (call sign))?",
    },
    {
      id: "q46",
      text: "QUD?",
      question:
        "Have you received the urgency signal sent by ... (call sign of mobile station)?",
    },
    {
      id: "q47",
      text: "QUE?",
      question:
        "Can you speak in ... (language), - with interpreter if necessary; if so, on what frequencies?",
    },
    {
      id: "q48",
      text: "QUF?",
      question:
        "Have you received the distress signal sent by ... (call sign of mobile station)?",
    },
  ];

  const answerOptions = [
    {
      id: "q1",
      text: "QRA",
      question: "The name (or call sign) of my station is ...",
    },
    {
      id: "q2",
      text: "QRG",
      question: "Your exact frequency (or that of...) is ... kHz (or MHz).",
    },
    { id: "q3", text: "QRH", question: "Your frequency varies." },
    {
      id: "q4",
      text: "QRI",
      question:
        "The tone of your transmission is....\n1.Good\n2.Variable\n3.Bad",
    },
    { id: "q5", text: "QRJ", question: "I want to make ... voice contacts." },
    {
      id: "q6",
      text: "QRK",
      question:
        "The readability of your signals is:\n1:Bad\n2:Fairly bad\n3:Reasonably good\n4:Good\n5:Excellent",
    },
    { id: "q7", text: "QRL", question: "I am busy.\nThe frequency is in use." },
    {
      id: "q8",
      text: "QRM",
      question:
        "I am interfered with.\n1:I am not at all interfered with\n2:Slightly\n3:Moderately\n4:Strongly\n5:Very strongly",
    },
    {
      id: "q9",
      text: "QRN",
      question:
        "I am bothered by atmospherics\n1:Not at all\n2:Slightly\n3:Moderately\n4:Strongly\n5:Very Strongly",
    },
    { id: "q10", text: "QRO", question: "Increase power." },
    { id: "q11", text: "QRP", question: "Decrease power." },
    { id: "q12", text: "QRQ", question: "Send faster (... wpm)" },
    { id: "q13", text: "QRS", question: "Send more slowly (... wpm)" },
    {
      id: "q14",
      text: "QRT",
      question: "I am suspending operation.\nShutting off the radio",
    },
    { id: "q15", text: "QRU", question: "I have ____ messages for you." },
    { id: "q16", text: "QRV", question: "I am ready." },
    {
      id: "q17",
      text: "QRW",
      question: "Please advise...that I am calling (him) on kHz.",
    },
    {
      id: "q18",
      text: "QRX",
      question:
        "Please standby. I will call you again at ... (hours) on ... kHz (or MHz)",
    },
    {
      id: "q19",
      text: "QRZ",
      question: "You are being called by ... on ... kHz (or MHz)",
    },
    {
      id: "q20",
      text: "QSA",
      question:
        "The strength of your signals is:\n1:Bad\n2:Fairly bad\n3:Reasonable good\n4:Good\n5:Excellent",
    },
    { id: "q21", text: "QSB", question: "Your signal is fading." },
    { id: "q22", text: "QSD", question: "Your keying is defective." },
    {
      id: "q23",
      text: "QSG",
      question: "Send ... telegrams (messages) at a time.",
    },
    { id: "q24", text: "QSK", question: "I can hear you between my signals." },
    { id: "q25", text: "QSL", question: "I confirm reception." },
    {
      id: "q26",
      text: "QSM",
      question:
        "Repeat the last telegram (message) which you sent me (or telegrams messages) numbers ...).",
    },
    {
      id: "q27",
      text: "QSN",
      question: "I did hear you (or ... (call sign)) on ..kHz (or MHz).",
    },
    { id: "q28", text: "QSO", question: "I can make contact with...(you)." },
    { id: "q29", text: "QSP", question: "I will relay a message to ... ." },
    {
      id: "q30",
      text: "QSR",
      question: "Please repeat your call; I did not hear you.",
    },
    {
      id: "q31",
      text: "QSS",
      question: "I will use the working frequency ... kHz (or MHz).",
    },
    {
      id: "q32",
      text: "QST",
      question: "Here is a broadcast message to all amateurs.",
    },
    {
      id: "q33",
      text: "QSU",
      question:
        "Send or reply on this frequency or on...kHz with...emission of class.",
    },
    {
      id: "q34",
      text: "QSW",
      question:
        "I am going to send on this frequency or on...kHz with...emission of class.",
    },
    { id: "q35", text: "QSX", question: "Listen on..." },
    {
      id: "q36",
      text: "QSY",
      question: "Start transmitting on...\nAlso:change frequency(to...).",
    },
    { id: "q37", text: "QSZ", question: "Send each word or group twice." },
    {
      id: "q38",
      text: "QTA",
      question: "Cancel telegram (message) No. as if it had not been sent.",
    },
    { id: "q39", text: "QTC", question: "I have .... telegrams (messages) for you." },
    {
      id: "q40",
      text: "QTH",
      question: "My location is...latitude and longitude\nor:my location is...",
    },
    { id: "q41", text: "QTR", question: "The exact time is...hours UTC." },
    {
      id: "q42",
      text: "QTU",
      question: "I am operating from ... to ... hours.",
    },
    {
      id: "q43",
      text: "QTX",
      question:
        "I will keep my station open for further communication with you until further notice (or until ... hours).",
    },
    { id: "q44", text: "QUA", question: "Here is news of ... (call sign)." },
    {
      id: "q45",
      text: "QUC",
      question:
        "The number (or other indication) of the last message I received from you (or from ... (call sign)) is ...",
    },
    {
      id: "q46",
      text: "QUD",
      question:
        "I have received the urgency signal sent by ... (call sign of mobile station) at ... hours.",
    },
    {
      id: "q47",
      text: "QUE",
      question: "I can speak in ... (language) on ... kHz (or MHz).",
    },
    {
      id: "q48",
      text: "QUF",
      question:
        "I have received the distress signal sent by ... (call sign of mobile station) at ... hours.",
    },
    // ... other answer options ...
  ];

  let previousValue = "";

  qBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      
      const text = box.textContent;
      searchInput.value = text;
      menuContainer.style.display = "none";
      morsePlay.style.display = "grid";
      backButton.style.display = "block";
      audText.style.display = "block";
      meanText.style.display = "block";
  
      console.log("Q-box is clicked");
      outputSpan.textContent = text;

       // Update the 'meanText' to show the selected Morse code abbreviation
    document.getElementById("meaningText").textContent = `The meaning of '${text}' is shown below.`;
    // The detailed Q code representation of ${currentText} is outlined below.


      let isQuestion = text.endsWith("?");
  
      if (isQuestion) {
        const questionOption = questionOptions.find(
          (option) => option.text === text
        );
        if (questionOption) {
          // Replace \n with <br> to ensure line breaks are displayed
          const formattedQuestion = questionOption.question.replace(/\n/g, "<br>");
          questOutput.innerHTML = formattedQuestion;
          answerOutput.textContent = "";
          questOutput.style.display = "block";
        }
      } else {
        const answerOption = answerOptions.find(
          (option) => option.text === text
        );
        if (answerOption) {
          // Replace \n with <br> to ensure line breaks are displayed
          const formattedAnswer = answerOption.question.replace(/\n/g, "<br>");
          answerOutput.innerHTML = formattedAnswer;
          questOutput.textContent = "";
          answerOutput.style.display = "block";
        }
      }
  
      // Reset morseOutput if the selected text has changed
      if (text !== previousValue) {
        morseOutput.textContent = "";
        previousValue = text;
      }
    });
  });
  

  searchInput.addEventListener("input", () => {
    if (searchInput.value.trim() === "") {
      outputSpan.textContent = "";
      morseOutput.textContent = "";
      morsePlay.style.display = "none";
      meanText.style.display = "none";
      questOutput.style.display = "none";
      answerOutput.style.display = "none";
      backButton.style.display = "none";
    } else {
      const currentValue = searchInput.value;
      const isQuestionMatch = questionOptions.some(
        (option) => option.text === currentValue
      );
      const isAnswerMatch = answerOptions.some(
        (option) => option.text === currentValue
      );

      if (!isQuestionMatch && !isAnswerMatch) {
        morsePlay.style.display = "none";
        audText.style.display = "none";
        questOutput.style.display = "none";
        answerOutput.style.display = "none";
      } else {
        morsePlay.style.display = "grid";
        audText.style.display = "grid";
      }
      if (isQuestionMatch) {
        questOutput.style.display = "block";
        answerOutput.style.display = "none";
      } else if (isAnswerMatch) {
        answerOutput.style.display = "block";
        questOutput.style.display = "none";
      }

      if (currentValue !== previousValue) {
        morseOutput.textContent = "";
        previousValue = currentValue;
      }

      meanText.style.display = "none";
      questOutput.style.display = "none";
      answerOutput.style.display = "none";
    }
  });

  backButton.addEventListener("click", () => {
    backButton.style.display = "none";
    morseOutput.innerHTML = ""; // Clear the morseOutput content
    menuContainer.style.display =
      errorMessage.style.display === "block" ? "none" : "flex";
    morsePlay.style.display = "none";
    audText.style.display = "none";
    questOutput.style.display = "none";
    answerOutput.style.display = "none";
    meanText.style.display = "none";
  });
}

// Initialize click handlers after DOM content is loaded
document.addEventListener("DOMContentLoaded", setupQBoxClicks);
