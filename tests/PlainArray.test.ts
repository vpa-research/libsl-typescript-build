import { PlainArray } from "@ohos.util.PlainArray";
import { PlainArrayAutomaton } from "../src/PlainArrayAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("PlainArray", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


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


    test('isEmpty', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        expect(obj.isEmpty()).toBe(true);

        obj.add(1, "test-value");
        expect(obj.isEmpty()).toBe(false);
    });


    test('has', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        obj.add(1, "test-value");
        expect(obj.has(1)).toBe(true);

        obj.remove(1);
        expect(obj.has(1)).toBe(false);
    });


    test('get', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        obj.add(1, "test-value");
        expect(obj.get(1)).toBe("test-value");

        obj.remove(1);
        expect(obj.get(1)).toBeUndefined();
    });


    test('getIndexOfKey', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        obj.add(1, "test-value");
        obj.add(2, "another-value");
        expect(obj.getIndexOfKey(1)).toBe(0);
        expect(obj.getIndexOfKey(2)).toBe(1);

        obj.remove(1);
        expect(obj.getIndexOfKey(1)).toBe(-1);
    });


    test('getIndexOfValue', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();
        let value: string = "test-value";

        obj.add(1, value);
        let index: number = obj.getIndexOfValue(value);
        expect(index).toBe(0);

        obj.remove(1);
        let newIndex: number = obj.getIndexOfValue(value);
        expect(newIndex).toBe(-1);
    });


    test('getKeyAt', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        obj.add(1, "test-value");
        obj.add(2, "another-value");

        expect(obj.getKeyAt(0)).toBe(1);
        expect(obj.getKeyAt(1)).toBe(2);

        obj.remove(1);
        expect(obj.getKeyAt(0)).toBe(2);
    });


    test('getValueAt', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        obj.add(1, "test-value");
        expect(obj.getValueAt(0)).toBe("test-value");

        obj.remove(1);
        expect(obj.getValueAt(0)).toBeUndefined();
    });


    test('clone', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();
        obj.add(1, "test-value");
        obj.add(2, "another-value");

        let clone = obj.clone();

        expect(clone.length).toBe(2);
        expect(clone.get(1)).toBe("test-value");
        expect(clone.get(2)).toBe("another-value");

        obj.remove(1);
        expect(clone.get(1)).toBe("test-value");
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


    test('removeRangeFrom', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();

        obj.add(1, "A");
        obj.add(2, "B");
        obj.add(3, "C");
        obj.add(4, "D");
        obj.add(5, "E");

        obj.removeRangeFrom(2, 3);

        expect(obj.getIndexOfKey(3)).toBe(-1);
        expect(obj.getIndexOfKey(4)).toBe(-1);
        expect(obj.getIndexOfKey(5)).toBe(-1);
        expect(obj.length).toBe(2);
        expect(obj.get(1)).toBe("A");
        expect(obj.get(2)).toBe("B");
    });


    test('setValueAt', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton();
        let key = 5;
        let value_old = "test-value";
        let value_new = "new-value";

        obj.add(key, value_old);
        obj.setValueAt(0, value_new);

        expect(obj.length).toBe(1);
        expect((obj as PlainArrayAutomaton<string>).valuesStorage.get(0)).toBe(value_new);
    });


    test('toString', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();
        obj.add(1, "test-value");
        obj.add(2, "another-value");

        let expectedString: string = "1:test-value,2:another-value";
        expect(obj.toString()).toBe(expectedString);
    });


    test('clear', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();
        obj.add(1, "test-value");
        obj.add(2, "another-value");

        obj.clear();

        expect(obj.length).toBe(0);
        expect(obj.get(1)).toBeUndefined();
        expect(obj.get(2)).toBeUndefined();
    });


    test('forEach', () => {
        let obj: PlainArray<string> = new PlainArrayAutomaton<string>();
        obj.add(1, "test-value");
        obj.add(2, "another-value");
        let result: string[] = [];

        obj.forEach((v, k) => result.push(`${k}: ${v}`));

        expect(result).toEqual(["1: test-value", "2: another-value"]);
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
