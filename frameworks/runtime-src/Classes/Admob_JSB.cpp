//
//  Admob_JSB.cpp
//  DieWater3
//
//  Created by q on 14-10-5.
//
//

#include "Admob_JSB.h"
//#include "AdmobHelper-Interface.h"
//#include "AdmobHelper.h"
#include "platform/android/jni/JniHelper.h"
#include <jni.h>
#include <android/log.h>
const char* NativeActivityClassName = "com/shunchengfeng/DieWater3/AppActivity";

class AdmobHelper
{
public:
    static void showAds(){
    	cocos2d::JniMethodInfo t;
		if (cocos2d::JniHelper::getStaticMethodInfo(t
		                                                , NativeActivityClassName
		                                                , "showAd"
		                                                , "()V"))
		{
		  t.env->CallStaticVoidMethod(t.classID, t.methodID);
		  t.env->DeleteLocalRef(t.classID);
		}
    }
//if necessary, you can add other methods to control AdView(e.g. dismiss the AdView).
};


bool jsb_register_addAd(JSContext* cx,uint32_t argc,JS::Value* vp)
{
    AdmobHelper::showAds();
    
    return true;
}

// bool jsb_register_hidenAd(JSContext* cx,uint32_t argc,JS::Value* vp)
// {
//     hidenBarAd();
//     return true;
// }

// bool jsb_register_releaseBarAd(JSContext* cx,uint32_t argc,JS::Value* vp)
// {
//     releaseBarAd();
//     return true;
// }

void JSB_register_Admob(JSContext* cx, JSObject* obj)
{
    JS_DefineFunction(cx,obj,"jsb_register_addAd",jsb_register_addAd,0,0);
    // JS_DefineFunction(cx,obj,"jsb_register_hidenAd",jsb_register_hidenAd,0,0);
    // JS_DefineFunction(cx,obj,"jsb_register_releaseBarAd",jsb_register_releaseBarAd,0,0);
}