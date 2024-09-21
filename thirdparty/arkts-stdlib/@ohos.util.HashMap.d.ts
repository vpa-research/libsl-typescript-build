// hand-written

export class HashMap<K, V> {

    [Symbol.iterator](): IterableIterator<[K, V]>;

    clear();

    entries(): IterableIterator<[K, V]>;

    forEach(callbackFn: (value?: V, key?: K, map?: HashMap<K, V>) => void, thisArg?: Object);

    get(key: K): V;

    hasKey(key: K): boolean;

    hasValue(value: V): boolean;

    isEmpty(): boolean;

    keys(): IterableIterator<K>;

    readonly length: number;

    remove(key: K): V;

    replace(key: K, newValue: V): boolean;

    set(key: K, value: V): Object;

    setAll(map: HashMap<K, V>);

    values(): IterableIterator<V>;

}
