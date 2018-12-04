const checkMajorDiagnal = (board, currentPosition) => {
  let downRow = currentPosition[0];
  let rightCol = currentPosition[1];
  let upRow = currentPosition[0] - 1;
  let leftCol = currentPosition[1] - 1;
  let valueToCheck = board[downRow][rightCol];
  let count = 0;
  //check down-right
  while (board[downRow][rightCol] === valueToCheck) {
    count += 1;
    downRow += 1;
    rightCol += 1;
    if (downRow >= board.length || rightCol >= board.length) {
      break;
    }
  }
  //check up-left
  if (upRow >= 0 && leftCol >= 0 && upRow < board.length && leftCol < board.length) {
    while (board[upRow][leftCol] === valueToCheck) {
      count += 1;
      upRow -= 1;
      leftCol -= 1;
      if (upRow < 0 || leftCol < 0 || upRow >= board.length || leftCol >= board.length) {
        break
      }
    }
  }
  if (count === 5) {
    return true;
  } else {
    return false;
  }
}

module.exports = checkMajorDiagnal;