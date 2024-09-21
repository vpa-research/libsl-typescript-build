import { Queue } from "@ohos.util.Queue";
import { QueueAutomaton } from "../src/QueueAutomaton";


// test set itself

describe("Queue", () => {

    test('<ctor>', () => {
        let obj: Queue<string> = new QueueAutomaton();

        expect(obj).not.toBeNull();
        expect(obj.length).toBe(0);
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

        let iter = obj[Symbol.iterator]();
        obj.add(value);
        let x = iter.next().value;

        expect(x).toBe(value);
    });

});
