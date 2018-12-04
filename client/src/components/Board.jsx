import React from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: this.props.currentColor,
      visualBoardState: this.createBoard(this.props.boardState)
    }
    this.createBoard = this.createBoard.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.boardState !== prevProps.boardState) {
      this.setState({
        visualBoardState: this.createBoard(this.props.boardState)
      })
    }
  }

  createBoard (boardState) {
    return (
      <table>
        {boardState.map((row, i) => (
          <tr>
            {row.map((col, j) => (
              <td onClick={this.props.handleOnClick} className={i} id={j}>{col}</td>
            ))}
          </tr>
        ))}
      </table>
    );
  }

  render() {
    return (
      <div>
        {this.state.visualBoardState}
      </div>
    )
  }
}

export default Board;