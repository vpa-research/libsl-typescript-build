// ???


// #problem: do we need this? can we just ignore TS error about unknown property 'code'?
interface ErrorWithCode extends Error {
    code: number;
}


// note: adapted from c++ sources
function __lsl_err_generic(clazz: string, errCode: number, msg: string): ErrorWithCode {
    let err = new Error(msg) as ErrorWithCode; // #problem: will there be a TypeError thrown here or not?
    err.code = errCode;
    err.name = clazz;
    return err;
}
