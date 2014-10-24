//
//  ShareSDK_JSB.cpp
//  DieWater3
//
//  Created by q on 14-10-6.
//
//

#include "ShareSDK_JSB.h"
#include "C2DXShareSDK.h"
#include "jsapi.h"
#include "js_manual_conversions.h"

using namespace cn::sharesdk;

bool jsb_register_shareContent(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    int score = 0;
    if (argc>0) {
        JSString* str;
        JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S",&str);
        if (str) {
            JSStringWrapper wrapper(str);
            score = atoi( wrapper.get());
        }
        
    }
    __Dictionary* content = __Dictionary::create();
    content -> setObject(CCString::createWithFormat("nice！ I got %d score,what about you?",score), "content");
    content -> setObject(CCString::create("http://ww2.sinaimg.cn/large/84034e23gw1elgmnj7hjej203c03cq2x.jpg"), "image");
    content -> setObject(CCString::create("Kiss Donuts"), "title");
    content -> setObject(CCString::create("Kiss Donuts"), "description");
    content -> setObject(CCString::create("http://game.shunchengfeng.com/kissdonuts"), "url");
    content -> setObject(CCString::createWithFormat("%d", C2DXContentTypeNews), "type");
    
    //C2DXShareSDK::s
    
    C2DXShareSDK::showShareMenu(NULL, content, CCPoint(100, 100), C2DXMenuArrowDirectionUp, NULL);
    //C2DXShareSDK::shareContent(C2DXPlatTypeAny, content, NULL);
    //shareScoreContent(0);
    return true;
}

void JSB_register_ShareSDK(JSContext* cx, JSObject* obj){
    JS_DefineFunction(cx, obj, "jsb_register_shareContent", jsb_register_shareContent, 1,0);
}
