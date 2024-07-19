function binarySearch(hayStack, needle) {
    if (hayStack === void 0) { hayStack = []; }
    var lowIndex = 0;
    var highIndex = hayStack.length - 1;
    while (lowIndex <= highIndex) {
        var midIndex = lowIndex + Math.floor((highIndex - lowIndex) / 2);
        console.log("mid index -", hayStack[midIndex], "low index -", hayStack[lowIndex], "high index -", hayStack[highIndex]);
        if (hayStack[midIndex] === needle) {
            return true;
        }
        else if (hayStack[midIndex] > needle) {
            highIndex = midIndex - 1;
        }
        else {
            lowIndex = midIndex + 1;
        }
    }
    return false;
}
console.log(binarySearch([0, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 29, 31, 33, 35, 36, 40, 42, 45, 48, 50], 12));
