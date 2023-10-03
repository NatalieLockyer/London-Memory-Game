//Homepage//
//getters
const cards = document.querySelectorAll('.memory-card');
const resetGameBtn = document.getElementById('btn-reset-game');
const movesCounter = document.getElementById('moves-counter');
const modal = document.getElementById('myModal');
const btn = document.getElementById('btn-how-to-play');
const span = document.getElementsByClassName('close')[0];

//event listeners
resetGameBtn.addEventListener('click', resetGame);

//This is the game logic, in order to flip the cards, check for a match, disable cards,//
// unflip cards, reset board and shuffle.//

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

//Initial moves taken and Win count 
let movesTaken = 0;
let winCount = 0;

//Initial Time
let seconds = 0;
let minutes = 0;

/*Array Items    should i do this?
const items = [
    {name: "Big Ben", image: "front-card.jpg" },
    {name: "Buckingham Palace", image: "buckingham-palace.jpg" },
    {name: "Gerkin", image: "gerkin.jpg"},
    {name: "London Eye", image: "london-eye.jpg"},
    {name: "London Underground", image:"london-underground.jpg"},
    {name: "Red Bus", image: "red-bus.jpg"},
    {name: "The Shard", image: "the-shard.jpg"},
    {name: "Tower Bridge", image: "tower-bridge.jpg"}
]
*/

/*Modal to appear when "how to play button" is pressed
Credit to w3schools for help with this code - details in ReadME*/

btn.onclick = function () {
    modal.style.display = "block";
};

//When user clicks on the X (close button)
span.onclick = function () {
    modal.style.display = "none";

//Format of time before displaying
let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;


//Message to alert player they have won. ************************
function replay() {
    document.getElementById('winner').style.display = 'none';
}

function go() {
    const youWin = document.getElementById('youWin');
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

cards.forEach(card => card.addEventListener('click', flipCard))
    ;