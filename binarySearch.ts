function binarySearch(hayStack: number[] = [], needle: number): boolean {

  let lowIndex = 0;
  let highIndex = hayStack.length - 1;

  while (lowIndex <= highIndex) {
    let midIndex = lowIndex + Math.floor((highIndex - lowIndex) / 2);

    console.log(
      "mid index -",
      hayStack[midIndex],
      "low index -",
      hayStack[lowIndex],
      "high index -",
      hayStack[highIndex]
    );

    if (hayStack[midIndex] === needle) {
      return true;
    } else if (hayStack[midIndex] > needle) {
      highIndex = midIndex - 1;
    } else {
      lowIndex = midIndex + 1;
    }
  }

  return false;
}

console.log(binarySearch([0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], 1));
