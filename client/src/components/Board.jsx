import React from 'react';
import styles from '../css/Board.css';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: this.props.currentColor,
      visualBoardState: this.createBoard(this.props.boardState)
    };
    this.createBoard = this.createBoard.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.boardState !== prevProps.boardState) {
      this.setState({
        visualBoardState: this.createBoard(this.props.boardState)
      });
    }
  }

  checkColor (col) {
    if (col === 1) {
      return styles.black;
    } else if (col === 2) {
      return styles.white;
    } else {
      return null;
    }
  }

  createBoard(boardState) {
    return (
      <table>
        {boardState.map((row, i) => (
          <tr>
            <div className={styles.line} />
            {row.map((col, j) => (
              <td onClick={this.props.handleOnClick} className={i} id={j}>
                <div className={i === 14 ? null : styles.vertLine} />
                <div className={this.checkColor(col)} />
                {col}
              </td>
            ))}
          </tr>
        ))}
      </table>
    );
  }

  render() {
    return <div className={styles.board}>{this.state.visualBoardState}</div>;
  }
}

export default Board;
