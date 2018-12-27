import {show} from './module2.js';

show();

var test = (a, b) => a + b;

var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;

console.log(f());
console.log(test(1, 2));
