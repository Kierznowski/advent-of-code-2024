const fs = require('fs');
const path = require('path');

const testInput = fs.readFileSync('./testInput.txt');
const realInput = fs.readFileSync('./realInput.txt');

let input = realInput;

input = input.toString().split('\r\n').map(line => line.split('').map(Number));

let startingPoints = [];
let scores = 0;
let ratings = 0;

function main() {

    getStartingPoints(input);
    for(let start of startingPoints) {
        let visited = new Set();
        scores += traverse(start, visited, 0);
    }
    console.log(`Score: ${scores}`);

    for(let start of startingPoints) {
        let visited = new Set();
        ratings += traversePartTwo(start, visited, 0);
    }
    console.log(`Rating: ${ratings}`);

}

function getStartingPoints(grid) {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(grid[i][j] === 0) {
                startingPoints.push([i, j]);
            } 
        }
    }
}

function traverse(curr, visited, height, numberOfPaths) {
    const [x, y] = curr; 

    if(x < 0 || x >= input.length || y < 0 || y >= input[0].length || 
        visited.has(`${x},${y}`) || input[x][y] !== height) {
        return 0;
    }

    visited.add(`${x},${y}`);
    
    if(input[x][y] === 9) {
        return 1;
    }

    let options = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1],
    ];
    
    let score = 0;
    for(let option of options) {
        score += traverse(option, visited, height + 1);
    }
    return score;
}

function traversePartTwo(curr, visited, height, numberOfPaths) {
    const[x, y] = curr;

    if(x < 0 || x >= input.length || y < 0 || y >= input[0].length || 
        visited.has(`${x},${y}`) || input[x][y] !== height) {
        return 0;
    }

    visited.add(`${x},${y}`);
    
    if(input[x][y] === 9) {
        visited.delete(`${x},${y}`);
        return 1;
    }

    let options = [
        [x - 1, y],
        [x + 1, y],
        [x, y + 1],
        [x, y - 1],
    ];
    let pathCount = 0;
    for(let option of options) {
        pathCount += traversePartTwo(option, visited, height + 1);
    }
    visited.delete(`${x},${y}`);
    
    return pathCount;
}


main();


