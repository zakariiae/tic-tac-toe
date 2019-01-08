const cards = document.querySelectorAll(".card");
const playModal = document.querySelectorAll(".play");
const compButton = document.querySelector(".comp");
const twoPlayerButton = document.querySelector(".two_play");
const winner = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9]
];
let cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    firstPlayer = [],
    secondPlayer = [],
    computer = [],
    count = 0,
    withComputer = false;
/*******************************************************/
function check(array) {
  let finalResult = false;
  for (let item of winner) {
    let res = item.every(val => array.indexOf(val) !== -1);
    if (res) {
      finalResult = true;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function checkForBlock() {
  let finalResult = -1;
  for (let item of winner) {
    let a = item[0],
      b = item[1],
      c = item[2];
    if (
      firstPlayer.includes(a) &&
      firstPlayer.includes(b) &&
      !computer.includes(c)
    ) {
      finalResult = c;
      break;
    } else if (
      firstPlayer.includes(b) &&
      firstPlayer.includes(c) &&
      !computer.includes(a)
    ) {
      finalResult = a;
      break;
    } else if (
      firstPlayer.includes(a) &&
      firstPlayer.includes(c) &&
      !computer.includes(b)
    ) {
      finalResult = b;
      break;
    }
  }
  return finalResult;
}
/*******************************************************/
function winnerPlayer(p) {
  const modal = document.createElement("div");
  const header = document.createElement("h1");
  const com = document.createElement("button");
  const twoPl = document.createElement("button");
  modal.classList.add("winner");
  header.appendChild(document.createTextNode(p));
  com.appendChild(document.createTextNode("Vs computer"));
  com.setAttribute("onclick", "rep(event)");
  com.classList.add("comp");
  twoPl.appendChild(document.createTextNode("2 players"));
  twoPl.setAttribute("onclick", "rep(event)");
  twoPl.classList.add("two_play");
  modal.appendChild(header);
  modal.appendChild(com);
  modal.appendChild(twoPl);
  document.body.appendChild(modal);
}
/*******************************************************/
function draw() {
  if (withComputer) {
    if (this.classList == "card") {
      this.classList.add("x");
      let cardIndx = Number(this.dataset.index);
      let arrayIndx = cardNumbers.indexOf(cardIndx);
      cardNumbers.splice(arrayIndx, 1);
      firstPlayer.push(cardIndx);
      if (check(firstPlayer)) {
        winnerPlayer("congrats, you win");
        return;
      }
      if (cardNumbers.length == 0) {
        winnerPlayer("Draw");
        return;
      }
      cardIndx = checkForBlock();
      if (cardIndx !== -1) {
        arrayIndx = cardNumbers.indexOf(cardIndx);
        cardNumbers.splice(arrayIndx, 1);
        let computerDraw = document.querySelector(`[data-index="${cardIndx}"]`);
        computerDraw.classList.add("o");
        computer.push(Number(computerDraw.dataset.index));
      } else {
        let cardNumbersLength = cardNumbers.length;
        let random = Math.floor(Math.random() * cardNumbersLength);
        cardIndx = cardNumbers[random];
        arrayIndx = cardNumbers.indexOf(cardIndx);
        cardNumbers.splice(arrayIndx, 1);
        let computerDraw = document.querySelector(`[data-index="${cardIndx}"]`);
        computerDraw.classList.add("o");
        computer.push(Number(computerDraw.dataset.index));
      }
      if (check(computer)) {
        winnerPlayer("sorry, you lose");
        return;
      }
    }
  } else {
    if (this.classList == "card") {
      count++;
      if (count % 2 !== 0) {
        this.classList.add("x");
        firstPlayer.push(Number(this.dataset.index));
        if (check(firstPlayer)) {
          winnerPlayer("Congrats player one you win");
        }
      } else {
        this.classList.add("o");
        secondPlayer.push(Number(this.dataset.index));
        if (check(secondPlayer)) {
          winnerPlayer("Congrats player two you win");
        }
      }
      if (count === 9) {
        winnerPlayer("Draw");
      }
    }
  }
}
/*******************************************************/
function rep(e) {
  cards.forEach(card => (card.classList = "card"));
  firstPlayer = [];
  secondPlayer = [];
  cardNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  computer = [];
  count = 0;
  start(e);
}
/*******************************************************/
function start(e) {
  if (e.target.classList == "comp") {
    withComputer = true;
  } else if (e.target.classList == "two_play") {
    withComputer = false;
  }
  e.target.parentElement.remove();
}
/*******************************************************/
cards.forEach(card => card.addEventListener("click", draw));
compButton.addEventListener("click", start);
twoPlayerButton.addEventListener("click", start);