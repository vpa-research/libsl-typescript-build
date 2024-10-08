// Generated by the LibSL translator.  DO NOT EDIT!
// sources:
//  - ohos/util/ArrayList.lsl:15
//  - ohos/util/ArrayList.main.lsl:18
//
import {ArrayListAutomaton as ArrayListAutomaton_} from './ArrayListAutomaton';
import {LSL_ListIterator} from './LSL_ListIterator';
import {LSL_ListIteratorAutomaton} from './LSL_ListIteratorAutomaton';
import {libsl} from './libsl_runtime';
import {ArrayList} from '@ohos.util.ArrayList';
import {Approximate} from '@org.jacodb.approximation.annotation';
import {Engine, SymbolicList} from '@org.usvm.api';


/**
 * ArrayListAutomaton for ArrayList<T> ~> ArrayList@@ohos.util.ArrayList */
@Approximate(/* value */ ArrayList)
export class ArrayListAutomaton<T> {

    storage: SymbolicList<T> = libsl.ANYTHING;

    public constructor() {
        if (libsl.constructor_called_by_user) {
            // body
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200012, "The ArrayList\'s constructor cannot be directly invoked.");
            }
            this.storage = Engine.makeSymbolicList();
        }
    }

    /**
     * [SUBROUTINE] ArrayListAutomaton::_addElement(number, ?::T) -> void
     * Source: ohos/util/ArrayList.main.lsl:62 */
    private _addElement(index: number, element: T) {
        /* body */ {
            this._rangeCheckForAdd(index);
            this.storage.insert(index, element);
        }
    }

    /**
     * [SUBROUTINE] ArrayListAutomaton::_rangeCheckForAdd(number) -> void
     * Source: ohos/util/ArrayList.main.lsl:70 */
    private _rangeCheckForAdd(index: number) {
        /* body */ {
            if ((index > this.storage.size()) || (index < 0)) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of index is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] ArrayListAutomaton::_checkValidIndex(number, number) -> void
     * Source: ohos/util/ArrayList.main.lsl:77 */
    private _checkValidIndex(index: number, length: number) {
        /* body */ {
            if ((index < 0) || (length <= index)) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of index is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] ArrayListAutomaton::_checkValidRange(number, number, number) -> void
     * Source: ohos/util/ArrayList.main.lsl:84 */
    private _checkValidRange(fromIndex: number, toIndex: number, size: number) {
        /* body */ {
            if (fromIndex < 0) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of fromIndex or toIndex is out of range.");
            }
            if (toIndex > size) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of fromIndex or toIndex is out of range.");
            }
            if (fromIndex > toIndex) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of fromIndex or toIndex is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] ArrayListAutomaton::_deleteElement(number) -> ?::T
     * Source: ohos/util/ArrayList.main.lsl:97 */
    private _deleteElement(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            this._checkValidIndex(index, this.storage.size());
            result = this.storage.get(index);
            this.storage.remove(index);
        }
        return result;
    }

    /**
     * [SUBROUTINE] ArrayListAutomaton::_do_sort(number, number, ArrayList_Comparator<?::T>) -> void
     * Source: ohos/util/ArrayList.main.lsl:107 */
    private _do_sort(start: number, end: number, c?: (a: T, b: T) => number) {
        /* body */ {
            if (start < end) {
                Engine.assume(start >= 0);
                Engine.assume(end > 0);
                let outerLimit: number = end - 1;
                let innerLimit: number = 0;
                let i: number = 0;
                let j: number = 0;
                if (c === undefined) {
                    for (i = start; i < outerLimit; i += 1) {
                        innerLimit = (end - i) - 1;
                        for (j = start; j < innerLimit; j += 1) {
                            let idxA: number = j;
                            let idxB: number = j + 1;
                            let a: T = this.storage.get(idxA);
                            let b: T = this.storage.get(idxB);
                            if (libsl.toString_any(a) > libsl.toString_any(b)) {
                                this.storage.set(idxA, b);
                                this.storage.set(idxB, a);
                            }
                        }
                    }
                }
                else {
                    for (i = start; i < outerLimit; i += 1) {
                        innerLimit = (end - i) - 1;
                        for (j = start; j < innerLimit; j += 1) {
                            let idxA: number = j;
                            let idxB: number = j + 1;
                            let a: T = this.storage.get(idxA);
                            let b: T = this.storage.get(idxB);
                            if (c(a, b) > 0) {
                                this.storage.set(idxA, b);
                                this.storage.set(idxB, a);
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::add(LSL_ArrayList<?::T>, ?::T) -> boolean
     * Source: ohos/util/ArrayList.main.lsl:219 */
    add(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The add method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage.insert(this.storage.size(), element);
            result = true;
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::insert(LSL_ArrayList<?::T>, ?::T, number) -> void
     * Source: ohos/util/ArrayList.main.lsl:229 */
    insert(element: T, index: number) {
        /* body */ {
            let msg: string = "The insert method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._addElement(index, element);
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::has(LSL_ArrayList<?::T>, ?::T) -> boolean
     * Source: ohos/util/ArrayList.main.lsl:238 */
    has(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The has method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = libsl.ListActions.find(this.storage, element, 0, this.storage.size()) !== -1;
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::getIndexOf(LSL_ArrayList<?::T>, ?::T) -> number
     * Source: ohos/util/ArrayList.main.lsl:247 */
    getIndexOf(element: T): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getIndexOf method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = libsl.ListActions.find(this.storage, element, 0, this.storage.size());
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::getLastIndexOf(LSL_ArrayList<?::T>, ?::T) -> number
     * Source: ohos/util/ArrayList.main.lsl:256 */
    getLastIndexOf(element: T): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getLastIndexOf method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = -1;
            let size: number = this.storage.size();
            if (size !== 0) {
                let items: SymbolicList<T> = this.storage;
                let i: number = 0;
                for (i = size - 1; i > -1; i += -1) {
                    let currentElement: T = items.get(i);
                    if (libsl.equals_any_any(element, currentElement)) {
                        result = i;
                        break;
                    }
                }
            }
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::removeByIndex(LSL_ArrayList<?::T>, number) -> ?::T
     * Source: ohos/util/ArrayList.main.lsl:287 */
    removeByIndex(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The removeByIndex method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this._deleteElement(index);
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::remove(LSL_ArrayList<?::T>, ?::T) -> boolean
     * Source: ohos/util/ArrayList.main.lsl:296 */
    remove(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The remove method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let index: number = libsl.ListActions.find(this.storage, element, 0, this.storage.size());
            result = index !== -1;
            if (result) {
                this.storage.remove(index);
            }
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::removeByRange(LSL_ArrayList<?::T>, number, number) -> void
     * Source: ohos/util/ArrayList.main.lsl:308 */
    removeByRange(fromIndex: number, toIndex: number) {
        /* body */ {
            let msg: string = "The removeByRange method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkValidRange(fromIndex, toIndex, this.storage.size());
            let i: number = 0;
            for (i = toIndex - 1; i > fromIndex - 1; i += -1) {
                this.storage.remove(i);
            }
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::replaceAllElements(LSL_ArrayList<?::T>, ArrayList_Function<?::T>, Object) -> void
     * Source: ohos/util/ArrayList.main.lsl:327 */
    replaceAllElements(callbackFn: (t: T, index?: number, arrlist?: ArrayList<T>) => T,
            thisArg?: Object) {
        /* body */ {
            let msg: string = "The replaceAllElements method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let size: number = this.storage.size();
            let i: number = 0;
            for (i = 0; i < size; i += 1) {
                let item: T = this.storage.get(i);
                let newItem: T = callbackFn.call(thisArg, item, i, this);
                this.storage.set(i, newItem);
            }
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::forEach(LSL_ArrayList<?::T>, ArrayList_Consumer<?::T>, Object) -> void
     * Source: ohos/util/ArrayList.main.lsl:350 */
    forEach(callbackFn: (t: T, index?: number, arrlist?: ArrayList<T>) => void, thisArg?: Object) {
        /* body */ {
            let msg: string = "The forEach method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let i: number = 0;
            for (i = 0; i < this.storage.size(); i += 1) {
                let item: T = this.storage.get(i);
                callbackFn.call(thisArg, item, i, this);
            }
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::sort(LSL_ArrayList<?::T>, ArrayList_Comparator<?::T>) -> void
     * Source: ohos/util/ArrayList.main.lsl:370 */
    sort(comparator?: (a: T, b: T) => number) {
        /* body */ {
            let msg: string = "The sort method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._do_sort(0, this.storage.size(), comparator);
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::subArrayList(LSL_ArrayList<?::T>, number, number) -> LSL_ArrayList<?::T>
     * Source: ohos/util/ArrayList.main.lsl:380 */
    subArrayList(fromIndex: number, toIndex: number): ArrayList<T> {
        let result: ArrayList<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The subArrayList method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkValidRange(fromIndex, toIndex, this.storage.size());
            let storageCopy: SymbolicList<T> = Engine.makeSymbolicList();
            this.storage.copy(storageCopy, fromIndex, 0, toIndex - fromIndex);
            libsl.constructor_called_by_user = false;
            let lsl$na0 = new ArrayListAutomaton_<T>(
            );
            libsl.constructor_called_by_user = true;
            // lsl$na0.__$state = Initialized;
            lsl$na0.storage = storageCopy;
            result = lsl$na0 as any as ArrayList<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::clear(LSL_ArrayList<?::T>) -> void
     * Source: ohos/util/ArrayList.main.lsl:395 */
    clear() {
        /* body */ {
            let msg: string = "The clear method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage = Engine.makeSymbolicList();
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::clone(LSL_ArrayList<?::T>) -> LSL_ArrayList<?::T>
     * Source: ohos/util/ArrayList.main.lsl:404 */
    clone(): ArrayList<T> {
        let result: ArrayList<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The clone method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let storageCopy: SymbolicList<T> = Engine.makeSymbolicList();
            this.storage.copy(storageCopy, 0, 0, this.storage.size());
            libsl.constructor_called_by_user = false;
            let lsl$na1 = new ArrayListAutomaton_<T>(
            );
            libsl.constructor_called_by_user = true;
            // lsl$na1.__$state = Initialized;
            lsl$na1.storage = storageCopy;
            result = lsl$na1 as any as ArrayList<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::getCapacity(LSL_ArrayList<?::T>) -> number
     * Source: ohos/util/ArrayList.main.lsl:418 */
    getCapacity(): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getCapacity method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.size();
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::convertToArray(LSL_ArrayList<?::T>) -> array<?::T>
     * Source: ohos/util/ArrayList.main.lsl:427 */
    convertToArray(): Array<T> {
        let result: Array<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The convertToArray method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let size: number = this.storage.size();
            Engine.assume(size >= 0);
            result = new Array<T>(size);
            let i: number = 0;
            for (i = 0; i < size; i += 1) {
                result[i] = this.storage.get(i);
            }
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::isEmpty(LSL_ArrayList<?::T>) -> boolean
     * Source: ohos/util/ArrayList.main.lsl:449 */
    isEmpty(): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The isEmpty method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.size() === 0;
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::increaseCapacityTo(LSL_ArrayList<?::T>, number) -> void
     * Source: ohos/util/ArrayList.main.lsl:458 */
    increaseCapacityTo(newCapacity: number) {
        /* body */ {
            let msg: string = "The increaseCapacityTo method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::trimToCurrentLength(LSL_ArrayList<?::T>) -> void
     * Source: ohos/util/ArrayList.main.lsl:467 */
    trimToCurrentLength() {
        /* body */ {
            let msg: string = "The trimToCurrentLength method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
        }
    }

    /**
     * [FUNCTION] ArrayListAutomaton::[Symbol.iterator](LSL_ArrayList<?::T>) -> IterableIterator<?::T>
     * Source: ohos/util/ArrayList.main.lsl:476 */
    [Symbol.iterator](): IterableIterator<T> {
        let result: IterableIterator<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The Symbol.iterator method cannot be bound.";
            if (!(this instanceof ArrayList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let lsl$na2 = new LSL_ListIteratorAutomaton<T>();
            // lsl$na2.__$state = Initialized;
            lsl$na2.container = this;
            lsl$na2.cursor = 0;
            result = lsl$na2 as any as LSL_ListIterator<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] ArrayListAutomaton::length(LSL_ArrayList<?::T>) -> number
     * Source: ohos/util/ArrayList.main.lsl:491 */
    get length(): number {
        let result: number = 0;
        /* body */ {
            result = this.storage.size();
        }
        return result;
    }

}
