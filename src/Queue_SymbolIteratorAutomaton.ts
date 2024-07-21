// ???

import { QueueAutomaton } from "./QueueAutomaton";
import { Queue_SymbolIterator } from "./Queue_SymbolIterator";
import { libsl } from "./libsl_runtime";
import { Queue } from "./ohos/util/Queue";
import { Engine, SymbolicList } from "./org/usvm/api";

@org.jacodb.approximation.annotation.Approximate(Queue_SymbolIterator)
export class Queue_SymbolIteratorAutomaton<T> {
    public parent: Queue<T>;
    public cursor: number;

    public constructor(_: libsl.TOKEN, lsl$0: Queue<T>, lsl$1: number);
    public constructor(_?: libsl.TOKEN, lsl$0?: Queue<T>, lsl$1?: number) {
        this.parent = lsl$0 || {} as Queue<T>;
        this.cursor = lsl$1 || 0;
    }

    public next (): T {
        let result = {} as T;
        {
            Engine.assume(this.parent !== null);
            let parentStorage: SymbolicList<T> = (this.parent as QueueAutomaton<T>).storage;
            let i: number = this.cursor;
            this.cursor = i + 1;
            result = parentStorage.get(i);
        }
        return result;
    }
}