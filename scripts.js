const cards = document.querySelectorAll('.memory-card');
let level = 1;
let score = 0;
let hasFlipped = false;
let timeRemaining, card1, card2;

const init = () => {
    setBoard();
    bindEvents();
};

const lvlStart = () => {
    
}

const setBoard = () => {
    stopTimer();
    resetMatches();
    //go through each card and assign it a hidden image
    shuffleCards();
    //set timer for the game.
    setLevelTimer();
};

const stopTimer = () => {
    
};

const shuffleCards = () => {
    cards.forEach(card => {
        let pos = Math.floor(Math.random() *12);
        card.style.order = pos;
    })
};


const resetMatches = () => {
    cards.forEach(card => {
        card.classList.remove('matched');
    })
}

const lvlUp = () => {
    ++level;
    console.log("you are now level " + level);
}

const setLevelTimer = () => {
    timeRemaining = 500 / level;
}

const bindEvents = () => {
    cards.forEach(card => card.addEventListener('click', flipCard));
};

const flipCard = function() {
    if(hasFlipped === true && this != card1) {
        this.classList.toggle('flip');
        card2 = this;
        hasFlipped = false;
        setTimeout(checkMatch, 500);//delayed to ensure second card has flipped
    } else if(card1 === this){
        alert('selection invalid');
    } else {
        hasFlipped = true;
        card1 = this;
        this.classList.toggle('flip');
    }
};

const checkMatch = () => {
    if(card1.dataset.suit === card2.dataset.suit){
        console.log('checkMatch passed');
        addPoints();
        removePair(card1, card2);
    } else {
        console.log('checkMatch failed');
        clearFlip();
    }
    checkWin();
};

const addPoints = () => {
    score = score + 2 * level;
    console.log('your score is: ' + score);
}

const removePair = (card1, card2) => {
    card1.classList.add('matched');
    card2.classList.add('matched');
    clearFlip();
}

const clearFlip = () => {
    cards.forEach(card => card.classList.remove('flip'));
    card1 = null;
    card2 = null;
};

const checkWin = () => {
    let matchedPairs = document.getElementsByClassName('matched');
    if (matchedPairs.length >= 12) {
        alert('You cleared the level!');
        lvlUp();
        setBoard();
    }
}


init();