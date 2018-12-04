const checkCol = (board, currentPosition) => {
  let downRow = currentPosition[0];
  let col = currentPosition[1];
  let upRow = currentPosition[0] - 1;
  let valueToCheck = board[downRow][col];
  let count = 0;
  //check up
  while (board[downRow][col] === valueToCheck) {
    count += 1;
    downRow += 1;
    if (downRow >= board.length) {
      break;
    }
  }
  //check down
  if (upRow >= 0) {
    while (board[upRow][col] === valueToCheck) {
      count += 1;
      upRow -= 1;
      if (upRow < 0) {
        break;
      }
    }
  }
  if (count === 5) {
    return true;
  } else {
    return false;
  }
}

module.exports = checkCol;