// ???

import { Queue_SymbolIterator } from "./Queue_SymbolIterator";
import { Queue_SymbolIteratorAutomaton } from "./Queue_SymbolIteratorAutomaton";
import { libsl } from "./libsl_runtime";
import { Queue } from "./ohos/util/Queue";
import { Engine, SymbolicList } from "./org/usvm/api";

@org.jacodb.approximation.annotation.Approximate(Queue)
export class QueueAutomaton<T> {
    public storage: SymbolicList<T>;

    public constructor (_: libsl.TOKEN, lsl$0: SymbolicList<T>);
    public constructor ();
    public constructor (_?: libsl.TOKEN, lsl$0?: SymbolicList<T> /* note: just join params from both signatures here with "?" */) {
        this.storage = lsl$0 || {} as SymbolicList<T>;
        {
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200012, "The Queue's constructor cannot be directly invoked.");
            this.storage = Engine.makeSymbolicList();
        }
    }

    public _unlinkAny (index: number): T {
        let result = {} as T;
        {
            result = this.storage.get(index);
            this.storage.remove(index);
        }
        return result;
    }

    private _unlinkFirst (): T {
        let result = {} as T;
        {
            result = this._unlinkAny(0);
        }
        return result;
    }

    public _isBoundCorrect (msg: string): void {
        if (this instanceof Queue === false)
            throw libsl.new_ERROR("BusinessError", 10200011, msg);
    }


    public add (element: T): boolean {
        let result = false;
        {
            this._isBoundCorrect("The add method cannot be bound.");
            this.storage.insert(this.storage.size(), element);
            result = true;
        }
        return result;
    }

    public pop (): T {
        let result = {} as T;
        {
            this._isBoundCorrect("The pop method cannot be bound.");
            result = this._unlinkFirst();
        }
        return result;
    }

    public getFirst (): T {
        let result = {} as T;
        {
            this._isBoundCorrect("The getFirst method cannot be bound.");
            result = this.storage.get(0);
        }
        return result;
    }

    public forEach (callbackFn: (value: T, index?: number, queue?: Queue<T>) => number, thisArg?: Object): void {
        {
            this._isBoundCorrect("The forEach method cannot be bound.");
            var i: number = 0;
            while (i < this.storage.size()) {
                let item: T = this.storage.get(i);
                callbackFn.call(thisArg, item, i, this);
                i += 1;
            }
        }
    }

    public [Symbol.iterator] (): Queue_SymbolIterator<T> {
        let result = {} as Queue_SymbolIterator<T>;
        {
            this._isBoundCorrect("The Symbol.iterator method cannot be bound.");
            result = new Queue_SymbolIteratorAutomaton<T>(libsl.TOKEN, this, 0) as Queue_SymbolIterator<T>;
        }
        return result;
    }
}
