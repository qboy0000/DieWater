/**
 * Created by 丘国伟 on 14-9-24.
 */

GameOver = cc.LayerColor.extend({
    ctor:function(){
        this._super();
        var bgcolor = cc.color(res.BG_COLOR.r,res.BG_COLOR.g,res.BG_COLOR.b,200);
        this.init(bgcolor);
        this.initLayer();
        return true;
    },
    initLayer:function()
    {
        var size = cc.director.getWinSize();

        var gameover = new cc.LabelTTF("Game Over!", "Arial", 94);
        // position the label on the center of the screen
        gameover.x = size.width / 2;
        gameover.y = size.height * 4 / 5;
        gameover.setFontFillColor(cc.color(119,110,101));
        // add the label as a child to this layer
        this.addChild(gameover, 5);
    },
    onEnter:function()
    {
        this._super();
        this.scheduleOnce(this.addMenu,0.5);
        //cc.log("ON ENTER!!!!");
    },
    addMenu:function(dt)
    {
        var size = cc.director.getWinSize();
        var restartItem = new cc.MenuItemImage(
            res.MENUITEM_PNG.RESTART_PNG,
            res.MENUITEM_PNG.RESTART_PNG,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        restartItem.attr({
            x: size.width >> 1,
            y: (size.height >> 1) + 70,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var shareItem = new cc.MenuItemImage(
            res.MENUITEM_PNG.SHARE_PNG,
            res.MENUITEM_PNG.SHARE_PNG,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        shareItem.attr({
            x: size.width >> 1,
            y: (size.height >> 1) - 70,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu([restartItem,shareItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }
});

GameOver.create = function()
{
    var go = new GameOver();
    return go;
}