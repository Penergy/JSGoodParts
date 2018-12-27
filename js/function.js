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

/*
 * Apply调用模式（Apply invocation pattern）
 */
// 构造一个包含两个数字的数组，并讲它们相加
var array = [3,4];
var sum = add.apply(null, array); 
console.log(sum);
// 构造一个包含status成员的对象
var statusObject = {
    status: 'A-OK'
};
var status = Quo.prototype.get_status.apply(statusObject);
console.log(status);

/*
 * 扩充类型的功能（Augmenting types）
 */
Function.prototype.method = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};
// 数字提取整数类型
Number.method('integer', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
document.writeln((-10/3).integer());
// 移除字符串首尾空白的方法
String.method('trim', function() {
    return this.replace(/^\s+|\s+$/g, '');
});
document.writeln('"' + "    neat    ".trim() + '"');

/*
 * 递归（Recursion）
 */
var hanoi = function ( disc, src, aux, dst) {
    if (disc > 0) {
        hanoi( disc - 1, src, dst, aux);
        document.writeln('Move disc ' + disc + " from " + src + " to " + dst);
        hanoi( disc-1, aux, src, dst);
    }
};
hanoi(3, 'Src', 'Aux', 'Dst');
// 递归函数可以非常高效地操作树形结构
// 定义walk_the_DOM函数，它从某个指定的节点开始，按HMTL源码中的顺序
// 访问该树的每个节点
// 它会调用一个函数，并依次传递每个节点给它。walk_the_DOM调用自身去
// 处理每一个子节点
var walk_the_DOM = function walk (node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
        walk(node, func);
        node = node.nextSibling;
    }
};
// 定义 getElementsByAttribute 函数，它以一个属性名称字符串
// 和一个可选的匹配值作为参数。
// 它调用walk_the_DOM，传递一个用来查找节点属性名的函数作为参数
// 匹配的节点会累加到一个结果数组中
var getElementsByAttribute = function (att, value) {
    var results = [];
    
    walk_the_DOM(document.body, function (node) {
        var actual = node.nodeType === 1 && node.getAttribute(att);
        if(typeof actual === 'string' && (actual === value || typeof value !== 'string')) {
            results.push(node);
        }
    });

    return results;
};

