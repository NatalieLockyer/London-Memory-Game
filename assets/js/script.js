document.addEventListener("DOMContentLoaded", (event) => {
});

//Homepage//
//getters
const cards = document.querySelectorAll('.memory-card');
const resetGameBtn = document.getElementById('btn-reset-game');
const movesCounter = document.getElementById('moves-counter');
const modal = document.getElementById('myModal');
const btn = document.getElementById('btn-how-to-play');
const span = document.getElementsByClassName('close')[0];
const timeValue = document.getElementById('timer-area');
const modalWin = document.getElementById('modal-content')
const maxMatch = 8;

//event listeners
resetGameBtn.addEventListener('click', resetGame);

//This is the game logic, in order to flip the cards, check for a match, disable cards,//
// unflip cards, reset board and shuffle.//

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Initial moves taken and Win count 
let movesTaken = 0;
let perfectMatch = 0;

//Initial Time
let seconds = 0;
let minutes = 0;
let hasStartedTimer = false;
let liveTimer = 0;

/*
const items = [
    { name: "Big Ben", image: "front-card.jpg" },
    { name: "Buckingham Palace", image: "buckingham-palace.jpg" },
    { name: "Gerkin", image: "gerkin.jpg" },
    { name: "London Eye", image: "london-eye.jpg" },
    { name: "London Underground", image: "london-underground.jpg" },
    { name: "Red Bus", image: "red-bus.jpg" },
    { name: "The Shard", image: "the-shard.jpg" },
    { name: "Tower Bridge", image: "tower-bridge.jpg" }
]*/


//Modal to appear when "how to play button" is pressed
//Credit to w3schools for help with this code - details in ReadME

btn.onclick = function () {
    modal.style.display = "block";
};

//When user clicks on the X (close button)
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

//Start the timer when the first pair has been selected
function startTimer() {
    if (!hasStartedTimer) {
        liveTimer = setInterval(timeGenerator, 1000);
        hasStartedTimer = true; // Set it to true so it doesn't start again.
    }
}

//stop timer 
function stopTimer() {
    clearInterval(liveTimer);
}

// flipcard function//
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
}

//timer starts on first flip card
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
}


/* //Message to alert player they have won. ************************
function replay() {
    document.getElementById('winner').style.display = 'none';
}*/


//Check for match function
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) perfectMatch += 1;

    if (isMatch) pairMatch();
    else noMatch();

    if (perfectMatch === maxMatch) winGame()

}

/*function to stop the timer once all cards are overturned
if (flipCard[0] === flipCard[1]) {
    flipCard[0].isMatch = true;
    flipCard[1].isMatch = true;
    flipCard.length = 0;
    numMatches++;
}
*/

//Disable card function 
function pairMatch() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
};

//Unflip card function 
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

function addMove() {
    moves++;
    movesTaken.innerHTML = moves;
}

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

//WinGame Function
function winGame() {
    stopTimer();
    showWinningMessage();
}

function showWinningMessage() {
    modalWin.style.display = "block";

}

cards.forEach(card => card.addEventListener('click', flipCard))
    ;

