import fs from 'fs';

const testInput = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;
const realInput = fs.readFileSync('./input.txt');
const input = realInput;

const matches = Array.from(input.toString().matchAll(/mul\(\d{1,3},\d{1,3}\)/g));
const dos = Array.from(input.toString().matchAll(/do\(\)/g)).map(match => match.index);
const donts = Array.from(input.toString().matchAll(/don't\(\)/g)).map(match => match.index);

/* part two of challenge - extracting wrong inputs */
const wrongIndexes = [];
let wrong = false;

for(let i = 0; i < input.length; i++) {    
    
    if(dos.includes(i)) {
        wrong = false;
    }
    if(wrong === true) {
        wrongIndexes.push(i);
    }
    if(donts.includes(i)) {
        wrong = true;
    }
}

/* multiplication */
let res = 0;

for(let match of matches) {
    if(wrongIndexes.includes(match.index)) {
        continue;
    }
    let nums = match.toString().replace('mul(','').replace(')','').split(',');
    res += nums[0] * nums[1];
}

console.log(res);



