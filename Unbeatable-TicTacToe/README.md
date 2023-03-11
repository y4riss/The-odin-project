# Tic Tac Toe with Minimax Algorithm

This is a simple implementation of a Tic Tac Toe game using the Minimax algorithm in JavaScript.

## Overview

The goal of this project was to create a Tic Tac Toe game that uses the Minimax algorithm to determine the best move for the computer player. The game is built using HTML, CSS, and JavaScript, and can be played in any modern web browser.

## Minimax Algorithm

The Minimax algorithm is a decision-making algorithm used in game theory to determine the best move for a player in a two-player, zero-sum game. In Tic Tac Toe, the algorithm works by recursively evaluating all possible moves and choosing the one that maximizes the computer player's chances of winning, while minimizing the human player's chances of winning.

## Minimax optimization ( Alpha-beta pruning )

Even though tic tac toe game doesn't have that many states compared to chess for example, but it was fun implementing the alpha-beta pruning technique to optimize my game.
Alpha-beta pruning allows the computer player to search through the game tree more efficiently by only exploring the most promising moves, cutting off branches of the tree that are irrelevant to the final result, and thus reducing the number of positions that need to be evaluated.


## How to play

You can either clone the game repositary , or visit the live version of the game [here](https://joessir-tic-tac-toe.netlify.app/)
Once done, you can either choose to play against the unbeatable AI , or vs your friend!
