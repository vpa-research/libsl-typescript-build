import { LinkedList } from "@ohos.util.LinkedList";
import { LinkedListAutomaton } from "../src/LinkedListAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("LinkedList", () => {

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

            const obj = new LinkedListAutomaton();
            const method: Function = (obj as any)[methodName];
            if (method)
                expect(() => method.apply(null, [])).toThrow(`The ${methodName} method cannot be bound.`);
        }
    });


    test('<init>', () => {
        type MyClass<T> = LinkedListAutomaton<T>;
        let MyClass = LinkedListAutomaton as typeof LinkedListAutomaton & (() => MyClass<any>);

        let obj: LinkedList<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: LinkedList<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('add', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        let x = obj.add(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as LinkedListAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('addFirst', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        obj.addFirst(value);

        expect(obj.length).toBe(1);
        expect((obj as LinkedListAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('insert', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        obj.insert(0, value);

        expect(obj.length).toBe(1);
        expect((obj as LinkedListAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('has', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        obj.add(value);

        let x = obj.has(value);

        expect(x).toBe(true);
    });


    test('get', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.get(0);

        expect(x).toBe(value);
    });


    test('getLastIndexOf', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let target = "A";
        let values = ["A", "B", "A"];
        values.forEach((v, i) => (obj as LinkedListAutomaton<string>).storage.insert(i, v));

        let x = obj.getLastIndexOf(target);

        expect(x).toBe(2);
    });


    test('getIndexOf', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let target = "A";
        let values = ["A", "B", "A"];
        values.forEach((v, i) => (obj as LinkedListAutomaton<string>).storage.insert(i, v));

        let x = obj.getIndexOf(target);

        expect(x).toBe(0);
    });


    test('removeByIndex', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.removeByIndex(0);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('removeFirst', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.removeFirst();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('removeLast', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.removeLast();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('remove', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.remove(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test('removeFirstFound', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.removeFirstFound(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test('removeLastFound', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value);

        let x = obj.removeLastFound(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test('clone', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        (obj as LinkedListAutomaton<string>).storage.insert(0, value);
        let clone = obj.clone();

        expect(clone.length).toBe(1);
        expect(clone.get(0)).toBe(value);
    });


    test('forEach', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let values = ["test-value1", "test-value2", "test-value3"];
        let results: string[] = [];

        obj.add(values[0]);
        obj.add(values[1]);
        obj.add(values[2]);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values);
    });


    test('clear', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        (obj as LinkedListAutomaton<string>).storage.insert(0, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('set', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value_old = "test-value-A";
        let value_new = "test-value-B";
        (obj as LinkedListAutomaton<string>).storage.insert(0, value_old);

        obj.set(0, value_new);

        expect((obj as LinkedListAutomaton<string>).storage.get(0)).toBe(value_new);
    });


    test('convertToArray', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        (obj as LinkedListAutomaton<string>).storage.insert(0, value);
        let x = obj.convertToArray();

        expect(x).toStrictEqual([value]);
    });


    test('getFirst', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let values = ["A", "B"];
        values.forEach((v, i) => (obj as LinkedListAutomaton<string>).storage.insert(i, v));

        let x = obj.getFirst();

        expect(x).toBe(values[0]);
    });


    test('getLast', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let values = ["A", "B"];
        values.forEach((v, i) => (obj as LinkedListAutomaton<string>).storage.insert(i, v));

        let x = obj.getLast();

        expect(x).toBe(values[1]);
    });


    test('[Symbol.iterator]', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();
        let value = "test-value";

        // JS Array has this behavior
        let iter = obj[Symbol.iterator]();
        obj.add(value);
        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('length', () => {
        let obj: LinkedList<string> = new LinkedListAutomaton();

        expect(obj.length).toBe(0);

        obj.add("123");
        obj.add("456");

        expect(obj.length).toBe(2);

        obj.removeFirst();

        expect(obj.length).toBe(1);
    });

});
