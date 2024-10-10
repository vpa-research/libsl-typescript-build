import { TreeSet } from "@ohos.util.TreeSet";
import { TreeSetAutomaton } from "../src/TreeSetAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("TreeSet", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


    test('<init>', () => {
        type MyClass<T> = TreeSetAutomaton<T>;
        let MyClass = TreeSetAutomaton as typeof TreeSetAutomaton & (() => MyClass<any>);

        let obj: TreeSet<string> = new MyClass((a, b) => undefined);

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: TreeSet<string> = MyClass();

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


    test.skip('getFirstValue', () => {
        fail("TODO");
    });


    test.skip('getLastValue', () => {
        fail("TODO");
    });


    test('add', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        let x = obj.add(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as TreeSetAutomaton<string>).storage.anyKey()).toBe(value);
    });


    test('remove', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.remove(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test.skip('getLowerValue', () => {
        fail("TODO");
    });


    test.skip('getHigherValue', () => {
        fail("TODO");
    });


    test.skip('popFirst', () => {
        fail("TODO");
    });


    test.skip('popLast', () => {
        fail("TODO");
    });


    test.skip('clear', () => {
        fail("TODO");
    });


    test.skip('values', () => {
        fail("TODO");
    });


    test.skip('forEach', () => {
        fail("TODO");
    });


    test('entries', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
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
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
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


    test('length', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);

        expect(obj.length).toBe(0);

        obj.add("123");
        obj.add("456");

        expect(obj.length).toBe(2);

        obj.remove("123");

        expect(obj.length).toBe(1);
    });

});
