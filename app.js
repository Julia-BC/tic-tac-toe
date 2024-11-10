// Função para cada quadrado do tabuleiro
function Square({ value, onClick, isWinner }) {
    return React.createElement(
        'button',
        {
            className: `square ${isWinner ? 'winner' : ''}`,
            onClick: onClick,
        },
        value
    );
}

// Função para o tabuleiro do Jogo
function Board({ onReset }) {
    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = React.useState(true);

    const winnerData = calculateWinner(squares);
    const winner = winnerData ? winnerData.winner : null;
    const winningSquares = winnerData ? winnerData.line : [];

    const status = winner
        ? `Vencedor: ${winner}`
        : `Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
    
    function handleClick(i) {
        if (squares[i] || winner) return;

        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

    function renderSquare(i) {
        return React.createElement(Square, {
            value: squares[i],
            onClick: () => handleClick(i),
            isWinner: winningSquares.includes(i),
            key: i,
        });
    }

    function handleReset() {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        onReset();
    }

    return React.createElement(
        'div',
        null,
        React.createElement('div', { className: 'status' }, status),
        React.createElement(
            'div',
            { className: 'board' },
            Array.from({ length: 9 }, (_, i) => renderSquare(i))
        ),
        React.createElement(
            'button',
            { className: 'reset-button', onClick: handleReset },
            'Reiniciar Jogo'
        )
    );
}

// Função para calcular o vencedor
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}

// Componente do jogo principal
function Game() {
    return React.createElement(
        'div',
        { className: 'game' },
        React.createElement(Board, { onReset: () => {} })
    );
}

// Renderizando o jogo no DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Game));