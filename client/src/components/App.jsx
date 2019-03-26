import React from 'react';
import Board from './Board';
import checkRow from '../../../helperFunctions/checkRow';
import checkCol from '../../../helperFunctions/checkCol';
import checkMajorDiagnal from '../../../helperFunctions/checkMajorDiagnal';
import checkMinorDiagnal from '../../../helperFunctions/checkMinorDiagnal';
import VictoryPage from './VictoryPage';
import axios from 'axios';
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
    this.fetch();
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

  fetch() {
    axios
      .get('/api/gomoku')
      .then(result => {
        if (result.data[0].board !== '') {
          this.setState({
            boardState: JSON.parse(result.data[0].board),
            currentColor: result.data[0].nextTurn
          })
        } else {
          this.setState({
            boardState: this.createBoard(15)
          })
        }
        this.setState({
          blackWin: result.data[0].black,
          whiteWin: result.data[0].white
        }, () => {
          console.log(this.state.blackWin, this.state.whiteWin)
        });
      })
      .catch(err => {
        console.error('Client get Error: ', err);
      });
  }

  handleOnClick(e) {
    let row = Number(e.currentTarget.className);
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
          axios.put('/api/gomoku', {
            black: this.state.blackWin,
            white: this.state.whiteWin,
            board: JSON.stringify(this.state.boardState),
            nextTurn: this.state.currentColor
          })
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
              this.setState(
                {
                  victory: true,
                  blackWin: this.state.blackWin + 1
                },
                () => {
                  axios.put('/api/gomoku', {
                    black: this.state.blackWin,
                    white: this.state.whiteWin,
                    board: ''
                  });
                }
              );
            } else {
              this.setState(
                {
                  victory: true,
                  whiteWin: this.state.whiteWin + 1
                },
                () => {
                  axios.put('/api/gomoku', {
                    black: this.state.blackWin,
                    white: this.state.whiteWin,
                    board: ''
                  });
                }
              );
            }
          }
        }
      );
    }
  }

  whosTurn () {
    if (this.state.currentColor === 1) {
      return "It is Black's turn!"
    } else {
      return "It is White's turn!"
    }
  }

  buttonsOnClick (e) {
    if (e.target.className === "clearWin") {
      axios.put('/api/gomokuWipe', {
        black: 0,
        white: 0 
      })
      .then(result => {
        this.fetch();
      })
    } else if (e.target.className === "clearBoard") {
      this.setState({
        victory: false,
        currentColor: 1
      })
      axios.put('/api/gomokuWipe', {
        board: '' 
      })
      .then(result => {
        this.fetch();
      })
    }
  }

  render() {
    return (
      <div className={styles.appBody}>
        <div className={styles.title}>
          Gomoku!
        </div>
        <div className={styles.win}>
          <h3>Black has won: {this.state.blackWin} times</h3>
          <h3>|</h3>
          <h3>White has won: {this.state.whiteWin} times</h3>
        </div>
        <div className={styles.boardWin}>
          <Board
            boardState={this.state.boardState}
            handleOnClick={this.handleOnClick}
            currentColor={this.state.currentColor}
            size={this.state.size}
          />

        </div>
        <h1 className={styles.turn}>
            {this.state.victory ? null: this.whosTurn()}
          </h1>
          {this.state.victory ? (
            <VictoryPage
              victor={this.state.currentColor === this.black ? 'White' : 'Black'}
            />
          ) : null}
        <div className={styles.buttons}>
          <button onClick={this.buttonsOnClick} className="clearWin"> Clear Win Record</button>
          <button onClick={this.buttonsOnClick} className="clearBoard"> Clear Board</button>
        </div>
      </div>
    );
  }
}

export default App;
