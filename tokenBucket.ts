class TokenBucket {
  private front: number;
  private back: number;
  private arr: number[];
  private bufferSize: number;
  private leakRate: number;
  private tempBufferSize: number;
  private tempLeakRate: number;
  private token: number;

  constructor(
    arrBuffSize: number,
    leakRate: number,
    tokenAddTimeInSeconds: number
  ) {
    this.arr = new Array();
    this.bufferSize = arrBuffSize;
    this.leakRate = leakRate;
    this.front = 0;
    this.back = 0;
    this.tempBufferSize = 0;
    this.tempLeakRate = leakRate;
    this.token = 0;

    setInterval(() => {
      this.addToken(), console.log(this.displayQueue());
    }, tokenAddTimeInSeconds * 1000);

    process.stdin.resume();

    process.stdin.setEncoding("utf-8");

    process.stdout.write("PLEASE TYPE 'DEQUEUE' TO DEQUEUE A ITEM");

    process.stdin.on("data", (data) => {
      const input = data.toString().trim();

      if (input === "dequeue") {
        const dequeueItem: string | number = this.dequeue();
        console.log(dequeueItem);
      } else {
        process.stdout.write("INVALID_COMMAND");
      }
    });
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

  dequeue(): string | number {
    const traffic: number = this.arr[this.back];
    let result: string | number;

    if (this.token < 1) {
      result = "TOKEN_EMPTY";
    } else if (!traffic) {
      this.front = 0;
      this.back = 0;
      this.arr = [];
      result = "QUEUE_EMPTY";
    } else if (this.tempLeakRate >= traffic) {
      this.arr[this.back] = 0;
      this.back++;
      this.token--;
      this.tempBufferSize -= traffic;
      this.tempLeakRate -= traffic;
      result = traffic;
    } else {
      const remainingPacket = traffic - this.tempLeakRate;

      this.token--;
      this.tempBufferSize -= this.tempLeakRate;
      this.arr[this.back] = remainingPacket;
      this.tempLeakRate = this.leakRate;
      result = this.tempLeakRate;
    }

    return result;
  }

  private addToken() {
    this.token++;
  }

  displayQueue() {
    return {
      queue: this.arr,
      front: this.front,
      back: this.back,
      leakRate: this.tempLeakRate,
      token: this.token,
    };
  }
}

const newTokenBucket = new TokenBucket(1000, 50, 5);

newTokenBucket.enqueue(100);
newTokenBucket.enqueue(100);
