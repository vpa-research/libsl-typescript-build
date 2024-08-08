// ???

import { Engine, SymbolicIdentityMap, SymbolicList, SymbolicMap } from "@org.usvm.api";


// #problem: do we need this? can we just ignore TS error about unknown property 'code'?
export interface ErrorWithCode extends Error {
    code: number;
}

// #problem: do we need this?
interface AggregateError extends Error {
}
interface AggregateErrorConstructor extends ErrorConstructor {
    // #problem: probably not correct
    new (message?: string): AggregateError;
}
declare var AggregateError: AggregateErrorConstructor;



export namespace libsl {

    export type TOKEN = 'LIBSL<#>TOKEN';
    export const TOKEN: TOKEN = 'LIBSL<#>TOKEN';
    export const ANYTHING: any = {};
    export const UNDEFINED: any = undefined;

    // WARNING: This solution is suitable ONLY for single-threading execution.
    // For multi-threading envirounments this should be completely re-considered.
    export var constructor_called_by_user: boolean = true;

    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new Error(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_EVAL_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new EvalError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_RANGE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new RangeError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_REFERENCE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new ReferenceError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_TYPE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new TypeError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_AGGREGATE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new AggregateError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_URI_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new URIError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_SYNTAX_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new SyntaxError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // #question: do we actually need those?
    /*
    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_OOM_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        ...
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_TERMINATION_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        ...
    }
    */



    export function error(msg: string): void {
        Engine.assume(msg !== null);
        throw new Error(msg);
    }

    export function todo(): void {
        throw new Error("TODO");
    }

    export function not_implemented(): void {
        throw new Error("NOT_IMPLEMENTED");
    }


    const BUFF_SIZE_BYTE: number  = 4;
    const BUFF_SIZE_SHORT: number = 6;
    const BUFF_SIZE_INT: number   = 11;
    const BUFF_SIZE_LONG: number  = 20;

    const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

    export function toString_bool(v: boolean): string {
        return v ? "true" : "false";
    }

    export function toString_int64(v: number): string {
        if (v === 0) return "0";
        if (v === Number.MIN_SAFE_INTEGER) return "-9007199254740991";
        if (v === Number.MAX_SAFE_INTEGER) return "9007199254740991";
        // TODO: add more common cases

        if (v < Number.MIN_SAFE_INTEGER || Number.MAX_SAFE_INTEGER < v)
            return toString_float64(v);

        // #question: not needed?
        // Engine.assume(v > Number.MIN_VALUE);
        // Engine.assume(v < Number.MAX_VALUE);

        let chars = new Array<string>(BUFF_SIZE_LONG);

        let isNegative: boolean = v < 0;
        if (isNegative)
            v = -v;

        let len: number = 0;
        let pos: number = BUFF_SIZE_LONG;
        while (v !== 0) {
            pos -= 1;
            len += 1;
            chars[pos] = DIGITS[v % 10];
            v /= 10;
        }

        if (isNegative) {
            pos -= 1;
            len += 1;
            chars[pos] = '-';
        }

        return pos !== 0
            ? chars.copyWithin(0, pos, pos + len).join("")
            : chars.join("");
    }

    // TODO: do we need more variants for other primitive array types?
    export function toString_array_char(v: Array<string>): string {
        // #problem: characters, not an array
        return v.join('');
    }


    const DOUBLE_MULTIPLIER_REGULAR = 1e+15; // 16 decimal positions
    const DOUBLE_MULTIPLIER_REGULAR_count = 15;
    const DOUBLE_MULTIPLIER_REGULAR_long = Math.floor(DOUBLE_MULTIPLIER_REGULAR);

    const DOUBLE_MULTIPLIER_SCIENTIFIC = 1e+15; // 16 decimal positions
    const DOUBLE_MULTIPLIER_SCIENTIFIC_count = 15;
    const DOUBLE_MULTIPLIER_SCIENTIFIC_long = Math.floor(DOUBLE_MULTIPLIER_SCIENTIFIC);

    export function toString_float64(v: number): string {
        if (v !== v)
            return "NaN";
        if (v === Number.POSITIVE_INFINITY)
            return "Infinity";
        if (v === Number.NEGATIVE_INFINITY)
            return "-Infinity";
        if (v === Number.MAX_VALUE)
            return "1.7976931348623157e+308";
        if (v === Number.MIN_VALUE)
            return "5e-324";
        if (v === 0.0)
            return 1.0 / v === Number.NEGATIVE_INFINITY ? "-0" : "0";

        let isNegative: boolean = v < 0.0;
        if (isNegative)
            v = -v;

        // decide on the formatting
        let result: string;
        if (v >= 1e-3 && v < 1e+7) {
            // use regular notation

            // split into main parts
            let integral: number = Math.floor(v);
            let remainder: number = (v - integral) * DOUBLE_MULTIPLIER_REGULAR;
            let fraction: number = Math.floor(remainder);

            // corrections
            if (remainder - fraction >= 0.5) {
                // rounding of last decimal digit
                fraction += 1;

                // overflow?
                if (fraction >= DOUBLE_MULTIPLIER_REGULAR_long) {
                    fraction = 0;
                    integral += 1;

                    // overflow?
                    if (integral >= 10)
                        integral = 1;
                }
            }

            // prepare pieces
            let integralStr: string = toString_int64(integral);
            let fractionStr: string = prepareDoubleFraction(fraction, DOUBLE_MULTIPLIER_REGULAR_count);

            // format pieces together
            let tmp: string = "".concat(integralStr, ".", fractionStr);
            let maxCount: number = 18;
            result = tmp;//.substring(0, count);
        } else {
            // use scientific notation

            // forcing value into [1..9] range
            let exp: number = 0;
            // convert to base 10 using log2
            if (v >= 10.0) {
                if (v >= 1E+256) {
                    v *= 1E-256;
                    exp += 256;
                }
                if (v >= 1E+128) {
                    v *= 1E-128;
                    exp += 128;
                }
                if (v >= 1E+64) {
                    v *= 1E-64;
                    exp += 64;
                }
                if (v >= 1E+32) {
                    v *= 1E-32;
                    exp += 32;
                }
                if (v >= 1E+16) {
                    v *= 1E-16;
                    exp += 16;
                }
                if (v >= 1E+8) {
                    v *= 1E-8;
                    exp += 8;
                }
                if (v >= 1E+4) {
                    v *= 1E-4;
                    exp += 4;
                }
                if (v >= 1E+2) {
                    v *= 1E-2;
                    exp += 2;
                }
                if (v >= 1E+1) {
                    v *= 1E-1;
                    exp += 1;
                }
            }
            if (v > 0.0 && v <= 1.0) {
                if (v < 1E-255) {
                    v *= 1E256;
                    exp -= 256;
                }
                if (v < 1E-127) {
                    v *= 1E128;
                    exp -= 128;
                }
                if (v < 1E-63) {
                    v *= 1E64;
                    exp -= 64;
                }
                if (v < 1E-31) {
                    v *= 1E32;
                    exp -= 32;
                }
                if (v < 1E-15) {
                    v *= 1E16;
                    exp -= 16;
                }
                if (v < 1E-7) {
                    v *= 1E8;
                    exp -= 8;
                }
                if (v < 1E-3) {
                    v *= 1E4;
                    exp -= 4;
                }
                if (v < 1E-1) {
                    v *= 1E2;
                    exp -= 2;
                }
                if (v < 1E-0) {
                    v *= 1E1;
                    exp -= 1;
                }
            }

            // split into main parts
            let integral: number = Math.floor(v);
            let remainder: number = (v - integral) * DOUBLE_MULTIPLIER_SCIENTIFIC;
            let fraction: number = Math.floor(remainder);

            // corrections
            if (remainder - fraction >= 0.5) {
                // rounding of last decimal digit
                fraction += 1;

                // overflow?
                if (fraction >= DOUBLE_MULTIPLIER_SCIENTIFIC_long) {
                    fraction = 0;
                    integral += 1;

                    // overflow?
                    if (integral >= 10) {
                        integral = 1;
                        exp += 1;
                    }
                }
            }

            // prepare pieces
            let integralStr: string = toString_int64(integral);
            let fractionStr: string = prepareDoubleFraction(fraction, DOUBLE_MULTIPLIER_SCIENTIFIC_count);
            let exponentStr: string = toString_int64(exp);

            // format pieces together
            result = "".concat(integralStr, ".", fractionStr, "e", exponentStr);
        }

        // put everything together
        return isNegative ? "-".concat(result) : result;
    }

    function prepareDoubleFraction(decimal: number, expectedFractionLength: number): string {
        if (decimal === 0)
            return "0";

        // cut and count trailing zeroes
        let cutZeroes: number = 0;
        while (decimal % 10 === 0) {
            decimal /= 10;
            cutZeroes += 1;
        }

        let decimals: string = toString_int64(decimal);
        let decimalLength: number = decimals.length;

        if (decimalLength < expectedFractionLength) {
            let leadingZeroCount: number = expectedFractionLength - cutZeroes - decimalLength;
            let zeroes: Array<string> = new Array<string>(leadingZeroCount);
            for (let i: number = 0; i < leadingZeroCount; i++)
                zeroes[i] = '0';

            return zeroes.join("").concat(decimals);
        } else {
            return decimals;
        }
    }


    export function toString_list(v: SymbolicList<any>): string {
        let counter: number = v.size();
        if (counter === 0)
            return "[]";
        Engine.assume(counter > 0);

        // TODO: use less complex approach
        let res: string = "[";

        for (let i: number = 0, c = counter; i !== c; i++) {
            res = res.concat(toString_any(v.get(i)));

            if (counter-- > 1)
                res = res.concat(", ");
        }

        return res.concat("]");
    }

    export function toString_map(v: Map<any, any>): string {
        let count: number = v.size();
        if (count === 0)
            return "{}";
        Engine.assume(count > 0);

        // TODO: use less complex approach
        let res: string = "{";

        let unseen: Container<any, any> = v.map.duplicate();
        while (count !== 0) {
            let key: any = unseen.anyKey();
            let value: any = unseen.get(key);
            unseen.remove(key);

            res = res.concat(toString_any(key), "=", toString_any(value));

            if (count-- > 1)
                res = res.concat(", ");
        }

        return res.concat("}");
    }

    export function toString_any(v: any): string {
        if (v === null)
            return "null";
        if (v === undefined)
            return "undefined";

        // #question: do we need this?
        if (v instanceof Boolean)
            return toString_bool(v as boolean);
        if (v instanceof Number)
            return toString_int64(v as number);
        if (v instanceof String)
            return v as string;
        if (v instanceof Array)
            return toString_array(v);

        return v.toString();
    }

    export function toString_array(objects: Array<any>): string {
        let counter: number = objects.length;
        Engine.assume(counter >= 0);
        if (counter === 0)
            return "[]";

        let str: string = "[";

        for (let i: number = 0, c = counter; i < c; i++) {
            str = str.concat(toString_any(objects[i]));

            if (counter-- > 1)
                str = str.concat(", ");
        }

        return str.concat("]");
    }

    // fool-proofing
    export function toString_string(v: string | null) {
        return v === null ? "null" : v;
    }


    // #question: do we need those?
    /*
    export function hashCode(v: boolean): number {
        return v ? 1231 : 1237;
    }
    */


    export function equals_bool_bool(a: boolean, b: boolean): boolean {
        return a === b;
    }

    export function equals_float64_float64(a: number, b: number): boolean {
        // FIXME: use Double.compare(a, b) ?
        return a === b;
    }

    export function equals_list_list(a: SymbolicList<any> | null, b: SymbolicList<any> | null): boolean {
        // #problem: compare REFERENCES only! (how?)
        if (a === b)
            return true;
        if (a === null || b === null)
            return false;

        let length: number = a.size();
        if (b.size() !== length)
            return false;

        Engine.assume(length >= 0);
        for (let i: number = 0; i < length; i++)
            if (!equals_any_any(a.get(i), b.get(i)))
                return false;

        return true;
    }

    export function equals_map_map(a: Map<any, any> | null, b: Map<any, any> | null): boolean {
        if (a === b)
            return true;
        if (a === null || b === null)
            return false;

        let length: number = a.size();
        if (b.size() !== length)
            return false;

        if (length === 0)
            return true;
        Engine.assume(length >= 0);

        let unseen: Container<any, any> = a.map.duplicate();
        while (length !== 0) {
            let key: any = unseen.anyKey();

            if (!b.hasKey(key))
                return false;
            if (!equals_any_any(a.get(key), b.get(key)))
                return false;

            unseen.remove(key);
            length -= 1;
        }
        return true;
    }

    export function equals_any_any(a: any, b: any): boolean {
        if (a === b)
            return true;

        if (a === null || b === null)
            return false;

        // #question: do we need this?
        if (a instanceof Boolean)
            return equals_bool_bool(a as boolean, b as boolean);
        if (a instanceof Number)
            return equals_float64_float64(a as number, b as number)
        if (a instanceof Array)
            return equals_array_array(a, b);

        return a.equals(b);
    }

    export function equals_array_array(a: Array<any> | null, b: Array<any> | null): boolean {
        if (a === b)
            return true;
        if (a === null || b === null)
            return false;

        let length: number = a.length;
        if (b.length !== length)
            return false;

        Engine.assume(length >= 0);
        for (let i: number = 0; i < length; i++)
            if (!equals_any_any(a[i], b[i]))
                return false;

        return true;
    }


    // A marker class to attach unknown actions to. Makes it easier to do manual code inspections.
    export namespace UnknownAction {
    }


    // a helper class for complex "array<T>"-related actions
    export namespace ArrayActions {

        export function copy(src: any, srcPos: number,
                             dst: any, dstPos: number,
                             count: number) {
            if (count <= 0)
                return;

            Engine.assume(src !== null);
            Engine.assume(dst !== null);

            // #question: is there a better approach?
            for (let i: number = srcPos, j: number = dstPos, end: number = srcPos + count; i < end; i++, j++)
                dst[j] = src[i];
        }

        export function fill(arr: Array<any>, value: any): void {
            Engine.assume(arr !== null);

            let count: number = arr.length;
            Engine.assume(count >= 0);

            for (let i: number = 0; i < count; i++)
                arr[i] = value;
        }

        export function fillRange(arr: Array<any>,
                                  fromIndex: number, toIndex: number,
                                  value: any): void {
            Engine.assume(arr !== null);

            let count: number = arr.length;
            Engine.assume(count >= 0);

            Engine.assume(0 <= fromIndex);
            Engine.assume(fromIndex <= toIndex);
            Engine.assume(toIndex <= count);

            for (let i: number = fromIndex; i < toIndex; i++)
                arr[i] = value;
        }

    }


    // a helper class for complex "list<T>"-related actions
    export namespace ListActions {

        export function find(list: SymbolicList<any>, value: any,
                             from: number, to: number): number {
            // general assumptions for this function to do something useful
            Engine.assume(list !== null);
            Engine.assume(0 <= from);
            Engine.assume(from <= to);

            // TODO: is there a more efficient solution?
            if (value === null) {
                for (let i: number = from; i < to; i++) {
                    if (list.get(i) === null)
                        return i;
                }
            } else {
                for (let i: number = from; i < to; i++) {
                    // #question: can type be different here?
                    if (list.get(i) == value)
                        return i;
                }
            }

            return -1;
        }

    }



    abstract class Container<CK, CV> {
        public static KIND_HASHMAP: number = 1;
        public static KIND_IDENTITY_MAP: number = 2;

        public kind: number;

        protected constructor(kind: number) {
            this.kind = kind;
        }

        abstract merge(container: Container<CK, CV>): void;

        abstract getCleanInstance(): Container<CK, CV>;

        abstract duplicate(): Container<CK, CV>;

        // other methods are proxies for USVM objects

        abstract containsKey(key: CK | null): boolean;

        abstract anyKey(): CK;

        abstract get(key: CK): CV | null;

        abstract set(key: CK, value: CV | null): void;

        abstract remove(key: CK): void;

        abstract size(): number;
    }


    export class Map<K, V> {
        public map: Container<K, V>;

        public constructor(container: Container<K, V> ) {
            this.map = container;
        }

        public hasKey(key: K | null): boolean {
            Engine.assume(this.map !== null);
            return this.map.containsKey(key);
        }

        public anyKey(): K {
            Engine.assume(this.map !== null);
            return this.map.anyKey();
        }

        public get(key: K): V | null {
            Engine.assume(this.map !== null);
            return this.map.get(key);
        }

        public set(key: K, value: V): void {
            Engine.assume(this.map !== null);
            this.map.set(key, value);
        }

        public remove(key: K): void {
            Engine.assume(this.map !== null);
            this.map.remove(key);
        }

        public size(): number {
            Engine.assume(this.map !== null);
            return this.map.size();
        }

        public union(other: Map<K, V>): void {
            Engine.assume(this.map !== null);

            let otherMap: Container<K, V> = other.map;
            Engine.assume(otherMap !== null);

            if (this.map.kind === otherMap.kind) {
                this.map.merge(otherMap);
            } else {
                let count: number = otherMap.size();
                if (count !== 0) {
                    Engine.assume(count > 0);

                    let unseen: Container<K, V> = otherMap.duplicate();
                    while (count !== 0) {
                        let key: K = unseen.anyKey();

                        // behaving exactly as compatible versions
                        this.map.set(key, unseen.get(key));

                        unseen.remove(key);
                        count -= 1;
                    }
                }
            }
        }

        public intersection(other: Map<K, V>): void {
            Engine.assume(this.map !== null);

            let otherMap: Container<K, V> = other.map;
            Engine.assume(otherMap !== null);

            let thisMap: Container<K, V> = this.map;
            this.map = thisMap.getCleanInstance();
            Engine.assume(this.map !== null);

            let count: number = otherMap.size();
            if (count !== 0) {
                Engine.assume(count > 0);

                let unseen: Container<K, V> = otherMap.duplicate();
                while (count !== 0) {
                    let key: K = unseen.anyKey();

                    if (thisMap.containsKey(key))
                        // preferring items from the other container (similar to "union")
                        this.map.set(key, unseen.get(key));

                    unseen.remove(key);
                    count -= 1;
                }
            }
        }

        public duplicate(): Map<K, V> {
            Engine.assume(this.map !== null);
            return new Map<K, V>(this.map.duplicate());
        }

        public toString(): string {
            return toString_map(this);
        }

        // #question: do we need this?
        public hashCode(): number {
            // #question: do we need this?
            return 0;//return hashCode_map(this);
        }

        public equals(obj: Object): boolean {
            return obj instanceof Map
                ? equals_map_map(this, obj as Map<K, V>)
                : false;
        }
    }


    export class HashMapContainer<K, V> extends Container<K, V> {
        private map: SymbolicMap<K, V> = Engine.makeSymbolicMap();

        public constructor() {
            super(Container.KIND_HASHMAP);
        }

        public merge(container: Container<K, V>): void {
            Engine.assume(container instanceof HashMapContainer);
            let other = container as HashMapContainer<K, V>;
            this.map.merge(other.map);
        }

        public getCleanInstance(): Container<K, V> {
            return new HashMapContainer<K, V>();
        }

        public duplicate(): Container<K, V> {
            let obj = new HashMapContainer<K, V>();
            obj.map.merge(this.map);
            return obj;
        }

        public containsKey(key: K | null): boolean {
            return this.map.containsKey(key);
        }

        public anyKey(): K {
            return this.map.anyKey();
        }

        public get(key: K): V {
            return this.map.get(key);
        }

        public set(key: K, value: V | null): void {
            this.map.set(key, value);
        }

        public remove(key: K): void {
            this.map.remove(key);
        }

        public size(): number {
            return this.map.size();
        }
    }


    export class IdentityMapContainer<K, V> extends Container<K, V> {
        private map: SymbolicIdentityMap<K, V> = Engine.makeSymbolicIdentityMap();

        public constructor() {
            super(Container.KIND_IDENTITY_MAP);
        }

        public merge(container: Container<K, V>): void {
            Engine.assume(container instanceof IdentityMapContainer);
            let other = container as IdentityMapContainer<K, V>;
            this.map.merge(other.map);
        }

        public getCleanInstance(): Container<K, V> {
            return new IdentityMapContainer<K, V>();
        }

        public duplicate(): Container<K, V> {
            let obj = new IdentityMapContainer<K, V>();
            obj.map.merge(this.map);
            return obj;
        }

        public containsKey(key: K | null): boolean {
            return this.map.containsKey(key);
        }

        public anyKey(): K {
            return this.map.anyKey();
        }

        public get(key: K): V {
            return this.map.get(key);
        }

        public set(key: K, value: V | null): void {
            this.map.set(key, value);
        }

        public remove(key: K): void {
            this.map.remove(key);
        }

        public size(): number {
            return this.map.size();
        }
    }



} // namespace
