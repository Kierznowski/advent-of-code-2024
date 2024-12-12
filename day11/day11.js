const fs = require('fs');

const testInput = fs.readFileSync('./testInput.txt');
const realInput = fs.readFileSync('./realInput.txt');

let input = realInput;
input = input.toString().split(' ').map(Number);
console.log(input);

function main() {
    let res1 = stoneTransformer(input, 25);
    console.log(`Result of the first part: ${res1}`);
    let res2 = stoneTransformer(input, 75);
    console.log(`Result of the second part: ${res2}`);

}

function stoneTransformer(stones, blinks) {
    let stoneCounts = new Map();

    for(let stone of stones) {
        stoneCounts.set(stone, (stoneCounts.get(stone) || 0) + 1);
    }

    for(let i = 0; i < blinks; i++) {
        let newCounts = new Map();

        for(let [stone, count] of stoneCounts) {
            if(stone === 0) {
                newCounts.set(1, (newCounts.get(1) || 0) + count);
            } else if(stone.toString().length % 2 === 0) {
                let length = stone.toString().length;
                let divisor = 10 ** (length / 2);
                let left = Math.floor(stone / divisor); 
                let right = stone % divisor;
                
                newCounts.set(left, (newCounts.get(left) || 0) + count);
                newCounts.set(right, (newCounts.get(right) || 0) + count);
            } else {
                let newStone = stone * 2024;
                newCounts.set(newStone, (newCounts.get(newStone) || 0) + count);
            }
        }
        stoneCounts = newCounts;
    }
    let totalStones = 0;
    for(let count of stoneCounts.values()) {
        totalStones += count;
    }
    
    return totalStones;
}

main();