// hand-written

export class HashSet<T> {

    [Symbol.iterator](): IterableIterator<T>;

    add(value: T): boolean;

    clear();

    entries(): IterableIterator<[T, T]>;

    forEach(callbackFn: (value?: T, key?: T, instance?: HashSet<T>) => void, thisArg?: Object);

    has(value: T): boolean;

    isEmpty(): boolean;

    readonly length: number;

    remove(value: T): boolean;

    values(): IterableIterator<T>;

}
