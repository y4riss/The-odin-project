class Board {
  constructor(state = ['', '', '', '', '', '', '', '']) {
    this.state = state;
  }

  printFormattedBoard() {
    let formattedString = '';
    this.state.forEach((cell, index) => {
      formattedString += cell ? ` ${cell} |` : '   |';
      if ((index + 1) % 3 == 0) {
        formattedString = formattedString.slice(0, -1);
        if (index < 8)
          formattedString +=
            '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n';
      }
    });
    console.log('%c' + formattedString, 'color: #6d4e42;font-size:16px');
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

  insert(symbol, position) {
    if (this.state[position] || position > 8 || position < 0) return false;
    this.state[position] = symbol;
    return true;
  }

  //   getAvailableMoves() {
  //     const moves = [];
  //     this.state.forEach((cell, index) => {
  //       if (!cell) moves.push(index);
  //     });
  //     return moves;
  //   }
}

class AI {
  static minimax(board, depth, isMaximising) {
    // checking if game is over
    const win = board.checkWinner();
    if (win) {
      // if there is a winner
      if (win.winner == 'X') return 100 - depth;
      if (win.winner == '0') return -100 + depth;
      if (win.winner == 'Draw') return 0;
    }

    // loop throu all available spots in the gameBoard
    if (isMaximising) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board.state[i] != '') continue;
        board.state[i] = 'X';
        const score = this.minimax(board, depth + 1, false);
        board.state[i] = '';
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board.state[i] != '') continue;
        board.state[i] = '0';
        const score = this.minimax(board, depth + 1, true);
        board.state[i] = '';
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  }
}

let board = new Board(['', '', '', '', '', '', '', '', '']);
board.printFormattedBoard();
// let x = AI.minimax(board, 0, false);

let position;
let bestScore = -Infinity;

for (let i = 0; i < 9; i++) {
  if (board.state[i] != '') continue;
  board.state[i] = 'X';
  const score = AI.minimax(board, 0, false);
  board.state[i] = '';
  if (score > bestScore) {
    bestScore = score;
    position = i;
  }
}
console.log(position);
// step 1 : loop throu all the possibilities
