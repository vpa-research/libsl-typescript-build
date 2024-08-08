/// ???

import { LSL_IteratorResult } from "./LSL_IteratorResult";
import { libsl } from "./libsl_runtime";
import { Approximate } from "@org.jacodb.approximation.annotation.Approximate";

@Approximate(LSL_IteratorResult)
export class LSL_IteratorResultAutomaton<T> {
    public done: boolean = false;
    public value: T = libsl.ANYTHING;

    // #question: is this a suitable approach?
    public static __lsl_new<T>($0: boolean, $1: T): LSL_IteratorResult<T> {
        // #problem: reflection?
        let auto = Object.create(this.prototype) as LSL_IteratorResultAutomaton<T>;
        auto.done = $0;
        auto.value = $1;
        return auto as any as LSL_IteratorResult<T>;
    }
}
