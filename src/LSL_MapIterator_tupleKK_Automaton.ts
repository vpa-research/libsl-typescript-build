// Generated by the LibSL translator.  DO NOT EDIT!
// sources:
//  - libsl/LSL_MapIterator.lsl:35
//  - libsl/LSL_MapIterator_tupleKK.main.lsl:18
//
import {LSL_IteratorResult} from './LSL_IteratorResult';
import {LSL_IteratorResultAutomaton} from './LSL_IteratorResultAutomaton';
import {LSL_MapIterator_tupleKK} from './LSL_MapIterator_tupleKK';
import {libsl} from './libsl_runtime';
import {Approximate} from '@org.jacodb.approximation.annotation';


/**
 * LSL_MapIterator_tupleKK_Automaton for LSL_MapIterator_tupleKK<K> ~> LSL_MapIterator_tupleKK@LSL_MapIterator_tupleKK */
@Approximate(/* value */ LSL_MapIterator_tupleKK)
export class LSL_MapIterator_tupleKK_Automaton<K> {

    unseen: libsl.LSLMap<K, any> = libsl.ANYTHING;

    /**
     * [FUNCTION] LSL_MapIterator_tupleKK_Automaton::next(LSL_MapIterator_tupleKK<?::K>) -> IteratorResult<tuple<?::K, ?::K>>
     * Source: libsl/LSL_MapIterator_tupleKK.main.lsl:36 */
    next(): IteratorResult<[K, K]> {
        let result: IteratorResult<[K, K]> = libsl.ANYTHING;
        /* body */ {
            let iteratorDone: boolean = true;
            let iteratorValue: [K, K] | undefined = undefined;
            if (this.unseen.size() !== 0) {
                const key: K = this.unseen.anyKey();
                this.unseen.remove(key);
                iteratorDone = false;
                iteratorValue = [ key, key ];
            }
            let lsl$na0 = new LSL_IteratorResultAutomaton<[K, K]>();
            // lsl$na0.__$state = Initialized;
            lsl$na0.value = iteratorValue;
            lsl$na0.done = iteratorDone;
            result = lsl$na0 as any as LSL_IteratorResult<[K, K]>;
        }
        return result;
    }

    /**
     * [FUNCTION] LSL_MapIterator_tupleKK_Automaton::[Symbol.iterator](LSL_MapIterator_tupleKK<?::K>) -> IterableIterator<tuple<?::K, ?::K>>
     * Source: libsl/LSL_MapIterator_tupleKK.main.lsl:57 */
    [Symbol.iterator](): IterableIterator<[K, K]> {
        let result: IterableIterator<[K, K]> = libsl.ANYTHING;
        /* body */ {
            result = this;
        }
        return result;
    }

}
