// hand-written

export class Stack<T> {

    [Symbol.iterator](): IterableIterator<T>;

    forEach(callbackFn: (value: T, index?: number, queue?: Stack<T>) => void, thisArg?: Object);

    isEmpty(): boolean;

    locate(element: T): number;

    peek(): T | undefined;

    pop(): T;

    push(element: T): boolean;

    readonly length: number;

}
