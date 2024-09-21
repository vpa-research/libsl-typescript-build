// hand-written

export class Deque<T> {

    [Symbol.iterator](): IterableIterator<T>;

    forEach(callbackFn: (value: T, index?: number, queue?: Deque<T>) => void, thisArg?: Object);

    getFirst(): T | undefined;

    getLast(): T | undefined;

    has(element: T): boolean;

    insertEnd(element: T);

    insertFront(element: T);

    readonly length: number;

    popFirst(): T | undefined;

    popLast(): T | undefined;

}
