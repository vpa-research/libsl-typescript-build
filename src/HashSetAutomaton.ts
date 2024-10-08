// Generated by the LibSL translator.  DO NOT EDIT!
// sources:
//  - ohos/util/HashSet.lsl:15
//  - ohos/util/HashSet.main.lsl:18
//
import {LSL_MapIterator_K} from './LSL_MapIterator_K';
import {LSL_MapIterator_K_Automaton} from './LSL_MapIterator_K_Automaton';
import {LSL_MapIterator_tupleKK} from './LSL_MapIterator_tupleKK';
import {LSL_MapIterator_tupleKK_Automaton} from './LSL_MapIterator_tupleKK_Automaton';
import {libsl} from './libsl_runtime';
import {HashSet} from '@ohos.util.HashSet';
import {Approximate} from '@org.jacodb.approximation.annotation';
import {Engine} from '@org.usvm.api';


/**
 * HashSetAutomaton for HashSet<T> ~> HashSet@@ohos.util.HashSet */
@Approximate(/* value */ HashSet)
export class HashSetAutomaton<T> {

    storage: libsl.LSLMap<T, T> = libsl.ANYTHING;

    public constructor() {
        if (libsl.constructor_called_by_user) {
            // body
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200012, "The HashSet\'s constructor cannot be directly invoked.");
            }
            this.storage = new libsl.LSLMap(new libsl.HashMapContainer());
        }
    }

    /**
     * [FUNCTION] HashSetAutomaton::isEmpty(HashSet<?::T>) -> boolean
     * Source: ohos/util/HashSet.main.lsl:73 */
    isEmpty(): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The isEmpty method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.size() === 0;
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::has(HashSet<?::T>, ?::T) -> boolean
     * Source: ohos/util/HashSet.main.lsl:82 */
    has(value: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The has method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                result = false;
            }
            else {
                result = this.storage.hasKey(value);
            }
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::add(HashSet<?::T>, ?::T) -> boolean
     * Source: ohos/util/HashSet.main.lsl:94 */
    add(value: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The add method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.hasKey(value)) {
                result = false;
            }
            else {
                this.storage.set(value, value);
                result = true;
            }
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::remove(HashSet<?::T>, ?::T) -> boolean
     * Source: ohos/util/HashSet.main.lsl:111 */
    remove(value: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The remove method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.hasKey(value);
            if (result) {
                this.storage.remove(value);
            }
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::clear(HashSet<?::T>) -> void
     * Source: ohos/util/HashSet.main.lsl:122 */
    clear() {
        /* body */ {
            let msg: string = "The clear method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage = new libsl.LSLMap(new libsl.HashMapContainer());
        }
    }

    /**
     * [FUNCTION] HashSetAutomaton::forEach(HashSet<?::T>, HashSet_Callback<?::T>, Object) -> void
     * Source: ohos/util/HashSet.main.lsl:131 */
    forEach(callbackFn: (value?: T, key?: T, instance?: HashSet<T>) => void, thisArg?: Object) {
        /* body */ {
            let msg: string = "The forEach method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let storageSize: number = this.storage.size();
            if (storageSize !== 0) {
                Engine.assume(storageSize > 0);
                let unseen: libsl.LSLMap<T, any> = this.storage.duplicate();
                while (storageSize !== 0) {
                    let value: T = unseen.anyKey();
                    callbackFn.call(thisArg, value, value, this);
                    unseen.remove(value);
                    storageSize -= 1;
                }
            }
        }
    }

    /**
     * [FUNCTION] HashSetAutomaton::entries(HashSet<?::T>) -> IterableIterator<tuple<?::T, ?::T>>
     * Source: ohos/util/HashSet.main.lsl:164 */
    entries(): IterableIterator<[T, T]> {
        let result: IterableIterator<[T, T]> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The entries method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let lsl$na0 = new LSL_MapIterator_tupleKK_Automaton<T>();
            // lsl$na0.__$state = Initialized;
            lsl$na0.unseen = this.storage.duplicate();
            result = lsl$na0 as any as LSL_MapIterator_tupleKK<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::[Symbol.iterator](HashSet<?::T>) -> IterableIterator<?::T>
     * Source: ohos/util/HashSet.main.lsl:175 */
    [Symbol.iterator](): IterableIterator<T> {
        let result: IterableIterator<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The Symbol.iterator method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let lsl$na1 = new LSL_MapIterator_K_Automaton<T>();
            // lsl$na1.__$state = Initialized;
            lsl$na1.unseen = this.storage.duplicate();
            result = lsl$na1 as any as LSL_MapIterator_K<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::values(HashSet<?::T>) -> IterableIterator<?::T>
     * Source: ohos/util/HashSet.main.lsl:186 */
    values(): IterableIterator<T> {
        let result: IterableIterator<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The values method cannot be bound.";
            if (!(this instanceof HashSet)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let lsl$na2 = new LSL_MapIterator_K_Automaton<T>();
            // lsl$na2.__$state = Initialized;
            lsl$na2.unseen = this.storage.duplicate();
            result = lsl$na2 as any as LSL_MapIterator_K<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] HashSetAutomaton::length(HashSet<?::T>) -> number
     * Source: ohos/util/HashSet.main.lsl:199 */
    get length(): number {
        let result: number = 0;
        /* body */ {
            result = this.storage.size();
        }
        return result;
    }

}
