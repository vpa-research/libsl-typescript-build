/// <reference path="jacodb.d.ts" />
/// <reference path="usvm.d.ts" />

import { libsl } from "./libsl_runtime";

@org.jacodb.approximation.annotation.Approximate(NodeJS.Timeout)
class Foo {
    private list: org.usvm.api.SymbolicList<string>;

    constructor() {
        this.list = org.usvm.api.Engine.makeSymbolicList<string>();
    }

}

let foo = new Foo();
throw libsl.new_ERROR("TestError", 12345, "test");
