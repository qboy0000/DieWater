/**
 * Created by QGW on 2015/2/7.
 * GameIndex 页
 * 预计先分两种方式（经典模式、计时模式）
 */

var GameIndexLayer = cc.Layer.extend({
    onEnter:function(){
        this._super();
        this.showView();
    },
    ctor:function(){
        this._super();
    },
    showView:function(){
        var menuCount = 2;
        var menuHeight = 100;
        var size = cc.visibleRect;
        var y = size.height / 2 + (menuHeight)*(menuCount/2);
        var x = size.width / 2;
        //经典模式
        cc.MenuItemFont.setFontSize(48);
        var classicmenu = new cc.MenuItemFont("Classic Mode",function(){
            GameScene.getInstance().showClassicGameLayer();
        },this);
        classicmenu.attr({
            x:x,
            y:y
        });
        y -= menuHeight;

        var timeModeMenu = new cc.MenuItemFont("Timing Mode",function(){

        },this);
        timeModeMenu.attr({
            x:x,
            y:y
        });

        var menu = new cc.Menu(classicmenu,timeModeMenu);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }
})