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
        return { winner: this.state[i * 3], direction: 'horizontal', row: i };
    }

    // check vertical
    for (let i = 0; i < 3; i++) {
      if (this.state[i] == '') continue;

      if (
        this.state[i] == this.state[i + 3] &&
        this.state[i + 3] == this.state[i + 6]
      )
        return { winner: this.state[i], direction: 'vertical', row: i };
    }

    // check diagonal
    if (
      this.state[4] &&
      this.state[0] == this.state[4] &&
      this.state[4] == this.state[8]
    )
      return { winner: this.state[4], direction: 'diag', row: 0 }; // left diag
    if (
      this.state[4] &&
      this.state[2] == this.state[4] &&
      this.state[4] == this.state[6]
    )
      return { winner: this.state[4], direction: 'diag', row: 1 }; // right diag

    if (this.isFull()) return { winner: 'Draw' };

    return null;
  }

  insert(symbol, index) {
    this.state[index] = symbol;
  }

  resetBoard() {
    this.state = ['', '', '', '', '', '', '', '', ''];
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
  static displayMove(symbol, elem) {
    elem.firstChild.textContent = symbol;
    elem.style.pointerEvents = 'none';
  }

  static async displayBoard(choice) {
    const intro = document.querySelector('.intro');
    const board = document.querySelector('.board');
    const container = document.querySelector('.container');

    if (choice == 'vs-ai')
      intro.innerHTML =
        '<h4>You are facing the unbeatable AI, good luck...</h4>';
    else
      intro.innerHTML =
        '<h4>This is a player vs player mode, may the best win !</h4>';

    container.classList.add('hidden');
    intro.classList.remove('hidden');
    await sleep(6000);
    intro.classList.add('hidden');
    board.classList.remove('hidden');
  }

  static displayWinner(win) {
    const outro = document.querySelector('.outro');
    const line = document.querySelector('.line');

    if (win.winner == 'Draw')
      outro.firstChild.nextSibling.textContent = 'This is a Draw';
    else {
      line.classList.remove('hidden');
      line.classList.add(`${win.direction}${win.row}`);
      outro.firstChild.nextSibling.textContent = `${win.winner} has won`;
    }
    outro.classList.remove('hidden');
  }

  static resetBoard() {
    const cells = document.querySelectorAll('.cell');

    cells.forEach((cell) => {
      cell.firstChild.textContent = '';
      cell.style.pointerEvents = 'all';
    });
  }
}

(function Game() {
  let choice;
  const board = new Board();
  const cells = document.querySelectorAll('.cell');
  const choiceBtns = document.querySelector('.btns');
  const replayBtn = document.querySelector('.replay');

  choiceBtns.addEventListener('click', (e) => {
    if (e.target.type == 'button') {
      choice = e.target.classList.value;
      UserInterface.displayBoard(choice);
      start();
    }
  });

  const start = () => {
    if (choice == 'vs-player') {
      const player1 = new Player('X');
      const player2 = new Player('0');
      let turn = 1;
      cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
          if (turn) playerVSplayer(e, player1);
          else playerVSplayer(e, player2);
          turn = !turn;
        });
      });
    } else {
      const player = new Player('X');
      const ai = new AI('0');
      cells.forEach((cell) => {
        cell.addEventListener('click', (e) => {
          playerVSai(e, player, ai);
        });
      });
    }
  };

  const playerVSai = async (e, player, ai) => {
    const boardHTML = document.querySelector('.board');
    const index = e.target.dataset.index;
    let win;
    board.insert(player.symbol, index);
    UserInterface.displayMove(player.symbol, e.target);
    win = board.checkWinner();
    if (win) {
      UserInterface.displayWinner(win);
      boardHTML.style.pointerEvents = 'none';
    }
    const bestMoveIndex = ai.findBestMove(board);
    board.insert(ai.symbol, bestMoveIndex);
    const target = document.querySelector(`[data-index='${bestMoveIndex}'`);
    boardHTML.style.pointerEvents = 'none';
    await sleep(1000);
    boardHTML.style.pointerEvents = 'all';
    UserInterface.displayMove(ai.symbol, target);
    win = board.checkWinner();
    if (win) {
      UserInterface.displayWinner(win);
      boardHTML.style.pointerEvents = 'none';
    }
  };

  const playerVSplayer = (e, player) => {
    const boardHTML = document.querySelector('.board');
    const index = e.target.dataset.index;
    let win;
    board.insert(player.symbol, index);
    UserInterface.displayMove(player.symbol, e.target);
    win = board.checkWinner();
    if (win) {
      UserInterface.displayWinner(win);
      boardHTML.style.pointerEvents = 'none';
    }
  };

  replayBtn.addEventListener('click', () => {
    location.reload();
  });
})();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
