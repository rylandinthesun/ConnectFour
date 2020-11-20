/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  // loops on over the height of 6
  for (let i = 0; i < HEIGHT; i++) {
    // pushes to the empty board array the width of 7 in to 6 arrays
    board.push(Array.from({length: WIDTH}));
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  // define and select htmlBoard table element with id 'board'
  const htmlBoard = document.getElementById('board');
  // TODO: add comment for this code
  // makes column top with clickable elements for adding a piece to the column
  // creates a 'tr' for the table and defines as top
  const top = document.createElement("tr");
  // sets id of new table row as "column-top"
  top.setAttribute("id", "column-top");
  // adds click event to table row that uses that handleClick function
  top.addEventListener("click", handleClick);
  // loops over width
  for (let x = 0; x < WIDTH; x++) {
    // creates a 'td' for the table and defines as headCell
    const headCell = document.createElement("td");
    // sets the id of new td to each index of width
    headCell.setAttribute("id", x);
    // appends each headCell to the top table row
    top.append(headCell);
  }
  // appends table top row to the selected table htmlBoard
  htmlBoard.append(top);

  // TODO: add comment for this code
  // creates the table rows of the board
  // loops over height
  for (let y = 0; y < HEIGHT; y++) {
    // creates tr's for table and defines as 'row'
    const row = document.createElement("tr");
    // loops of width
    for (let x = 0; x < WIDTH; x++) {
      // creates td's for table and defines as 'cell'
      const cell = document.createElement("td");
      // sets the id of each cell with the 'y-x' index
      cell.setAttribute("id", `${y}-${x}`);
      // appends each cell to each row
      row.append(cell);
    }
    // appnes each row to the table htmlBoard
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  // runs backwards loop on height of columns
  for (let y = HEIGHT - 1; y >= 0; y--) {
    // returns placement of piece on bottom coloumn
    if(!board[y][x]) {
      return y;
    }
  }
  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  // creates div and defines as piece
  const piece = document.createElement('div');
  // adds class name of 'piece' to div
  piece.classList.add('piece', `p${currPlayer}`);
  // selects spot of td element with id "x-y" and defines as spot
  const spot = document.getElementById(`${y}-${x}`);
  // append piece div to spot of td of "x-y" selection
  spot.append(piece);

}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  // adds delay of .6 seconds to an alert msg created in checkForWin of which player won
  setTimeout(function() {
    alert(msg);
  }, 600);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  // finds spot for the current player running findSpotForCol function and find the targer id of cell
  board[y][x] = currPlayer;
  //runs placeInTable function with target selected values
  placeInTable(y, x);

  // check for win
  // runs checkForWin function and runs endGame function with winner msg
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // calculates if every piece is filled with no possible moves that the endGame function will return 'Tie' msg
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // gets each way to win from the starting position of each piece placed
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      // gets winner after checking each possibilty 
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}
// runs makeBoard function
makeBoard();
// runs makeHtmlBoard function
makeHtmlBoard();
