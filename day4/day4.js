const fs = require('fs');

const testInput =  `MMMSXXMASM
                    MSAMXMSMSA
                    AMXSXMAAMM
                    MSAMASMSMX
                    XMASAMXAMM
                    XXAMMXXAMA
                    SMSMSASXSS
                    SAXAMASAAA
                    MAMMMXMMMM
                    MXMXAXMASX`;

const realInput = fs.readFileSync('./input.txt');

const input = realInput.toString().split('\n').map(line => line.trim()).filter(line => line != '');
console.log('input length: ' + input.length);
let res = 0;
let c = 0;

function checkInRows(input) {
    for(let s of input) {
        res += countMatchesFromString(s);
    }
}

function checkInColumns(input) {
    for(let i = 0; i < input[0].length; i++) {
        let col = '';
        for(let j = 0; j < input.length; j++) {
            col += input[j][i];
        }
        res += countMatchesFromString(col.trim());
    }
}

function checkDiagonaly(input) {
    const numRows = input.length;
    const numCols = input[0].length;
    const diagonals = [];

    // Diagonals starting in the top row
    for (let col = 0; col < numCols; col++) {
        let diagonal = '';
        for (let row = 0, j = col; row < numRows && j < numCols; row++, j++) {
            diagonal += input[row][j];
        }
        diagonals.push(diagonal);
    }

    // Diagonals starting in the first column (excluding the top-left corner)
    for (let row = 1; row < numRows; row++) {
        let diagonal = '';
        for (let col = 0, i = row; col < numCols && i < numRows; col++, i++) {
            diagonal += input[i][col];
        }
        diagonals.push(diagonal);
    }

    for(let diag of diagonals) {
        res += countMatchesFromString(diag.toString());
    }
}


function countMatchesFromString(s) {
    let matches = (s.match(/X[MSAX]*M[MSAX]*A[MSAX]*S/g) || []).length;
    matches += (s.match(/S[MSAX]*A[MSAX]*M[MSAX]*X/g) || []).length;
    return matches;
}

checkInRows(input);
checkInColumns(input);
checkDiagonaly(input);
console.log(res);



