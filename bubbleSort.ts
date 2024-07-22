function bubbleSort(hayStack: number[]): number[ ] {
  let count: number = 0;
  for (let i = 0; i < hayStack.length; i++) {
    for (let j = 0; j < hayStack.length - i; j++) {
      let tempValue: number;

      if (hayStack[j] > hayStack[j + 1]) {
        tempValue = hayStack[j];

        hayStack[j] = hayStack[j + 1];
        hayStack[j + 1] = tempValue;
      }

      count++;
    }
  }

  console.log("total iteration of the algorithm -", count);
  return hayStack;
}

function fill100ElemInArr(arrLength: number): number[] {
  const result: number[] = [];

  let j: number = 1;

  for (let i = 0; i < arrLength; i++) {
    const randomElem = Math.random() * j * 10;
    result.push(randomElem);
    j++;
  }

  return result;
}

const randomArr = fill100ElemInArr(11);

console.log(bubbleSort(randomArr));

/**
 * total length  8
 *
 * 1..7 = 8
 * 2..6 = 8
 * 3..5 = 8
 * 4..4 = 8
 */
