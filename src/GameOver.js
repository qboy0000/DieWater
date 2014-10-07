/**
 * Created by 丘国伟 on 14-9-24.
 */

//require("./ShareSDKJSApi/ShareSDK.js");
//require("./ShareSDKHelper.js");

GameOver = cc.LayerColor.extend({
    ctor:function(){
        this._super();
        var bgcolor = cc.color(res.BG_COLOR.r,res.BG_COLOR.g,res.BG_COLOR.b,200);
        this.init(bgcolor);
        //this.initLayer();
        return true;
    },
    initLayer:function(score,move)
    {
        score = score || 0;
        move = move || 0;
        var size = cc.director.getWinSize();

        var gameover = new cc.LabelTTF("Game Over!", "Arial", 94);
        // position the label on the center of the screen
        gameover.x = size.width / 2;
        gameover.y = size.height - 80;
        gameover.setFontFillColor(cc.color(119,110,101));
        // add the label as a child to this layer
        this.addChild(gameover, 5);

        var bestScore = cc.sys.localStorage.getItem("BestScore");

        var bestScoreLabel = new cc.LabelTTF("Best Score:"+bestScore, "Arial", 60);
        // position the label on the center of the screen
        bestScoreLabel.x = size.width / 2;
        bestScoreLabel.y = size.height/2+270;
        bestScoreLabel.setFontFillColor(cc.color(219,110,101));
        // add the label as a child to this layer
        this.addChild(bestScoreLabel, 5);

        var scoreLabel = new cc.LabelTTF("Your Score:"+score, "Arial", 60);
        // position the label on the center of the screen
        scoreLabel.x = size.width / 2;
        scoreLabel.y = size.height/2+200;
        scoreLabel.setFontFillColor(cc.color(119,110,101));
        // add the label as a child to this layer
        this.addChild(scoreLabel, 5);

        var moveLabel = new cc.LabelTTF("Your Move:"+move, "Arial", 60);
        // position the label on the center of the screen
        moveLabel.x = size.width / 2;
        moveLabel.y = size.height/2 + 130;
        moveLabel.setFontFillColor(cc.color(119,110,101));
        // add the label as a child to this layer
        this.addChild(moveLabel, 5);
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
            function (a,b,c) {
                if(this.owerner && this.owerner.restart){
                    this.owerner.restart();
                }
                this.removeFromParent();
                cc.log("Restart Menu is clicked!");
            }, this);
        restartItem.attr({
            x: size.width >> 1,
            y: (size.height >> 1) + 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var shareItem = new cc.MenuItemImage(
            res.MENUITEM_PNG.SHARE_PNG,
            res.MENUITEM_PNG.SHARE_PNG,
            function () {
                cc.log("Share Menu is clicked!");
                jsb_register_shareContent();
            }, this);
        shareItem.attr({
            x: size.width >> 1,
            y: (size.height >> 1) - 120,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu([restartItem,shareItem]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    }
});

GameOver.createWithScoreAndMove = function(score,move)
{
    var go = new GameOver();
    go.initLayer(score,move);
    return go;
}