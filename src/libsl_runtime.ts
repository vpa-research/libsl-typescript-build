// ???


// #problem: do we need this? can we just ignore TS error about unknown property 'code'?
export interface ErrorWithCode extends Error {
    code: number;
}

// #problem: do we need this?
interface AggregateError extends Error {
}
interface AggregateErrorConstructor extends ErrorConstructor {
    new (message?: string): AggregateError;
}
declare var AggregateError: AggregateErrorConstructor;



export namespace libsl {


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new Error(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_EVAL_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new EvalError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_RANGE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new RangeError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_REFERENCE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new ReferenceError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_TYPE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new TypeError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_AGGREGATE_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new AggregateError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_URI_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new URIError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_SYNTAX_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        let err = new SyntaxError(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
        err.code = errCode;
        err.name = clazz;
        return err;
    }


    // #question: do we actually need those?
    /*
    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_OOM_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        ...
    }


    // note: adapted from c++ sources, see ContainerError::BusinessError
    export function new_TERMINATION_ERROR(clazz: string, errCode: number, msg: string): ErrorWithCode {
        ...
    }
    */




} // namespace
