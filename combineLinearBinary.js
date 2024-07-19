// Using a combination of for loop and while loop
// function twoCrystalBalls(breaks: boolean[]): number {
//   const jumpAmount = Math.floor(Math.sqrt(breaks.length));
//   let i = jumpAmount;
//   for (; i < breaks.length; i += jumpAmount) {
//     console.log("jump amount -", i);
//     if (breaks[i] === true) {
//         console.log("inside if statement -", i)
//       break;
//     }
//   }
//   console.log("before jumpAmount -", i);
//   i -= jumpAmount;
//   console.log("after jumpAmount -", i);
//   let j = 0;
//   while (j <= jumpAmount) {
//     console.log("inside while loop -", i);
//     if (breaks[i] === true) {
//       return i;
//     }
//     i++;
//     j++;
//   }
//   return -1;
// }
// Using two for loop
function twoCrystalBalls(breaks) {
    var jumpAmount = Math.floor(Math.sqrt(breaks.length));
    var i = jumpAmount;
    for (; i < breaks.length; i += jumpAmount) {
        if (breaks[i]) {
            break;
        }
    }
    console.log("before jumpAmount -", i);
    i -= jumpAmount;
    console.log("after jump amount -", i);
    for (var j = 0; j <= jumpAmount && i < breaks.length; ++j, ++i) {
        console.log("inside for for loop -", i, j);
        if (breaks[i]) {
            return i;
        }
    }
    return -1;
}
console.log(twoCrystalBalls([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true
]));
