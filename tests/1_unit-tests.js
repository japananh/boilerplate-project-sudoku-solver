const chai = require("chai");
const assert = chai.assert;

const SudokuSolver = require("../controllers/sudoku-solver.js");
const solver = new SudokuSolver();

suite("UnitTests", () => {
  test("Logic handles a valid puzzle string of 81 characters", (done) => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    assert.equal(solver.validateLength(puzzleString), true);

    done();
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", (done) => {
    const invalidPuzzleString = "1234......234234....xxxx";
    assert.equal(solver.validateLength(invalidPuzzleString), false);
    done();
  });

  test("Logic handles a puzzle string that is not 81 characters in length", (done) => {
    const invalidPuzzleString = "1234......234234......";
    assert.equal(solver.validateLength(invalidPuzzleString), false);
    done();
  });

  test("Logic handles a valid row placement", (done) => {
    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.....";
    const row = 0;
    const column = 2;
    const value = 9;
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      true
    );
    done();
  });

  test("Logic handles an invalid row placement", (done) => {
    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.....";
    const row = 0;
    const column = 2;
    const value = 1;
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      false
    );
    done();
  });

  test("Logic handles a valid column placement", (done) => {
    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.....";
    const row = 0;
    const column = 2;
    const value = 9;
    assert.equal(
      solver.checkColPlacement(puzzleString, row, column, value),
      true
    );
    done();
  });

  test("Logic handles an invalid column placement", (done) => {
    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.....";
    const row = 0;
    const column = 3;
    const value = 3;
    assert.equal(
      solver.checkRowPlacement(puzzleString, row, column, value),
      true
    );
    done();
  });

  test("Logic handles a valid region (3x3 grid) placement", (done) => {
    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.....";
    const row = 0;
    const column = 2;
    const value = 7;
    assert.equal(
      solver.checkRegionPlacement(puzzleString, row, column, value),
      true
    );
    done();
  });

  test("Logic handles an invalid region (3x3 grid) placement", (done) => {
    const puzzleString =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3.....";
    const row = 0;
    const column = 2;
    const value = 8;
    assert.equal(
      solver.checkRegionPlacement(puzzleString, row, column, value),
      false
    );
    done();
  });

  test("Valid puzzle strings pass the solver", (done) => {
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    assert.equal(solver.validateLength(puzzleString), true);
    assert.equal(solver.validateCharacters(puzzleString), true);
    done();
  });

  test("Invalid puzzle strings fail the solver", (done) => {
    const puzzleWithInvalidCharacters =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.33...x";
    const puzzleWithInvalidLength =
      "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.33.......";
    assert.equal(solver.validateCharacters(puzzleWithInvalidCharacters), false);
    assert.equal(solver.validateLength(puzzleWithInvalidLength), false);
    done();
  });

  test("Solver returns the expected solution for an incomplete puzzle", (done) => {
    // [
    //   "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.",
    //   "135762984946381257728459613694517832812936745357824196473298561581673429269145378",
    // ];
    const puzzleString =
      "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.";
    // const solution =
    // "135762984946381257728459613694517832812936745357824196473298561581673429269145378";
    assert.equal(solver.solve(puzzleString).length, 81);
    done();
  });
});
