//
//  GCAPI_JSB.cpp
//  DieWater3
//
//  Created by q on 14-10-4.
//
//

#include "GCAPI_JSB.h"
#include "GameCenter_Bridge.h"
#include "cocos2d.h"
#include "jsapi.h"
#include "js_manual_conversions.h"
#include "GameCenterHelper-Interface.h"

bool jsb_register_ranking(JSContext* cx, uint32_t argc, JS::Value *vp)
{
    GameCenter_Bridge::showLeaderboardCPP();
    return true;
}
bool jsb_register_reportScore(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    if (argc>0) {
        JSString* str;
        JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S",&str);
        if (str) {
            JSStringWrapper wrapper(str);
            int score = atoi( wrapper.get());
            GameCenter_Bridge::reportScoreCPP(score);
        }
        
    }
    return true;
}

bool jsb_register_reportMove(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    if (argc>0) {
        JSString* str;
        JS_ConvertArguments(cx, argc, JS_ARGV(cx, vp), "S",&str);
        if (str) {
            JSStringWrapper wrapper(str);
            int score = atoi( wrapper.get());
            reportScoreI(LeaderBorder_Move_ID, score);
            //GameCenter_Bridge::reportScoreCPP(score);
        }
        
    }
    return true;
}


bool jsb_register_authenticateLocalUser(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    //GameCenter_Bridge::authenticateLocalUserCPP();
    return true;
}

void JSB_register_GCAPI(JSContext* cx, JSObject* obj)
{
    JS_DefineFunction(cx, obj, "jsb_register_authenticateLocalUser", jsb_register_authenticateLocalUser, 0,0);
    JS_DefineFunction(cx,obj,"jsb_register_ranking",jsb_register_ranking,0,0);
    JS_DefineFunction(cx, obj, "jsb_register_reportScore", jsb_register_reportScore, 1, 0);
    JS_DefineFunction(cx, obj, "jsb_register_reportMove", jsb_register_reportMove, 1, 0);
    //JS_DefineFunction
    // register class
    //js_get_or_create_proxy
    //JSB_GCAPI_createClass(cx, myBinding, "IOSiAP");
//    JSB_Product_createClass(cx, myBinding, "Product");
}