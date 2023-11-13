document.addEventListener("DOMContentLoaded",function() {
    const board = document.getElementById("board");

    for (let i = 0; i < 0; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-index",i);
        board.appendChild(cell);
    }
});