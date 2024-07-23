// ???

import { Queue_SymbolIterator } from "./Queue_SymbolIterator";
import { Queue_SymbolIteratorAutomaton } from "./Queue_SymbolIteratorAutomaton";
import { libsl } from "./libsl_runtime";
import { Queue } from "./ohos/util/Queue";
import { Engine, SymbolicList } from "./org/usvm/api";

@org.jacodb.approximation.annotation.Approximate(Queue)
export class QueueAutomaton<T> {
    public storage: SymbolicList<T> = libsl.ANYTHING;

    public constructor () {
        if (libsl.constructor_called_by_user) {
            /* body */
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200012, "The Queue's constructor cannot be directly invoked.");
            this.storage = Engine.makeSymbolicList();
        }
    }

    public _unlinkAny (index: number): T {
        let result = libsl.ANYTHING;
        {
            /* body */
            result = this.storage.get(index);
            this.storage.remove(index);
        }
        return result;
    }

    private _unlinkFirst (): T {
        let result = libsl.ANYTHING;
        {
            /* body */
            result = this._unlinkAny(0);
        }
        return result;
    }

    public _isBoundCorrect (msg: string): void {
        {
            /* body */
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
        }
    }


    public add (element: T): boolean {
        let result = false;
        {
            /* body */
            this._isBoundCorrect("The add method cannot be bound.");
            this.storage.insert(this.storage.size(), element);
            result = true;
        }
        return result;
    }

    public pop (): T {
        let result = libsl.ANYTHING;
        {
            /* body */
            this._isBoundCorrect("The pop method cannot be bound.");
            result = this._unlinkFirst();
        }
        return result;
    }

    public getFirst (): T {
        let result = libsl.ANYTHING;
        {
            /* body */
            this._isBoundCorrect("The getFirst method cannot be bound.");
            result = this.storage.get(0);
        }
        return result;
    }

    public forEach (callbackFn: (value: T, index?: number, queue?: Queue<T>) => void, thisArg?: Object): void {
        {
            /* body */
            this._isBoundCorrect("The forEach method cannot be bound.");
            let size: number = this.storage.size();
            let i: number = 0;
            for (; i < size; i += 1) {
                let item: T = this.storage.get(i);
                callbackFn.call(thisArg, item, i, this);
            }
        }
    }

    public [Symbol.iterator] (): Queue_SymbolIterator<T> {
        let result = libsl.ANYTHING;
        {
            /* body */
            this._isBoundCorrect("The Symbol.iterator method cannot be bound.");
            libsl.constructor_called_by_user = false;
            // #note: pass `libsl.ANYTHING as ...` for any parameters that required when calling the constructor
            let __lsl$auto_0 = new Queue_SymbolIteratorAutomaton<T>();
            __lsl$auto_0.parent = this;
            __lsl$auto_0.cursor = 0;
            libsl.constructor_called_by_user = true;
            result = __lsl$auto_0 as any as Queue_SymbolIterator<T>;
        }
        return result;
    }
}
