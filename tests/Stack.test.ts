import { Stack } from "@ohos.util.Stack";
import { StackAutomaton } from "../src/StackAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("Stack", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


    test('<init>', () => {
        type MyClass<T> = StackAutomaton<T>;
        let MyClass = StackAutomaton as typeof StackAutomaton & (() => MyClass<any>);

        let obj: Stack<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: Stack<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('push', () => {
        let obj: Stack<string> = new StackAutomaton();
        let value = "test-value";

        let x = obj.push(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as StackAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('pop', () => {
        let obj: Stack<string> = new StackAutomaton();
        let value = "test-value";

        (obj as StackAutomaton<string>).storage.insert(0, value);
        let x = obj.pop();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('peek', () => {
        let obj: Stack<string> = new StackAutomaton();
        let value = "test-value";

        expect(obj.peek()).toBeUndefined();

        (obj as StackAutomaton<string>).storage.insert(0, value);

        expect(obj.peek()).toBe(value);
        expect(obj.length).toBe(1);
    });


    test('locate', () => {
        let obj: Stack<string> = new StackAutomaton();
        let values = ["A", "B", "C"];

        obj.push(values[0]);
        obj.push(values[1]);
        obj.push(values[2]);

        let x = obj.locate(values[1]);

        expect(x).toBe(1);
    });


    test('forEach', () => {
        let obj: Stack<string> = new StackAutomaton();
        let values = ["A", "B", "C"];
        let results: string[] = [];

        obj.push(values[0]);
        obj.push(values[1]);
        obj.push(values[2]);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values);
    });


    test('[Symbol.iterator]', () => {
        let obj: Stack<string> = new StackAutomaton();
        let value = "test-value";

        // JS Array has this behavior
        let iter = obj[Symbol.iterator]();
        obj.push(value);
        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toBe(value);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('length', () => {
        let obj: Stack<string> = new StackAutomaton();

        expect(obj.length).toBe(0);

        obj.push("123");
        obj.push("456");

        expect(obj.length).toBe(2);

        obj.pop();

        expect(obj.length).toBe(1);
    });

});
