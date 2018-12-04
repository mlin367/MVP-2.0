const checkRow = (board, currentPosition) => {
  let row = currentPosition[0];
  let leftRow = currentPosition[0] - 1;
  let col = currentPosition[1];
  let valueToCheck = board[row, col];
  let count = 0;
  //check right
  while (board[row, col] === valueToCheck) {
    count += 1;
    row += 1;
  }
  //check left
  while (board[leftRow, col] === valueToCheck) {
    count += 1;
    leftRow -= 1;
  }
  if (count === 5) {
    return true;
  } else {
    return false;
  }
}

module.exports = checkRow;