var TokenBucket = /** @class */ (function () {
    function TokenBucket(arrBuffSize, leakRate, tokenAddTimeInSeconds) {
        var _this = this;
        this.arr = new Array();
        this.bufferSize = arrBuffSize;
        this.leakRate = leakRate;
        this.front = 0;
        this.back = 0;
        this.tempBufferSize = 0;
        this.tempLeakRate = leakRate;
        this.token = 0;
        setInterval(this.addToken, tokenAddTimeInSeconds * 1000);
        process.stdin.resume();
        process.stdin.setEncoding("utf-8");
        process.stdin.on("data", function (data) {
            var input = data.toString().trim();
            if (input === "dequeue") {
                console.log(_this.dequeue());
            }
        });
    }
    TokenBucket.prototype.enqueue = function (item) {
        if (this.tempBufferSize < this.bufferSize) {
            this.tempBufferSize += item;
            this.token++;
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
    TokenBucket.prototype.dequeue = function () {
        var currentTraffic = this.arr[this.back];
        if (this.token < 1) {
            return "TOKEN_EMPTY";
        }
        if (!currentTraffic) {
            this.front = 0;
            this.back = 0;
            this.arr = [];
            return "QUEUE_EMPTY";
        }
        if (this.tempLeakRate >= currentTraffic) {
            this.arr[this.back] = undefined;
            this.back++;
            this.token--;
            this.tempBufferSize -= currentTraffic;
            this.tempLeakRate -= currentTraffic;
            return currentTraffic;
        }
        if (this.tempLeakRate < currentTraffic) {
            var remainingPacket = currentTraffic - this.tempLeakRate;
            this.token--;
            this.tempBufferSize -= this.tempLeakRate;
            this.arr[this.back] = remainingPacket;
            this.tempLeakRate = this.leakRate;
            return this.tempLeakRate;
        }
    };
    TokenBucket.prototype.addToken = function () {
        this.token++;
    };
    TokenBucket.prototype.displayQueue = function () {
        return {
            queue: this.arr,
            front: this.front,
            back: this.back,
            leakRate: this.tempLeakRate,
        };
    };
    return TokenBucket;
}());
var newTokenBucket = new TokenBucket(1000, 50, 5);
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
newTokenBucket.enqueue(100);
newTokenBucket.enqueue(100);
