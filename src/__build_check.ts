/// <reference path="jacodb.d.ts" />
/// <reference path="usvm.d.ts" />

import { QueueAutomaton } from "./QueueAutomaton";
import { libsl } from "./libsl_runtime";
import { Engine, SymbolicList } from "./org/usvm/api";

@org.jacodb.approximation.annotation.Approximate('String')
class Foo {
    private list: org.usvm.api.SymbolicList<string>;

    constructor() {
        this.list = org.usvm.api.Engine.makeSymbolicList<string>();
    }

}

let qqq = new QueueAutomaton<String>().__lsl_init({} as SymbolicList<String>);
let foo = new Foo();
throw libsl.new_ERROR("TestError", 12345, "test");
