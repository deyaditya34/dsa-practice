var Queue = /** @class */ (function () {
    function Queue() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    Queue.prototype.enqueue = function (item) {
        var node = {
            value: item,
            next: undefined,
        };
        this.length++;
        if (!this.tail) {
            this.tail = this.head = node;
            return;
        }
        this.tail.next = node;
        this.tail = node;
    };
    Queue.prototype.dequeue = function () {
        if (!this.head) {
            return undefined;
        }
        this.length--;
        var head = this.head;
        this.head = this.head.next;
        // free the memory
        head.next = undefined;
        return head.value;
    };
    Queue.prototype.peek = function () {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.value;
    };
    Queue.prototype.display = function () {
        if (this.length === 0) {
            throw new Error("No values added in the queue");
        }
        console.log(this.head);
    };
    return Queue;
}());
var newQueue = new Queue();
// newQueue.display()
newQueue.enqueue(4);
newQueue.enqueue(5);
newQueue.enqueue(6);
newQueue.display();
console.log(newQueue.dequeue());
console.log(newQueue.dequeue());
newQueue.display();
console.log("new queue -", newQueue.length);
