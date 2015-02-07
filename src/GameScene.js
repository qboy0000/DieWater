/**
 * Created by 丘国伟 on 14-9-24.
 * Modify By Q on 2015/2/7
 *  将GameScene改成单例形式
 */

cc.WHITE = cc.color(255,255,255);

var GameScene = cc.Scene.extend({
    showViewNode:null,
    ctro:function(){
        this._super();
        gameScene = this;
    },
	onEnter:function () {
		this._super();
        var bg = new BackGroundLayer();
        this.addChild(bg);
        this.showViewNode = new cc.Node();
        this.addChild(this.showViewNode);
        this.showIndexView();
	},
    showIndexView:function(){
        var gil = new GameIndexLayer();
        this.showView(gil);
    },
    showClassicGameLayer:function(){
        var layer = new ClassicGameLayer();
        this.showView(layer);
    },
    showView:function(v)
    {
        this.showViewNode.removeAllChildren();
        if(v)
        {
            this.showViewNode.addChild(v);
        }
    }
});

GameScene._instance = null;

GameScene.getInstance = function(){
    if(GameScene._instance==null)
    {
        GameScene._instance = new GameScene();
    }
    return GameScene._instance;
}