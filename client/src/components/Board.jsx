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

  checkColor(col) {
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
      // <table>
      //   {boardState.map((row, i) => (
      //     <tr>
      //       <div className={styles.line} />
      //       {row.map((col, j) => (
      //         <td onClick={this.props.handleOnClick} className={i} id={j}>
      //           <div className={i === 14 ? null : styles.vertLine} />
      //           <div className={this.checkColor(col)} />
      //           {col}
      //         </td>
      //       ))}
      //     </tr>
      //   ))}
      // </table>
      <div className={styles.overallBoard}>
        <div className={styles.board}>
          {boardState.map((row, i) =>
            row.map((col, j) => (
              <div
                onClick={this.props.handleOnClick}
                data-rownum={i}
                className={styles.intersection}
                id={j}
              >
                <div className={i === 14 ? null : styles.vertLine} />
                <div className={this.checkColor(col)} />
                {col}
              </div>
            ))
          )}
        </div>
        <div className={styles.outlineBoard}>
          {boardState.map((row, i) =>
            row.map((col, j) => i === 14 || j === 14 ? null : <div className={styles.outlineIntersection}/>)
          )}
        </div>
      </div>
    );
  }

  render() {
    return this.state.visualBoardState;
  }
}

export default Board;
