const fs = require('fs');

const testInput = `
    7 6 4 2 1
    1 2 7 8 9
    9 7 6 2 1
    1 3 2 4 5
    8 6 4 4 1
    1 3 6 7 9`;

const input = fs.readFileSync('./input.txt');
let lines = input.toString().split('\n');
let cleanReport = lines.map(line => line.trim()).filter(line => line !== '');
let reports = cleanReport.map(line => line.trim().split(' '));


function isSafe(report) {
    let direction = 0;
    for(let i = 1; i < report.length; i++) {
        let diff = report[i] - report[i - 1];

        if(diff === 0 || Math.abs(diff) > 3) {
            return false;
        }

        if(direction === 0) {
            if(diff > 0) direction = 1;
            else if (diff < 0) direction = -1;
        } else if ((direction === 1 && diff < 0) || (direction === -1 && diff > 0)) {
            return false;
        }
    }
    return true;
}

function safeWithDampner(report) {
    for(let i = 0; i < report.length; i++) {
        let modified = report.slice(0, i).concat(report.slice(i + 1));
        if(isSafe(modified)) {
            return true;
        }
    }
    return false;
}

function countSafeReports(reports) {
    let safe = 0;

    for(let report of reports) {
        if(isSafe(report)) {
            safe++;
        } else if(safeWithDampner(report)) {
            safe++;
        }
    }

    return safe;
}

let res = countSafeReports(reports);


console.log(res);
