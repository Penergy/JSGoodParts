(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function sayHello(name) {
    return "Hello from " + name;
}
exports.sayHello = sayHello;
},{}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = greet_1.sayHello(name);
}
function test() {
    document.writeln('Hello, World!');
}
showHello("greeting", "TypeScript");
test();
var BankAccount = /** @class */ (function () {
    function BankAccount(balance) {
        this.balance = balance;
    }
    BankAccount.prototype.deposit = function (credit) {
        this.balance += credit;
        return this.balance;
    };
    BankAccount.prototype.getBalance = function () {
        return this.balance;
    };
    return BankAccount;
}());
var CheckingAccount = /** @class */ (function (_super) {
    __extends(CheckingAccount, _super);
    function CheckingAccount(balance) {
        return _super.call(this, balance) || this;
    }
    CheckingAccount.prototype.writeCheck = function (debit) {
        this.balance -= debit;
        return this.balance;
    };
    return CheckingAccount;
}(BankAccount));
;
function compute(op, a, b) {
    // console.log("the operator is " + Operator[op]);
    switch (op) {
        case 0 /* ADD */:
            console.log("the result is " + (a + b));
            break;
        case 1 /* DIV */:
            console.log("the result is " + (a * b));
            break;
        default:
            break;
    }
}
compute(0, 1, 2);
var account = new CheckingAccount(100);
console.log(account.getBalance());
console.log(account.deposit(100));
console.log(account.writeCheck(50));
},{"./greet":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9ncmVldC50cyIsInRzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ2pDLE9BQU8sZ0JBQWMsSUFBTSxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGRCxpQ0FBbUM7QUFFbkMsU0FBUyxTQUFTLENBQUMsT0FBZSxFQUFFLElBQVk7SUFDNUMsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3QyxHQUFHLENBQUMsU0FBUyxHQUFHLGdCQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUVELFNBQVMsSUFBSTtJQUNULFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDdEMsQ0FBQztBQUVELFNBQVMsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDcEMsSUFBSSxFQUFFLENBQUM7QUFFUDtJQUNJLHFCQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUNsQyxDQUFDO0lBQ0QsNkJBQU8sR0FBUCxVQUFRLE1BQWM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxnQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBRUQ7SUFBOEIsbUNBQVc7SUFDckMseUJBQVksT0FBZTtlQUN2QixrQkFBTSxPQUFPLENBQUM7SUFDbEIsQ0FBQztJQUNELG9DQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSNkIsV0FBVyxHQVF4QztBQU9BLENBQUM7QUFFRixTQUFTLE9BQU8sQ0FBQyxFQUFZLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFDL0Msa0RBQWtEO0lBQ2xELFFBQU8sRUFBRSxFQUFFO1FBQ1A7WUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEMsTUFBTTtRQUNWO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU07UUFDVjtZQUNJLE1BQU07S0FDYjtBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqQixJQUFJLE9BQU8sR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGZ1bmN0aW9uIHNheUhlbGxvKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGBIZWxsbyBmcm9tICR7bmFtZX1gO1xyXG59IiwiaW1wb3J0IHsgc2F5SGVsbG8gfSBmcm9tIFwiLi9ncmVldFwiO1xyXG5cclxuZnVuY3Rpb24gc2hvd0hlbGxvKGRpdk5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XHJcbiAgICBjb25zdCBlbHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChkaXZOYW1lKTtcclxuICAgIGVsdC5pbm5lclRleHQgPSBzYXlIZWxsbyhuYW1lKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdGVzdCgpIHtcclxuICAgIGRvY3VtZW50LndyaXRlbG4oJ0hlbGxvLCBXb3JsZCEnKTtcclxufVxyXG5cclxuc2hvd0hlbGxvKFwiZ3JlZXRpbmdcIiwgXCJUeXBlU2NyaXB0XCIpO1xyXG50ZXN0KCk7XHJcblxyXG5jbGFzcyBCYW5rQWNjb3VudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYmFsYW5jZTogbnVtYmVyKSB7XHJcbiAgICB9XHJcbiAgICBkZXBvc2l0KGNyZWRpdDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5iYWxhbmNlICs9IGNyZWRpdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYWxhbmNlO1xyXG4gICAgfVxyXG4gICAgZ2V0QmFsYW5jZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYWxhbmNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBDaGVja2luZ0FjY291bnQgZXh0ZW5kcyBCYW5rQWNjb3VudCB7XHJcbiAgICBjb25zdHJ1Y3RvcihiYWxhbmNlOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcihiYWxhbmNlKTtcclxuICAgIH1cclxuICAgIHdyaXRlQ2hlY2soZGViaXQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuYmFsYW5jZSAtPSBkZWJpdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5iYWxhbmNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb25zdCBlbnVtIE9wZXJhdG9yIHtcclxuICAgIEFERCxcclxuICAgIERJVixcclxuICAgIE1VTCxcclxuICAgIFNVQlxyXG59O1xyXG5cclxuZnVuY3Rpb24gY29tcHV0ZShvcDogT3BlcmF0b3IsIGE6IG51bWJlciwgYjogbnVtYmVyKSB7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhcInRoZSBvcGVyYXRvciBpcyBcIiArIE9wZXJhdG9yW29wXSk7XHJcbiAgICBzd2l0Y2gob3ApIHtcclxuICAgICAgICBjYXNlIE9wZXJhdG9yLkFERDpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgcmVzdWx0IGlzIFwiICsgKGEgKyBiKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgT3BlcmF0b3IuRElWOlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSByZXN1bHQgaXMgXCIgKyAoYSAqIGIpKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNvbXB1dGUoMCwgMSwgMik7XHJcbnZhciBhY2NvdW50ID0gbmV3IENoZWNraW5nQWNjb3VudCgxMDApO1xyXG5jb25zb2xlLmxvZyhhY2NvdW50LmdldEJhbGFuY2UoKSk7XHJcbmNvbnNvbGUubG9nKGFjY291bnQuZGVwb3NpdCgxMDApKVxyXG5jb25zb2xlLmxvZyhhY2NvdW50LndyaXRlQ2hlY2soNTApKTsiXX0=
