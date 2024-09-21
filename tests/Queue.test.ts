// preparations

jest.mock("@ohos.util.Queue", () => ({
    Queue: class {
        static [Symbol.hasInstance](other: any): boolean {
            let name: string = other.constructor.name;
            return name.startsWith("Queue");
        }
    }
}), { virtual: true });


// actual import

import { Queue } from "@ohos.util.Queue";
import { QueueAutomaton } from "../src/QueueAutomaton";


// test set itself

describe("queue", () => {
    test('initialization', () => {
        let x: Queue<string> = new QueueAutomaton();

        expect(x).not.toBeNull();
    });

    test('default size', () => {
        let x: Queue<string> = new QueueAutomaton();

        expect(x.length).toBe(0);
    });
});

