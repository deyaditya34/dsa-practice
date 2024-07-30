var arrayRingBuffer = /** @class */ (function () {
    function arrayRingBuffer(arrLength) {
        this.front = 0;
        this.back = 0;
        this.arr = new Array(arrLength);
        this.capacity = arrLength;
    }
    arrayRingBuffer.prototype.enqueue = function (item) {
        if (this.back === this.capacity) {
            this.back = 0;
        }
        if (!this.arr[this.back]) {
            this.arr[this.back] = item;
            this.back++;
            return { error: null, data: null };
        }
        return { error: "QUEUE FULL", data: null };
    };
    arrayRingBuffer.prototype.deque = function () {
        if (this.arr[this.front]) {
            var poppedItem = this.arr[this.front];
            this.arr[this.front] = undefined;
            this.front++;
            if (this.front === this.capacity) {
                this.front = 0;
            }
            return { error: null, data: poppedItem };
        }
        return { error: "QUEUE EMPTY", data: null };
    };
    arrayRingBuffer.prototype.display = function () {
        return {
            error: null,
            data: {
                front: this.front,
                back: this.back,
                arr: this.arr,
            },
        };
    };
    return arrayRingBuffer;
}());
var newArr = new arrayRingBuffer(5);
newArr.enqueue(16);
console.log(newArr.display());
newArr.enqueue(17);
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
newArr.enqueue(18);
console.log(newArr.display());
newArr.enqueue(19);
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
newArr.enqueue(20);
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
console.log(newArr.enqueue(21));
console.log(newArr.display());
console.log(newArr.enqueue(22));
console.log(newArr.display());
console.log(newArr.enqueue(23));
console.log(newArr.display());
console.log(newArr.enqueue(24));
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
console.log(newArr.deque());
console.log(newArr.display());
console.log(newArr.enqueue(25));
console.log(newArr.display());
console.log(newArr.enqueue(26));
console.log(newArr.display());
console.log(newArr.enqueue(27));
console.log(newArr.display());
console.log(newArr.enqueue(28));
console.log(newArr.display());
