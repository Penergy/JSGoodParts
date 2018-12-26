function Computer( id, data_source ){
    this.id = id;
    this.data_source = data_source;
}

//没有重构之前的源代码，这种写法中规中矩，初级程序员都会直观想到这种方式。作为大牛的你一定不会这么平庸的写代码
Computer.prototype = {
    mouse : function() {
        var info = this.data_source.get_mouse_info( this.id ),
            price = this.data_source.get_mouse_price( this.id ),
            result = "mouse:" + info + price;
        price >= 100? return "*" + result : return result;
    }
    keyboard : function() {
        var info = this.data_source.get_keyboard_info( this.id ),
            price = this.data_source.get_keyboard_price( this.id ),
            result = "mouse:" + info + price;
        price >= 100? return "*" + result : return result;
    }

    /*

   此处略去其他显示器，音响之类的信息。

   */
}