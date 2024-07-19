function linearSearch(hayStack, needle) {
    if (hayStack === void 0) { hayStack = []; }
    var result = false;
    for (var i = 0; i < hayStack.length; i++) {
        if (hayStack[i] === needle) {
            result = true;
        }
    }
    return result;
}
console.log(linearSearch([1, 2, 3, 4, 5, 5, 7, "5"], "5"));
