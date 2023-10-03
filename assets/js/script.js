//Homepage//
const cards = document.querySelectorAll('.memory-card');

//This is the game logic, in order to flip the cards, check for a match, disable cards,//
// unflip cards, reset board and shuffle.//

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movesTaken = 0;


//getters
let resetGameBtn = document.getElementById('btn-reset-game');
let movesCounter = document.getElementById('moves-counter');
let modal = document.getElementById('myModal');
let btn = document.getElementById('btn-how-to-play');
let span = document.getElementsByClassName('close')[0];

//event listeners
resetGameBtn.addEventListener('click', resetGame);

//How to play function - When user clicks "how to play button - credit to w3schools for help with this code - details in ReadME
btn.onclick = function () {
    modal.style.display = "block";
};

//When user clicks on the X (close button)
span.onclick = function () {
    modal.style.display = "none";
};

//Countdown timer
let timeLeft = 90;
let countdownTimer = document.getElementById('timer-area');

let timer = setInterval(countdown, 1000);

function countdown() {
    if (timeLeft == -1) {
        clearTimeout(timer);
        doSomething();
    } else {
        countdownTimer.innerHTML = timeLeft + 'seconds remaining';
        timeLeft--;
    }
}

//Message to alert player that they have run out of time. 


//flipcard function//
function flipCard() {
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

//Check for match function
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    movesTaken++;
    isMatch ? disableCards() : unflipCards();
    console.log('moves taken:', movesTaken);
    console.log('moves counter:', movesCounter);
    movesCounter.innerText = movesTaken;
};

//Message to alert player they have won. ************************
function replay() {
    document.getElementById('winner').style.display = 'none';
}
function lastMatch() {
    let youWin = document.getElementById('youWin');
    if(lastMatch==0) {

    }
}

//Disable card function 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

//Unflip card function 
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
};

//Reset board function 
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
};

//Reset board btn function
function resetGame() {
    window.location.reload();
};

//Shuffle cards function 
(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));