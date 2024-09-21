// hand-written

export class TreeMap<K, V> {

    [Symbol.iterator](): IterableIterator<[K, V]>;

    clear();

    entries(): IterableIterator<[K, V]>;

    forEach(callbackFn: (value?: V, key?: K, map?: TreeMap<K, V>) => void, thisArg?: Object);

    get(key: K): V | undefined;

    getFirstKey(): K | undefined;

    getHigherKey(key: K): K | undefined;

    getLastKey(): K | undefined;

    getLowerKey(key: K): K | undefined;

    hasKey(key: K): boolean;

    hasValue(value: V): boolean;

    isEmpty(): boolean;

    keys(): IterableIterator<K>;

    readonly length: number;

    remove(key: K): V | undefined;

    replace(key: K, newValue: V): boolean;

    set(key: K, value: V): Object;

    setAll(map: TreeMap<K, V>);

    values(): IterableIterator<V>;

}
