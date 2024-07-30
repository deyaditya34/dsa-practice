function bubbleSort(hayStack) {
    var count = 0;
    for (var i = 0; i < hayStack.length; i++) {
        for (var j = 0; j < hayStack.length - i; j++) {
            var tempValue = void 0;
            if (hayStack[j] > hayStack[j + 1]) {
                tempValue = hayStack[j];
                hayStack[j] = hayStack[j + 1];
                hayStack[j + 1] = tempValue;
            }
            count++;
        }
    }
    console.log("total iteration of the algorithm -", count);
    //   return hayStack;
}
function fill100ElemInArr(arrLength) {
    var result = [];
    var j = 1;
    for (var i = 0; i < arrLength; i++) {
        var randomElem = Math.random() * j * 10;
        result.push(randomElem);
        j++;
    }
    return result;
}
var randomArr = fill100ElemInArr(11);
console.log(bubbleSort(randomArr));
/**
 * total length  8
 *
 * 1..7 = 8
 * 2..6 = 8
 * 3..5 = 8
 * 4..4 = 8
 */
