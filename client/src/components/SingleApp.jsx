import React from 'react';
import Board from './Board';
import checkRow from '../../../helperFunctions/checkRow';
import checkCol from '../../../helperFunctions/checkCol';
import checkMajorDiagnal from '../../../helperFunctions/checkMajorDiagnal';
import checkMinorDiagnal from '../../../helperFunctions/checkMinorDiagnal';
import VictoryPage from './VictoryPage';
import styles from '../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: 15,
      currentColor: 1,
      currentPosition: [0, 0],
      boardState: this.createBoard(15),
      victory: false,
      blackWin: 0,
      whiteWin: 0
    };
    this.black = 1;
    this.white = 2;
    this.createBoard = this.createBoard.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.fetch = this.fetch.bind(this);
    this.buttonsOnClick = this.buttonsOnClick.bind(this);
  }

  componentDidMount() {
    this.setState({
      boardState: this.createBoard(15)
    });
  }

  createBoard(size) {
    let board = [];
    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i][j] = 0;
      }
    }
    return board;
  }

  handleOnClick(e) {
    let row = Number(e.currentTarget.getAttribute('data-rownum'));
    let col = Number(e.currentTarget.id);
    if (this.state.boardState[row][col] === 0 && !this.state.victory) {
      let newBoard = this.state.boardState.slice();
      newBoard[row][col] = this.state.currentColor;
      this.setState(
        {
          boardState: newBoard,
          currentPosition: [row, col],
          currentColor:
            this.state.currentColor === this.black ? this.white : this.black
        },
        () => {
          if (
            checkRow(this.state.boardState, this.state.currentPosition) ||
            checkCol(this.state.boardState, this.state.currentPosition) ||
            checkMajorDiagnal(
              this.state.boardState,
              this.state.currentPosition
            ) ||
            checkMinorDiagnal(this.state.boardState, this.state.currentPosition)
          ) {
            if (this.state.currentColor === 2) {
              this.setState({
                victory: true,
                blackWin: this.state.blackWin + 1
              });
            } else {
              this.setState({
                victory: true,
                whiteWin: this.state.whiteWin + 1
              });
            }
          }
        }
      );
    }
  }

  whosTurn() {
    if (this.state.currentColor === 1) {
      return "It is Black's turn!";
    } else {
      return "It is White's turn!";
    }
  }

  buttonsOnClick(e) {
    if (e.target.className === 'clearWin') {
      this.setState({
        blackWin: 0,
        whiteWin: 0
      })
    } else if (e.target.id === 'clearBoard') {
      this.setState({
        victory: false,
        currentColor: 1,
        boardState: this.createBoard(15)
      });
    }
  }

  render() {
    return (
      <div className={styles.appBody}>
        <div className={styles.title}>Gomoku!</div>
        <div className={styles.win}>
          <h3>Black has won: {this.state.blackWin} times</h3>
          <h3>|</h3>
          <h3>White has won: {this.state.whiteWin} times</h3>
        </div>
        <Board
          boardState={this.state.boardState}
          handleOnClick={this.handleOnClick}
          currentColor={this.state.currentColor}
          size={this.state.size}
        />
        {this.state.victory ? (
          <VictoryPage
            victor={this.state.currentColor === this.black ? 'White' : 'Black'}
          />
        ) : (
          <h1 className={styles.turn}>{this.whosTurn()}</h1>
        )}
        <div className={styles.buttons}>
          <button onClick={this.buttonsOnClick} className="clearWin">
            {' '}
            Clear Win Record
          </button>
          <button
            onClick={this.buttonsOnClick}
            id="clearBoard"
            className={styles.clearBoard}
          >
            {' '}
            Clear Board
          </button>
        </div>
      </div>
    );
  }
}

export default App;
