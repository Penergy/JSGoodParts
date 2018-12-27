Object.prototype.method = function (name, func) {
    if(!this.prototype[name]) {
        this.prototype[name] = func;
    }
    return this;
};
/*
 * 伪类（Pseudoclassical）
 * 设计糟糕， “伪类”形式可以给不熟悉Javascript的程序员提供便利
 * /

/*
 * 对象说明符（Object Specifiers）
 *
 */

/*
 * 原型（Prototypal）
 */
// 使用对象字面量构造一个有用的对象
var myMammal = {
    name: 'Herb the Mammal',
    get_name: function () {
        return this.name;
    },
    says: function () {
        return this.saying || '';
    }
};

var myCat = Object.create(myMammal);
myCat.name = "Henrietta";
myCat.saying = "meow";
myCat.purr = function (n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
        if (s) {
            s += '-';
        }
        s += 'r';
    }
    return s;
};
myCat.get_name = function () {
    return this.says() + ' ' + this.name + ' ' + this.says();
}

/*
 * 函数化（Functional）
 */
// 构造一个生成对象的函数，该函数包括4个步骤:

// 1. 创建一个新对象。有很多方法去构造一个对象，它可以构造一个对象字面量，或者
//    它可以和new前缀连用去调用一个构造器函数，或者它可以使用Object.create()
//    方法去构造一个已经存在的对象的新实例，或者它可以调用任意一个会返回一个对
//    象的函数
// 2. 有选择的定义私有实例变量和方法。 这些都是函数中通过var语句定义的普通变量
// 3. 给这个新的对象扩充方法。这些方法拥有特权去访问参数，以及在第2步中通过var
//    语句定义的变量
// 4. 返回那个新对象
var constructor = function (spec, my) {
    var that; // 以及其他私有实例变量
    my = my || {};
    
    // 把共享的变量和函数添加到my中

    // that = 一个新的对象

    // 添加给that的特权方法
    
    return that;
};
// Example: Mammal中
var mammal = function (spec) {
    var that = {};

    that.get_name = function () {
        return spec.name;
    };
    that.says = function () {
        return spec.saying || "";
    };
    return that;
}
var myMammal = mammal({name: "Herb"});
var cat = function (spec) {
    spec.saying = spec.saying || 'meow';
    var that = mammal(spec);
    that.purr = function (n) {
        var i, s = '';
        for (i = 0; i < n; i += 1) {
            if (s) {
                s += '-';
            }
            s += 'r';
        }
        return s;
    };
    that.get_name = function() {
        return that.says() + " " + spec.name + " " + that.says();
    };
    return that;
};
var myCat = cat({name: "Henrietta"});

Object.method('superior', function (name) {
    var that = this,
        method = that[name];
    return function () {
        return method.apply(that, arguments);
    }
});

var coolcat = function (spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name');
    that.get_name = function () {
        return 'like ' + super_get_name() + ' baby';
    };
    return that;
}
var myCoolCat = coolcat({name: "Bix"});
var name = myCoolCat.get_name();