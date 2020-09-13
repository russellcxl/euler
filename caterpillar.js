function permutate(arr) {
  if (arr.length < 1) {
    return [arr]; //[4]
  }

  let finalArr = [];

  for (let i = 0; i < arr.length; i++) {
    let root = arr[i]; //1
    let remainder = arr.slice(0, i).concat(arr.slice(i + 1)); //[2, 3, 4]

    permutate(remainder).forEach(arr => {
      let combined = [root].concat(arr);
      finalArr.push(combined);
    });
  }
  return finalArr;
}

// console.log(permutate([1, 2, 3, 4]).length); // array of arrays where each is a permutation



function caterpillar(num, mod) {
  // create array of all numbers / blocks
  let numArr = [];
  while (num > 0) {
    numArr.push(num);
    num--;
  }
  // return permutate(numArr);

  let permutations = permutate(numArr); // ie all permutations
  let tally = getTally(permutations);

  return tally;
}


function getTally(permutations) {
  let tally = {}; // this will store tallies for max segments e.g. 1: x, 2: y...
  
  // for each permutation
  for (let i = 0; i < permutations.length; i++) {

    let maxSegments = 0;
    let segments = [];

    // for numbers in a permutation
    for (let j = 0; j < permutations[i].length; j++) {
      let number = permutations[i][j];
      segments = setSegments(segments, number);
      segments.length > maxSegments ? maxSegments = segments.length : null;
    }

    Object.keys(tally).includes(maxSegments.toString()) 
    ? tally[maxSegments.toString()]++
    : tally[maxSegments.toString()] = 1;
  }

  return tally;
}

function setSegments(segments, number) {
  let hasSegment = false;
  let segs = [...segments];

  for (let i = 0 ; i < segs.length ; i++) {
    if (number == segs[i][0] - 1) { // check if number can join to start
      segs[i].unshift(number);
      hasSegment = true;

      segs.forEach((arr, index) => {
        let numAfter = arr[arr.length - 1] + 1; // check if number can be joined to the end of any other segments
        if (number == numAfter) {
         segs[index] = segs[index].concat(segs[i]); // combine
         segs.splice(i, 1); // remove duplicate
        }
      });

      break;
    }
    if (number == segs[i][segs[i].length - 1] + 1) { // check if number can join to end
      segs[i].push(number);
      hasSegment = true;

      segs.forEach((arr, index) => {
        let numBefore = arr[0] - 1; // check if number can be joined to the start of any other segments
        if (number == numBefore) {
          segs[i] = segs[i].concat(segs[index]); // combine
          segs.splice(index, 1); // remove duplicate
        }
      }); 

      break;
    }
  }
  !hasSegment ? segs.push([number]) : null;

  return segs;
}


console.log(caterpillar(10));
