let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#RESET-BUTTON");
let player1 = document.querySelector("#player1-score");
let player2 = document.querySelector("#player2-score");
let winnerMsg = document.querySelector("#winner-msg");

let turnO = true;
let count = 0;
let isGameOver = false;
let autoResetTimer = null;

let player1Score = 0;
let player2Score = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// Disable all boxes
const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

// Enable all boxes and clear board
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("winner");
    });
};

// Reset game
const resetGame = () => {
    if (autoResetTimer) {
        clearTimeout(autoResetTimer);
        autoResetTimer = null;
    }
    isGameOver = false;
    turnO = true;
    count = 0;
    winnerMsg.innerText = "";
    enableBoxes();
};

resetButton.addEventListener("click", resetGame);

// Check winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos1 === pos2 && pos2 === pos3) {
            isGameOver = true;

            // Add winner effect
            boxes[pattern[0]].classList.add("winner");
            boxes[pattern[1]].classList.add("winner");
            boxes[pattern[2]].classList.add("winner");

            if (pos1 === "O") {
                player1Score++;
                player1.innerText = player1Score;
                winnerMsg.innerText = "🏆 O Wins!";
            } else {
                player2Score++;
                player2.innerText = player2Score;
                winnerMsg.innerText = "🏆 X Wins!";
            }

            disableBoxes();

            // Automatically reset the board after a 2-second delay for the next round
            autoResetTimer = setTimeout(() => {
                resetGame();
            }, 2000);

            return true;
        }
    }
    return false;
};

// Draw game
const gameDraw = () => {
    isGameOver = true;
    winnerMsg.innerText = "🤝 Game was a Draw!";
    disableBoxes();

    // Automatically reset the board after a 2-second delay for the next round
    autoResetTimer = setTimeout(() => {
        resetGame();
    }, 2000);
};

// Box click events
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (isGameOver || box.disabled || box.innerText !== "") {
            return;
        }

        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }

        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
