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


    test.skip('addFirst', () => {
        fail("TODO");
    });


    test.skip('insert', () => {
        fail("TODO");
    });


    test.skip('has', () => {
        fail("TODO");
    });


    test.skip('get', () => {
        fail("TODO");
    });


    test.skip('getLastIndexOf', () => {
        fail("TODO");
    });


    test.skip('getIndexOf', () => {
        fail("TODO");
    });


    test.skip('removeByIndex', () => {
        fail("TODO");
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


    test.skip('remove', () => {
        fail("TODO");
    });


    test.skip('removeFirstFound', () => {
        fail("TODO");
    });


    test.skip('removeLastFound', () => {
        fail("TODO");
    });


    test.skip('clone', () => {
        fail("TODO");
    });


    test.skip('forEach', () => {
        fail("TODO");
    });


    test.skip('clear', () => {
        fail("TODO");
    });


    test.skip('set', () => {
        fail("TODO");
    });


    test.skip('convertToArray', () => {
        fail("TODO");
    });


    test.skip('getFirst', () => {
        fail("TODO");
    });


    test.skip('getLast', () => {
        fail("TODO");
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
