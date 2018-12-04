import React from 'react';
import Board from './Board';
import checkRow from '../../../helperFunctions/checkRow';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 19,
      currentColor: 1,
      currentPosition: [0, 0],
      boardState: this.createBoard(19),
      victory: false,
    };
    this.black = 1;
    this.white = 2;
    this.createBoard = this.createBoard.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  createBoard (size) {
    let board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }

  handleOnClick (e) {
    let row = Number(e.target.className);
    let col = Number(e.target.id);
    if (this.state.boardState[row][col] === 0) {
      let newBoard = this.state.boardState.slice();
      newBoard[row][col] = this.state.currentColor;
      this.setState({
        boardState: newBoard,
        currentPosition: [row, col],
        currentColor: this.state.currentColor === this.black ? this.white: this.black
      }, () => {
        // if (checkRow(this.state.boardState, this.state.currentPosition)) {
        //   console.log('VICTORY!')
        // }
      })
    }
  }

  render () {
    return (
      <div>
        <Board boardState={this.state.boardState} handleOnClick={this.handleOnClick} currentColor={this.state.currentColor} size={this.state.size}/>
      </div>
    )
  };
};

export default App;