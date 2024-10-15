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

        // common error message validation
        const testNameFull = expect.getState().currentTestName;
        if (testNameFull) {
            const methodName = testNameFull.split(' ')[1];

            const obj = new TreeSetAutomaton((a, b) => undefined);
            const method: Function = (obj as any)[methodName];
            if (method)
                expect(() => method.apply(null, [])).toThrow(`The ${methodName} method cannot be bound.`);
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


    test('isEmpty', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        expect(obj.isEmpty()).toBe(true);

        (obj as TreeSetAutomaton<string>).storage.set(value, value);

        expect(obj.isEmpty()).toBe(false);
    });


    test('has', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.has(value);

        expect(x).toBe(true);
    });


    test('getFirstValue', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.getFirstValue();

        expect(x).toBe(value);
    });


    test('getLastValue', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.getLastValue();

        expect(x).toBe(value);
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


    test('getLowerValue', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.getLowerValue();

        expect(x).toBe(value);
        // NOTE: not applicable to the model
    });


    test('getHigherValue', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.getHigherValue();

        expect(x).toBe(value);
        // NOTE: not applicable to the model
    });


    test('popFirst', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.popFirst();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('popLast', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        let x = obj.popLast();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('clear', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
        let value = "test-value";

        (obj as TreeSetAutomaton<string>).storage.set(value, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('values', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
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


    test('forEach', () => {
        let obj: TreeSet<string> = new TreeSetAutomaton((a, b) => undefined);
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
