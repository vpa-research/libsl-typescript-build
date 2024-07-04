/// <reference path="jacodb.d.ts" />
/// <reference path="usvm.d.ts" />

@org.jacodb.approximation.annotation.Approximate(NodeJS.Timeout)
class Foo {
    private list: org.usvm.api.SymbolicList<string>;

    constructor() {
        this.list = org.usvm.api.Engine.makeSymbolicList<string>();
    }

}

let foo = new Foo();
