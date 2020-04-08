class Player {
  constructor(playerName) {
    this.playerName = playerName;
    this.score = [];
  }
}

class Team {
  constructor(pl1Name, pl2Name) {
    this.playerOneName = pl1Name;
    this.p1Score = [];
    this.playerTwoName = pl2Name;
    this.p2Score = [];
  }
}

class UI {
  setGame() {
    const playerNameInput = prompt('Enter player name:');
    if (playerNameInput !== null && playerNameInput !== '') {
      const player = new Player(playerNameInput.toUpperCase());
      gamePlayers.push(player);
    }
  }

  setTeamGame() {
    return prompt('Number of teams?!');
  }

  static renderGame(playersArr) {
    document.querySelector('.single-play').innerHTML = '';
    playersArr.forEach((obj, index) => {
      const name = obj.playerName;
      const score = obj.score;
      const player = document.createElement('div');
      player.className = 'player';
      const h3 = document.createElement('h3');
      h3.textContent = name;
      const ol = document.createElement('ol');
      score.forEach(points => {
        const li = document.createElement('li');
        li.textContent = points;
        ol.appendChild(li);
      });
      player.appendChild(h3);
      player.appendChild(ol);
      // * edit button
      const editBtn = document.createElement('a');
      editBtn.href = '#';
      editBtn.className = 'edit';
      editBtn.innerHTML = '<i class="fas fa-history edit"></i>EDIT';
      player.appendChild(editBtn);
      document.querySelector('.single-play').appendChild(player);
    });
  }

  addRound(players) {
    players.forEach(player => {
      let score = Number(prompt(`${player.playerName.toUpperCase()} points:`));
      if (!isNaN(score) && score !== null) {
        player.score.push(score);
      } else {
        score = Number(prompt(`Please enter points for ${player.playerName.toUpperCase()}:`));
        player.score.push(score);
      }
    });
  }

  // static editScore(playersArr) {
  //   console.log(obj, index);
  //   const editedScore = Number(prompt(`Please enter points for ${name.toUpperCase()}:`));
  // }
  static editScore(e) {
    if (e.target.className.includes('edit')) {
      const id = e.target.previousSibling.previousSibling.textContent;
      gamePlayers.forEach(playerObj => {
        if (playerObj.playerName === id) {
          playerObj.score.pop();
          let score = Number(prompt(`${playerObj.playerName.toUpperCase()} points:`));
          if (!isNaN(score) && score !== null) {
            playerObj.score.push(score);
          } else {
            score = Number(
              prompt(`Please enter points for ${playerObj.playerName.toUpperCase()}:`)
            );
            playerObj.score.push(score);
          }
        }
      });
    }
  }

  endGame() {
    gamePlayers.forEach(gameObj => {
      if (gameObj.score.length !== 0) {
        let reducedArr = gameObj.score.reduce((acc, cur) => acc + cur);
        gameObj.score.push(reducedArr);
      }
    });

    gamePlayers.sort((a, b) => {
      const indexA = a.score.length - 1;
      const indexB = b.score.length - 1;
      return a.score[indexA] - b.score[indexB];
    });

    // * modal print

    const modal = document.querySelector('#modal');
    modal.style.display = 'block';

    const winner = document.querySelector('#winner');
    const winnerData = gamePlayers[0];
    winner.textContent = `${winnerData.playerName}`;
    const winnerScore = document.querySelector('#winn-score');
    winnerScore.textContent = `score: ${winnerData.score[winnerData.score.length - 1]}`;

    const looser = document.querySelector('#looser');
    const looserData = gamePlayers[gamePlayers.length - 1];
    looser.textContent = `${looserData.playerName}`;
    const looserScore = document.querySelector('#looser-score');
    looserScore.textContent = `score: ${looserData.score[looserData.score.length - 1]}`;

    const midLoosers = document.querySelector('#looser-list');

    for (let i = 1; i <= gamePlayers.length - 2; i++) {
      const li = document.createElement('li');
      li.textContent = `${gamePlayers[i].playerName} score: ${
        gamePlayers[i].score[gamePlayers[i].score.length - 1]
      }`;
      midLoosers.appendChild(li);
    }

    gamePlayers = [];
    localStorage.clear();
  }
}

class locStorage {
  static writeToLS(forStore) {
    localStorage.setItem('gamePlayers', JSON.stringify(forStore));
  }

  static readFromLS() {
    let game;
    if (localStorage.getItem('gamePlayers') === null) {
      game = [];
    } else {
      game = JSON.parse(localStorage.getItem('gamePlayers'));
    }
    return game;
  }
}

//! initiate the game

let gamePlayers = locStorage.readFromLS();
let gameTeams = locStorage.readFromLS();
UI.renderGame(gamePlayers);
UI.renderGame(gameTeams);

// * Add player
document.querySelector('#add-player').addEventListener('click', () => {
  const ui = new UI();
  ui.setGame();
  UI.renderGame(gamePlayers);
  locStorage.writeToLS(gamePlayers);
});

document.querySelector('#round-score').addEventListener('click', () => {
  document.querySelector('#end-game').style.display = 'block';
  const ui = new UI();
  ui.addRound(gamePlayers);
  UI.renderGame(gamePlayers);
  locStorage.writeToLS(gamePlayers);
});

document.querySelector('#end-game').addEventListener('click', () => {
  const ui = new UI();
  ui.endGame();
  document.querySelector('#end-game').style.display = 'none';
});

document.querySelector('#mod-close').addEventListener('click', () => {
  document.querySelector('#modal').style.display = 'none';
});

document.addEventListener('click', e => {
  UI.editScore(e);
  UI.renderGame(gamePlayers);
  locStorage.writeToLS(gamePlayers);
});
