/**
 * Big O notation is the analysis of the efficiency of the algorithm as its input reaches infinity.
 *
 * Big O(n) signifies linear efficiency, i.e. the efficiency of the algorithm is linear and will depend on the input value. If the input value increases,
 * the time to solve the function will increase linearly.
 *
 *
 * Big O(1) signifies the constant efficiency, i.e. the efficiency of the algorithm is independent of the input value of the function/algorithm. It takes the same
 * amount of time for the algorithm to finish the function regardless of the input value.
 *
 * Big O(n2) signifies the complexity of the algorithim where the time taken for the algorithm to end grows proportionally
 * to the square of the input size.
 *
 * Big O(n3) signifies the complexity of the algorithm where the time taken for the algorithm grows proportionally to the cube of the input size.
 * 
 * Big O(logn) signifies the complexity of the algorith where the time taken for the algorithm grows logarithmcally with the size of the input. Specifically, if the input doubles, the algorithm requires a constant increase
 * in the operation.
 * 
 *   
*/


function bigOn1(arr: []): void {
  for (let i = 0; i < arr.length; i++) {
    console.log(1000 * 100000); // constant for every iteration
    let something = 200000 * 200000; // constant for every iteration
    console.log(something); // constant for every iteration
  }
}

function bigO1(arr) {
  console.log(100 * 1000);
}

function bigOn2(n) {
  for (let i = 0; i <= n; i++) {
    console.log(i);

    for (let j = 0; j <= n; j++) {
      console.log(j);
    }
  }
}

function logn(n) {
  while (n > 1) {
    n = Math.floor(n / 2);
  }
}

const arr = [1, 2, 3, 4, 5, 6, 7];

// bigOn1(arr);
// bigOn2(arr);
// bigO1(arr);
// bigOn2(4);
// logn(8);

