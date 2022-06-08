const p1 = {
  Score: 0,
  Button: document.querySelector("#p1-button"),
  Display: document.querySelector("#p1Display"),
};

const p2 = {
  Score: 0,
  Button: document.querySelector("#p2-button"),
  Display: document.querySelector("#p2Display"),
};

let resetBtn = document.querySelector("#reset-button");
let playUpto = document.querySelector("#playUpto");
let winningScore;
let isGameOver = false;

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.Score += 1;
    if (player.Score === winningScore) {
      isGameOver = true;
      player.Display.classList.add("has-text-success");
      opponent.Display.classList.add("has-text-danger");
      player.Button.disabled = true;
      opponent.Button.disabled = true;
    }

    player.Display.textContent = player.Score;
  }
}

p1.Button.addEventListener("click", function () {
  updateScores(p1, p2);
});

p2.Button.addEventListener("click", function () {
  updateScores(p2, p1);
});

resetBtn.addEventListener("click", reset);

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.Score = 0;
    p.Display.textContent = 0;
    p.Display.classList.remove("has-text-danger", "has-text-success");
    p.Button.disabled = false;
  }
}
playUpto.addEventListener("change", function () {
  winningScore = parseInt(this.value);
  reset();
});
