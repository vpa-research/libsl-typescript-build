import { Deque } from "@ohos.util.Deque";
import { DequeAutomaton } from "../src/DequeAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("Deque", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


    test('<init>', () => {
        type MyClass<T> = DequeAutomaton<T>;
        let MyClass = DequeAutomaton as typeof DequeAutomaton & (() => MyClass<any>);

        let obj: Deque<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: Deque<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('insertFront', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        obj.insertFront(value);

        expect(obj.length).toBe(1);
        expect((obj as DequeAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('insertEnd', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        obj.insertEnd(value);

        expect(obj.length).toBe(1);
        expect((obj as DequeAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('has', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        obj.insertEnd(value);

        expect(obj.has(value)).toBe(true);
        expect(obj.has("non-existent-value")).toBe(false);
    });


    test('popFirst', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        (obj as DequeAutomaton<string>).storage.insert(0, value);
        let x = obj.popFirst();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('popLast', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        (obj as DequeAutomaton<string>).storage.insert(0, value);
        let x = obj.popLast();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('forEach', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let values = ["test-value1", "test-value2", "test-value3"];
        let results: string[] = [];

        obj.insertEnd(values[0]);
        obj.insertEnd(values[1]);
        obj.insertEnd(values[2]);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values);
    });


    test('getFirst', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        obj.insertEnd(value);

        expect(obj.getFirst()).toBe(value);
    });


    test('getLast', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        obj.insertEnd(value);

        expect(obj.getLast()).toBe(value);
    });


    test('[Symbol.iterator]', () => {
        let obj: Deque<string> = new DequeAutomaton();
        let value = "test-value";

        // JS Array has this behavior
        let iter = obj[Symbol.iterator]();
        obj.insertEnd(value);
        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('length', () => {
        let obj: Deque<string> = new DequeAutomaton();

        expect(obj.length).toBe(0);

        obj.insertEnd("123");
        obj.insertEnd("456");

        expect(obj.length).toBe(2);

        obj.popLast();

        expect(obj.length).toBe(1);
    });

});
