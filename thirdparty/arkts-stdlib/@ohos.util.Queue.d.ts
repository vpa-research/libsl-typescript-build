// hand-written

export class Queue<E> {

    [Symbol.iterator](): IterableIterator<T>;

    add(element: T): boolean;

    forEach(callbackFn: (value: T, index?: number, queue?: Queue<T>) => void, thisArg?: Object);

    getFirst(): T;

    length: number;

    pop(): T;

}
