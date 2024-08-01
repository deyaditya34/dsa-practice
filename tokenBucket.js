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
        setInterval(function () {
            _this.addToken(), console.log(_this.displayQueue());
        }, tokenAddTimeInSeconds * 1000);
        process.stdin.resume();
        process.stdin.setEncoding("utf-8");
        process.stdout.write("PLEASE TYPE 'DEQUEUE' TO DEQUEUE A ITEM");
        process.stdin.on("data", function (data) {
            var input = data.toString().trim();
            if (input === "dequeue") {
                var dequeueItem = _this.dequeue();
                console.log(dequeueItem);
            }
            else {
                process.stdout.write("INVALID_COMMAND");
            }
        });
    }
    TokenBucket.prototype.enqueue = function (item) {
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
    TokenBucket.prototype.dequeue = function () {
        var traffic = this.arr[this.back];
        var result;
        if (this.token < 1) {
            result = "TOKEN_EMPTY";
        }
        else if (!traffic) {
            this.front = 0;
            this.back = 0;
            this.arr = [];
            result = "QUEUE_EMPTY";
        }
        else if (this.tempLeakRate >= traffic) {
            this.arr[this.back] = 0;
            this.back++;
            this.token--;
            this.tempBufferSize -= traffic;
            this.tempLeakRate -= traffic;
            result = traffic;
        }
        else {
            var remainingPacket = traffic - this.tempLeakRate;
            this.token--;
            this.tempBufferSize -= this.tempLeakRate;
            this.arr[this.back] = remainingPacket;
            this.tempLeakRate = this.leakRate;
            result = this.tempLeakRate;
        }
        return result;
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
            token: this.token,
        };
    };
    return TokenBucket;
}());
var newTokenBucket = new TokenBucket(1000, 50, 5);
newTokenBucket.enqueue(100);
newTokenBucket.enqueue(100);
