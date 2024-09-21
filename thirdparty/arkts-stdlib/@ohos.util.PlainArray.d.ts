// hand-written

export class PlainArray<T> {

    [Symbol.iterator](): IterableIterator<[number, T]>;

    add(key: number, value: T);

    clear();

    clone(): PlainArray<T>;

    forEach(callbackFn: (t: T, index?: number, arr?: PlainArray<T>) => void, thisArg?: Object);

    get(key: number): T | undefined;

    getIndexOfKey(key: number): number;

    getIndexOfValue(value: T): number;

    getKeyAt(index: number): number;

    getValueAt(index: number): T | undefined;

    has(key: number): boolean;

    isEmpty(): boolean;

    readonly length: number;

    remove(key: number): T | undefined;

    removeAt(index: number): T | undefined;

    removeRangeFrom(index: number, size: number): number;

    setValueAt(index: number, value: T);

    toString(): String;

}
