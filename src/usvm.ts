/// ???

namespace org.usvm.api {


export class Engine {
    private Engine() {
    }

    public static assume(expr: boolean): void {
        Engine.engineApiStubError();
    }

    public static makeSymbolic<T>(clazz: any): T {
        Engine.engineApiStubError();
        return {} as T;
    }

    public static makeSymbolicBoolean(): boolean {
        Engine.engineApiStubError();
        return false;
    }

    public static makeSymbolicByte(): number {
        Engine.engineApiStubError();
        return 0;
    }

    public static makeSymbolicChar(): string {
        Engine.engineApiStubError();
        return '\u0000';
    }

    public static makeSymbolicShort(): number {
        Engine.engineApiStubError();
        return 0;
    }

    public static makeSymbolicInt(): number {
        Engine.engineApiStubError();
        return 0;
    }

    public static makeSymbolicLong(): number {
        Engine.engineApiStubError();
        return 0;
    }

    public static makeSymbolicFloat(): number {
        Engine.engineApiStubError();
        return 0.0;
    }

    public static makeSymbolicDouble(): number {
        Engine.engineApiStubError();
        return 0.0;
    }

    public static makeSymbolicArray<T>(clazz: any, size: number): T[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicBooleanArray(size: number): boolean[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicByteArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicCharArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicShortArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicIntArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicLongArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicFloatArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicDoubleArray(size: number): number[] {
        Engine.engineApiStubError();
        return [];
    }

    public static makeSymbolicList<T>(): SymbolicList<T> {
        Engine.engineApiStubError();
        return {} as SymbolicList<T>;
    }

    public static makeSymbolicMap<K, V>(): SymbolicMap<K, V> {
        Engine.engineApiStubError();
        return {} as SymbolicMap<K, V>;
    }

    public static makeSymbolicIdentityMap<K, V>(): SymbolicIdentityMap<K, V> {
        Engine.engineApiStubError();
        return {} as SymbolicIdentityMap<K, V>;
    }

    public static typeEquals(a: any, b: any): boolean {
        Engine.engineApiStubError();
        return false;
    }

    private static engineApiStubError(): void {
        throw "Engine API method must not be invoked";
    }
}




export interface SymbolicList<E> {
    size(): number;

    get(index: number): E | null;

    set(index: number, value: E): void;

    insert(index: number, value: E): void;

    remove(index: number): void;

    copy(dst: SymbolicList<E>, var2: number, var3: number, var4: number): void;
}




export interface SymbolicMap<K, V> {
    size(): number;

    get(key: K): V | null;

    anyKey(): K;

    set(key: K, value: V | null): void;

    remove(key: K): void;

    containsKey(key: K): boolean;

    merge(other: SymbolicMap<K, V>): void;
}



export interface SymbolicIdentityMap<K, V> {
    size(): number;

    get(key: K): V | null;

    anyKey(): K;

    set(key: K, value: V | null): void;

    remove(key: K): void;

    containsKey(key: K): boolean;

    merge(other: SymbolicIdentityMap<K, V>): void;
}



} // namespace


