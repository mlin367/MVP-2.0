import React from 'react';
import Board from './Board';
import checkRow from '../../../helperFunctions/checkRow';
import checkCol from '../../../helperFunctions/checkCol';
import checkMajorDiagnal from '../../../helperFunctions/checkMajorDiagnal';
import checkMinorDiagnal from '../../../helperFunctions/checkMinorDiagnal';
import VictoryPage from './VictoryPage';
import axios from 'axios';
import styles from '../css/App.css';
import socketIOClient from 'socket.io-client';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playerColor: 0,
      size: 15,
      currentColor: 1,
      currentPosition: [0, 0],
      boardState: this.createBoard(15),
      victory: false,
      blackWin: 0,
      whiteWin: 0,
      players: 0
    };
    this.black = 1;
    this.white = 2;
    this.createBoard = this.createBoard.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.fetch = this.fetch.bind(this);
    this.buttonsOnClick = this.buttonsOnClick.bind(this);
    this.socket = socketIOClient.connect();
    axios.defaults.baseURL = 'http://18.223.98.89:1337';
  }

  componentDidMount() {
    this.fetch();

    this.socket.on('getCount', count => {
      this.setState({
        players: count
      });
    });

    this.socket.on('playerColor', playerColor => {
      this.setState({
        playerColor
      });
    });

    this.socket.on('clearBoard', obj => {
      this.setState(obj, () => {
        axios
          .put('/api/gomokuWipe', {
            board: ''
          })
          .then(result => {
            this.fetch();
          });
      });
    });

    this.socket.on('placePiece', obj => {
      this.setState(obj, () => {
        axios.put('/api/gomoku', {
          black: this.state.blackWin,
          white: this.state.whiteWin,
          board: JSON.stringify(this.state.boardState),
          nextTurn: this.state.currentColor
        });
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
            this.socket.emit('blackWin', {
              victory: true,
              blackWin: this.state.blackWin + 1
            });
            this.socket.on('blackWin', obj => {
              this.setState(obj, () => {
                axios.put('/api/gomoku', {
                  black: this.state.blackWin,
                  white: this.state.whiteWin,
                  board: ''
                });
              });
            });
          } else {
            this.socket.emit('whiteWin', {
              victory: true,
              whiteWin: this.state.whiteWin + 1
            });
            this.socket.on('whiteWin', obj => {
              this.setState(obj, () => {
                axios.put('/api/gomoku', {
                  black: this.state.blackWin,
                  white: this.state.whiteWin,
                  board: ''
                });
              });
            });
          }
        }
      });
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

  fetch() {
    axios
      .get('/api/gomoku')
      .then(result => {
        this.socket.emit('fetch', result);
        this.socket.on('fetch', result => {
          if (result.data[0].board !== '') {
            this.setState({
              boardState: JSON.parse(result.data[0].board),
              currentColor: result.data[0].nextTurn
            });
          } else {
            this.setState({
              boardState: this.createBoard(15)
            });
          }
          this.setState({
            blackWin: result.data[0].black,
            whiteWin: result.data[0].white
          });
        });
      })
      .catch(err => {
        console.error('Client get Error: ', err);
      });
  }

  handleOnClick(e) {
    let row = Number(e.currentTarget.className);
    let col = Number(e.currentTarget.id);
    if (
      this.state.boardState[row][col] === 0 &&
      !this.state.victory &&
      this.state.currentColor === this.state.playerColor
    ) {
      let newBoard = this.state.boardState.slice();
      newBoard[row][col] = this.state.currentColor;
      this.socket.emit('placePiece', {
        boardState: newBoard,
        currentPosition: [row, col],
        currentColor:
          this.state.currentColor === this.black ? this.white : this.black
      });
      
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
      axios
        .put('/api/gomokuWipe', {
          black: 0,
          white: 0
        })
        .then(result => {
          this.fetch();
        });
    } else if (e.target.className === 'clearBoard') {
      this.socket.emit('clearBoard', {
        victory: false,
        currentColor: 1
      });
    }
  }

  render() {
    if (this.state.players === 2) {
      return (
        <div className={styles.appBody}>
          <div className={styles.title}>Gomoku!</div>
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
            {this.state.victory ? (
              <VictoryPage
                victor={
                  this.state.currentColor === this.black ? 'White' : 'Black'
                }
              />
            ) : null}
          </div>
          <div className={styles.buttons}>
            <button onClick={this.buttonsOnClick} className="clearWin">
              {' '}
              Clear Win Record
            </button>
            <button onClick={this.buttonsOnClick} className="clearBoard">
              {' '}
              Clear Board
            </button>
          </div>
          <div className={styles.turn}>
            {this.state.victory ? null : this.whosTurn()}
          </div>
          <div className={styles.identity}>
            Your color piece is{' '}
            {this.state.playerColor === 1 ? 'Black' : 'White'}
          </div>
        </div>
      );
    } else if (this.state.players < 2) {
      return (
        <h1 className={styles.waiting}>Waiting for two players to join!</h1>
      );
    } else {
      return (
        <h1 className={styles.loser}>
          Sorry, two players are already currently playing!
        </h1>
      );
    }
  }
}

export default App;
