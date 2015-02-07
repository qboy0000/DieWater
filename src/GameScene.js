
//require("src/FrameBroder.js");

cc.WHITE = cc.color(255,255,255);

gameScene = null;

var GameScene = cc.Scene.extend({
    ctro:function(){
        this._super();
        gameScene = this;
    },
	onEnter:function () {
		this._super();

        var bg = new BackGroundLayer();
        this.addChild(bg);
        this.showIndexView();
	},
    showIndexView:function(){

    },
    showGameIndexLayer:function(){
        var layer = new ClassicGameLayer();
        this.addChild(layer,1);
    }
});