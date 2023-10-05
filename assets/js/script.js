document.addEventListener("DOMContentLoaded", (event) => {
});

//Homepage//
//getters
const cards = document.querySelectorAll('.memory-card');
const resetGameBtn = document.getElementById('btn-reset-game');
const movesCounter = document.getElementById('moves-counter');
const modal = document.getElementById('my-modal');
const winningModal = document.getElementById('win-modal')
const btn = document.getElementById('btn-how-to-play');
const span = document.getElementsByClassName('close')[0];
const winningSpan = document.getElementsByClassName('close')[0];
const timeValue = document.getElementById('timer-area');
const lastMove = document.getElementById('last-move');
const timeEnd = document.getElementById('timer-taken');
const maxMatch = 8;

//event listeners
resetGameBtn.addEventListener('click', resetGame);

//This is the game logic, in order to flip the cards, check for a match, disable cards,//
// unflip cards, reset board and shuffle.//

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Initial moves taken and Win count 
let moves = 0;
let perfectMatch = 0;

//Initial Time
let seconds = 0;
let minutes = 0;
let hasStartedTimer = false;
let liveTimer = 0;

//Winning score and time
let timeTaken = 0;

/*Modal to appear when "how to play button" is pressed
Credit given to w3schools for help with creating a modal- details in ReadME*/
btn.onclick = function () {
    modal.style.display = "block";
};

//How to play Modal - closes the modal when user clicks on the X (close button)
span.onclick = function () {
    modal.style.display = "none";
};

//Layout of Timer
const timeGenerator = () => {
    seconds += 1;
    if (seconds > 60) {
        minutes += 1;
        seconds = 0;
    }

    //Format of time before displaying
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
    timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;

};

//Fucntion to start the timer when the first pair has been selected
function startTimer() {
    if (!hasStartedTimer) {
        liveTimer = setInterval(timeGenerator, 1000);
        hasStartedTimer = true; // Set to true so it doesn't start again.
    }
};

//Fucntion to stop timer 
function stopTimer() {
    clearInterval(liveTimer);
};

//Function for flipping the card over when clicked on
function flipCardStart() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
};

//Function to ensure the timer starts when player has turned over two cards
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    // Start the timer on the first card click
    startTimer();

    secondCard = this;
    lockBoard = true;
    checkForMatch();
};

//Function to check for a matching pair
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch)
        perfectMatch += 1;

    if (isMatch)
        pairMatch();
    else
        noMatch();

    if (perfectMatch === maxMatch) winGame()

};

//Function to disable the cards when a pair is found 
function pairMatch() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

//Function to unflip the cards when they are not a match 
function noMatch() {
    lockBoard = true

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);

    //Add a move
    addMove();
};

moves = 0;
movesCounter.innerHTML = 0

//Function to add moves to the counter
function addMove() {
    moves++;
    movesCounter.innerHTML = moves;
};

//Function to reset the board 
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

//Function to reset the board when the 'reset current button' is clicked
function resetGame() {
    window.location.reload();
};

//Function to shuffle the cards 
(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

/*Function to end the game, stop the timer and produce a modal with a winning message.
The message will also include how long the player took to complete and how many moves they made*/
function winGame() {
    stopTimer();
    showWinningMessage(movesCounter, timeTaken);

    timeTaken = timeValue.innerHTML
    lastMove = movesCounter.innerHTML

        ('lastMove').innerHTML = movesCounter;
    ('timeValue').innerHTML = timeTaken;
};

//Function to display the winning modal message
function showWinningMessage() {
    winningModal.style.display = "block";
};

//closes the modal when user clicks on the X (close button)
winningSpan.onclick = function () {
    modal.style.display = "none";

};

cards.forEach(card => card.addEventListener('click', flipCard))
    ;

