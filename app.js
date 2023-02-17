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
      if (
        this.state[i * 3] == this.state[i * 3 + 1] &&
        this.state[i * 3 + 1] == this.state[i * 3 + 2]
      )
        return { winner: this.state[i * 3], direction: 'H', row: i };
    }

    // check vertical
    for (let i = 0; i < 3; i++) {
      if (
        this.state[i] == this.state[i + 3] &&
        this.state[i + 3] == this.state[i + 6]
      )
        return { winner: this.state[i], direction: 'V', row: i };
    }

    // check diagonal
    if (this.state[0] == this.state[4] && this.state[4] == this.state[8])
      return { winner: this.state[4], direction: 'D', row: 0 }; // left diag
    if (this.state[2] == this.state[4] && this.state[4] == this.state[6])
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
  constructor(symbol) {
    this.symbol = symbol;
  }

  static getBestMove(board, depth, isMaximising) {}
}

let board = new Board(['x', 'o', 'x', 'x', 'o', 'o', 'o', 'o', 'x']);
board.printFormattedBoard();
console.log(board.isEmpty());
console.log(board.isFull());
console.log(board.checkWinner());

// step 1 : loop throu all the possibilities
