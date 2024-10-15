/// ???


interface SymbolicList<E> {
    size(): number;

    get(index: number): E;

    set(index: number, value: E | null): void;

    insert(index: number, value: E | null): void;

    remove(index: number): void;

    copy(dst: SymbolicList<E>, srcPos: number, dstPos: number, len: number): void;
}


interface SymbolicMap<K, V> {
    size(): number;

    get(key: K | null): V;

    anyKey(): K;

    set(key: K | null, value: V | null): void;

    remove(key: K | null): void;

    containsKey(key: K | null): boolean;

    merge(other: SymbolicMap<K, V>): void;
}


interface SymbolicIdentityMap<K, V> {
    size(): number;

    get(key: K | null): V;

    anyKey(): K;

    set(key: K | null, value: V | null): void;

    remove(key: K | null): void;

    containsKey(key: K | null): boolean;

    merge(other: SymbolicIdentityMap<K, V>): void;
}


class EngimeImpl {
    private constructor() {
        throw new Error("Invalid API call");
    }

    public static assume(expr: boolean): void {
        // nothing?
    }

    public static makeSymbolic<T>(clazz: any): T {
        return {} as any as T;
    }

    public static makeSymbolicBoolean(): boolean {
        return true;
    }

    public static makeSymbolicByte(): number {
        return 0;
    }

    public static makeSymbolicChar(): string {
        return '';
    }

    public static makeSymbolicShort(): number {
        return 0;
    }

    public static makeSymbolicInt(): number {
        return 0;
    }

    public static makeSymbolicLong(): number {
        return 0;
    }

    public static makeSymbolicFloat(): number {
        return 0;
    }

    public static makeSymbolicDouble(): number {
        return 0;
    }

    public static makeSymbolicArray<T>(clazz: any, size: number): Array<T> {
        return new Array(size).fill(null as T);
    }

    public static makeSymbolicBooleanArray(size: number): Array<boolean> {
        return new Array(size).fill(false);
    }

    public static makeSymbolicByteArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicCharArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicShortArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicIntArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicLongArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicFloatArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicDoubleArray(size: number): Array<number> {
        return new Array(size).fill(0);
    }

    public static makeSymbolicList<T>(): SymbolicList<T> {
        return new SymbolicListImpl();
    }

    public static makeSymbolicMap<K, V>(): SymbolicMap<K, V> {
        return new SymbolicMapImpl();
    }

    public static makeSymbolicIdentityMap<K, V>(): SymbolicIdentityMap<K, V> {
        return new SymbolicMapImpl();
    }

    public static typeEquals(a: any, b: any): boolean {
        return Object.getPrototypeOf(a) == Object.getPrototypeOf(b);
    }
}


class SymbolicListImpl<E> {
    private items: Array<any> = [];

    public size(): number {
        return this.items.length;
    }

    public get(index: number): E {
        return this.items[index] as E;
    }

    public set(index: number, value: E | null): void {
        this.items[index] = value;
    }

    public insert(index: number, value: E | null): void {
        this.items.splice(index, 0, value);
    }

    public remove(index: number): void {
        this.items.splice(index, 1);
    }

    public copy(dst: SymbolicList<E>, srcPos: number, dstPos: number, len: number): void {
        let other = dst as SymbolicListImpl<E>;
        for (let i = 0; i < len; i++)
            other.items[dstPos + i] = this.items[srcPos + i];
    }

    public toString(): string {
        return "[" + this.items.join(", ") + "]";
    }
}


class SymbolicMapImpl<K, V> {
    private map: Map<any, any> = new Map();

    public size(): number {
        return this.map.size;
    }

    public get(key: K | null): V {
        return this.map.get(key);
    }

    public anyKey(): K {
        return this.map.keys().next().value;
    }

    public set(key: K | null, value: V | null): void {
        this.map.set(key, value);
    }

    public remove(key: K | null): void {
        this.map.delete(key);
    }

    public containsKey(key: K | null): boolean {
        return this.map.has(key);
    }

    public merge(other: SymbolicMap<K, V>): void {
        (other as SymbolicMapImpl<K, V>).map.forEach((v, k) => this.map.set(k, v));
    }

    public toString(): string {
        let result = "{";

        let isFirst = true;
        this.map.forEach((v, k) => {
            if (isFirst)
                isFirst = false;
            else
                result += ", ";

            result += k + "=" + v;
        });

        return result + "}";
    }
}


function emptyClassMock(namePrefix: string) {
    return class {

        static [Symbol.hasInstance](other: any): boolean {
            if (other)
                // example: QueueAutomaton == Queue
                return other.constructor.name.startsWith(namePrefix);
            else
                return false;
        }

    };
}


// actual set-up: virtual machine API

jest.mock("@org.usvm.api", () => ({
    Engine: EngimeImpl,
}), { virtual: true });


jest.mock("@org.jacodb.approximation.annotation", () => ({
    Approximate: (clazz: NonNullable<any>) => {
        return (ctor: Function, x: any) => {
            // nothing
        }
    },
}), { virtual: true });


// actual set-up: stdlib

jest.mock("@ohos.util.ArrayList",   () => ({ ArrayList:     emptyClassMock("ArrayList")     }), { virtual: true });
jest.mock("@ohos.util.Deque",       () => ({ Deque:         emptyClassMock("Deque")         }), { virtual: true });
jest.mock("@ohos.util.HashMap",     () => ({ HashMap:       emptyClassMock("HashMap")       }), { virtual: true });
jest.mock("@ohos.util.HashSet",     () => ({ HashSet:       emptyClassMock("HashSet")       }), { virtual: true });
jest.mock("@ohos.util.LinkedList",  () => ({ LinkedList:    emptyClassMock("LinkedList")    }), { virtual: true });
jest.mock("@ohos.util.List",        () => ({ List:          emptyClassMock("List")          }), { virtual: true });
jest.mock("@ohos.util.PlainArray",  () => ({ PlainArray:    emptyClassMock("PlainArray")    }), { virtual: true });
jest.mock("@ohos.util.Queue",       () => ({ Queue:         emptyClassMock("Queue")         }), { virtual: true });
jest.mock("@ohos.util.Stack",       () => ({ Stack:         emptyClassMock("Stack")         }), { virtual: true });
jest.mock("@ohos.util.TreeMap",     () => ({ TreeMap:       emptyClassMock("TreeMap")       }), { virtual: true });
jest.mock("@ohos.util.TreeSet",     () => ({ TreeSet:       emptyClassMock("TreeSet")       }), { virtual: true });
