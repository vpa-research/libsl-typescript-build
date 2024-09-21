// hand-written

export class LinkedList<E> {

    [Symbol.iterator](): IterableIterator<T>;

    add(element: T): boolean;

    addFirst(element: T);

    clear();

    clone(): LinkedList<T>;

    convertToArray(): Array<T>;

    forEach(callbackFn: (t: T, index?: number, arrlist?: LinkedList<T>) => void, thisArg?: Object);

    get(index: number): T;

    getFirst(): T | undefined;

    getIndexOf(element: T): number;

    getLast(): T | undefined;

    getLastIndexOf(element: T): number;

    has(element: T): boolean;

    insert(index: number, element: T);

    readonly length: number;

    remove(element: T): boolean;

    removeByIndex(index: number): T;

    removeFirst(): T;

    removeFirstFound(element: T): boolean;

    removeLast(): T;

    removeLastFound(element: T): boolean;

    set(index: number, element: T): T;

}
