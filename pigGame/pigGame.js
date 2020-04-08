let scores, roundScore, activePlayer, playingGame, gameOverScorem;

let player1NameInput = prompt('Player one name:');
let player2NameInput = prompt('Player two name:');

gameOverScore = Number(prompt('Enter the number between 20 and 1000'));

if (isNaN(gameOverScore)) {
  gameOverScore = 100;
} else if (gameOverScore < 20 || gameOverScore > 1000) {
  gameOverScore = 100;
} else {
  gameOverScore = gameOverScore;
}

document.querySelector('#howToPlay').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#modal').style.display = 'block';
});

document.querySelector('#okBtn').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('#modal').style.display = 'none';
});
function nameInput() {
  if (player1NameInput === '' || player1NameInput === null) {
    console.log('object');
    document.querySelector('#name-0').textContent = 'Player 1';
  } else {
    document.querySelector('#name-0').textContent = player1NameInput;
  }
  if (player2NameInput === '' || player2NameInput === null) {
    document.querySelector('#name-1').textContent = 'Player 2';
  } else {
    document.querySelector('#name-1').textContent = player2NameInput;
  }
}

function getElById(element) {
  return document.getElementById(element);
}

function newGame() {
  playingGame = true;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;

  getElById('score-0').textContent = 0;
  getElById('score-1').textContent = 0;
  getElById('current-0').textContent = 0;
  getElById('current-1').textContent = 0;

  nameInput();

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active0');
  document.querySelector('.player-1-panel').classList.remove('active1');
  document.querySelector('.player-0-panel').classList.add('active0');

  document.querySelector('.dice').classList.add('invisible');
}

newGame();

//! new game button
document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
  document.querySelector('.dice').classList.add('invisible');
  document.querySelector('#current-' + activePlayer).textContent = 0;
  roundScore = 0;
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.remove('active' + activePlayer);
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  document
    .querySelector('.player-' + activePlayer + '-panel')
    .classList.add('active' + activePlayer);
}

// ! roll dices button
document.querySelector('.btn-roll').addEventListener('click', () => {
  if (playingGame) {
    let dice = Math.floor(Math.random() * 6) + 1;

    let diceDOM = document.querySelector('.dice');
    diceDOM.src = 'sourceFiles/diceAnimation.gif';
    diceDOM.classList.remove('invisible');
    setTimeout(() => {
      diceDOM.src = 'sourceFiles/dice-' + dice + '.jpg';
      if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
      } else {
        nextPlayer();
      }
    }, 900);
  }
});

// !hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (playingGame) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= gameOverScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      playingGame = false;
    } else {
      nextPlayer();
    }
  }
});

window.addEventListener('keydown', event => {
  if (event.keyCode === 78) {
    newGame();
  } else if (event.keyCode === 82) {
    if (playingGame) {
      let dice = Math.floor(Math.random() * 6) + 1;

      let diceDOM = document.querySelector('.dice');
      diceDOM.src = 'sourceFiles/diceAnimation.gif';
      diceDOM.classList.remove('invisible');
      setTimeout(() => {
        diceDOM.src = 'sourceFiles/dice-' + dice + '.jpg';
        if (dice !== 1) {
          roundScore += dice;
          document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
          nextPlayer();
        }
      }, 900);
    }
  } else if (event.keyCode === 72) {
    if (playingGame) {
      scores[activePlayer] += roundScore;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      if (scores[activePlayer] >= gameOverScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        playingGame = false;
      } else {
        nextPlayer();
      }
    }
  }
});
