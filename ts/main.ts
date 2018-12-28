import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

function test() {
    document.writeln('Hello, World!');
}

showHello("greeting", "TypeScript");
test();

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

const enum Operator {
    ADD,
    DIV,
    MUL,
    SUB
};

function compute(op: Operator, a: number, b: number) {
    // console.log("the operator is " + Operator[op]);
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

compute(0, 1, 2);
var account = new CheckingAccount(100);
console.log(account.getBalance());
console.log(account.deposit(100))
console.log(account.writeCheck(50));