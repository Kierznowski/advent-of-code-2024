import fs from 'fs';

const testInput =  fs.readFileSync('./testInput.txt');
const realInput = fs.readFileSync('./input.txt');

const input = realInput.toString();

let [rules, pagesSet] = input.split(/\n\s*\n/).map(part => part.trim());
let res = 0;
let incorrects = [];

rules = rules.split('\r\n');
pagesSet = pagesSet.split('\r\n');

for(let pages of pagesSet) {
    let pagesArray = pages.split(",");
    let correct = true;

    for(let rule of rules) {
        let [first, sec] = rule.split("|");
        let wasSec = false;

        for(let page of pagesArray) {
            if(page == first && wasSec) {
                correct = false;
                break;
            }
            if(page == sec) {
                wasSec = true;
            }
        }   
        if (correct == false) break;     
    }
    if(correct == true) {
        res += Number.parseInt(pagesArray[Math.floor(pagesArray.length/2)]);
    } else {
        incorrects.push(pages);
    }
}
console.log(`Result of part one: ${res}`);

let corrected = [];

for(let incorrect of incorrects) {
    incorrect = incorrect.split(',');   
    let changes;   
    while(changes != 0) {
        changes = 0;
        for(let rule of rules) {
            let [first, sec] = rule.split('|');
            let secIndex = incorrect.indexOf(sec);
            if(secIndex === -1) {
                continue;
            }
            for(let i = secIndex + 1; i < incorrect.length; i++) {
                if(incorrect[i] === first) {
                    changes++;
                    incorrect = incorrect.slice(0, secIndex)
                                .concat(incorrect[i])
                                .concat(incorrect.slice(secIndex + 1, i))
                                .concat(incorrect[secIndex])
                                .concat(incorrect.slice(i+1));
                    break;
                }
            } 
        }
    }
    corrected.push(incorrect);
}
let res2 = 0;

for(let correct of corrected) {
    res2 += Number.parseInt(correct[Math.floor(correct.length/2)]);
}

console.log(`Result of part two: ${res2}`);

