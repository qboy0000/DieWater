/**
 * Created by 丘国伟 on 14-9-26.
 */

var ShareSDKHelper;

ShareSDKHelper = {};

ShareSDK = {
    contentType:{
        Text:'aaa'
    }
};

var Share = {
    ShareSDKKey : "3381fa3208e8",
    Secret:"88b77c6c318592939e086697dc86b36a"
}

ShareSDKHelper.init = function()
{
    //ShareSDK.open(Share.ShareSDKKey, true);
}

var params = {
    "text" : "测试的文字",
    "imageUrl" : "http://img0.bdstatic.com/img/image/shouye/tangwei.jpg",
    "title" : "测试的标题",
    "titleUrl" : "http://sharesdk.cn",
    "description" : "测试的描述",
    "site" : "ShareSDK",
    "siteUrl" : "http://sharesdk.cn",
    "type" : ShareSDK.contentType.Text
};

ShareSDKHelper.auth = function()
{

}

ShareSDKHelper.share = function(score,callback)
{

    //ShareSDK.shareContent()
    //ShareSDK.shareContent(ShareSDK.platformID.SinaWeibo, params, callback);
}