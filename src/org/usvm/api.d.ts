/// ???

export class Engine {
    private constructor();

    public static assume(expr: boolean): void;

    public static makeSymbolic<T>(clazz: any): T;

    public static makeSymbolicBoolean(): boolean;

    public static makeSymbolicByte(): number;

    public static makeSymbolicChar(): string;

    public static makeSymbolicShort(): number;

    public static makeSymbolicInt(): number;

    public static makeSymbolicLong(): number;

    public static makeSymbolicFloat(): number;

    public static makeSymbolicDouble(): number;

    public static makeSymbolicArray<T>(clazz: any, size: number): T[];

    public static makeSymbolicBooleanArray(size: number): boolean[];

    public static makeSymbolicByteArray(size: number): number[];

    public static makeSymbolicCharArray(size: number): number[];

    public static makeSymbolicShortArray(size: number): number[];

    public static makeSymbolicIntArray(size: number): number[];

    public static makeSymbolicLongArray(size: number): number[];

    public static makeSymbolicFloatArray(size: number): number[];

    public static makeSymbolicDoubleArray(size: number): number[];

    public static makeSymbolicList<T>(): SymbolicList<T>;

    public static makeSymbolicMap<K, V>(): SymbolicMap<K, V>;

    public static makeSymbolicIdentityMap<K, V>(): SymbolicIdentityMap<K, V>;

    public static typeEquals(a: any, b: any): boolean;
}

declare var Engine: Engine;


export interface SymbolicList<E> {
    size(): number;

    get(index: number): E | null;

    set(index: number, value: E | null): void;

    insert(index: number, value: E | null): void;

    remove(index: number): void;

    copy(dst: SymbolicList<E>, var2: number, var3: number, var4: number): void;
}




export interface SymbolicMap<K, V> {
    size(): number;

    get(key: K | null): V | null;

    anyKey(): K;

    set(key: K | null, value: V | null): void;

    remove(key: K | null): void;

    containsKey(key: K | null): boolean;

    merge(other: SymbolicMap<K, V>): void;
}



export interface SymbolicIdentityMap<K, V> {
    size(): number;

    get(key: K | null): V | null;

    anyKey(): K;

    set(key: K | null, value: V | null): void;

    remove(key: K | null): void;

    containsKey(key: K | null): boolean;

    merge(other: SymbolicIdentityMap<K, V>): void;
}


