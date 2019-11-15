var capturando = "";

let countMatch = 0;

const cardboard = document.querySelector("#cardboard");

const images = [
  "angular.svg",
  "aurelia.svg",
  "backbone.svg",
  "react.svg",
  "vue.svg",
  "ember.svg"
];

let cardHTML = "";

images.forEach(img => {
  // cria html div para cada imagem
  cardHTML += `
    <div class="memory-card" data-card="${img}">
      <img draggable="false" class="front face" src="img/${img}"> 
      <img draggable="false" class="back face" src="img/js-badge.svg">
    </div>
  `;
});

cardboard.innerHTML = cardHTML + cardHTML;

/** Fim renderização HTML */
function capturar() {
  capturando = document.querySelector("#valor").value; // pega o valor
  document.querySelector("#valorDigitado").innerHTML = capturando; //passa para o html
  displayCardboard();
}

function displayCardboard() {
  if (capturando) {
    cardboard.style.display = "flex";
    userInput.style.display = "none";
  }
}

const cards = document.querySelectorAll(".memory-card");

let firstCard, secondCard;
let lockCard = false;

function flipCard() {
  console.log("Lock Card ----> ", lockCard);
  if (lockCard) return false;
  this.classList.add("flip", "card-selected");

  if (!firstCard) {
    firstCard = this; /**se firstCard não foi definida, defina como this */

    return false; /*declara a função e sai dela com o return false*/
  }

  // console.log(firstCard);

  secondCard = this; /*se a firsCard já foi especificada então secondCard vai recerber a proxima clicada*/

  // console.log(secondCard);
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.card === secondCard.dataset.card;
  //console.log("Is Match ----> ", isMatch);
  if (isMatch) countMatch++;
  displayScore(countMatch);

  if (countMatch === 6) openModal();

  !isMatch ? disableCards() : resetCards(isMatch);
}

function displayScore(score) {
  const valorScore = document.querySelector("#valorScore");
  valorScore.innerHTML = score;
}

function disableCards() {
  lockCard = true;
  // console.log(firstCard);
  setTimeout(() => {
    firstCard.classList.remove("flip", "card-selected");
    secondCard.classList.remove("flip", "card-selected");

    resetCards();
  }, 1000);
}

function shuffle() {
  cards.forEach(card => {
    let rand = Math.floor(Math.random() * 12);
    card.style.order = rand;
  });
}

// (function shuffle() {
//   cards.forEach( card => {
//     let rand = Math.floor(Math.random() * 12);
//     card.style.order = rand;
//   });
// })();

function resetCards(isMatch = false) {
  if (isMatch) {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
  }
  [firstCard, secondCard, lockCard] = [null, null, false];
}

cards.forEach(card =>
  card.addEventListener("click", flipCard)
); /**Cada carta que for clicada será adicionada a função flipCard */

//início Modal

let modal = document.querySelector("#simpleModal");
//abre modal
let btnNew = document.querySelector("#btnNewGame");

btnNew.addEventListener("click", () => {
  let cardsWithFlip = document.querySelectorAll(".flip");
  console.log(cardsWithFlip);

  cardsWithFlip.forEach(cards =>
    cards.classList.remove("flip", "card-selected")
  );

  valorScore.innerHTML = 0;
  //console.log(cardsWithFlip);
  //disableCards();
  //lockCard = true;

  closeModal();
  shuffle();
  flipCard();
});

// let displayModal = document.querySelector("#displayModal");
//botão fechar modal
let closeBtn = document.querySelector(".closeBtn");
//ouve para abrir com click
// modalBtn.addEventListener("click", openModal);
//ouve para fechar com click
closeBtn.addEventListener("click", closeModal);
//ouve click de em qualquer parte da tela
window.addEventListener("click", outsideClick);

//função para abrir o modal
function openModal() {
  modal.style.display = "block";
  document.querySelector("#winner").innerHTML = capturando;
}

//função para fechar o modal
function closeModal() {
  modal.style.display = "none";
}

//função para fechar o modal clicando em qualquer parte da tela
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
