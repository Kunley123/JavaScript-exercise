let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

updateScoreElement();

/* if ('score' === null) {
score = {
wins: 0,
losses: 0,
ties: 0
};
}
*/

let computerMove = '';

function updateScoreElement() {
    document.querySelector('.js-score').innerHTML =
        `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}


let isAutoPlaying = false;
let intervalId;

let autoplayButton = document.querySelector('.js-auto-play-button');
autoplayButton.addEventListener('click', autoplay)


function autoplay() {
    let autoplayButton = document.querySelector('.js-auto-play-button');

    if (autoplayButton.innerHTML === 'Auto Play') {
        autoplayButton.innerHTML = 'Stop Playing'
    } else if (autoplayButton.innerHTML === 'Stop Playing') {
        autoplayButton.innerHTML = 'Auto Play'
    }

    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputermove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId);
        isAutoplaying = false;
    }

}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
});
document.querySelector('.js-scissors-button').addEventListener('click', () => {
    playGame('scissors');
});

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    } else if (event.key === 'a') {
        autoplay();
    }
});

function playGame(playerMove) {
    pickComputermove();

    let result = '';
    if (playerMove === 'scissors') {
        if (computerMove === 'rock') {
            result = 'You lose.'
        } else if (computerMove === 'paper') {
            result = 'You win.'
        } else if (computerMove === 'scissors') {
            result = 'Tie.'
        }
    } else if (playerMove === 'paper') {
        if (computerMove === 'rock') {
            result = 'You win.'
        } else if (computerMove === 'paper') {
            result = 'Tie.'
        } else if (computerMove === 'scissors') {
            result = 'You lose.'
        }
    } else if (playerMove === 'rock') {
        if (computerMove === 'rock') {
            result = 'Tie.';
        } else if (computerMove === 'paper') {
            result = 'You lose.';
        } else if (computerMove === 'scissors') {
            result = 'You win.';
        }
    }


    if (result === 'You win.') {
        score.wins += 1;
    } else if (result === 'You lose.') {
        score.losses += 1;
    } else if (result === 'Tie.') {
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML =
        result

    document.querySelector('.js-move').innerHTML = `You
<img src="images/${playerMove}-emoji.png">
<img src="images/${computerMove}-emoji.png">
Computer`;
}

function pickComputermove() {
    const randomNumber = Math.random();

    if (randomNumber >= 0 && randomNumber < 1 / 3) { computerMove = 'rock' }
    else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) { computerMove = 'paper' } else if (randomNumber >= 2 / 3 && randomNumber < 1) { computerMove = 'scissors' }
}

let resetButton = document.querySelector('.js-reset-score-button')
resetButton.addEventListener('click', confirmButton)
let youSure = document.querySelector('.js-are-you-sure');
function confirmButton() {
    youSure.innerHTML = `Are you sure you want to reset the score?
    <button class="js-yes-button">
        Yes
    </button>
    <button class="js-noo-button">
        No
    </button>`
}

function yesEmpty() {
    youSure.innerHTML = ''
}

document.querySelector('.js-yes-button')
    .addEventListener('click', resetScore)
function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    yesEmpty();
}

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Backspace') {
        resetScore();
    }
})
