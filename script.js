'use strict';

// Selecting Elements
const diceEl = document.querySelector('.dice');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.getElementById('current--1');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

let scores, activePlayer, currentScore, playing;
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();
function changePlayer() {
  activePlayer = activePlayer === 1 ? 0 : 1;
  return activePlayer;
}
function changeColor() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}
function addCurrentScore(dice) {
  currentScore += dice;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
}
function clearCurrentScore() {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
}
function playerWin() {
  diceEl.classList.add('hidden');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
}
// Listens
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      addCurrentScore(dice);
    } else {
      clearCurrentScore();
      changePlayer();
      changeColor();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    if (scores[activePlayer] >= 100) {
      playing = false;
      playerWin();
    } else {
      changePlayer();
      changeColor();
    }
  }
});

btnNew.addEventListener('click', init);
