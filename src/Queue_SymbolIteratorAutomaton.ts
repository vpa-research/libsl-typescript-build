// ???

import { QueueAutomaton } from "./QueueAutomaton";
import { Queue_SymbolIterator } from "./Queue_SymbolIterator";
import { Queue } from "./ohos/util/Queue";
import { Engine, SymbolicList } from "./org/usvm/api";

@org.jacodb.approximation.annotation.Approximate(Queue_SymbolIterator)
export class Queue_SymbolIteratorAutomaton<T> {
    public parent: Queue<T> = {} as Queue<T>;
    public cursor: number = 0;

    public __lsl_init($0: Queue<T>, $1: number): Queue_SymbolIterator<T> {
        this.parent = $0;
        this.cursor = $1;
        return this as any as Queue_SymbolIterator<T>;
    }

    public next (): T {
        let result = {} as T;
        {
            /* body */
            Engine.assume(this.parent !== null);
            let parentStorage: SymbolicList<T> = (this.parent as QueueAutomaton<T>).storage;
            let i: number = this.cursor;
            this.cursor = i + 1;
            result = parentStorage.get(i);
        }
        return result;
    }
}