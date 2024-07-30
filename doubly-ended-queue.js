var doublyEndedQueue = /** @class */ (function () {
    function doublyEndedQueue(arrLength) {
        this.arr = new Array(arrLength);
        this.front = 0;
        this.back = 0;
        this.capacity = arrLength;
    }
    doublyEndedQueue.prototype.enqueue = function (item) {
        if (this.back === this.capacity) {
            var newArray = new Array(this.capacity);
            var mergedArr = this.arr.concat(newArray);
            this.arr = mergedArr;
        }
        this.arr[this.back] = item;
        this.back++;
    };
    doublyEndedQueue.prototype.dequeue = function () {
        if (this.front === this.back) {
            return { error: "QUEUE EMPTY", data: null };
        }
        var poppedItem = this.arr[this.front];
        this.arr[this.front] = -1;
        this.front++;
        return { error: null, data: poppedItem };
    };
    doublyEndedQueue.prototype.display = function () {
        return {
            error: null,
            data: {
                front: this.front,
                back: this.back,
                arr: this.arr,
            },
        };
    };
    return doublyEndedQueue;
}());
var newQueue = new doublyEndedQueue(5);
newQueue.enqueue(16);
console.log(newQueue.display());
console.log(newQueue.dequeue());
console.log(newQueue.display());
console.log(newQueue.dequeue());
console.log(newQueue.display());
newQueue.enqueue(17);
newQueue.enqueue(18);
newQueue.enqueue(19);
newQueue.enqueue(20);
console.log(newQueue.display());
newQueue.enqueue(21);
console.log(newQueue.display());
