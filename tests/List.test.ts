import { List } from "@ohos.util.List";
import { ListAutomaton } from "../src/ListAutomaton";
import { libsl } from "../src/libsl_runtime";


// test set itself

describe("List", () => {

    afterEach(() => {
        try {
            expect(libsl.constructor_called_by_user).toBe(true);
        } finally {
            libsl.constructor_called_by_user = true;
        }

        // common error message validation
        const testNameFull = expect.getState().currentTestName;
        if (testNameFull) {
            const methodName = testNameFull.split(' ')[1];

            const obj = new ListAutomaton();
            const method: Function = (obj as any)[methodName];
            if (method)
                expect(() => method.apply(null, [])).toThrow(`The ${methodName} method cannot be bound.`);
        }
    });


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


    test('has', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";
        obj.add(value);

        let x = obj.has(value);

        expect(x).toBe(true);
    });


    test('get', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";
        (obj as ListAutomaton<string>).storage.insert(0, value);

        let x = obj.get(0);

        expect(x).toBe(value);
    });


    test('getLastIndexOf', () => {
        let obj: List<string> = new ListAutomaton();
        let target = "A";
        let values = ["A", "B", "A"];
        values.forEach((v, i) => (obj as ListAutomaton<string>).storage.insert(i, v));

        let x = obj.getLastIndexOf(target);

        expect(x).toBe(2);
    });


    test('getIndexOf', () => {
        let obj: List<string> = new ListAutomaton();
        let target = "A";
        let values = ["A", "B", "A"];
        values.forEach((v, i) => (obj as ListAutomaton<string>).storage.insert(i, v));

        let x = obj.getIndexOf(target);

        expect(x).toBe(0);
    });


    test('equal', () => {
        let a: List<string> = new ListAutomaton();
        let b: List<string> = new ListAutomaton();
        let value = "test-value";
        a.add(value);
        b.add(value);

        let x = a.equal(b);

        expect(x).toBe(true);
    });


    test('removeByIndex', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        (obj as ListAutomaton<string>).storage.insert(0, value);
        let x = obj.removeByIndex(0);

        expect(x).toBe(value);
        expect(obj.length).toBe(0);
    });


    test('remove', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";
        (obj as ListAutomaton<string>).storage.insert(0, value);

        let x = obj.remove(value);

        expect(x).toBe(true);
        expect(obj.length).toBe(0);
    });


    test('replaceAllElements', () => {
        let obj: List<string> = new ListAutomaton();
        let oldValue = "old-value";
        let newValue = "new-value";

        obj.add(oldValue);
        obj.replaceAllElements((x: any) => newValue, undefined);

        expect(obj.length).toBe(1);
        expect((obj as ListAutomaton<string>).storage.get(0)).toBe(newValue);
    });


    test('forEach', () => {
        let obj: List<string> = new ListAutomaton();
        let values = ["test-value1", "test-value2", "test-value3"];
        let results: string[] = [];

        obj.add(values[0]);
        obj.add(values[1]);
        obj.add(values[2]);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values);
    });


    test('sort', () => {
        let obj: List<number> = new ListAutomaton();
        let values = [3, 1, 2];
        let results: number[] = [];

        obj.add(values[0]);
        obj.add(values[1]);
        obj.add(values[2]);

        obj.sort((a, b) => b - a);

        obj.forEach((value) => results.push(value));

        expect(results).toStrictEqual(values.sort((a, b) => b - a));
    });


    test('getSubList', () => {
        let obj: List<string> = new ListAutomaton();
        let values = ["A", "B", "C", "D", "E"];
        values.forEach((v: string) => obj.add(v));

        let subList = obj.getSubList(1, 3);

        expect(subList.length).toBe(2);
        expect(subList.get(0)).toBe("B");
        expect(subList.get(1)).toBe("C");
    });


    test('clear', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        (obj as ListAutomaton<string>).storage.insert(0, value);
        obj.clear();

        expect(obj.length).toBe(0);
    });


    test('set', () => {
        let obj: List<string> = new ListAutomaton();
        let value_old = "test-value-A";
        let value_new = "test-value-B";
        (obj as ListAutomaton<string>).storage.insert(0, value_old);

        obj.set(0, value_new);

        expect((obj as ListAutomaton<string>).storage.get(0)).toBe(value_new);
    });


    test('convertToArray', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        (obj as ListAutomaton<string>).storage.insert(0, value);
        let x = obj.convertToArray();

        expect(x).toStrictEqual([value]);
    });


    test('isEmpty', () => {
        let obj: List<string> = new ListAutomaton();
        let value = "test-value";

        let x = obj.isEmpty();
        (obj as ListAutomaton<string>).storage.insert(0, value);
        let y = obj.isEmpty();

        expect(x).toBe(true);
        expect(y).toBe(false);
    });


    test('getFirst', () => {
        let obj: List<string> = new ListAutomaton();
        let values = ["A", "B"];
        values.forEach((v, i) => (obj as ListAutomaton<string>).storage.insert(i, v));

        let x = obj.getFirst();

        expect(x).toBe(values[0]);
    });


    test('getLast', () => {
        let obj: List<string> = new ListAutomaton();
        let values = ["A", "B"];
        values.forEach((v, i) => (obj as ListAutomaton<string>).storage.insert(i, v));

        let x = obj.getLast();

        expect(x).toBe(values[1]);
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
