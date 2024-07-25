// ???

import { QueueAutomaton } from "./QueueAutomaton";
import { Queue_SymbolIterator } from "./Queue_SymbolIterator";
import { libsl } from "./libsl_runtime";
import { Queue } from "./ohos/util/Queue";
import { Approximate } from "./org/jacodb/approximation/annotation/Approximate";
import { Engine, SymbolicList } from "./org/usvm/api";

@Approximate(Queue_SymbolIterator)
export class Queue_SymbolIteratorAutomaton<T> {
    public parent: Queue<T> = libsl.ANYTHING;
    public cursor: number = 0;

    public next (): T {
        let result = libsl.ANYTHING;
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

    // #question: is this a suitable approach?
    public static __lsl_new<T>($0: Queue<T>, $1: number): Queue_SymbolIterator<T> {
        // #problem: reflection?
        let auto = Object.create(this.prototype) as Queue_SymbolIteratorAutomaton<T>;
        auto.parent = $0;
        auto.cursor = $1;
        return auto as any as Queue_SymbolIterator<T>;
    }
}