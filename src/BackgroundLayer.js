/**
 * Created by QGW on 2015/2/7.
 * 背景层
 */

var BackGroundLayer = cc.Layer.extend({
    onEnter:function(){
        this._super();
        var size = cc.visibleRect;

        var bgLayer = new cc.LayerColor(res.BG_COLOR);
        var bg = new cc.Sprite(res.BG_PNG);// cc.Sprite.create(res.BG_PNG);
        bg.setAnchorPoint(cc.p(0,0));//anchorX(0);
        //bg.anchorY(0);
        bgLayer.addChild(bg);
        this.addChild(bgLayer, 0);

        var sptitle = new cc.Sprite(res.TITLE_PNG);
        sptitle.attr({
            x:size.width / 2,
            y:size.height - 80,
        });
        this.addChild(sptitle);
    }
});