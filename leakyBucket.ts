class LeafyBucket {
  private front: number;
  private back: number;
  private arr: (number | undefined)[];
  private bufferSize: number;
  private leakRate: number;
  private tempBufferSize: number;
  private tempLeakRate: number;

  constructor(
    arrBuffSize: number,
    leakRate: number,
    sendPacketInSeconds: number
  ) {
    this.arr = new Array();
    this.bufferSize = arrBuffSize;
    this.leakRate = leakRate;
    this.front = 0;
    this.back = 0;
    this.tempBufferSize = 0;
    this.tempLeakRate = leakRate;

    process.stdin.resume();
    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (data) => {
      const item: number = Number(data.toString().trim());
      if (isNaN(item)) {
        console.log("invalid input. Please enter a number");
      } else {
        this.enqueue(item);
      }
    });

    setInterval(() => {
      console.log(this.dequeue(), this.displayQueue());
    }, sendPacketInSeconds * 1000);
  }

  enqueue(item: number): string {
    if (this.tempBufferSize < this.bufferSize) {
      this.tempBufferSize += item;

      if (this.tempBufferSize <= this.bufferSize) {
        this.arr[this.front] = item;
        this.front++;

        return "ITEM_INSERTED";
      }

      const toBeSavedPackets: number =
        this.bufferSize + item - this.tempBufferSize;

      this.arr[this.front] = toBeSavedPackets;

      return "ITEM INSERTED";
    }

    return "QUEUE FULL.";
  }

  dequeue(): string | number | undefined {
    const currentTraffic: number | undefined = this.arr[this.back];

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
      const remainingPacket = currentTraffic - this.tempLeakRate;

      this.tempBufferSize -= this.tempLeakRate;
      this.arr[this.back] = remainingPacket;
      this.tempLeakRate = this.leakRate;
      return this.tempLeakRate;
    }
  }

  displayQueue() {
    return {
      queue: this.arr,
      front: this.front,
      back: this.back,
      leakRate: this.tempLeakRate,
    };
  }
}

const newBucket = new LeafyBucket(1000, 600, 5);

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
