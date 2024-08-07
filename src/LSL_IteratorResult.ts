/// ???

import { libsl } from "./libsl_runtime";

export class LSL_IteratorResult<T> {
    done: boolean = false;
    value: T = libsl.ANYTHING;
}
