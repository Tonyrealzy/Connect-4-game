const suggestComputerMove = (gameBoard ) => {
  let validMoves = [];
  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] === 0) {
        validMoves.push(i);
    }
  }
  let randomMove = Math.floor(Math.random() * validMoves.length);
  return validMoves[randomMove];
}

const getPosition = (gameBoard, moveChecks) => {
    for (let check = 0;  check < moveChecks.length; check++) {
        for (let i = 0; i < moveChecks[check].max; i += moveChecks[check].step) {
            let series = gameBoard[i + moveChecks[check].indexes[0]].toString() + gameBoard[i + moveChecks[check].indexes[1]].toString() + gameBoard[i + moveChecks[check].indexes[2]].toString() + gameBoard[i + moveChecks[check].indexes[3]].toString();

            switch (series) {
                case "1110":
                case "2220":
                    return i + moveChecks[check].indexes[3];
                case "1101":
                case "2202":
                    return i + moveChecks[check].indexes[2];
                case "1011":
                case "2022":
                    return i + moveChecks[check].indexes[1];
                case "0111":
                case "0222":
                    return i + moveChecks[check].indexes[0];
                default:
             }
        }
    }
    return -1;
}

const intelligentComputermove = (gameBoard) => {
    let moveChecks = [
        // possible vertical combinations
        {
            indexes: [0, 4, 8, 12],
            max: 4,
            stop: 1
        },
        // possible horizontal combinations
        {
            indexes: [0,1,2,3],
            max: 16,
            stop: 4
        },
        // possible diagonal combinations
        {
            indexes: [0, 5, 10, 15],
            max: 16,
            stop: 16
        },
        // possible diagonal combinations
        {
            indexes: [3, 6, 9, 12],
            max: 16,
            stop: 16
        }
    ];
    let position = getPosition(gameBoard, moveChecks);
    if (position > -1) {
        return position;
    }
    return suggestComputerMove(gameBoard);
}

export default intelligentComputermove