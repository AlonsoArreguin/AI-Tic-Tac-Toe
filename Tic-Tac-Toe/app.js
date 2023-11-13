document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resultDisplay = document.getElementById("result");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.getAttribute("data-index");

        if (gameBoard[cellIndex] === "" && !checkWinner()) {
            gameBoard[cellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            if (checkWinner()) {
                resultDisplay.textContent = `${currentPlayer} wins!`;
                highlightWinnerCells(getWinningCells());
            } else if (isBoardFull()) {
                resultDisplay.textContent = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";

                for (const cell of board.children) {
                    cell.classList.remove("ai-move", "winner");
                }

                if (currentPlayer === "O" && !checkWinner()) {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    }

    function makeAIMove() {
        const bestMove = findBestMove();
        gameBoard[bestMove] = "O";
        const aiCell = board.children[bestMove];
        aiCell.textContent = "O";
        aiCell.classList.add("ai-move");

        if (checkWinner()) {
            resultDisplay.textContent = "O wins!";
            highlightWinnerCells(getWinningCells());
        } else if (isBoardFull()) {
            resultDisplay.textContent = "It's a draw!";
        } else {
            currentPlayer = "X";
        }
    }

    function findBestMove() {
        let bestScore = -Infinity;
        let bestMove;

        for (let i = 0; i < 9; i++) {
            if (gameBoard[i] === "") {
                gameBoard[i] = "O";
                let score = minimax(gameBoard, 0, false);
                gameBoard[i] = "";

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    function minimax(board, depth, isMaximizing) {
        let scores = {
            X: -1,
            O: 1,
            draw: 0,
        };

        let result = checkWinner();
        if (result !== null) {
            return scores[result];
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "O";
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "X";
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return isBoardFull() ? "draw" : null;
    }

    function isBoardFull() {
        return !gameBoard.includes("");
    }

    function getWinningCells() {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
                return pattern;
            }
        }

        return null;
    }

    function highlightWinnerCells(cells) {
        if (cells) {
            for (const cellIndex of cells) {
                const cell = board.querySelector(`[data-index="${cellIndex}"]`);
                cell.classList.add("winner");
            }
        }
    }
});
