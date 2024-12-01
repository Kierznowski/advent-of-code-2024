const fs = require('fs');

const testInput = ` 3   4
                    4   3
                    2   5
                    1   3
                    3   9
                    3   3
                `;

const input = fs.readFileSync('./input.txt');

const linesStrings = input.toString().trim().split('\n');
const lines = linesStrings.map(line => 
    line.trim().split(/\s+/).map(Number)
);

let arr1 = []; 
let arr2 = [];

for(let line of lines) {
    arr1.push(line[0]);
    arr2.push(line[1]);
}

arr1.sort();
arr2.sort();

let res = 0;

for(let i = 0; i < arr1.length; i++) {
    res += Math.abs(arr1[i] - arr2[i]); 
}

//result of part 1:
//console.log(res);

/* Part two */

let freq = new Map();
for(let i of arr2) {
    freq.set(i, (freq.get(i) || 0) + 1);
}

let score = 0;
for(let i of arr1) {
    score += i * (freq.get(i) || 0);
}

console.log(score);

