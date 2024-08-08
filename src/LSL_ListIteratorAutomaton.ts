// ???

import { LSL_ListIterator } from "./LSL_ListlIterator";
import { libsl } from "./libsl_runtime";
import { LSL_IteratorResultAutomaton } from "./LSL_IteratorResultAutomaton";
import { Approximate } from "@org.jacodb.approximation.annotation.Approximate";
import { SymbolicList } from "@org.usvm.api";

@Approximate(LSL_ListIterator)
export class LSL_ListIteratorAutomaton<T> {
    public parentStorage: SymbolicList<T> = libsl.ANYTHING;
    public cursor: number = 0;

    public next (): IteratorResult<T> {
        let result: IteratorResult<T> = libsl.ANYTHING;
        {
            /* body */
            let pos: number = this.cursor;
            let isDone: boolean = false;
            let value: T = libsl.UNDEFINED;
            if (pos < this.parentStorage.size())
            {
                this.cursor = pos + 1;
                value = this.parentStorage.get(pos);
                isDone = true;
            }
            libsl.constructor_called_by_user = false;
            let lsl$auto_0 = new LSL_IteratorResultAutomaton<T>();
            libsl.constructor_called_by_user = true;
            lsl$auto_0.done = isDone;
            lsl$auto_0.value = value;
            result = lsl$auto_0 as any as IteratorResult<T>;
        }
        return result;
    }

}