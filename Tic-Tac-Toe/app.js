document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const resultDisplay = document.getElementById("result");

    // Initialize the game state
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    // Create the cells and append them to the board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    // Function to handle cell click
    function handleCellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.getAttribute("data-index");

        // Check if the cell is empty and the game is still ongoing
        if (gameBoard[cellIndex] === "" && !checkWinner()) {
            // Update the game state
            gameBoard[cellIndex] = currentPlayer;
            clickedCell.textContent = currentPlayer;

            // Check for a winner
            if (checkWinner()) {
                resultDisplay.textContent = `${currentPlayer} wins!`;
            } else if (isBoardFull()) {
                resultDisplay.textContent = "It's a draw!";
            } else {
                // Switch to the next player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    // Function to check for a winner
    function checkWinner() {
        // Define winning combinations
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
                highlightWinnerCells(pattern);
                return true;
            }
        }

        return false;
    }

    // Function to check if the board is full (draw)
    function isBoardFull() {
        return !gameBoard.includes("");
    }

    // Function to highlight the winning cells
    function highlightWinnerCells(cells) {
        for (const cellIndex of cells) {
            const cell = board.querySelector(`[data-index="${cellIndex}"]`);
            cell.classList.add("winner");
        }
    }

});
