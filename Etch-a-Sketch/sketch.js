const container = document.getElementById('container');
const resetButton = document.getElementById('resetButton');

function createGrid(numSquares) {
    container.innerHTML = ''; // Clear previous grid
    container.style.setProperty('--numSquares', numSquares);
    for (let i = 0; i < numSquares * numSquares; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.addEventListener('mouseover', () => {
            square.style.backgroundColor = getRandomColor();
            darkenSquare(square);
        });
        container.appendChild(square);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function darkenSquare(square) {
    const opacity = parseFloat(square.style.opacity) || 1;
    if (opacity > 0) {
        square.style.opacity = opacity - 0.1;
    }
}

resetButton.addEventListener('click', () => {
    let numSquares = prompt("Enter the number of squares per side (max 100):");
    numSquares = Math.min(Math.max(parseInt(numSquares), 1), 100);
    createGrid(numSquares);
});

// Initialize grid
createGrid(32);
