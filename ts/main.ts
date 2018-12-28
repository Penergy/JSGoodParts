import { sayHello } from "./greet";

/**
 * Import a module
 * @param divName 
 * @param name 
 */
function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

function test() {
    document.writeln('Hello, World!');
}

showHello("greeting", "TypeScript");
test();


/**
 * Class Inheritance
 */
class BankAccount {
    constructor(public balance: number) {
    }
    deposit(credit: number) {
        this.balance += credit;
        return this.balance;
    }
    getBalance() {
        return this.balance;
    }
}
class CheckingAccount extends BankAccount {
    constructor(balance: number) {
        super(balance);
    }
    writeCheck(debit: number) {
        this.balance -= debit;
        return this.balance;
    }
}
var account = new CheckingAccount(100);
console.log(account.getBalance());
console.log(account.deposit(100))
console.log(account.writeCheck(50));

/**
 * Types Enum
 */
enum Operator {
    ADD,
    DIV,
    MUL,
    SUB
};

function compute(op: Operator, a: number, b: number) {
    console.log("the operator is " + Operator[op]);
    switch(op) {
        case Operator.ADD:
            console.log("the result is " + (a + b));
            break;
        case Operator.DIV:
            console.log("the result is " + (a * b));
            break;
        default:
            break;
    }
}

compute(Operator.ADD, 1, 2);

/**
 * Generic Types and Functions
 */
interface Array<T> {
    reverse(): T[];
    sort(compareFn?: (a: T, b: T) => number): T[];
    //  ... 
}
function numberToString(a: number[]) {
    var stringArray = a.map(v => v.toString());
    return stringArray;
}

var aList = [1, 2, 3];
var aListStr = numberToString(aList);
document.writeln(aListStr.toString());

/**
 * Namespace
 */
namespace M {
    var s = "hello";
    export function f() {
        return s;
    }
}
console.log(M.f());

/**
 * Mixins
 */
class a {
    load() {
        console.log('a: load');
    }
    loadProductStructure() {
        console.log('a: load product structure')
    }
}
class b {
    load() {
        console.log('b: load');
    }
    loadProductStructure() {
        console.log('b: load product structure')
    }
}

class SmartObject implements a, b { 
    load: () => void;
    loadProductStructure: () => void;
}

applyMixins(SmartObject, [a, b]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}

let sObj = new SmartObject();
sObj.load();
sObj.loadProductStructure();