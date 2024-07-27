document.getElementById('submit').addEventListener('click', function() {
    const player1 = document.getElementById('player1').value;
    const player2 = document.getElementById('player2').value;

    if (player1 && player2) {
        document.getElementById('player-names').style.display = 'none';
        document.getElementById('game').style.display = 'block';

        let currentPlayer = player1;
        let currentMarker = 'X';
        const board = Array(9).fill(null);
        const message = document.getElementById('message');

        message.textContent = `${currentPlayer}, you're up!`;

        document.querySelectorAll('.cell').forEach(cell => {
            cell.addEventListener('click', function() {
                const index = this.id - 1;

                if (!board[index]) {
                    board[index] = currentMarker;
                    this.textContent = currentMarker;

                    if (checkWin(board, currentMarker)) {
                        message.textContent = `${currentPlayer}, congratulations you won!`;
                        return;
                    }

                    currentPlayer = currentPlayer === player1 ? player2 : player1;
                    currentMarker = currentMarker === 'X' ? 'O' : 'X';
                    message.textContent = `${currentPlayer}, you're up!`;
                }
            });
        });
    } else {
        alert('Please enter names for both players.');
    }
});

function checkWin(board, marker) {
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

    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === marker);
    });
}
