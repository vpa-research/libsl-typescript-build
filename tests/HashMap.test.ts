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


    test.skip('isEmpty', () => {
        fail("TODO");
    });


    test.skip('hasKey', () => {
        fail("TODO");
    });


    test.skip('hasValue', () => {
        fail("TODO");
    });


    test.skip('get', () => {
        fail("TODO");
    });


    test.skip('setAll', () => {
        fail("TODO");
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


    test.skip('remove', () => {
        fail("TODO");
    });


    test('clear', () => {
        let obj: HashMap<string, string> = new HashMapAutomaton();
        let value = "test-value";

        (obj as HashMapAutomaton<string, string>).storage.set("0", value);
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


    test.skip('replace', () => {
        fail("TODO");
    });


    test.skip('forEach', () => {
        fail("TODO");
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
