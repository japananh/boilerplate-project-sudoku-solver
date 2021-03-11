class SudokuSolver {
  validateLength(puzzleString) {
    return typeof puzzleString === "string" && puzzleString.length === 81;
  }

  validateCharacters(puzzleString) {
    const regex = /^[\d\.]{81}$/;
    const isValid = regex.test(puzzleString);
    return isValid;
  }

  validateCoordinate(coordinate) {
    const regex = /^[a-iA-I][1-9]$/;
    const isValid = regex.test(coordinate);
    return isValid;
  }

  validateValue(value) {
    const regex = /[1-9]/;
    const isValid = regex.test(+value);
    return isValid;
  }

  getRowNumber(rowCharacter) {
    const characters = ["a", "b", "c", "d", "e", "f", "g", "h", "i"];
    return characters.findIndex(
      (character) => character === rowCharacter.toLowerCase()
    );
  }

  getColumnNumber(column) {
    return +column - 1;
  }

  getPuzzleArray(puzzleString) {
    return puzzleString.match(/.{9}/g);
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const puzzle = this.getPuzzleArray(puzzleString);

    return !(puzzle[row].includes(value) && puzzle[row][column] != value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const puzzle = this.getPuzzleArray(puzzleString);

    return !puzzle.some(
      (rowString, index) => rowString[column] == value && index !== row
    );
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const startRegionRow = Math.floor(row / 3) * 3;
    const startRegionColumn = Math.floor(column / 3) * 3;

    const puzzle = this.getPuzzleArray(puzzleString);

    for (let i = startRegionRow; i < startRegionRow + 3; i++) {
      for (let j = startRegionColumn; j < startRegionColumn + 3; j++) {
        if (puzzle[i][j] == value && i !== row && j !== column) return false;
      }
    }
    return true;
  }

  transposeToColumn(puzzle) {
    let newPuzzle = [];

    for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[i].length; j++) {
        if (!newPuzzle[j]) newPuzzle[j] = "";

        newPuzzle[j] += puzzle[i][j];
      }
    }

    return newPuzzle;
  }

  transposeToRegion(puzzle) {
    let newPuzzle = [];

    for (let i = 0; i < puzzle.length; i++) {
      newPuzzle[i] = "";
      for (let j = 0; j < puzzle[i].length; j++) {
        const index = Math.floor(i / 3) * 3 + Math.floor(j / 3);
        newPuzzle[index] += puzzle[i][j];
      }
    }

    return newPuzzle;
  }

  checkValidPuzzle(puzzle) {
    const regex = /(\d).*\1/g;

    const isValidRow = !puzzle.some((row) => regex.test(row));

    const columnPuzzle = this.transposeToColumn(puzzle);
    const isValidColumn = !columnPuzzle.some((row) => regex.test(row));

    const regionPuzzle = this.transposeToRegion(puzzle);
    const isValidRegion = !regionPuzzle.some((row) => regex.test(row));

    return isValidRow && isValidColumn && isValidRegion;
  }

  solve(puzzleString) {
    let solution = "";

    const puzzle = this.getPuzzleArray(puzzleString);

    if (!this.checkValidPuzzle(puzzle)) return "";

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let matched = "";

        if (puzzle[i][j] === ".") {
          for (let value = 1; value <= 9; value++) {
            const isValidColPlacement = this.checkColPlacement(
              puzzleString,
              i,
              j,
              value
            );
            const isValidRowPlacement = this.checkRowPlacement(
              puzzleString,
              i,
              j,
              value
            );
            const isValidRegionPlacement = this.checkRegionPlacement(
              puzzleString,
              i,
              j,
              value
            );

            if (
              isValidColPlacement &&
              isValidRowPlacement &&
              isValidRegionPlacement
            ) {
              matched = `${value}`;
              break;
            }
          }

          if (!matched) return "";
        }

        solution += matched || puzzle[i][j];
      }
    }

    return solution.length === 81 ? solution : "";
  }
}

module.exports = SudokuSolver;
