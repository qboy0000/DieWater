
//FrameBroder.Image_Path = "res/Image/FrameBroder.png";

FrameBroder = cc.Sprite.extend({
//    rect:function () {
//        return cc.rect(-this._rect.width / 2, -this._rect.height / 2, this._rect.width, this._rect.height);
//    }
    addLabel:function(i,j)
    {
        //var lbl = cc.LabelTTF.create("i = "+i+"  j ＝ "+j);
        //lbl.setPosition({x:50,y:50});
        //this.addChild(lbl);
    }
});

FrameBroder.create = function(){
	return new FrameBroder("res/Image/FrameBroder.png");
	
}

FrameBroder.DefaultWidth = 114;
FrameBroder.DefaultHeight = 114;

//FrameBroder.property.addLable = function(i,j)
//{
//    var lbl = cc.LabelTTF.create("i = "+i+"j ＝ "+j);
//    this.addChild(lbl);
//}
