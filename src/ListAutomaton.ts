// Generated by the LibSL translator.  DO NOT EDIT!
// sources:
//  - ohos/util/List.lsl:26
//  - ohos/util/List.main.lsl:18
//
import {LSL_ListIterator} from './LSL_ListIterator';
import {LSL_ListIteratorAutomaton} from './LSL_ListIteratorAutomaton';
import {ListAutomaton as ListAutomaton_} from './ListAutomaton';
import {libsl} from './libsl_runtime';
import {List} from '@ohos.util.List';
import {Approximate} from '@org.jacodb.approximation.annotation';
import {Engine, SymbolicList} from '@org.usvm.api';


/**
 * ListAutomaton for LSL_List<T> ~> List@@ohos.util.List */
@Approximate(/* value */ List)
export class ListAutomaton<T> {

    storage: SymbolicList<T> = libsl.ANYTHING;

    public constructor() {
        if (libsl.constructor_called_by_user) {
            // body
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200012, "The List\'s constructor cannot be directly invoked.");
            }
            this.storage = Engine.makeSymbolicList();
        }
    }

    /**
     * [SUBROUTINE] ListAutomaton::_addElement(number, ?::T) -> void
     * Source: ohos/util/List.main.lsl:62 */
    private _addElement(index: number, element: T) {
        /* body */ {
            this._rangeCheckForAdd(index);
            this.storage.insert(index, element);
        }
    }

    /**
     * [SUBROUTINE] ListAutomaton::_rangeCheckForAdd(number) -> void
     * Source: ohos/util/List.main.lsl:70 */
    private _rangeCheckForAdd(index: number) {
        /* body */ {
            if ((index < 0) || (this.storage.size() < index)) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of index is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] ListAutomaton::_checkElementIndex(number, number) -> void
     * Source: ohos/util/List.main.lsl:77 */
    private _checkElementIndex(index: number, size: number) {
        /* body */ {
            if ((index < 0) || (size <= index)) {
                throw libsl.new_ERROR("BusinessError", 10200001, "The value of index is out of range.");
            }
        }
    }

    /**
     * [SUBROUTINE] ListAutomaton::_unlinkAny(number) -> ?::T
     * Source: ohos/util/List.main.lsl:84 */
    private _unlinkAny(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            result = this.storage.get(index);
            this.storage.remove(index);
        }
        return result;
    }

    /**
     * [SUBROUTINE] ListAutomaton::_unlinkByFirstEqualsObject(?::T) -> boolean
     * Source: ohos/util/List.main.lsl:91 */
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
     * [SUBROUTINE] ListAutomaton::_do_sort(number, number, List_Comparator<?::T>) -> void
     * Source: ohos/util/List.main.lsl:101 */
    private _do_sort(start: number, end: number, c: (a: T, b: T) => number) {
        /* body */ {
            if (start < end) {
                Engine.assume(start >= 0);
                Engine.assume(end > 0);
                let outerLimit: number = end - 1;
                let innerLimit: number = 0;
                let i: number = 0;
                let j: number = 0;
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

    /**
     * [SUBROUTINE] ListAutomaton::_checkValidRange(number, number, number) -> void
     * Source: ohos/util/List.main.lsl:148 */
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
     * [FUNCTION] ListAutomaton::add(LSL_List<?::T>, ?::T) -> boolean
     * Source: ohos/util/List.main.lsl:184 */
    add(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The add method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage.insert(this.storage.size(), element);
            result = true;
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::insert(LSL_List<?::T>, number, ?::T) -> void
     * Source: ohos/util/List.main.lsl:194 */
    insert(index: number, element: T) {
        /* body */ {
            let msg: string = "The insert method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._addElement(index, element);
        }
    }

    /**
     * [FUNCTION] ListAutomaton::has(LSL_List<?::T>, ?::T) -> boolean
     * Source: ohos/util/List.main.lsl:203 */
    has(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The has method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = libsl.ListActions.find(this.storage, element, 0, this.storage.size()) !== -1;
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::get(LSL_List<?::T>, number) -> ?::T
     * Source: ohos/util/List.main.lsl:212 */
    get(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The get method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.get(index);
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::getLastIndexOf(LSL_List<?::T>, ?::T) -> number
     * Source: ohos/util/List.main.lsl:223 */
    getLastIndexOf(element: T): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getLastIndexOf method cannot be bound.";
            if (!(this instanceof List)) {
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
     * [FUNCTION] ListAutomaton::getIndexOf(LSL_List<?::T>, ?::T) -> number
     * Source: ohos/util/List.main.lsl:253 */
    getIndexOf(element: T): number {
        let result: number = 0;
        /* body */ {
            let msg: string = "The getIndexOf method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = libsl.ListActions.find(this.storage, element, 0, this.storage.size());
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::equal(LSL_List<?::T>, Object) -> boolean
     * Source: ohos/util/List.main.lsl:262 */
    equal(o: Object): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The equal method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            if (this === o) {
                result = true;
            }
            else {
                if ((o !== null && o !== undefined && Object.getPrototypeOf(o) === List.prototype)) {
                    let otherStorage: SymbolicList<T> = (o as any as ListAutomaton_<T>).storage;
                    if (this.storage.size() === otherStorage.size()) {
                        result = libsl.equals_list_list(this.storage, otherStorage);
                    }
                    else {
                        result = false;
                    }
                }
                else {
                    result = false;
                }
            }
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::removeByIndex(LSL_List<?::T>, number) -> ?::T
     * Source: ohos/util/List.main.lsl:291 */
    removeByIndex(index: number): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The removeByIndex method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkElementIndex(index, this.storage.size());
            result = this._unlinkAny(index);
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::remove(LSL_List<?::T>, ?::T) -> boolean
     * Source: ohos/util/List.main.lsl:301 */
    remove(element: T): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The remove method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this._unlinkByFirstEqualsObject(element);
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::replaceAllElements(LSL_List<?::T>, List_Function<?::T>, Object) -> void
     * Source: ohos/util/List.main.lsl:310 */
    replaceAllElements(callbackFn: (t: T, index?: number, list?: List<T>) => T, thisArg?: Object) {
        /* body */ {
            let msg: string = "The replaceAllElements method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            let size: number = this.storage.size();
            let i: number = 0;
            for (i = 0; i < size; i += 1) {
                let item: T = this.storage.get(i);
                let cur: T = callbackFn.call(thisArg, item, i, this);
                this.storage.set(i, cur);
            }
        }
    }

    /**
     * [FUNCTION] ListAutomaton::forEach(LSL_List<?::T>, List_Consumer<?::T>, Object) -> void
     * Source: ohos/util/List.main.lsl:331 */
    forEach(callbackFn: (t: T, index?: number, list?: List<T>) => void, thisArg?: Object) {
        /* body */ {
            let msg: string = "The forEach method cannot be bound.";
            if (!(this instanceof List)) {
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
     * [FUNCTION] ListAutomaton::sort(LSL_List<?::T>, List_Comparator<?::T>) -> void
     * Source: ohos/util/List.main.lsl:352 */
    sort(comparator: (a: T, b: T) => number) {
        /* body */ {
            let msg: string = "The sort method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._do_sort(0, this.storage.size(), comparator);
        }
    }

    /**
     * [FUNCTION] ListAutomaton::getSubList(LSL_List<?::T>, number, number) -> List<?::T>
     * Source: ohos/util/List.main.lsl:361 */
    getSubList(fromIndex: number, toIndex: number): List<T> {
        let result: List<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The getSubList method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkValidRange(fromIndex, toIndex, this.storage.size());
            let storageCopy: SymbolicList<T> = Engine.makeSymbolicList();
            this.storage.copy(storageCopy, fromIndex, 0, toIndex - fromIndex);
            libsl.constructor_called_by_user = false;
            let lsl$na0 = new ListAutomaton_<T>(
            );
            libsl.constructor_called_by_user = true;
            // lsl$na0.__$state = Initialized;
            lsl$na0.storage = storageCopy;
            result = lsl$na0 as any as List<T>;
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::clear(LSL_List<?::T>) -> void
     * Source: ohos/util/List.main.lsl:376 */
    clear() {
        /* body */ {
            let msg: string = "The clear method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this.storage = Engine.makeSymbolicList();
        }
    }

    /**
     * [FUNCTION] ListAutomaton::set(LSL_List<?::T>, number, ?::T) -> ?::T
     * Source: ohos/util/List.main.lsl:385 */
    set(index: number, element: T): T {
        let result: T = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The set method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            this._checkElementIndex(index, this.storage.size());
            result = this.storage.get(index);
            this.storage.set(index, element);
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::convertToArray(LSL_List<?::T>) -> array<?::T>
     * Source: ohos/util/List.main.lsl:398 */
    convertToArray(): Array<T> {
        let result: Array<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The convertToArray method cannot be bound.";
            if (!(this instanceof List)) {
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
     * [FUNCTION] ListAutomaton::isEmpty(LSL_List<?::T>) -> boolean
     * Source: ohos/util/List.main.lsl:420 */
    isEmpty(): boolean {
        let result: boolean = false;
        /* body */ {
            let msg: string = "The isEmpty method cannot be bound.";
            if (!(this instanceof List)) {
                throw libsl.new_ERROR("BusinessError", 10200011, msg);
            }
            result = this.storage.size() === 0;
        }
        return result;
    }

    /**
     * [FUNCTION] ListAutomaton::getFirst(LSL_List<?::T>) -> ?::T | undefined
     * Source: ohos/util/List.main.lsl:429 */
    getFirst(): T | undefined {
        let result: T | undefined = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The getFirst method cannot be bound.";
            if (!(this instanceof List)) {
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
     * [FUNCTION] ListAutomaton::getLast(LSL_List<?::T>) -> ?::T | undefined
     * Source: ohos/util/List.main.lsl:443 */
    getLast(): T | undefined {
        let result: T | undefined = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The getLast method cannot be bound.";
            if (!(this instanceof List)) {
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
     * [FUNCTION] ListAutomaton::[Symbol.iterator](LSL_List<?::T>) -> IterableIterator<?::T>
     * Source: ohos/util/List.main.lsl:457 */
    [Symbol.iterator](): IterableIterator<T> {
        let result: IterableIterator<T> = libsl.ANYTHING;
        /* body */ {
            let msg: string = "The Symbol.iterator method cannot be bound.";
            if (!(this instanceof List)) {
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
     * [FUNCTION] ListAutomaton::length(LSL_List<?::T>) -> number
     * Source: ohos/util/List.main.lsl:471 */
    get length(): number {
        let result: number = 0;
        /* body */ {
            result = this.storage.size();
        }
        return result;
    }

}
