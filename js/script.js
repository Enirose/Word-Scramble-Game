import { words } from "./words.js"

const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");

let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time off! ${correctWord.toUpperCase()} was the correct word`);
        initGame();
    }, 1000);
}

const initGame = () => {
      // Calculate the total number of questions
    const totalQuestions = words.length;
    // Initialize timer and other game elements
    initTimer(30);

    // Randomly select a word object from the words array
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");

    // Shuffle the letters of the word
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }

    // Display the shuffled word and its hint
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;

    // Store the correct word in lowercase
    correctWord = randomObj.word.toLowerCase();

    // Reset the input field and set its maximum length
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);

    // Update the current question index
    const currentQuestionIndex = Math.floor(Math.random() * words.length) + 1; // Assuming you want a random index
    document.querySelector(".current-question").innerText = `Question ${currentQuestionIndex} of ${totalQuestions}`;
}

initGame();

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Congrats! ${correctWord.toUpperCase()} is the correct word`);
    initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);