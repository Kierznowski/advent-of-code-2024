import fs from 'fs';

const testInput = fs.readFileSync('./testInput.txt');
const realInput = fs.readFileSync('./realInput.txt');

let input = realInput;
input = input.toString().split('\r\n');


let locations = new Map();
let nodeLocations = new Set();


function findAntennas() {
    for(let  i = 0; i < input.length; i++) {
        for(let j = 0; j < input[0].length; j++) {
            if(input[i][j] != '.' || input[i][j] != '#') {
                if(locations.has(input[i][j])) {
                    locations.get(input[i][j]).push([i, j]);
                } else {
                    locations.set(input[i][j], [[i, j]]);
                }
            }
        }
    }
}

function findNodes() {
    for(let key of locations.keys()) {
        if(key == '.' || key == '#') {
            continue;
        }
        let antennaLocations = locations.get(key);
        for(let i = 0; i < antennaLocations.length; i++) {
            for(let j = i + 1; j < antennaLocations.length; j++) {
                let firstAntenna = antennaLocations[i];
                let secondAntenna = antennaLocations[j];
                nodeLocations.add(firstAntenna.join(','));
                nodeLocations.add(secondAntenna.join(','));

                findHarmonics(firstAntenna, secondAntenna);
            }
        }
    }
}

function checkLocation(location) {
    if(location[0] < 0 || location[0] > input.length - 1 ||
        location[1] < 0 || location[1] > input[0].length - 1) {
            return false;
    }
    return true;
}

function findHarmonics(location1, location2) {
    let horizontalDistance = location1[1] - location2[1];
    let verticalDistance = location2[0] - location1[0];

    let harmonicNodeForward = [location1[0] - verticalDistance, location1[1] + horizontalDistance];    
    let harmonicNodeBackward = [location2[0] + verticalDistance, location2[1] - horizontalDistance];
    while(checkLocation(harmonicNodeForward)) {
        nodeLocations.add(harmonicNodeForward.join(','));
        harmonicNodeForward = [harmonicNodeForward[0] - verticalDistance, harmonicNodeForward[1] + horizontalDistance];
    }

    while(checkLocation(harmonicNodeBackward)) {
        nodeLocations.add(harmonicNodeBackward.join(','));
        harmonicNodeBackward = [harmonicNodeBackward[0] + verticalDistance, harmonicNodeBackward[1] - horizontalDistance];
    }
}

findAntennas();
findNodes();

console.log(`Founded nodes: ` + nodeLocations.size);

