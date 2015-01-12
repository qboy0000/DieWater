/**
 * Created by q on 14/10/26.
 */

var ShareUI = cc.LayerColor.extend({
    ctor: function () {
        this._super(cc.color(0, 0, 0, 188), cc.winSize.width, cc.winSize.height);

        var arrow = new cc.Sprite(res.AllowPNG);
        arrow.anchorX = 1;
        arrow.anchorY = 1;
        arrow.x = cc.winSize.width* 0.95;
        arrow.y = cc.winSize.height*0.75;
        this.addChild(arrow);

        var label = new cc.LabelTTF("请点击右上角的菜单按钮\n再点\"分享到朋友圈\"\n让好友们挑战你的分数！", "宋体", 20, cc.size(cc.winSize.width*0.7, 250), cc.TEXT_ALIGNMENT_CENTER);
        label.x = cc.winSize.width/2;
        label.y = cc.winSize.height*0.75-100;
        label.anchorY = 1;
        this.addChild(label);
    },
    onEnter: function () {
        this._super();
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function (touch, event) {
                event.getCurrentTarget().removeFromParentAndCleanup();
                //this.removeFromParent();
                //TemplateUtils.popScene();
                return true;
            }
        }, this);
    },

    onExit: function () {
        cc.eventManager.removeListeners(this);
    }
});