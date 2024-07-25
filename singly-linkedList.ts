type QNode<T> = {
  value: T;
  next?: QNode<T>;
};

class Queue<T> {
  public length: number;
  private head?: QNode<T>;
  private tail?: QNode<T>;

  constructor() { 
    this.head = this.tail = undefined;
    this.length = 0;
  }

  enqueue(item: T): void {
    const node: QNode<T> = {
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
  }

  dequeue(): T | undefined {
    if (!this.head) {
      return undefined;
    }
    this.length--;
    const head = this.head;
    this.head = this.head.next;

    // free the memory
    head.next = undefined;
    
    return head.value;
  }

  peek(): T | void {
    return this.head?.value;
  }

  display() {
    if (this.length === 0) {
      throw new Error("No values added in the queue");
    }
    console.log(this.head);
  }
}

const newQueue = new Queue();
// newQueue.display()
newQueue.enqueue(4);
newQueue.enqueue(5);
newQueue.enqueue(6);
newQueue.display();
console.log(newQueue.dequeue());
console.log(newQueue.dequeue());
newQueue.display()
console.log("new queue -", newQueue.length);


