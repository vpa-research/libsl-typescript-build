// Generated by the LibSL translator.  DO NOT EDIT!
// sources:
//  - libsl/LSL_ListIterator.lsl:15
//  - libsl/LSL_ListIterator.main.lsl:38
//
import {LSL_IteratorResult} from './LSL_IteratorResult';
import {LSL_IteratorResultAutomaton} from './LSL_IteratorResultAutomaton';
import {LSL_ListIterator} from './LSL_ListIterator';
import {lsl$concepts} from './libsl_concepts_gen';
import {libsl} from './libsl_runtime';
import {Approximate} from '@org.jacodb.approximation.annotation';
import {Engine, SymbolicList} from '@org.usvm.api';


/**
 * LSL_ListIteratorAutomaton for LSL_ListIterator<T> ~> LSL_ListIterator@LSL_ListIterator */
@Approximate(/* value */ LSL_ListIterator)
export class LSL_ListIteratorAutomaton<T> {

    container: any = undefined;

    cursor: number = 0;

    /**
     * [FUNCTION] LSL_ListIteratorAutomaton::next(LSL_ListIterator<?::T>) -> IteratorResult<?::T>
     * Source: libsl/LSL_ListIterator.main.lsl:60 */
    next(): IteratorResult<T> {
        let result: IteratorResult<T> = libsl.ANYTHING;
        /* body */ {
            const items: SymbolicList<T> = (this.container as any as lsl$concepts.LSL_ListContainer<T>).storage;
            const pos: number = this.cursor;
            let isDone: boolean = true;
            let value: T | undefined = undefined;
            if (pos < items.size()) {
                Engine.assume(pos >= 0);
                this.cursor = pos + 1;
                value = items.get(pos);
                isDone = false;
            }
            let lsl$na0 = new LSL_IteratorResultAutomaton<T>();
            // lsl$na0.__$state = Initialized;
            lsl$na0.done = isDone;
            lsl$na0.value = value;
            result = lsl$na0 as any as LSL_IteratorResult<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] LSL_ListIteratorAutomaton::[Symbol.iterator](LSL_ListIterator<?::T>) -> IterableIterator<?::T>
     * Source: libsl/LSL_ListIterator.main.lsl:96 */
    [Symbol.iterator](): IterableIterator<T> {
        let result: IterableIterator<T> = libsl.ANYTHING;
        /* body */ {
            result = this;
        }
        return result;
    }

}
