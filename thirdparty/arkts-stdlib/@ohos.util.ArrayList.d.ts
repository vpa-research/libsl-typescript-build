// hand-written

export class ArrayList<E> {

    [Symbol.iterator](): IterableIterator<T>;

    add(element: T): boolean;

    clear();

    clone(): ArrayList<T>;

    convertToArray(): Array<T>;

    forEach(callbackFn: (t: T, index?: number, arrlist?: ArrayList<T>) => void, thisArg?: Object);

    getCapacity(): number;

    getIndexOf(element: T): number;

    getLastIndexOf(element: T): number;

    has(element: T): boolean;

    increaseCapacityTo(newCapacity: number);

    insert(element: T, index: number);

    isEmpty(): boolean;

    length: number;

    remove(element: T): boolean;

    removeByIndex(index: number): T;

    removeByRange(fromIndex: number, toIndex: number);

    replaceAllElements(callbackFn: (t: T, index?: number, arrlist?: ArrayList<T>) => T, thisArg?: Object);

    sort(comparator?: (a: T, b: T) => number);

    subArrayList(fromIndex: number, toIndex: number): ArrayList<T>;

    trimToCurrentLength();

}
