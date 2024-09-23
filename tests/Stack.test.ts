import { Stack } from "@ohos.util.Stack";
import { StackAutomaton } from "../src/StackAutomaton";


// test set itself

describe("Stack", () => {

    test('<ctor>', () => {
        type MyClass<T> = StackAutomaton<T>;
        let MyClass = StackAutomaton as typeof StackAutomaton & (() => MyClass<any>);

        let obj: Stack<string> = new MyClass();

        expect(obj.length).toBe(0);

        let errors = 0;
        try {
            let invalid: Stack<string> = MyClass();

            errors = 0;
            expect(invalid).not.toBeNull(); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            errors = 1;
        }
        expect(errors).toBe(1);
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

});
