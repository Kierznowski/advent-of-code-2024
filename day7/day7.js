const fs = require('fs');

const testInput = fs.readFileSync('./testInput.txt');
const realInput = fs.readFileSync('./realInput.txt');
let input = realInput;

input = input.toString().split('\r\n');

let result = 0;
let secResult = 0;

function main() {

    for(let equation of input) {
        let [res, eq] = equation.split(":");
        eq = eq.trim().split(" ").map(Number);
        res = parseInt(res.trim(), 10);
        if(checkIfPossible(0, res, eq, true, false)) {
            result += res;
        }
    }
    console.log(`Result of the first part: ${result}`);

    for(let equation of input) {
        let [res, eq] = equation.split(':');
        eq = eq.trim().split(' ').map(Number);
        res = parseInt(res.trim(), 10);
        if(checkIfPossible(0, res, eq, true, true)) {
            secResult += res;
        }
    }
    console.log(`Result of part two: ${secResult}`);
}



function checkIfPossible(tmp, res, eq, isFirst, secondPart) {
    if(tmp === res && eq.length === 0) {
        return true;
    }
    if(tmp > res || eq.length === 0) {
        return false;
    }

    let current = eq[0];
    let remaining = eq.slice(1);

    if(isFirst) {
        if(checkIfPossible(current, res, remaining, false, secondPart)) return true;
    } else {
        if(checkIfPossible(tmp * current, res, remaining, false, secondPart)) return true;
    }

    if(checkIfPossible(tmp + current, res, remaining, false, secondPart)) return true;
    
    /* part  two */
    if(secondPart) {
        if(checkIfPossible(Number(tmp.toString() + current.toString()), res, remaining, false, secondPart)) return true;    
    }

    return false;
}

function getNewEquations() {
    const newEquations = [];
    for(let equation of input) {
        let [res, eq] = equation.split(":");
        eq = eq.trim().split(" ").map(Number);
        res = parseInt(res.trim(), 10);
        
        for(let i = 0; i < eq.length; i++) {
            for(let j = i + 1; j < eq.length; j++) {
                let k = i;
                let tmp = eq.slice(0, i);
                let joined = '';
                while(k <= j) {
                    joined += (eq[k].toString());
                    k++;
                }
                tmp = tmp.concat(Number(joined)).concat(eq.slice(j + 1));
                newEquations.push([res, tmp]);
            }
        }
    }
    return newEquations;
}

main();