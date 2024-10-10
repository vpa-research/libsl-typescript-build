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


    test.skip('isEmpty', () => {
        fail("TODO");
    });


    test.skip('has', () => {
        fail("TODO");
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


    test.skip('clear', () => {
        fail("TODO");
    });


    test.skip('forEach', () => {
        fail("TODO");
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
