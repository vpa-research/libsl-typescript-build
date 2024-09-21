import { Queue } from "@ohos.util.Queue";
import { QueueAutomaton } from "../src/QueueAutomaton";


// test set itself

describe("Queue", () => {

    test.skip('disabled-test-just-for-reference', () => {
        expect(1).toBe(0);
    });


    test('<ctor>', () => {
        type MyClass<T> = QueueAutomaton<T>;
        let MyClass = QueueAutomaton as typeof QueueAutomaton & (() => MyClass<any>)

        let obj: Queue<string> = new MyClass<string>();

        expect(obj).not.toBeNull();
        expect(obj.length).toBe(0);

        try {
            let x: Queue<string> = MyClass();
            fail();

            expect(x.length).toBe(0); // just here to keep 'x' from being optimized-out
        } catch (e) {
            // ok
        }
    });


    test('add', () => {
        let obj: Queue<string> = new QueueAutomaton();
        let value = "test-value";

        let x = obj.add(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as QueueAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('pop', () => {
        let obj: Queue<string> = new QueueAutomaton();
        let value = "test-value";

        obj.add(value);
        let x = obj.pop();

        expect(obj.length).toBe(0);
        expect(x).toBe(value);
    });


    test('[Symbol.iterator]', () => {
        let obj: Queue<string> = new QueueAutomaton();
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

});
