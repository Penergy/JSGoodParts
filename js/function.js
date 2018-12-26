// 函数字面量, 匿名函数， 闭包
var add = function(a, b){
    return a + b;
}

/*方法调用（Method invocation pattern）
 *当一个函数被保存为一个对象的属性，称为方法（Method）
 */
 var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc: 1;
    }
};

myObject.increment();
document.writeln(myObject.value);

myObject.increment();
document.writeln(myObject.value);

myObject.increment();
document.writeln(myObject.value);

/*函数调用（Function invocation pattern）
 *当一个函数并非一个对象的属性时，它被当作一个函数调用
 */
myObject.double = function() {
    var that = this;
    var helper = function() {
        that.value = add(that.value, that.value);
    };

    helper(); // 函数形式调用helper()
}

myObject.double(); //方法形式调用double
document.writeln(myObject.value);

/* 构造器调用（Constructor invocation pattern）
 * 
 */ 
// 创建一个名为Quo的构造器函数， 它构造一个带有status属性的对象
 var Quo = function ( string) {
    this.status = string;
}
// 给Quo的所有实例提供一个名为get_status的公共方法
Quo.prototype.get_status = function() {
    return this.status;
}
// 构造一个Quo的实例
var myQuo = new Quo("confused");
document.writeln(myQuo.get_status());

