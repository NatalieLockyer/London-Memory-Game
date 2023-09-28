//Homepage//
const cards = document.querySelectorAll('.memory-card');

//This is the game logic, in order to flip the cards, check for a match, disable cards,//
// unflip cards, reset board and shuffle.//

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let movesTaken = 0;

//getters
let howToPlayBtn = document.getElementById('btn-how-to-play');
let resetGameBtn = document.getElementById('btn-reset-game');


//event listeners
howToPlayBtn.addEventListener('click', showHowToPlay);
resetGameBtn.addEventListener('click', resetGame);

//How to play function
function showHowToPlay() {
    console.log(' Hey the how to play button was pressed');
    //here we need to do something like a modal with instructions on how to play
}

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
}

//Check for match function
function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    isMatch ? disableCards() : unflipCards();
}

//Disable card function 
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

//Unflip card function 
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

//Reset board function 
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null]
}

//Reset board btn function
function resetGame() {
    window.location.reload();
}

//Shuffle cards function 
(function shuffle() {
    cards.forEach(card => {
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));