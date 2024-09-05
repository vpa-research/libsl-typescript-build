// Generated by the LibSL translator.  DO NOT EDIT!
// sources:
//  - ohos/util/LinkedList.lsl:26
//  - ohos/util/LinkedList.main.lsl:18
//
import {LSL_ListIterator} from './LSL_ListIterator';
import {LSL_ListIteratorAutomaton} from './LSL_ListIteratorAutomaton';
import {LinkedListAutomaton as LinkedListAutomaton_} from './LinkedListAutomaton';
import {libsl} from './libsl_runtime';
import {LinkedList} from '@ohos.util.LinkedList';
import {Approximate} from '@org.jacodb.approximation.annotation';
import {Engine, SymbolicList} from '@org.usvm.api';


/**
 * LinkedListAutomaton for LSL_LinkedList<T> ~> LinkedList@@ohos.util.LinkedList */
@Approximate(/* value */ LinkedList)
export class LinkedListAutomaton<T> {

    storage: SymbolicList<T> = libsl.ANYTHING;

    public constructor() {
        if (libsl.constructor_called_by_user) {
            // body
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200012, "The LinkedList\'s constructor cannot be directly invoked.");
            }
            this.storage = Engine.makeSymbolicList();
        }
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_addElement(number, ?::T) -> void
     * Source: ohos/util/LinkedList.main.lsl:63 */
    private _addElement(index: number, element: T) {
        /* body */ {
            this._rangeCheckForAdd(index);
            this.storage.insert(index, element);
        }
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_rangeCheckForAdd(number) -> void
     * Source: ohos/util/LinkedList.main.lsl:71 */
    private _rangeCheckForAdd(index: number) {
        /* body */ {
            if ((index < 0) || (this.storage.size() < index)) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of index is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_checkElementIndex(number, number) -> void
     * Source: ohos/util/LinkedList.main.lsl:78 */
    private _checkElementIndex(index: number, size: number) {
        /* body */ {
            if (!this._isValidIndex(index, size)) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of index is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_isValidIndex(number, number) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:85 */
    private _isValidIndex(index: number, size: number): boolean {
        let result: boolean = false;
        /* body */ {
            result = (0 <= index) && (index < size);
        }
        return result;
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_unlinkAny(number) -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:91 */
    private _unlinkAny(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            result = this.storage.get(index);
            this.storage.remove(index);
        }
        return result;
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_unlinkFirst() -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:98 */
    private _unlinkFirst(): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            result = this._unlinkAny(0);
        }
        return result;
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_unlinkByFirstEqualsObject(?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:104 */
    private _unlinkByFirstEqualsObject(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let index: number = libsl.ListActions.find(this.storage, element, 0, this.storage.size());
            result = index !== -1;
            if (result) {
                this.storage.remove(index);
            }
        }
        return result;
    }

    /**
     * [SUBROUTINE] LinkedListAutomaton::_unlinkByLastEqualsObject(?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:113 */
    private _unlinkByLastEqualsObject(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            result = false;
            let size: number = this.storage.size();
            if (size !== 0) {
                let items: SymbolicList<T> = this.storage;
                let i: number = 0;
                for (i = size - 1; i > -1; i += -1) {
                    let currentElement: T = items.get(i);
                    if (libsl.equals_any_any(element, currentElement)) {
                        result = true;
                        this.storage.remove(i);
                        break;
                    }
                }
            }
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::add(LSL_LinkedList<?::T>, ?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:163 */
    add(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The add method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage.insert(this.storage.size(), element);
            result = true;
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::addFirst(LSL_LinkedList<?::T>, ?::T) -> void
     * Source: ohos/util/LinkedList.main.lsl:173 */
    addFirst(element: T) {
        /* body */ {
            let msg: string = "The addFirst method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage.insert(0, element);
        }
    }

    /**
     * [FUNCTION] LinkedListAutomaton::insert(LSL_LinkedList<?::T>, number, ?::T) -> void
     * Source: ohos/util/LinkedList.main.lsl:182 */
    insert(index: number, element: T) {
        /* body */ {
            let msg: string = "The insert method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._addElement(index, element);
        }
    }

    /**
     * [FUNCTION] LinkedListAutomaton::has(LSL_LinkedList<?::T>, ?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:191 */
    has(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The has method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = libsl.ListActions.find(this.storage, element, 0, this.storage.size()) !== -1;
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::get(LSL_LinkedList<?::T>, number) -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:200 */
    get(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The get method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.get(index);
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::getLastIndexOf(LSL_LinkedList<?::T>, ?::T) -> number
     * Source: ohos/util/LinkedList.main.lsl:211 */
    getLastIndexOf(element: T): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getLastIndexOf method cannot be bound.";
            if (!(this instanceof LinkedList)) {
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
     * [FUNCTION] LinkedListAutomaton::getIndexOf(LSL_LinkedList<?::T>, ?::T) -> number
     * Source: ohos/util/LinkedList.main.lsl:241 */
    getIndexOf(element: T): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getIndexOf method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = libsl.ListActions.find(this.storage, element, 0, this.storage.size());
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::removeByIndex(LSL_LinkedList<?::T>, number) -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:250 */
    removeByIndex(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The removeByIndex method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkElementIndex(index, this.storage.size());
            result = this._unlinkAny(index);
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::removeFirst(LSL_LinkedList<?::T>) -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:260 */
    removeFirst(): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The removeFirst method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                throw libsl.new_ERROR("BusinessError", 10200010, "Container is empty.");
            }
            result = this._unlinkFirst();
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::removeLast(LSL_LinkedList<?::T>) -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:272 */
    removeLast(): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The removeLast method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                throw libsl.new_ERROR("BusinessError", 10200010, "Container is empty.");
            }
            result = this._unlinkAny(this.storage.size() - 1);
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::remove(LSL_LinkedList<?::T>, ?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:284 */
    remove(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The remove method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this._unlinkByFirstEqualsObject(element);
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::removeFirstFound(LSL_LinkedList<?::T>, ?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:293 */
    removeFirstFound(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The removeFirstFound method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                throw libsl.new_ERROR("BusinessError", 10200010, "Container is empty.");
            }
            result = this._unlinkByFirstEqualsObject(element);
            if (!result) {
                throw libsl.new_ERROR("BusinessError", 10200017, "The element does not exist in this container.");
            }
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::removeLastFound(LSL_LinkedList<?::T>, ?::T) -> boolean
     * Source: ohos/util/LinkedList.main.lsl:307 */
    removeLastFound(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The removeLastFound method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                throw libsl.new_ERROR("BusinessError", 10200010, "Container is empty.");
            }
            result = this._unlinkByLastEqualsObject(element);
            if (!result) {
                throw libsl.new_ERROR("BusinessError", 10200017, "The element does not exist in this container.");
            }
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::clone(LSL_LinkedList<?::T>) -> LSL_LinkedList<?::T>
     * Source: ohos/util/LinkedList.main.lsl:321 */
    clone(): LinkedList<T> {
        let result: LinkedList<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The clone method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let storageCopy: SymbolicList<T> = Engine.makeSymbolicList();
            this.storage.copy(storageCopy, 0, 0, this.storage.size());
            libsl.constructor_called_by_user = false;
            let lsl$na0 = new LinkedListAutomaton_<T>(
            );
            libsl.constructor_called_by_user = true;
            // lsl$na0.__$state = Initialized;
            lsl$na0.storage = storageCopy;
            result = lsl$na0 as any as LinkedList<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::forEach(LSL_LinkedList<?::T>, LinkedList_Consumer<?::T>, Object) -> void
     * Source: ohos/util/LinkedList.main.lsl:335 */
    forEach(callbackFn: (t: T, index?: number, arrlist?: LinkedList<T>) => void, thisArg?: Object) {
        /* body */ {
            let msg: string = "The forEach method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let i: number = 0;
            for (i = 0; i < this.storage.size(); i += 1) {
                callbackFn.call(thisArg, this.storage.get(i), i, this);
            }
        }
    }

    /**
     * [FUNCTION] LinkedListAutomaton::clear(LSL_LinkedList<?::T>) -> void
     * Source: ohos/util/LinkedList.main.lsl:358 */
    clear() {
        /* body */ {
            let msg: string = "The clear method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage = Engine.makeSymbolicList();
        }
    }

    /**
     * [FUNCTION] LinkedListAutomaton::set(LSL_LinkedList<?::T>, number, ?::T) -> ?::T
     * Source: ohos/util/LinkedList.main.lsl:367 */
    set(index: number, element: T): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The set method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkElementIndex(index, this.storage.size());
            result = this.storage.get(index);
            this.storage.set(index, element);
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::convertToArray(LSL_LinkedList<?::T>) -> array<?::T>
     * Source: ohos/util/LinkedList.main.lsl:380 */
    convertToArray(): Array<T> {
        let result: Array<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The convertToArray method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = new Array<T>(this.storage.size());
            let size: number = this.storage.size();
            let i: number = 0;
            for (i = 0; i < size; i += 1) {
                result[i] = this.storage.get(i);
            }
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::getFirst(LSL_LinkedList<?::T>) -> ?::T | undefined
     * Source: ohos/util/LinkedList.main.lsl:401 */
    getFirst(): T | undefined {
        let result: T | undefined = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The getFirst method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                result = undefined;
            }
            else {
                result = this.storage.get(0);
            }
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::getLast(LSL_LinkedList<?::T>) -> ?::T | undefined
     * Source: ohos/util/LinkedList.main.lsl:413 */
    getLast(): T | undefined {
        let result: T | undefined = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The getLast method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this.storage.size() === 0) {
                result = undefined;
            }
            else {
                result = this.storage.get(this.storage.size());
            }
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::[Symbol.iterator](LSL_LinkedList<?::T>) -> IterableIterator<?::T>
     * Source: ohos/util/LinkedList.main.lsl:425 */
    [Symbol.iterator](): IterableIterator<T> {
        let result: IterableIterator<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The Symbol.iterator method cannot be bound.";
            if (!(this instanceof LinkedList)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let lsl$na1 = new LSL_ListIteratorAutomaton<T>();
            // lsl$na1.__$state = Initialized;
            lsl$na1.container = this;
            lsl$na1.cursor = 0;
            result = lsl$na1 as any as LSL_ListIterator<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] LinkedListAutomaton::length(LSL_LinkedList<?::T>) -> number
     * Source: ohos/util/LinkedList.main.lsl:439 */
    get length(): number {
        let result: number = 0;
        /* body */ {
            result = this.storage.size();
        }
        return result;
    }

}
