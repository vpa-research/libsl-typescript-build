import { Queue } from "@ohos.util.Queue";
import { QueueAutomaton } from "../src/QueueAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("Queue", () => {

    test.skip('disabled-test-just-for-reference', () => {
        // nothing, this is just a reminder of how to use Jest testing framework
    });


    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }

        // common error message validation
        const testNameFull = expect.getState().currentTestName;
        if (testNameFull) {
            // the format is "Suite-name Case-name"
            const methodName = testNameFull.split(' ')[1];

            const obj = new QueueAutomaton();
            const method: Function = (obj as any)[methodName];
            if (method)
                expect(() => method.apply(null, [])).toThrow(`The ${methodName} method cannot be bound.`);
        }
    });


    test('<init>', () => {
        type MyClass<T> = QueueAutomaton<T>;
        let MyClass = QueueAutomaton as typeof QueueAutomaton & (() => MyClass<any>);

        let obj: Queue<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: Queue<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
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

        (obj as QueueAutomaton<string>).storage.insert(0, value);
        let x = obj.pop();

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('getFirst', () => {
        let obj: Queue<string> = new QueueAutomaton();
        let value = "test-value";

        (obj as QueueAutomaton<string>).storage.insert(0, value);
        let x = obj.getFirst();

        expect(x).toBe(value);
        expect(obj.length).toBe(1);
    });


    test('forEach', () => {
        let obj: Queue<string> = new QueueAutomaton();
        let value = "test-value";

        (obj as QueueAutomaton<string>).storage.insert(0, value);
        let forEachValue: string | null = null;
        obj.forEach((item) => {
            forEachValue = item;
        });

        expect(forEachValue).toBe(value);
        expect(obj.length).toBe(1);
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


    test('length', () => {
        let obj: Queue<string> = new QueueAutomaton();

        expect(obj.length).toBe(0);

        obj.add("123");
        obj.add("456");

        expect(obj.length).toBe(2);

        obj.pop();

        expect(obj.length).toBe(1);
    });

});
