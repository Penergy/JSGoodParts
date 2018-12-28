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
/**
 * Import a module
 * @param divName
 * @param name
 */
function showHello(divName, name) {
    var elt = document.getElementById(divName);
    elt.innerText = greet_1.sayHello(name);
}
function test() {
    document.writeln('Hello, World!');
}
showHello("greeting", "TypeScript");
test();
/**
 * Class Inheritance
 */
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
var account = new CheckingAccount(100);
console.log(account.getBalance());
console.log(account.deposit(100));
console.log(account.writeCheck(50));
/**
 * Types Enum
 */
var Operator;
(function (Operator) {
    Operator[Operator["ADD"] = 0] = "ADD";
    Operator[Operator["DIV"] = 1] = "DIV";
    Operator[Operator["MUL"] = 2] = "MUL";
    Operator[Operator["SUB"] = 3] = "SUB";
})(Operator || (Operator = {}));
;
function compute(op, a, b) {
    console.log("the operator is " + Operator[op]);
    switch (op) {
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
function numberToString(a) {
    var stringArray = a.map(function (v) { return v.toString(); });
    return stringArray;
}
var aList = [1, 2, 3];
var aListStr = numberToString(aList);
document.writeln(aListStr.toString());
/**
 * Namespace
 */
var M;
(function (M) {
    var s = "hello";
    function f() {
        return s;
    }
    M.f = f;
})(M || (M = {}));
console.log(M.f());
/**
 * Mixins
 */
var a = /** @class */ (function () {
    function a() {
    }
    a.prototype.load = function () {
        console.log('a: load');
    };
    a.prototype.loadProductStructure = function () {
        console.log('a: load product structure');
    };
    return a;
}());
var b = /** @class */ (function () {
    function b() {
    }
    b.prototype.load = function () {
        console.log('b: load');
    };
    b.prototype.loadProductStructure = function () {
        console.log('b: load product structure');
    };
    return b;
}());
var SmartObject = /** @class */ (function () {
    function SmartObject() {
    }
    return SmartObject;
}());
applyMixins(SmartObject, [a, b]);
function applyMixins(derivedCtor, baseCtors) {
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            derivedCtor.prototype[name] = baseCtor.prototype[name];
        });
    });
}
var sObj = new SmartObject();
sObj.load();
sObj.loadProductStructure();
},{"./greet":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ0cy9ncmVldC50cyIsInRzL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBLFNBQWdCLFFBQVEsQ0FBQyxJQUFZO0lBQ2pDLE9BQU8sZ0JBQWMsSUFBTSxDQUFDO0FBQ2hDLENBQUM7QUFGRCw0QkFFQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGRCxpQ0FBbUM7QUFFbkM7Ozs7R0FJRztBQUNILFNBQVMsU0FBUyxDQUFDLE9BQWUsRUFBRSxJQUFZO0lBQzVDLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxnQkFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCxTQUFTLElBQUk7SUFDVCxRQUFRLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFFRCxTQUFTLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLElBQUksRUFBRSxDQUFDO0FBR1A7O0dBRUc7QUFDSDtJQUNJLHFCQUFtQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUNsQyxDQUFDO0lBQ0QsNkJBQU8sR0FBUCxVQUFRLE1BQWM7UUFDbEIsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7UUFDdkIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDRCxnQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFDTCxrQkFBQztBQUFELENBVkEsQUFVQyxJQUFBO0FBQ0Q7SUFBOEIsbUNBQVc7SUFDckMseUJBQVksT0FBZTtlQUN2QixrQkFBTSxPQUFPLENBQUM7SUFDbEIsQ0FBQztJQUNELG9DQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN4QixDQUFDO0lBQ0wsc0JBQUM7QUFBRCxDQVJBLEFBUUMsQ0FSNkIsV0FBVyxHQVF4QztBQUNELElBQUksT0FBTyxHQUFHLElBQUksZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUM7QUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7QUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFcEM7O0dBRUc7QUFDSCxJQUFLLFFBS0o7QUFMRCxXQUFLLFFBQVE7SUFDVCxxQ0FBRyxDQUFBO0lBQ0gscUNBQUcsQ0FBQTtJQUNILHFDQUFHLENBQUE7SUFDSCxxQ0FBRyxDQUFBO0FBQ1AsQ0FBQyxFQUxJLFFBQVEsS0FBUixRQUFRLFFBS1o7QUFBQSxDQUFDO0FBRUYsU0FBUyxPQUFPLENBQUMsRUFBWSxFQUFFLENBQVMsRUFBRSxDQUFTO0lBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDL0MsUUFBTyxFQUFFLEVBQUU7UUFDUCxLQUFLLFFBQVEsQ0FBQyxHQUFHO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU07UUFDVixLQUFLLFFBQVEsQ0FBQyxHQUFHO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hDLE1BQU07UUFDVjtZQUNJLE1BQU07S0FDYjtBQUNMLENBQUM7QUFFRCxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFVNUIsU0FBUyxjQUFjLENBQUMsQ0FBVztJQUMvQixJQUFJLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFaLENBQVksQ0FBQyxDQUFDO0lBQzNDLE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFFRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEIsSUFBSSxRQUFRLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7QUFFdEM7O0dBRUc7QUFDSCxJQUFVLENBQUMsQ0FLVjtBQUxELFdBQVUsQ0FBQztJQUNQLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNoQixTQUFnQixDQUFDO1FBQ2IsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDO0lBRmUsR0FBQyxJQUVoQixDQUFBO0FBQ0wsQ0FBQyxFQUxTLENBQUMsS0FBRCxDQUFDLFFBS1Y7QUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRW5COztHQUVHO0FBQ0g7SUFBQTtJQU9BLENBQUM7SUFORyxnQkFBSSxHQUFKO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsZ0NBQW9CLEdBQXBCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFDTCxRQUFDO0FBQUQsQ0FQQSxBQU9DLElBQUE7QUFDRDtJQUFBO0lBT0EsQ0FBQztJQU5HLGdCQUFJLEdBQUo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxnQ0FBb0IsR0FBcEI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUNMLFFBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQUVEO0lBQUE7SUFHQSxDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUhBLEFBR0MsSUFBQTtBQUVELFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVqQyxTQUFTLFdBQVcsQ0FBQyxXQUFnQixFQUFFLFNBQWdCO0lBQ25ELFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxRQUFRO1FBQ3RCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsSUFBSTtZQUN2RCxXQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQzdCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNaLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiZXhwb3J0IGZ1bmN0aW9uIHNheUhlbGxvKG5hbWU6IHN0cmluZykge1xyXG4gICAgcmV0dXJuIGBIZWxsbyBmcm9tICR7bmFtZX1gO1xyXG59IiwiaW1wb3J0IHsgc2F5SGVsbG8gfSBmcm9tIFwiLi9ncmVldFwiO1xyXG5cclxuLyoqXHJcbiAqIEltcG9ydCBhIG1vZHVsZVxyXG4gKiBAcGFyYW0gZGl2TmFtZSBcclxuICogQHBhcmFtIG5hbWUgXHJcbiAqL1xyXG5mdW5jdGlvbiBzaG93SGVsbG8oZGl2TmFtZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGVsdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRpdk5hbWUpO1xyXG4gICAgZWx0LmlubmVyVGV4dCA9IHNheUhlbGxvKG5hbWUpO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0ZXN0KCkge1xyXG4gICAgZG9jdW1lbnQud3JpdGVsbignSGVsbG8sIFdvcmxkIScpO1xyXG59XHJcblxyXG5zaG93SGVsbG8oXCJncmVldGluZ1wiLCBcIlR5cGVTY3JpcHRcIik7XHJcbnRlc3QoKTtcclxuXHJcblxyXG4vKipcclxuICogQ2xhc3MgSW5oZXJpdGFuY2VcclxuICovXHJcbmNsYXNzIEJhbmtBY2NvdW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBiYWxhbmNlOiBudW1iZXIpIHtcclxuICAgIH1cclxuICAgIGRlcG9zaXQoY3JlZGl0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmJhbGFuY2UgKz0gY3JlZGl0O1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbGFuY2U7XHJcbiAgICB9XHJcbiAgICBnZXRCYWxhbmNlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmJhbGFuY2U7XHJcbiAgICB9XHJcbn1cclxuY2xhc3MgQ2hlY2tpbmdBY2NvdW50IGV4dGVuZHMgQmFua0FjY291bnQge1xyXG4gICAgY29uc3RydWN0b3IoYmFsYW5jZTogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoYmFsYW5jZSk7XHJcbiAgICB9XHJcbiAgICB3cml0ZUNoZWNrKGRlYml0OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmJhbGFuY2UgLT0gZGViaXQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYmFsYW5jZTtcclxuICAgIH1cclxufVxyXG52YXIgYWNjb3VudCA9IG5ldyBDaGVja2luZ0FjY291bnQoMTAwKTtcclxuY29uc29sZS5sb2coYWNjb3VudC5nZXRCYWxhbmNlKCkpO1xyXG5jb25zb2xlLmxvZyhhY2NvdW50LmRlcG9zaXQoMTAwKSlcclxuY29uc29sZS5sb2coYWNjb3VudC53cml0ZUNoZWNrKDUwKSk7XHJcblxyXG4vKipcclxuICogVHlwZXMgRW51bVxyXG4gKi9cclxuZW51bSBPcGVyYXRvciB7XHJcbiAgICBBREQsXHJcbiAgICBESVYsXHJcbiAgICBNVUwsXHJcbiAgICBTVUJcclxufTtcclxuXHJcbmZ1bmN0aW9uIGNvbXB1dGUob3A6IE9wZXJhdG9yLCBhOiBudW1iZXIsIGI6IG51bWJlcikge1xyXG4gICAgY29uc29sZS5sb2coXCJ0aGUgb3BlcmF0b3IgaXMgXCIgKyBPcGVyYXRvcltvcF0pO1xyXG4gICAgc3dpdGNoKG9wKSB7XHJcbiAgICAgICAgY2FzZSBPcGVyYXRvci5BREQ6XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIHJlc3VsdCBpcyBcIiArIChhICsgYikpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIE9wZXJhdG9yLkRJVjpcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgcmVzdWx0IGlzIFwiICsgKGEgKiBiKSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG59XHJcblxyXG5jb21wdXRlKE9wZXJhdG9yLkFERCwgMSwgMik7XHJcblxyXG4vKipcclxuICogR2VuZXJpYyBUeXBlcyBhbmQgRnVuY3Rpb25zXHJcbiAqL1xyXG5pbnRlcmZhY2UgQXJyYXk8VD4ge1xyXG4gICAgcmV2ZXJzZSgpOiBUW107XHJcbiAgICBzb3J0KGNvbXBhcmVGbj86IChhOiBULCBiOiBUKSA9PiBudW1iZXIpOiBUW107XHJcbiAgICAvLyAgLi4uIFxyXG59XHJcbmZ1bmN0aW9uIG51bWJlclRvU3RyaW5nKGE6IG51bWJlcltdKSB7XHJcbiAgICB2YXIgc3RyaW5nQXJyYXkgPSBhLm1hcCh2ID0+IHYudG9TdHJpbmcoKSk7XHJcbiAgICByZXR1cm4gc3RyaW5nQXJyYXk7XHJcbn1cclxuXHJcbnZhciBhTGlzdCA9IFsxLCAyLCAzXTtcclxudmFyIGFMaXN0U3RyID0gbnVtYmVyVG9TdHJpbmcoYUxpc3QpO1xyXG5kb2N1bWVudC53cml0ZWxuKGFMaXN0U3RyLnRvU3RyaW5nKCkpO1xyXG5cclxuLyoqXHJcbiAqIE5hbWVzcGFjZVxyXG4gKi9cclxubmFtZXNwYWNlIE0ge1xyXG4gICAgdmFyIHMgPSBcImhlbGxvXCI7XHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZigpIHtcclxuICAgICAgICByZXR1cm4gcztcclxuICAgIH1cclxufVxyXG5jb25zb2xlLmxvZyhNLmYoKSk7XHJcblxyXG4vKipcclxuICogTWl4aW5zXHJcbiAqL1xyXG5jbGFzcyBhIHtcclxuICAgIGxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2E6IGxvYWQnKTtcclxuICAgIH1cclxuICAgIGxvYWRQcm9kdWN0U3RydWN0dXJlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdhOiBsb2FkIHByb2R1Y3Qgc3RydWN0dXJlJylcclxuICAgIH1cclxufVxyXG5jbGFzcyBiIHtcclxuICAgIGxvYWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2I6IGxvYWQnKTtcclxuICAgIH1cclxuICAgIGxvYWRQcm9kdWN0U3RydWN0dXJlKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdiOiBsb2FkIHByb2R1Y3Qgc3RydWN0dXJlJylcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgU21hcnRPYmplY3QgaW1wbGVtZW50cyBhLCBiIHsgXHJcbiAgICBsb2FkOiAoKSA9PiB2b2lkO1xyXG4gICAgbG9hZFByb2R1Y3RTdHJ1Y3R1cmU6ICgpID0+IHZvaWQ7XHJcbn1cclxuXHJcbmFwcGx5TWl4aW5zKFNtYXJ0T2JqZWN0LCBbYSwgYl0pO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlNaXhpbnMoZGVyaXZlZEN0b3I6IGFueSwgYmFzZUN0b3JzOiBhbnlbXSkge1xyXG4gICAgYmFzZUN0b3JzLmZvckVhY2goYmFzZUN0b3IgPT4ge1xyXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGJhc2VDdG9yLnByb3RvdHlwZSkuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAgICAgZGVyaXZlZEN0b3IucHJvdG90eXBlW25hbWVdID0gYmFzZUN0b3IucHJvdG90eXBlW25hbWVdO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmxldCBzT2JqID0gbmV3IFNtYXJ0T2JqZWN0KCk7XHJcbnNPYmoubG9hZCgpO1xyXG5zT2JqLmxvYWRQcm9kdWN0U3RydWN0dXJlKCk7Il19
