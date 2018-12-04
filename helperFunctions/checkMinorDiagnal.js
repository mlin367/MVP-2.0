const checkMinorDiagnal = (board, currentPosition) => {
  let upRow = currentPosition[0];
  let rightCol = currentPosition[1];
  let downRow = currentPosition[0] + 1;
  let leftCol = currentPosition[1] - 1;
  let valueToCheck = board[upRow][rightCol];
  let count = 0;
  //check up-right
  while (board[upRow][rightCol] === valueToCheck) {
    count += 1;
    upRow -= 1;
    rightCol += 1;
    if (upRow < 0 || rightCol >= board.length) {
      break;
    }
  }
  //check down-left
  if (downRow >= 0 && leftCol >= 0 && downRow < board.length && leftCol < board.length) {
    while (board[downRow][leftCol] === valueToCheck) {
      count += 1;
      downRow += 1;
      leftCol -= 1;
      if (downRow < 0 || leftCol < 0 || downRow >= board.length || leftCol >= board.length) {
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

module.exports = checkMinorDiagnal;