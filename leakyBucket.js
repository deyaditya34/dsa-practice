"use strict";
class LeafyBucket {
    constructor(arrBuffSize, leakRate) {
        this.arr = new Array();
        this.bufferSize = arrBuffSize;
        this.leakRate = leakRate;
        this.front = 0;
        this.back = 0;
    }
}
