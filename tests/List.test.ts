import { List } from "@ohos.util.List";
import { ListAutomaton } from "../src/ListAutomaton";


// test set itself

describe("List", () => {

    test('<init>', () => {
        type MyClass<T> = ListAutomaton<T>;
        let MyClass = ListAutomaton as typeof ListAutomaton & (() => MyClass<any>);

        let obj: List<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: List<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('add', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        let x = obj.add(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as ListAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('insert', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        obj.insert(0, value);

        expect(obj.length).toBe(1);
        expect((obj as ListAutomaton<string>).storage.get(0)).toBe(value);
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


    test.skip('equal', () => {
        fail("TODO");
    });


    test('removeByIndex', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        (obj as ListAutomaton<string>).storage.insert(0, value);
        let x = obj.removeByIndex(0);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test.skip('remove', () => {
        fail("TODO");
    });


    test.skip('replaceAllElements', () => {
        fail("TODO");
    });


    test.skip('forEach', () => {
        fail("TODO");
    });


    test.skip('sort', () => {
        fail("TODO");
    });


    test.skip('getSubList', () => {
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


    test.skip('isEmpty', () => {
        fail("TODO");
    });


    test.skip('getFirst', () => {
        fail("TODO");
    });


    test.skip('getLast', () => {
        fail("TODO");
    });


    test('[Symbol.iterator]', () => {
        let obj: List<string> = new ListAutomaton();
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
        let obj: List<string> = new ListAutomaton();

        expect(obj.length).toBe(0);

        obj.add("123");
        obj.add("456");

        expect(obj.length).toBe(2);

        obj.removeByIndex(0);

        expect(obj.length).toBe(1);
    });

});
