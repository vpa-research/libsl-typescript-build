import { HashMap } from "@ohos.util.HashMap";
import { HashMapAutomaton } from "../src/HashMapAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("HashMap", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


    test('<init>', () => {
        type MyClass<K, V> = HashMapAutomaton<K, V>;
        let MyClass = HashMapAutomaton as typeof HashMapAutomaton & (() => MyClass<any, any>);

        let obj: HashMap<string, string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: HashMap<string, string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('isEmpty', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        expect(obj.isEmpty()).toBe(true);

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);

        expect(obj.isEmpty()).toBe(false);
    });


    test('hasKey', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);

        expect(obj.hasKey(key)).toBe(true);
    });


    test('hasValue', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);

        expect(obj.hasValue(value)).toBe(true);
    });


    test('get', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);

        expect(obj.get(key)).toBe(value);
        expect(obj.get(value)).toBeUndefined();
    });


    test('setAll', () => {
        let a: HashMap<string, string> = new HashMapAutomaton();
        a.set("1", "a");
        a.set("2", "a");

        let b: HashMap<string, string> = new HashMapAutomaton();
        b.set("1", "b");
        b.set("3", "b");

        a.setAll(b);

        expect(a.length).toBe(3);
        expect((a as HashMapAutomaton<string, string>).storage.toString()).toBe("{1=b, 2=a, 3=b}");
    });


    test('set', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        let x = obj.set(key, value);

        expect(x).toBe(obj);
        expect(obj.length).toBe(1);
        expect((obj as HashMapAutomaton<string, string>).storage.toString()).toBe("{" + key + "=" + value + "}");
    });


    test('remove', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.remove(key);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('clear', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('keys', () => {
        let obj: HashMap<string, number> = new HashMapAutomaton();
        let key = "test-key";
        let value = 123456;

        obj.set(key, value);
        let iter = obj.keys();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(key);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('values', () => {
        let obj: HashMap<string, number> = new HashMapAutomaton();
        let key = "test-key";
        let value = 123456;

        obj.set(key, value);
        let iter = obj.values();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('replace', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";
        let value2 = "test-value2";

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.replace(key, value2);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect(obj.get(key)).toBe(value2);
    });


    test('forEach', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let key = "test-key";
        let value = "test-value";
        let result: any = null;

        (obj as HashMapAutomaton<string, string>).storage.set(key, value);
        obj.forEach((v, k) => result = [k, v]);

        expect(result).toStrictEqual([key, value]);
        expect(obj.length).toBe(1);
    });


    test('entries', () => {
        let obj: HashMap<string, number> = new HashMapAutomaton();
        let key = "test-key";
        let value = 123456;

        obj.set(key, value);
        let iter = obj.entries();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toStrictEqual([key, value]);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('[Symbol.iterator]', () => {
        let obj: HashMap<string, number> = new HashMapAutomaton();
        let key = "test-key";
        let value = 123456;

        obj.set(key, value);
        let iter = obj[Symbol.iterator]();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toStrictEqual([key, value]);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('length', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();

        expect(obj.length).toBe(0);

        obj.set("123", "abc");
        obj.set("456", "def");

        expect(obj.length).toBe(2);

        obj.remove("123");

        expect(obj.length).toBe(1);
    });

});
