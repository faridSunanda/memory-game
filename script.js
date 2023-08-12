const btnStartContainer = document.querySelector(".btn-start-container");
const btnStart = document.getElementById("btn-start");
const audio = document.getElementById("backgroundMusic");

btnStart.addEventListener("click", () => {
    btnStartContainer.style.display = "none";
    audio.play();
});
const cardsData = [
    { value: 'A', image: 'p1.png' },
    { value: 'A', image: 'p1.png' },
    { value: 'B', image: 'p2.png' },
    { value: 'B', image: 'p2.png' },
    { value: 'C', image: 'p3.png' },
    { value: 'C', image: 'p3.png' },
    { value: 'D', image: 'p4.png' },
    { value: 'D', image: 'p4.png' },
    { value: 'E', image: 'p5.png' },
    { value: 'E', image: 'p5.png' },
    { value: 'F', image: 'p6.png' },
    { value: 'F', image: 'p6.png' },
    { value: 'G', image: 'p7.png' },
    { value: 'G', image: 'p7.png' },
    { value: 'H', image: 'p8.png' },
    { value: 'H', image: 'p8.png' },
    // Tambahkan data kartu lainnya
];

const gameBoard = document.querySelector('.game-board');
let flippedCards = [];
let lockBoard = false;

function createCard(value, image) {
    const card = document.createElement('div');
    card.classList.add('card');

    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');

    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = value;

    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.style.backgroundImage = `url(img/${image})`;
    cardBack.style.backgroundSize = 'contain';
    cardBack.style.backgroundRepeat = 'no-repeat';
    cardBack.style.backgroundPosition = 'center';

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);

    card.addEventListener('click', flipCard);

    return card;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;

    this.classList.add('flip');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        lockBoard = true;
        setTimeout(checkForMatch, 600);
    }
}

function checkForMatch() {
    const [card1, card2] = flippedCards;
    const value1 = card1.querySelector('.card-front').textContent;
    const value2 = card2.querySelector('.card-front').textContent;

    if (value1 === value2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }

    flippedCards = [];
    lockBoard = false;
}

function initializeGame() {
    shuffle(cardsData);

    for (const { value, image } of cardsData) {
        const card = createCard(value, image);
        gameBoard.appendChild(card);
    }
}

initializeGame();