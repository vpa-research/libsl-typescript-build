// hand-written

export class TreeSet<T> {

    [Symbol.iterator](): IterableIterator<T>;

    add(value: T): boolean;

    clear();

    entries(): IterableIterator<[T, T]>;

    forEach(callbackFn: (value?: T, key?: T, instance?: TreeSet<T>) => void, thisArg?: Object);

    getFirstValue(): T | undefined;

    getHigherValue(): T | undefined;

    getLastValue(): T | undefined;

    getLowerValue(): T | undefined;

    has(value: T): boolean;

    isEmpty(): boolean;

    popFirst(): T | undefined;

    popLast(): T | undefined;

    readonly length: number;

    remove(value: T): boolean;

    values(): IterableIterator<T>;

}
