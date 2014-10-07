//
//  ShareSDK_JSB.cpp
//  DieWater3
//
//  Created by q on 14-10-6.
//
//

#include "ShareSDK_JSB.h"
#include "C2DXShareSDK.h"

using namespace cn::sharesdk;

bool jsb_register_shareContent(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    __Dictionary* content = __Dictionary::create();
    content -> setObject(CCString::create("本年度最好玩的游戏，没有之一"), "content");
    content -> setObject(CCString::create("https://mmbiz.qlogo.cn/mmbiz/qIjJhS2CeqMLpNP0GURL8KciaeDwVEdZAHGDicicBicHwbchSaRzs1VZWlmAOduCGgDt76D2LdOEtqoonCicCP3cicgg/0"), "image");
    content -> setObject(CCString::create("消失的水滴"), "title");
    content -> setObject(CCString::create("消失的水滴"), "description");
    content -> setObject(CCString::create("http://www.shunchengfeng.com"), "url");
    content -> setObject(CCString::createWithFormat("%d", C2DXContentTypeNews), "type");
    
    C2DXShareSDK::showShareMenu(NULL, content, Point(100, 100), C2DXMenuArrowDirectionUp, NULL);
    //C2DXShareSDK::shareContent(C2DXPlatTypeAny, content, NULL);
    //shareScoreContent(0);
    return true;
}

void JSB_register_ShareSDK(JSContext* cx, JSObject* obj){
    JS_DefineFunction(cx, obj, "jsb_register_shareContent", jsb_register_shareContent, 1,0);
}
