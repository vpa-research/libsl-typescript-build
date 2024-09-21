// hand-written

export class Queue<T> {

    [Symbol.iterator](): IterableIterator<T>;

    add(element: T): boolean;

    forEach(callbackFn: (value: T, index?: number, queue?: Queue<T>) => void, thisArg?: Object);

    getFirst(): T;

    readonly length: number;

    pop(): T;

}
