type QNode<T> = {
  value: T;
  prev?: QNode<T>;
};

class Stack<T> {
  public length: number;
  private head?: QNode<T>;

  constructor() {
    this.head = undefined;
    this.length = 0;
  }

  push(item: T): void {
    const node = { value: item } as QNode<T>;

    this.length++;
    if (!this.head) {
      this.head = node;
      return;
    }

    node.prev = this.head;
    this.head = node;
  }

  pop(): T | undefined {
    this.length = Math.max(0, this.length - 1);

    if (!this.length) {
      const head = this.head;
      this.head = undefined;
      return head?.value;
    }

    const head = this.head as QNode<T>;
    this.head = head.prev;

    // free the memory
    head.prev = undefined;

    return head.value;
  }

  peek(): T | undefined {
    return this.head?.value;
  }
}
