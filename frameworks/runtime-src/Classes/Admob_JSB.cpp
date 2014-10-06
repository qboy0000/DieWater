//
//  Admob_JSB.cpp
//  DieWater3
//
//  Created by q on 14-10-5.
//
//

#include "Admob_JSB.h"
#include "AdmobHelper-Interface.h"

bool jsb_register_addAd(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    addBarAd();
    
    return true;
}

bool jsb_register_hidenAd(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    hidenBarAd();
    return true;
}

bool jsb_register_releaseBarAd(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    releaseBarAd();
    return true;
}

void JSB_register_Admob(JSContext* cx, JSObject* obj)
{
    JS_DefineFunction(cx,obj,"jsb_register_addAd",jsb_register_addAd,0,0);
    JS_DefineFunction(cx,obj,"jsb_register_hidenAd",jsb_register_hidenAd,0,0);
    JS_DefineFunction(cx,obj,"jsb_register_releaseBarAd",jsb_register_releaseBarAd,0,0);
}