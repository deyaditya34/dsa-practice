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
        setInterval(function () { return _this.addToken(); }, tokenAddTimeInSeconds * 1000);
        process.stdin.resume();
        process.stdin.setEncoding("utf-8");
        process.stdout.write("PLEASE TYPE 'enqueue <item>' TO ENQUEUE A ITEM" + "\n");
        process.stdout.write("PLEASE TYPE 'dequeue' TO DEQUEUE A ITEM" + "\n");
        process.stdout.write("PLEASE TYPE 'display' TO DISPLAY THE QUEUE DETAILS");
        process.stdin.on("data", function (data) {
            var inputData = data.toString().trim();
            var indexOfSpaceFromInputData = inputData.lastIndexOf(" ");
            if (indexOfSpaceFromInputData === -1) {
                if (inputData === "dequeue") {
                    var dequeueItem = _this.dequeue();
                    console.log(dequeueItem);
                    return;
                }
                if (inputData === "display") {
                    console.log(_this.displayQueue());
                    return;
                }
            }
            else {
                var inputItem = inputData.slice(indexOfSpaceFromInputData, inputData.length);
                if (!isNaN(Number(inputItem))) {
                    var inputCommand = inputData.slice(0, indexOfSpaceFromInputData);
                    if (inputCommand === "enqueue") {
                        console.log(_this.enqueue(Number(inputItem)));
                    }
                    return;
                }
            }
            process.stdout.write("INVALID_COMMAND");
        });
    }
    TokenBucket.prototype.enqueue = function (item) {
        if (this.tempBufferSize < this.bufferSize) {
            this.tempBufferSize += item;
            if (this.tempBufferSize <= this.bufferSize) {
                this.arr[this.front] = item;
                this.front++;
                return "ITEM_INSERTED - ".concat(item);
            }
            var toBeSavedPackets = this.bufferSize + item - this.tempBufferSize;
            this.arr[this.front] = toBeSavedPackets;
            return "ITEM INSERTED - ".concat(toBeSavedPackets);
        }
        return "QUEUE FULL";
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
