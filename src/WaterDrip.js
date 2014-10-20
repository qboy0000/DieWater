/**
 * @author:丘国伟
 * @descripe:
 * @日期:2014年09月21日
 */

WaterType = {
            MINTYPE:8,
            CENTERTYPE:10,
            MAXType:12
      };

WaterDrip = cc.Sprite.extend({
    _waterType:null
//    ctor:function()
//    {
//        this._super();
//
//        var act1 = cc.moveBy(0.1,0,50);
//        var act2 = act1.reverse();
//        cc.log("AAAAAAAAAAAAA");
//        var act3 = cc.repeatForever(cc.sequence([act1,act2]));
//        this.runAction(act3);
//        return true;
//    }
});

WaterDrip.createWithIndex = function(index){
    //index = index%WaterType.MAXType;
    cc.log("WaterType:"+index);
	var fb = new WaterDrip(g_water_res[index]);
    fb._waterType = index;
    return fb;
}

WaterDrip.createRand = function() {
	return WaterDrip.createWithIndex(Math.round(Math.random() * WaterType.MAXType));
}
