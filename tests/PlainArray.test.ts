import { PlainArray } from "@ohos.util.PlainArray";
import { PlainArrayAutomaton } from "../src/PlainArrayAutomaton";


// test set itself

describe("PlainArray", () => {

    test('<init>', () => {
        type MyClass<T> = PlainArrayAutomaton<T>;
        let MyClass = PlainArrayAutomaton as typeof PlainArrayAutomaton & (() => MyClass<any>);

        let obj: PlainArray<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: PlainArray<string> = MyClass();

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


    test.skip('get', () => {
        fail("TODO");
    });


    test.skip('getIndexOfKey', () => {
        fail("TODO");
    });


    test.skip('getIndexOfValue', () => {
        fail("TODO");
    });


    test.skip('getKeyAt', () => {
        fail("TODO");
    });


    test.skip('getValueAt', () => {
        fail("TODO");
    });


    test.skip('clone', () => {
        fail("TODO");
    });


    test('add', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton();
        let key = 5;
        let value = "test-value";

        obj.add(key, value);

        expect(obj.length).toBe(1);
        expect((obj as PlainArrayAutomaton<string>).keysStorage.get(0)).toBe(key);
        expect((obj as PlainArrayAutomaton<string>).valuesStorage.get(0)).toBe(value);
    });


    test('remove', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton();
        let key = 5;
        let value = "test-value";

        (obj as PlainArrayAutomaton<string>).keysStorage.insert(0, key);
        (obj as PlainArrayAutomaton<string>).valuesStorage.insert(0, value);
        let x = obj.remove(key);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('removeAt', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton();
        let key = 5;
        let value = "test-value";

        (obj as PlainArrayAutomaton<string>).keysStorage.insert(0, key);
        (obj as PlainArrayAutomaton<string>).valuesStorage.insert(0, value);
        let x = obj.removeAt(0);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test.skip('removeRangeFrom', () => {
        fail("TODO");
    });


    test.skip('setValueAt', () => {
        fail("TODO");
    });


    test.skip('toString', () => {
        fail("TODO");
    });


    test.skip('clear', () => {
        fail("TODO");
    });


    test.skip('forEach', () => {
        fail("TODO");
    });


    test('[Symbol.iterator]', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton();
        let key = 5;
        let value = "test-value";

        obj.add(key, value);
        let iter = obj[Symbol.iterator]();

        let x = iter.next();
        let y = iter.next();

        expect(x.done).toBeFalsy();
        expect(x.value).toStrictEqual([key, value]);
        expect(y.done).toBe(true);
        expect(y.value).toBeUndefined();
    });


    test('length', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton();

        expect(obj.length).toBe(0);

        obj.add(1, "123");
        obj.add(2, "456");

        expect(obj.length).toBe(2);

        obj.remove(1);

        expect(obj.length).toBe(1);
    });

});
