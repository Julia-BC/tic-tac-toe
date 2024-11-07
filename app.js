//Função para cada quadrado do tabuleiro
function Square({ value, onClick }) {
    return React.createElement(
        'button',
        {
            className: 'square',
            onClick: onClick,
        },
        value
    );
}

//Função para o tabuleiro do Jogo
function Board() {
    const [squares, setSquares] = React.useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = React.useState(true);

    const winner = calculateWinner(squares);
    const status = winner
        ?`Vencedor: ${winner}`
        :`Próximo jogador: ${xIsNext ? 'X' : 'O'}`;
    
    function handleClick(i) {
        if (squares[i] || winner) return;

        const newSquares = squares.slice();
        newSquares[i] = xIsNext ? 'X' : "O";
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }
    function renderSquare(i) {
        return React.createElement(Square, {
            value: squares[i],
            onClick: () => handleClick(i),
            key: i,
        });
    }

    return React.createElement(
        'div',
        null,
        React.createElement('div', {className: 'status'}, status),
        React.createElement(
            'div',
            { className: 'board'},
            Array.from({length: 9 }, (_, i) => renderSquare(i))
        )
    );
}

//Função para calcular o vencedor
function calculateWinner(squares){
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
    for (let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// Componente do jogo principal
function Game() {
    return React.createElement(
        'div',
        { className: 'game' },
        React.createElement(Board)
    );
}

//Renderizando o jogo no DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Game));