import { HashSet } from "@ohos.util.HashSet";
import { HashSetAutomaton } from "../src/HashSetAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("HashSet", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


    test('<init>', () => {
        type MyClass<T> = HashSetAutomaton<T>;
        let MyClass = HashSetAutomaton as typeof HashSetAutomaton & (() => MyClass<any>);

        let obj: HashSet<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: HashSet<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('isEmpty', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        expect(obj.isEmpty()).toBe(true);

        (obj as HashSetAutomaton<string>).storage.set(value, value);

        expect(obj.isEmpty()).toBe(false);
    });


    test('has', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        (obj as HashSetAutomaton<string>).storage.set(value, value);
        let x = obj.has(value);

        expect(x).toBe(true);
    });


    test('add', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        let x = obj.add(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as HashSetAutomaton<string>).storage.anyKey()).toBe(value);
    });


    test('remove', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        (obj as HashSetAutomaton<string>).storage.set(value, value);
        let x = obj.remove(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test('clear', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        (obj as HashSetAutomaton<string>).storage.set(value, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('forEach', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let values = ["A", "B", "C"];
        let results: (string | undefined)[] = [];

        obj.add(values[0]);
        obj.add(values[1]);
        obj.add(values[2]);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values);
        expect(obj.length).toBe(values.length);
    });


    test('entries', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        obj.add(value);
        let iter = obj.entries();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toStrictEqual([value, value]);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('[Symbol.iterator]', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        obj.add(value);
        let iter = obj[Symbol.iterator]();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('values', () => {
        let obj: HashSet<string> = new HashSetAutomaton();
        let value = "test-value";

        obj.add(value);
        let iter = obj.values();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('length', () => {
        let obj: HashSet<string> = new HashSetAutomaton();

        expect(obj.length).toBe(0);

        obj.add("123");
        obj.add("456");

        expect(obj.length).toBe(2);

        obj.remove("123");

        expect(obj.length).toBe(1);
    });

});
