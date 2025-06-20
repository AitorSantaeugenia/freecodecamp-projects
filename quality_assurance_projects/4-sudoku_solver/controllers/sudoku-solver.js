class SudokuSolver {
  // Converts row letter to 0-based index
  static letterToIndex(row) {
    return "ABCDEFGHI".indexOf(row.toUpperCase());
  }

  // Converts puzzle string to 2D grid
  static toGrid(puzzleString) {
    const grid = [];
    for (let i = 0; i < 9; i++) {
      grid.push(
        puzzleString
          .slice(i * 9, (i + 1) * 9)
          .split("")
          .map((c) => (c === "." ? 0 : +c))
      );
    }
    return grid;
  }

  // Converts grid back to puzzle string
  static toString(grid) {
    return grid.flat().join("");
  }

  // Checks if value can be placed at (row, col) in the row
  static checkRow(grid, row, col, value) {
    if (grid[row][col] !== 0) return grid[row][col] == value;
    return !grid[row].includes(+value);
  }

  // Checks if value can be placed at (row, col) in the column
  static checkCol(grid, row, col, value) {
    if (grid[row][col] !== 0) return grid[row][col] == value;
    for (let i = 0; i < 9; i++) if (grid[i][col] == value) return false;
    return true;
  }

  // Checks if value can be placed at (row, col) in the 3x3 region
  static checkRegion(grid, row, col, value) {
    if (grid[row][col] !== 0) return grid[row][col] == value;
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[startRow + i][startCol + j] == value) return false;
    return true;
  }

  // Consolidated check for all placements
  static checkPlacement(puzzleString, rowLetter, colNumber, value) {
    const grid = this.toGrid(puzzleString);
    const row = this.letterToIndex(rowLetter);
    const col = +colNumber - 1;
    return {
      row: this.checkRow(grid, row, col, value),
      column: this.checkCol(grid, row, col, value),
      region: this.checkRegion(grid, row, col, value),
    };
  }

  // --- Instance methods for solving ---
  solveSuduko(grid, row, col) {
    const N = 9;
    if (row == N - 1 && col == N) return grid;
    if (col == N) {
      row++;
      col = 0;
    }
    if (grid[row][col] != 0) return this.solveSuduko(grid, row, col + 1);
    for (let num = 1; num < 10; num++) {
      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;
        if (this.solveSuduko(grid, row, col + 1)) return grid;
      }
      grid[row][col] = 0;
    }
    return false;
  }

  isSafe(grid, row, col, num) {
    for (let x = 0; x <= 8; x++) if (grid[row][x] == num) return false;
    for (let x = 0; x <= 8; x++) if (grid[x][col] == num) return false;
    let startRow = row - (row % 3),
      startCol = col - (col % 3);
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        if (grid[i + startRow][j + startCol] == num) return false;
    return true;
  }

  solve(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }
    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    let grid = SudokuSolver.toGrid(puzzleString);
    let solved = this.solveSuduko(grid, 0, 0);
    if (!solved) {
      return false;
    }
    let solvedString = SudokuSolver.toString(solved);
    return solvedString;
  }

  // Backwards-compatible instance methods for legacy API/tests
  checkRowPlacement(puzzleString, row, column, value) {
    const grid = SudokuSolver.toGrid(puzzleString);
    const rowIdx = SudokuSolver.letterToIndex(row);
    const colIdx = +column - 1;
    return SudokuSolver.checkRow(grid, rowIdx, colIdx, value);
  }

  checkColPlacement(puzzleString, row, column, value) {
    const grid = SudokuSolver.toGrid(puzzleString);
    const rowIdx = SudokuSolver.letterToIndex(row);
    const colIdx = +column - 1;
    return SudokuSolver.checkCol(grid, rowIdx, colIdx, value);
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const grid = SudokuSolver.toGrid(puzzleString);
    const rowIdx = SudokuSolver.letterToIndex(row);
    const colIdx = +column - 1;
    return SudokuSolver.checkRegion(grid, rowIdx, colIdx, value);
  }
}

module.exports = SudokuSolver;
