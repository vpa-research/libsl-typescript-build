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

    public add (element: T): boolean {
        let result = false;
        {
            /* body */
            let msg: string = "The add method cannot be bound.";
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            this.storage.insert(this.storage.size(), element);
            result = true;
        }
        return result;
    }

    public pop (): T {
        let result = libsl.ANYTHING;
        {
            /* body */
            let msg: string = "The pop method cannot be bound.";
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            result = this.storage.get(0);
            this.storage.remove(0);
        }
        return result;
    }

    public getFirst (): T {
        let result = libsl.ANYTHING;
        {
            /* body */
            let msg: string = "The getFirst method cannot be bound.";
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            result = this.storage.get(0);
        }
        return result;
    }

    public forEach (callbackFn: (value: T, index?: number, queue?: Queue<T>) => void, thisArg?: Object): void {
        {
            /* body */
            let msg: string = "The forEach method cannot be bound.";
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
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
            let msg: string = "The Symbol.iterator method cannot be bound.";
            if (this instanceof Queue === false)
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            libsl.constructor_called_by_user = false;
            // #note: pass `libsl.ANYTHING as ...` for any parameters that required when calling the constructor
            let __lsl$auto_0 = new Queue_SymbolIteratorAutomaton<T>();
            libsl.constructor_called_by_user = true;
            __lsl$auto_0.parent = this;
            __lsl$auto_0.cursor = 0;
            result = __lsl$auto_0 as any as Queue_SymbolIterator<T>;
        }
        return result;
    }
}
