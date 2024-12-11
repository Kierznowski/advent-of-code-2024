const fs = require('fs');

const testInput = fs.readFileSync('./testInput.txt');
const realInput = fs.readFileSync('./realInput.txt', 'utf-8');

let input = realInput;

function loadMemory() {
    let memory = [];
    let memoryAddress = 0;

    for(let i = 0; i < input.length; i++) {
        let tmp = [];
        if(i % 2 === 0) {
            for(let j = 0; j < input[i]; j++) {
                tmp.push([memoryAddress]);
            }
            memoryAddress++;
        } else {
            for(let j = 0; j < input[i]; j++) {
                tmp.push('.');
            }
        }
        memory.push(tmp);
    }

    // let memoryAddress = 0; // ID counter starts at 0
    // let i = 0;
    // let memory = [];

    // while (i < input.length) {
    //     // Parse file length as a number
    //     let fileLength = parseInt(input[i], 10);
    //     i++;
    //     let tmp = [];
        
    //     // Push file blocks with the memoryAddress
    //     for (let j = 0; j < fileLength; j++) {
    //         tmp.push(memoryAddress);
    //     }
    //     memory.push(tmp);
    //     memoryAddress++; // Increment the file ID for the next file
        
    //     // Handle the free space
    //     if (i < input.length) {
    //         // Parse free space length as a number
    //         let freeSpaceLength = parseInt(input[i], 10);
    //         i++;
            
    //         // Push free space (.) blocks
    //         let freeSpace = new Array(freeSpaceLength).fill('.');
    //         memory.push(freeSpace);
    //     }
    // }

    return memory;
}

function firstTypeCompression() {
    let flatMemory = memory.flat(Infinity);
    let l = 0;
    let r = flatMemory.length - 1;
    let compressedMemory = [];
    while(l <= r) {
        if(flatMemory[l] != '.') {
            compressedMemory.push(flatMemory[l]);
            l++;
        } else if(flatMemory[r] == '.') {
            r--;
        } else {
            compressedMemory.push(flatMemory[r]);
            r--;
            l++;
        }
    }
    return compressedMemory;
}

function secondTypeCompression() {
    for(let r = memory.length - 1; r >= 0; r--) {
        if(memory[r][0] === '.') continue;
        let file = memory[r];
        let fileSize = file.length;

        for(let l = 0; l < r; l++) {
            if(memory[l][0] === '.' && memory[l].length >= fileSize) {
                let remainingSpace = memory[l].length - fileSize;
                memory[l] = file;
                if (remainingSpace > 0) {
                    // Split the remaining free space into a new block
                    memory.splice(l + 1, 0, new Array(remainingSpace).fill('.'));
                }
                if (remainingSpace > 0) {
                    memory[r + 1] = new Array(fileSize).fill('.');
                } else {
                    memory[r] = new Array(fileSize).fill('.');
                }
                break;
            }
        }
    }
    
    return memory;
}

function countCheckSum(comMemory) {
    comMemory = comMemory.flat(Infinity);
    console.log(comMemory);
    let checkSum = 0;
    let index = 0;

    for(let i = 0; i < comMemory.length; i++) {
            if(typeof comMemory[i] === 'number') {
                checkSum += i * comMemory[i];
            }
    }
    return checkSum;
}

let memory = loadMemory();
let firstCompressionResult = firstTypeCompression();
let firstChecksum = countCheckSum(firstCompressionResult);
console.log(`Checksum after first compression: ${firstChecksum}`);

let secondCompressionResult = secondTypeCompression();
//console.log(secondCompressionResult);
let secondChecksum = countCheckSum(secondCompressionResult);
console.log(`Checksum after second compression: ${secondChecksum}`)
