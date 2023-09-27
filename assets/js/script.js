//Homepage//
const cards = document.querySelectorAll('.memory-card');


//This is the gam logic, in order to flip the cards, check for a match, disable cards,//
// unflip cards, reset board and shuffle.//

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

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

