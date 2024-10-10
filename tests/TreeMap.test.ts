import { TreeMap } from "@ohos.util.TreeMap";
import { TreeMapAutomaton } from "../src/TreeMapAutomaton";


// test set itself

describe("TreeMap", () => {

    test('<init>', () => {
        type MyClass<K, V> = TreeMapAutomaton<K, V>;
        let MyClass = TreeMapAutomaton as typeof TreeMapAutomaton & (() => MyClass<any, any>);

        let obj: TreeMap<string, number> = new MyClass((a, b) => undefined);

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: TreeMap<string, number> = MyClass();

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


    test('get', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.get(key);

        expect(x).toBe(value);
        expect(obj.length).toBe(1);
    });


    test('getFirstKey', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.getFirstKey();

        expect(x).toBe(key);
        expect(obj.length).toBe(1);
    });


    test('getLastKey', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.getLastKey();

        expect(x).toBe(key);
        expect(obj.length).toBe(1);
    });


    test.skip('setAll', () => {
        fail("TODO");
    });


    test('set', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        let x = obj.set(key, value);

        expect(x).toBe(obj);
        expect(obj.length).toBe(1);
        expect((obj as TreeMapAutomaton<string, string>).storage.toString()).toBe("{" + key + "=" + value + "}");
    });


    test('remove', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.remove(key);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('getLowerKey', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.getLowerKey(key);

        // NOTE: not applicable to the model

        expect(x).toBe(key);
        expect(obj.length).toBe(1);
    });


    test('getHigherKey', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        let x = obj.getHigherKey(key);

        // NOTE: not applicable to the model

        expect(x).toBe(key);
        expect(obj.length).toBe(1);
    });


    test.skip('replace', () => {
        fail("TODO");
    });


    test('clear', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        (obj as TreeMapAutomaton<string, string>).storage.set(key, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('keys', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

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
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

        obj.set(key, value);
        let iter = obj.values();
        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test.skip('forEach', () => {
        fail("TODO");
    });


    test('entries', () => {
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

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
        let obj: TreeMap<string, string> = new TreeMapAutomaton((a, b) => undefined);
        let key = "test-key";
        let value = "test-value";

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
        let obj: TreeMap<number, string> = new TreeMapAutomaton((a, b) => undefined);

        expect(obj.length).toBe(0);

        obj.set(2, "123");
        obj.set(3, "456");

        expect(obj.length).toBe(2);

        obj.remove(3);

        expect(obj.length).toBe(1);
    });

});
