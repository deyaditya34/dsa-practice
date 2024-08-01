var LeafyBucket = /** @class */ (function () {
    function LeafyBucket(arrBuffSize, leakRate, sendPacketInSeconds) {
        var _this = this;
        this.arr = new Array();
        this.bufferSize = arrBuffSize;
        this.leakRate = leakRate;
        this.front = 0;
        this.back = 0;
        this.tempBufferSize = 0;
        this.tempLeakRate = leakRate;
        process.stdin.resume();
        process.stdin.setEncoding("utf8");
        process.stdin.on("data", function (data) {
            var item = Number(data.toString().trim());
            if (isNaN(item)) {
                console.log("invalid input. Please enter a number");
            }
            else {
                _this.enqueue(item);
            }
        });
        setInterval(function () {
            console.log(_this.dequeue(), _this.displayQueue());
        }, sendPacketInSeconds * 1000);
    }
    LeafyBucket.prototype.enqueue = function (item) {
        if (this.tempBufferSize < this.bufferSize) {
            this.tempBufferSize += item;
            if (this.tempBufferSize <= this.bufferSize) {
                this.arr[this.front] = item;
                this.front++;
                return "ITEM_INSERTED";
            }
            var toBeSavedPackets = this.bufferSize + item - this.tempBufferSize;
            this.arr[this.front] = toBeSavedPackets;
            return "ITEM INSERTED";
        }
        return "QUEUE FULL.";
    };
    LeafyBucket.prototype.dequeue = function () {
        var currentTraffic = this.arr[this.back];
        if (!currentTraffic) {
            this.front = 0;
            this.back = 0;
            this.arr = [];
            return "QUEUE_EMPTY";
        }
        if (this.tempLeakRate >= currentTraffic) {
            this.arr[this.back] = undefined;
            this.back++;
            this.tempBufferSize -= currentTraffic;
            this.tempLeakRate -= currentTraffic;
            return currentTraffic;
        }
        if (this.tempLeakRate < currentTraffic) {
            var remainingPacket = currentTraffic - this.tempLeakRate;
            this.tempBufferSize -= this.tempLeakRate;
            this.arr[this.back] = remainingPacket;
            this.tempLeakRate = this.leakRate;
            return this.tempLeakRate;
        }
    };
    LeafyBucket.prototype.displayQueue = function () {
        return {
            queue: this.arr,
            front: this.front,
            back: this.back,
            leakRate: this.tempLeakRate,
        };
    };
    return LeafyBucket;
}());
var newBucket = new LeafyBucket(1000, 600, 5);
// console.log(newBucket.displayQueue());
// console.log(newBucket.receivePacket(500));
// console.log(newBucket.displayQueue());
// console.log(newBucket.receivePacket(400));
// console.log(newBucket.displayQueue());
// console.log(newBucket.receivePacket(500));
// console.log(newBucket.displayQueue());
// console.log(newBucket.sendPacket());
// console.log(newBucket.displayQueue());
// console.log(newBucket.sendPacket());
// console.log(newBucket.displayQueue());
// console.log(newBucket.sendPacket());
// console.log(newBucket.displayQueue());
// console.log(newBucket.sendPacket());
// console.log(newBucket.displayQueue());
// console.log(newBucket.sendPacket());
// console.log(newBucket.displayQueue());
// console.log(newBucket.receivePacket(500));
// console.log(newBucket.displayQueue());
// console.log(newBucket.sendPacket());
// console.log(newBucket.displayQueue());
