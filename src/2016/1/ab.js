/*
 * Input provided by the challenge
 */
var input = [
  "R1", "R3", "L2", "L5", "L2", "L1", "R3", "L4", "R2", "L2", "L4", "R2", "L1", "R1", "L2", "R3", "L1", "L4", "R2",
  "L5", "R3", "R4", "L1", "R2", "L1", "R3", "L4", "R5", "L4", "L5", "R5", "L3", "R2", "L3", "L3", "R1", "R3", "L4",
  "R2", "R5", "L4", "R1", "L1", "L1", "R5", "L2", "R1", "L2", "R188", "L5", "L3", "R5", "R1", "L2", "L4", "R3",
  "R5", "L3", "R3", "R45", "L4", "R4", "R72", "R2", "R3", "L1", "R1", "L1", "L1", "R192", "L1", "L1", "L1", "L4",
  "R1", "L2", "L5", "L3", "R5", "L3", "R3", "L4", "L3", "R1", "R4", "L2", "R2", "R3", "L5", "R3", "L1", "R1", "R4",
  "L2", "L3", "R1", "R3", "L4", "L3", "L4", "L2", "L2", "R1", "R3", "L5", "L1", "R4", "R2", "L4", "L1", "R3", "R3",
  "R1", "L5", "L2", "R4", "R4", "R2", "R1", "R5", "R5", "L4", "L1", "R5", "R3", "R4", "R5", "R3", "L1", "L2", "L4",
  "R1", "R4", "R5", "L2", "L3", "R4", "L4", "R2", "L2", "L4", "L2", "R5", "R1", "R4", "R3", "R5", "L4", "L4", "L5",
  "L5", "R3", "R4", "L1", "L3", "R2", "L2", "R1", "L3", "L5", "R5", "R5", "R3", "L4", "L2", "R4", "R5", "R1", "R4",
  "L3"
];

//curent axis position count
var xAxis = 0;
var yAxis = 0;

var XYLog = [];

//starting direction
var direction = 'N';

/*
 * Determines next direction based on current direction and the next movement (Right or Left)
 */
var nextDirection = function (direction, movement) {
  if (movement === 'R') {
    switch (direction) {
      case 'N':
        return 'E';
      case 'E':
        return 'S';
      case 'S':
        return 'W';
      case 'W':
        return 'N';
    }
  } else if (movement === 'L') {
    switch (direction) {
      case 'N':
        return 'W';
      case 'E':
        return 'N';
      case 'S':
        return 'E';
      case 'W':
        return 'S';
    }
  }
};



for (var i = 0; i < input.length; i++) {
  //get first letter of input
  var move = input[i][0];
  //get rest of input + convert to int
  var amount = parseInt(input[i].slice(1));
  var direction = nextDirection(direction, move);
  switch (direction) {
    case 'N':
      for (var r = 0; r < amount; r++) {
        yAxis++;
        XYLog.push({x: xAxis, y: yAxis})
      }
      break;
    case 'E':
      for (var r = 0; r < amount; r++) {
        xAxis++;
        XYLog.push({x: xAxis, y: yAxis})
      }
      break;
    case 'W':
      for (var r = 0; r < amount; r++) {
        xAxis--;
        XYLog.push({x: xAxis, y: yAxis})
      }
      break;
    case 'S':
      for (var r = 0; r < amount; r++) {
        yAxis--;
        XYLog.push({x: xAxis, y: yAxis})
      }
      break;
  }
}


console.log(xAxis + yAxis);
var counter = {};

XYLog.forEach(function(obj) {
  var key = JSON.stringify(obj)
  if(counter[key] > 0){
    console.log('DUPE:', obj);
    process.exit();
  }
  counter[key] = (counter[key] || 0) + 1
});

