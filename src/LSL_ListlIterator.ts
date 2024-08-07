/// ???

export class LSL_ListIterator<T> implements Iterator<T> {
    public next(): IteratorResult<T> {
        let lsl$e = new SyntaxError();
        lsl$e.name = "LinkingError";
        throw lsl$e;
    }

    public return(value?: any): IteratorResult<T> {
        let lsl$e = new SyntaxError();
        lsl$e.name = "LinkingError";
        throw lsl$e;
    }

    public throw(e?: any): IteratorResult<T> {
        let lsl$e = new SyntaxError();
        lsl$e.name = "LinkingError";
        throw e;
    }
}
