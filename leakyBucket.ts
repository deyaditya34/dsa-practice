class LeafyBucket {
  private front: number;
  private back: number;
  private arr: number[];
  private bufferSize: number;
  private leakRate: number;

  constructor(arrBuffSize: number, leakRate: number) {
    this.arr = new Array();
    this.bufferSize = arrBuffSize;
    this.leakRate = leakRate;
    this.front = 0;
    this.back = 0;
  }

  enqueue() {
    
  }
}