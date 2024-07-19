function linearSearch(hayStack: (number | string)[] = [], needle: (number | string)): boolean {
  let result = false;

  for (let i = 0; i < hayStack.length; i++) {
    if (hayStack[i] === needle) {
      result = true;
    }
  }

  return result;
}

console.log(linearSearch([1,2,3,4,5,5,7, "5"], "5"))