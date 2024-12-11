import fs from 'fs';

const realInput = fs.readFileSync('./realInput.txt');
const testInput = fs.readFileSync('./testInput.txt');
let input = realInput;

input = input.toString().split('\r\n');
/*
....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...
*/



let position = [0, 0];
let direction = 'down';
let checked = new Set();

for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[0].length; j++) {
        let tile = input[i][j];
        if(tile == '^') {
            position = [i, j];
            direction = 'up';
        } else if(tile == '>') {
            position = [i, j];
            direction = 'right';
        } else if(tile == '<') {
            position = [i, j];
            direction = 'left';
        } else if(tile == 'V') {
            position = [i][j];
            direction = 'down';
        } else {
            continue;
        }
        break;
    }
}

checked.add(`${position[0]}, ${position[1]}`);

//resolvePartOne();
resolvePartTwo();

function resolvePartOne() {
    while(position != -1) {
        if(direction == 'up') {
            position = goUp(input);
            direction = 'right';
        } else if(direction == 'down') {
            position = goDown(input);
            direction = 'left';
        } else if(direction == 'right') {
            position = goRight(input);
            direction = 'down';
        } else {
            position = goLeft(input);
            direction = 'up';
        }
    }
    console.log(checked.size);
}

function resolvePartTwo() {
    let obstacles = 0;
    let beginingPosition = position;
    let beginingDirection = direction;

    for(let i = 0; i < input.length; i++) {
        for(let j = 0; j < input[0].length; j++) {
            let detailedPositions = new Set();
            let direction = beginingDirection;
            let input2 = input.map(row => [...row]);
            if(input2[i][j] == '#' || (i == beginingPosition[0] && j == beginingPosition[1])) {
                continue;
            }
            input2[i][j] = 'O';
            
            position = beginingPosition;
            
            while(position != -1) {
                if(direction == 'up') {
                    position = goUp(input2);
                    direction = 'right';
                } else if(direction == 'down') {
                    position = goDown(input2);
                    direction = 'left';
                } else if(direction == 'right') {
                    position = goRight(input2);
                    direction = 'down';
                } else {
                    position = goLeft(input2);
                    direction = 'up';
                }
                let posDir = `${position},${direction}`;

                if(detailedPositions.has(posDir)) {
                    obstacles++;
                    break;
                }
                detailedPositions.add(posDir);
            }
            
        }
    }
    console.log(`Possible obstacles: ${obstacles}`);
}

function goUp(map) {
    let [x, y] = position;
    while(true) {
        if(x - 1 < 0) {
            return -1;
        } else if(map[x-1][y] == '#' || map[x-1][y] == 'O') {
            return [x, y];
        } else {
            x--;
            checked.add(`${x}, ${y}`);
        }
    }
}

function goDown(map) {
    let [x, y] = position;
    while(true) {
        if(x + 1 >= map.length) {
            return -1;
        } else if(map[x+1][y] == '#' || map[x+1][y] == 'O') {
            return [x, y];
        } else {
            x++;
            checked.add(`${x}, ${y}`);
        }
    }
}

function goRight(map) {
    let [x, y] = position;
    while(true) {
        if(y + 1 >= map[0].length) {
            return -1;
        } else if(map[x][y+1] == '#' || map[x][y+1] == 'O') {
            return [x, y];
        } else {
            y++;
            checked.add(`${x}, ${y}`);
        }
    }
}

function goLeft(map) {
    let [x, y] = position;
    while(true) {
        if(y < 0) {
            return -1;
        } else if(map[x][y-1] == '#' || map[x][y-1] == 'O') {
            return [x, y];
        } else {
            y--;
            checked.add(`${x}, ${y}`);
        }
    }
}
