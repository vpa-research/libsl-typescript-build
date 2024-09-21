// hand-written

export class List<E> {

    [Symbol.iterator](): IterableIterator<T>;

    add(element: T): boolean;

    clear();

    convertToArray(): Array<T>;

    equal(o: Object): boolean;

    forEach(callbackFn: (t: T, index?: number, list?: List<T>) => void, thisArg?: Object);

    get(index: number): T;

    getFirst(): T | undefined;

    getIndexOf(element: T): number;

    getLast(): T | undefined;

    getLastIndexOf(element: T): number;

    getSubList(fromIndex: number, toIndex: number): List<T>;

    has(element: T): boolean;

    insert(index: number, element: T);

    isEmpty(): boolean;

    readonly length: number;

    remove(element: T): boolean;

    removeByIndex(index: number): T;

    replaceAllElements(callbackFn: (t: T, index?: number, list?: List<T>) => T, thisArg?: Object);

    set(index: number, element: T): T;

    sort(comparator: (a: T, b: T) => number);

}
