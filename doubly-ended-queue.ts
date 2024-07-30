class DoublyEndedQueue {
  private arr: number[];
  private front: number;
  private back: number;
  private capacity: number;

  constructor(arrLength: number) {
    this.arr = new Array(arrLength);
    this.front = 0;
    this.back = 0;
    this.capacity = arrLength;
  }

  enqueue(item: number): void {
    if (this.back === this.capacity) {
      const newArray = new Array(this.capacity);
      const mergedArr = this.arr.concat(newArray);
      this.arr = mergedArr;
    }

    this.arr[this.back] = item;
    this.back++;
  }

  dequeue(): { error: null | string; data: number | null } {
    if (this.front === this.back) {
      return { error: "QUEUE EMPTY", data: null };
    }

    const poppedItem: number = this.arr[this.front];
    this.arr[this.front] = -1;
    this.front++;

    return { error: null, data: poppedItem };
  }

  display(): {
    error: null;
    data: { front: number; back: number; arr: number[] };
  } {
    return {
      error: null,
      data: {
        front: this.front,
        back: this.back,
        arr: this.arr,
      },
    };
  }
}

const newQueue = new DoublyEndedQueue(5);
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