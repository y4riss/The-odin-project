class Board {
  constructor(state = ['', '', '', '', '', '', '', '', '']) {
    this.state = state;
  }

  isEmpty() {
    return this.state.every((cell) => cell == '');
  }
  isFull() {
    return this.state.every((cell) => cell != '');
  }
  checkWinner() {
    // check if board is empty;
    if (this.isEmpty()) return null;

    // check horizontal
    for (let i = 0; i < 3; i++) {
      if (this.state[i * 3] == '') continue;
      if (
        this.state[i * 3] == this.state[i * 3 + 1] &&
        this.state[i * 3 + 1] == this.state[i * 3 + 2]
      )
        return { winner: this.state[i * 3], direction: 'H', row: i };
    }

    // check vertical
    for (let i = 0; i < 3; i++) {
      if (this.state[i] == '') continue;

      if (
        this.state[i] == this.state[i + 3] &&
        this.state[i + 3] == this.state[i + 6]
      )
        return { winner: this.state[i], direction: 'V', row: i };
    }

    // check diagonal
    if (
      this.state[4] &&
      this.state[0] == this.state[4] &&
      this.state[4] == this.state[8]
    )
      return { winner: this.state[4], direction: 'D', row: 0 }; // left diag
    if (
      this.state[4] &&
      this.state[2] == this.state[4] &&
      this.state[4] == this.state[6]
    )
      return { winner: this.state[4], direction: 'D', row: 1 }; // right diag

    if (this.isFull()) return { winner: 'Draw' };

    return null;
  }

  insert(symbol, index) {
    this.state[index] = symbol;
  }
}

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }
}

class AI {
  constructor(symbol) {
    this.symbol = symbol;
  }

  minimax(board, depth, isMaximising) {
    const win = board.checkWinner();
    if (win) {
      const playerSymbol = this.symbol == 'X' ? '0' : 'X';
      if (win.winner == this.symbol) return 100 - depth;
      if (win.winner == playerSymbol) return -100 + depth;
      if (win.winner == 'Draw') return 0;
    }

    if (isMaximising) {
      let bestScore = -1000;
      for (let i = 0; i < 9; i++) {
        if (board.state[i] != '') continue;
        board.state[i] = this.symbol;
        const score = this.minimax(board, depth + 1, !isMaximising);
        board.state[i] = '';
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = 1000;
      for (let i = 0; i < 9; i++) {
        if (board.state[i] != '') continue;
        board.state[i] = this.symbol == 'X' ? '0' : 'X';
        const score = this.minimax(board, depth + 1, !isMaximising);
        board.state[i] = '';
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }

  findBestMove(board) {
    let position;
    let bestScore = -1000;
    for (let i = 0; i < 9; i++) {
      if (board.state[i] != '') continue;
      board.state[i] = this.symbol;
      const score = this.minimax(board, 0, false);
      board.state[i] = '';
      if (score > bestScore) {
        bestScore = score;
        position = i;
      }
    }
    return position;
  }
}

class UserInterface {
  static displayMove(symbol, elem, index) {
    elem.firstChild.textContent = symbol;
    elem.style.pointerEvents = 'none';
  }
}

(function Game() {
  const player = new Player('X');
  const ai = new AI('0');
  const board = new Board();

  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell) => {
    cell.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      board.insert(player.symbol, index);
      UserInterface.displayMove(player.symbol, e.target, index);
      const bestMoveIndex = ai.findBestMove(board);
      board.insert(ai.symbol, bestMoveIndex);
      const target = document.querySelector(`[data-index='${bestMoveIndex}'`);
      UserInterface.displayMove(ai.symbol, target, bestMoveIndex);
    });
  });
})();
