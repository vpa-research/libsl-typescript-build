/// ???

namespace org {
    namespace usvm {
        namespace api {


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

                public static makeSymbolicArray<T>(clazz: any, size: number): Array<T>;

                public static makeSymbolicBooleanArray(size: number): Array<boolean>;

                public static makeSymbolicByteArray(size: number): Array<number>;

                public static makeSymbolicCharArray(size: number): Array<number>;

                public static makeSymbolicShortArray(size: number): Array<number>;

                public static makeSymbolicIntArray(size: number): Array<number>;

                public static makeSymbolicLongArray(size: number): Array<number>;

                public static makeSymbolicFloatArray(size: number): Array<number>;

                public static makeSymbolicDoubleArray(size: number): Array<number>;

                public static makeSymbolicList<T>(): SymbolicList<T>;

                public static makeSymbolicMap<K, V>(): SymbolicMap<K, V>;

                public static makeSymbolicIdentityMap<K, V>(): SymbolicIdentityMap<K, V>;

                public static typeEquals(a: any, b: any): boolean;
            }


            export interface SymbolicList<E> {
                size(): number;

                get(index: number): E;

                set(index: number, value: E | null): void;

                insert(index: number, value: E | null): void;

                remove(index: number): void;

                copy(dst: SymbolicList<E>, srcPos: number, dstPos: number, len: number): void;
            }




            export interface SymbolicMap<K, V> {
                size(): number;

                get(key: K | null): V;

                anyKey(): K;

                set(key: K | null, value: V | null): void;

                remove(key: K | null): void;

                containsKey(key: K | null): boolean;

                merge(other: SymbolicMap<K, V>): void;
            }



            export interface SymbolicIdentityMap<K, V> {
                size(): number;

                get(key: K | null): V;

                anyKey(): K;

                set(key: K | null, value: V | null): void;

                remove(key: K | null): void;

                containsKey(key: K | null): boolean;

                merge(other: SymbolicIdentityMap<K, V>): void;
            }



        }
    }
}
