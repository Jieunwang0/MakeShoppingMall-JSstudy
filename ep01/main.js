// document.querySelector("#app").innerHTML = `
// <button type="button" class="hello1">Check</button>
// <button type="button" class="hello2">Hello2</button>
// <button type="button" class="hello3">Hello3</button>

// <div><input class="name" type="text" placeholder="Type of your name: "></div>
// `;

// document.querySelector("button").addEventListener("click", (e) => {
//   const input = document.querySelector(".name");
//   console.log(input.value);
// });

// document.querySelector("#app").innerHTML = `
// <input />
// <button>Click</button>

// `;

// document.querySelector("button").addEventListener("click", (e) => {
//     const currentVal = document.querySelector("input").value;

//     document.querySelector("input").value = currentVal + "*";
// });

// let count = 0;

// setInterval(() => {
//     count += 1;
//     document.querySelector("#app").innerHTML = `
// <input />
// <button>Click</button>
// <p>count: ${count}</p>
// `;
// }, 5000);

document.querySelector("#app").innerHTML = `

<button class="btn-add-card" type="button">Add card</button>
<div class="cards"></div>

`;

let cardCount = 0;

document.querySelector(".btn-add-card").addEventListener("click", () => {
  cardCount += 1;
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML= `
  <p>Card #${cardCount}</p>
  <button type="button" class="btn-hello" data-number="${cardCount}">hello</button>
  `;
  const myCardCount = cardCount;
//   card.querySelector(".btn-hello").addEventListener("click", () => {
// console.log(`hello! ${myCardCount}`);
//   })
    document.querySelector(".cards").appendChild(card);
});

document.querySelector(".cards").addEventListener("click", (e) => {
// console.log("click from .cards", e);
const maybeButton = e.target;
if(maybeButton.matches(".btn-hello")) {
  // const cardName = maybeButton.parentElement.children[0].innerText;
  // const cardNumber = parseInt(cardName.split(" ")[1].slice(1), 10);
  // console.log("button is clicked!", maybeButton.getAttribute("data-number"))
} else {
  console.log("something else. let's ignore this.");
}
})