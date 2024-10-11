import { ArrayList } from "@ohos.util.ArrayList";
import { ArrayListAutomaton } from "../src/ArrayListAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("ArrayList", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }
    });


    test('<init>', () => {
        type MyClass<T> = ArrayListAutomaton<T>;
        let MyClass = ArrayListAutomaton as typeof ArrayListAutomaton & (() => MyClass<any>);

        let obj: ArrayList<string> = new MyClass();

        expect(obj.length).toBe(0);

        let failures = 0;
        try {
            let invalid: ArrayList<string> = MyClass();

            failures += 2;
            expect(invalid); // just here to keep it from being optimized-out
        } catch (e) {
            // ok
            failures += 1;
        }
        expect(failures).toBe(1);
    });


    test('add', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        let x = obj.add(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(1);
        expect((obj as ArrayListAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('insert', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        obj.insert(value, 0);

        expect(obj.length).toBe(1);
        expect((obj as ArrayListAutomaton<string>).storage.get(0)).toBe(value);
    });


    test('has', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";
        obj.add(value);

        let x = obj.has(value);

        expect(x).toBe(true);
    });


    test('getIndexOf', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";
        obj.add(value);

        let x = obj.getIndexOf(value);
        let y = obj.getIndexOf("something");

        expect(x).toBe(0);
        expect(y).toBe(-1);
    });


    test('getLastIndexOf', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";
        obj.add(value);

        let x = obj.getLastIndexOf(value);
        let y = obj.getLastIndexOf("something");

        expect(x).toBe(0);
        expect(y).toBe(-1);
    });


    test('removeByIndex', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        let x = obj.removeByIndex(0);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('remove', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        let x = obj.remove(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test('removeByRange', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let values = ["A", "B", "C"];
        values.forEach((value, index) => (obj as ArrayListAutomaton<string>).storage.insert(index, value));

        let start = 1;
        let end = 2;
        obj.removeByRange(start, end);

        expect(obj.length).toBe(2);
        expect((obj as ArrayListAutomaton<string>).storage.toString()).toBe("[A, C]");
    });


    test('replaceAllElements', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let oldValue = "old-value";
        let newValue = "new-value";

        obj.add(oldValue);
        obj.replaceAllElements((x: any) => newValue, undefined);

        expect(obj.length).toBe(1);
        expect((obj as ArrayListAutomaton<string>).storage.get(0)).toBe(newValue);
    });


    test('forEach', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let values = ["test-value1", "test-value2", "test-value3"];
        let results: string[] = [];

        obj.add(values[0]);
        obj.add(values[1]);
        obj.add(values[2]);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values);
    });


    test('sort', () => {
        let obj: ArrayList<number> = new ArrayListAutomaton();
        let values = [3, 1, 2];
        let results: number[] = [];

        obj.add(values[0]);
        obj.add(values[1]);
        obj.add(values[2]);

        obj.sort((a, b) => b - a);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values.sort((a, b) => b - a));
    });


    test('subArrayList', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let values = ["A", "B", "C", "D", "E"];
        values.forEach((v: string) => obj.add(v));

        let subList = obj.subArrayList(1, 3);

        expect(subList.length).toBe(2);
        expect(subList.get(0)).toBe("B");
        expect(subList.get(1)).toBe("C");
    });


    test('clear', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('clone', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        let clone = obj.clone();

        expect(clone.length).toBe(1);
        expect(clone.get(0)).toBe(value);
    });


    test('getCapacity', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        let x = obj.getCapacity();
        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        let y = obj.getCapacity();

        expect(x).toBe(0);
        expect(y).toBe(1);
    });


    test('convertToArray', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        let x = obj.convertToArray();

        expect(x).toStrictEqual([value]);
    });


    test('isEmpty', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        let x = obj.isEmpty();
        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        let y = obj.isEmpty();

        expect(x).toBe(true);
        expect(y).toBe(false);
    });


    test('increaseCapacityTo', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        obj.increaseCapacityTo(5);

        // NOTE: not applicable to the model
    });


    test('trimToCurrentLength', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";

        (obj as ArrayListAutomaton<string>).storage.insert(0, value);
        obj.trimToCurrentLength();

        // NOTE: not applicable to the model
    });


    test('get', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value = "test-value";
        (obj as ArrayListAutomaton<string>).storage.insert(0, value);

        let x = obj.get(0);

        expect(x).toBe(value);
    });


    test('set', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
        let value_old = "test-value-A";
        let value_new = "test-value-B";
        (obj as ArrayListAutomaton<string>).storage.insert(0, value_old);

        obj.set(0, value_new);

        expect((obj as ArrayListAutomaton<string>).storage.get(0)).toBe(value_new);
    });


    test('[Symbol.iterator]', () => {
        let obj: ArrayList<string> = new ArrayListAutomaton();
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
        let obj: ArrayList<string> = new ArrayListAutomaton();

        expect(obj.length).toBe(0);

        obj.add("123");
        obj.add("456");

        expect(obj.length).toBe(2);

        obj.removeByIndex(0);

        expect(obj.length).toBe(1);
    });

});
