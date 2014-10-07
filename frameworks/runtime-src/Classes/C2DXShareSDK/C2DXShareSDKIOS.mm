//
//  C2DXShareSDKIOS.mm
//  Road2God
//
//  Created by q on 14-4-3.
//
//

#import "C2DXShareSDKIOS.h"
#import <ShareSDK/ShareSDK.h>

void shareTest(){
    NSString *imagePath = [[NSBundle mainBundle] pathForResource:@"Icon"  ofType:@"png"];
    
    id<ISSContent> publishContent = [ShareSDK content:@"这游戏还行~画面可以，不坑 能玩下。"
                                       defaultContent:@"这游戏还行~画面可以，不坑 能玩下。"
                                                image:[ShareSDK imageWithPath:imagePath]
                                                title:@"ShareSDK"
                                                  url:@"http://www.1000dream.com"
                                          description:@"这游戏还行~画面可以，不坑 能玩下。"
                                            mediaType:SSPublishContentMediaTypeNews];
    
    [ShareSDK showShareActionSheet:nil
                         shareList:nil
                           content:publishContent
                     statusBarTips:YES
                       authOptions:nil
                      shareOptions: nil
                            result:^(ShareType type, SSResponseState state, id<ISSPlatformShareInfo> statusInfo, id<ICMErrorInfo> error, BOOL end) {
                                if (state == SSResponseStateSuccess)
                                {
                                    NSLog(@"分享成功");
                                }
                                else if (state == SSResponseStateFail)
                                {
                                    NSLog(@"分享失败,错误码:%d,错误描述:%@", [error errorCode], [error errorDescription]);
                                }
                            }];
}