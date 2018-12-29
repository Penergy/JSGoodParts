/**
 * Simple Factory
 */
// 篮球基类
var Basketball = function() {
    this.intro = "Basketball is popular in U.S.A";
}
Basketball.prototype = {
    getMember: function() {
        console.log('Team needs 5 members');
    },
    getBallSize: function() {
        console.log('Ball is very big.')
    }
}
// 足球基类
var Football = function() {
    this.intro = "Football is popular in the world.";
}
Football.prototype = {
    getMember: function() {
        console.log('Team needs 11 members');
    },
    getBallSize: function() {
        console.log('Ball is very big.')
    }
}
// 网球基类
var Tennis = function() {
    this.intro = "Tennis is popular in U.K.";
}
Tennis.prototype = {
    getMember: function() {
        console.log('Team needs 1 members');
    },
    getBallSize: function() {
        console.log('Ball is very small.')
    }
}
// 运动工厂
var sportsFactory = function(name) {
    switch(name) {
        case "NBA":
            return new Basketball();
        case "worldCup":
            return new Football();
        case "FrenchOpen":
            return new Tennis();
    }
}

var football = sportsFactory('worldCup');
console.log(football);
console.log(football.intro);
football.getMember();

/**
 * 建造者模式（Builder）
 */
// Create a Human class
var Human = function(param) {
    // skill
    this.skill = param && param.skill || 'secret';
    // hobby
    this.hobby = param && param.hobby || 'secret';
}
// Human class prototype
Human.prototype = {
    getSkill: function() {
        return this.skill;
    },
    getHobby: function() {
        return this.hobby;
    }
}
// Instance Name class
var Named = function() {
    var that = this;
    // constructor 
    // 构造函数解析姓与名
    (function(name, that) {
        that.wholeName = name;
        if(name.indexOf(' ') > -1) {
            that.FirstName = name.slice(0, name.indexOf(' '));
            that.secondName = name.slice(1, name.indexOf(' '));
        }
    })(name, that);
}
// Instance Work class
var Work = function(work) {
    var taht = this;
    // constructor
    // 构造函数中通过传入职位特征来设置相应职位以及描述
    (function(work, that) {
        switch(work) {
            case 'code':
                that.work = '工程师';
                that.workDescript = '每天'
        }
    })
}