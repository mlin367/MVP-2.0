const checkRow = (board, currentPosition) => {
  let row = currentPosition[0];
  let rightCol = currentPosition[1];
  let leftCol = currentPosition[1] - 1;
  let valueToCheck = board[row][rightCol];
  let count = 0;
  //check right
  while (board[row][rightCol] === valueToCheck) {
    count += 1;
    rightCol += 1;
    if (rightCol >= board.length) {
      break;
    }
  }
  //check left
  if (leftCol >= 0) {
    while (board[row][leftCol] === valueToCheck) {
      count += 1;
      leftCol -= 1;
      if (leftCol < 0) {
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

module.exports = checkRow;