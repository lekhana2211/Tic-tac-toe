document.addEventListener('DOMContentLoaded', () => {
    // Initialize the game board
    const board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let gameActive = true;
    
    // Create the game board UI
    const gameContainer = document.getElementById('game-board');
    const statusDisplay = document.createElement('div');
    statusDisplay.classList.add('status');
    gameContainer.parentNode.insertBefore(statusDisplay, gameContainer.nextSibling);
    
    // Winning conditions (indices of the board array)
    const winningConditions = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // diagonal top-left to bottom-right
        [2, 4, 6]  // diagonal top-right to bottom-left
    ];
    
    // Initialize the game board cells
    function initializeBoard() {
        gameContainer.innerHTML = '';
        board.fill('');
        
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-index', i);
            cell.addEventListener('click', handleCellClick);
            gameContainer.appendChild(cell);
        }
        
        currentPlayer = 'X';
        gameActive = true;
        statusDisplay.textContent = `Current player: ${currentPlayer}`;
    }
    
    // Handle cell click event
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
        
        // If cell is already filled or game is not active, ignore the click
        if (board[clickedCellIndex] !== '' || !gameActive) {
            return;
        }
        
        // Update the board and UI
        board[clickedCellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        
        // Check for win or draw
        if (checkWin()) {
            statusDisplay.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
            return;
        }
        
        if (checkDraw()) {
            statusDisplay.textContent = "Game ended in a draw!";
            gameActive = false;
            return;
        }
        
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Current player: ${currentPlayer}`;
    }
    
    // Check for win
    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return board[index] === currentPlayer;
            });
        });
    }
    
    // Check for draw
    function checkDraw() {
        return board.every(cell => cell !== '');
    }
    
    // Reset the game
    function resetGame() {
        initializeBoard();
    }
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Game';
    resetButton.addEventListener('click', resetGame);
    gameContainer.parentNode.insertBefore(resetButton, statusDisplay.nextSibling);
    
    // Initialize the game
    initializeBoard();
});
