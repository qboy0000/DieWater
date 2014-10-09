//
//  GChelper.m
//  AngryPiggy
//
//  Created by mac on 12-5-8.
//  Copyright 2012年 __MyCompanyName__. All rights reserved.
//

#import "GCHelper.h"
//#import "AppDelegate.h"
#include "GameCenterHelper-Interface.h"

void authenticateLocalUserI()
{
    [[GCHelper sharedInstance] authenticateLocalUser];
}

//显示成就
void showAchievementsI()
{
    [[GCHelper sharedInstance] AchievementviewController];
    //[GCHelper sharedInstance] show
}

//显示排行榜
void showLeaderboardI()
{
    [[GCHelper sharedInstance] LeaderboardviewControler];
}

void reportAchievementIdentifierI(const char* achId)
{
    NSString * nsAchid = [[NSString alloc] initWithUTF8String:achId];
    [GCHelper reportAchievementIdentifier:nsAchid percentComplete:100];
    [nsAchid release];
}

void showEvaluationI()
{
    NSString *url = [NSString stringWithFormat:@"itms-apps://ax.itunes.apple.com/WebObjects/MZStore.woa/wa/viewContentsUserReviews?type=Purple+Software&id=%d",910978158];
    [[UIApplication sharedApplication] openURL:[NSURL URLWithString:url]];
}

void reportScoreI(const char* Leaderboardid,int score)
{
    NSString *sleaderboardid = [[NSString alloc] initWithUTF8String:Leaderboardid];
    [GCHelper reportScore:score forCategory:sleaderboardid];
    [sleaderboardid release];
}

@implementation GCHelper

@synthesize gameCenterAvailable;
@synthesize presentingviewController;
//@synthesize gcowerner = gcowerner_;
#pragma mark Initialization

static GCHelper *sharedHelper = nil;
+ (GCHelper *) sharedInstance {
    if (!sharedHelper) {
        sharedHelper = [[GCHelper alloc] init];
    }
    return sharedHelper;
}

-(BOOL)isGameCenterAvailable {
    // check for presence of GKLocalPlayer API
    Class gcClass = (NSClassFromString(@"GKLocalPlayer"));
    
    // check if the device is running iOS 4.1 or later
    NSString *reqSysVer = @"4.1";
    NSString *currSysVer = [[UIDevice currentDevice] systemVersion];
    BOOL osVersionSupported = ([currSysVer compare:reqSysVer 
                                           options:NSNumericSearch] != NSOrderedAscending);
    
    return (gcClass && osVersionSupported);
    return YES;
}

- (id)init {
    if ((self = [super init])) {
        gameCenterAvailable = [self isGameCenterAvailable];
        if (gameCenterAvailable) {
            NSNotificationCenter *nc = 
            [NSNotificationCenter defaultCenter];
            [nc addObserver:self 
                   selector:@selector(authenticationChanged) 
                       name:GKPlayerAuthenticationDidChangeNotificationName 
                     object:nil];
            //            [self retrieveTopTenScores]; 
            
        }
    }
    return self;
}

-(void)getLocalPlayerRank:(NSString*)category{
    NSArray* arr = [NSArray arrayWithObjects:[self getLocalPlayID], nil];
    GKLeaderboard *leaderboardRequest = [[[GKLeaderboard alloc] initWithPlayerIDs:arr] autorelease];
    if (leaderboardRequest != nil)
    {
        leaderboardRequest.category = category;
        [leaderboardRequest loadScoresWithCompletionHandler:^(NSArray *scores, NSError *error) {
            if (scores != nil){
                // process the score information.

                for (GKScore *obj in scores) {
                    NSLog(@"    playerID            : %@",obj.playerID);
                    NSLog(@"    category            : %@",obj.category);
                    NSLog(@"    date                : %@",obj.date);
                    NSLog(@"    formattedValue    : %@",obj.formattedValue);
                    NSLog(@"    value                : %lld",obj.value);
                    NSLog(@"    rank                : %d",obj.rank);
                    
                    NSLog(@"**************************************");
//                    if (gcowerner_&&[gcowerner_ respondsToSelector:@selector(afterGetRank:rank:)]) {
//                        [gcowerner_ afterGetRank:category rank:obj.rank];
//                    }
                    break;
                    //return obj.rank;
                }
            }
        }];
    }
}

- (void) retrieveTopTenScores
{
    [self getScoreRangeByCategory:@"chapter1" range:NSMakeRange(1,10)];
}

-(void)getScoreRangeByCategory:(NSString*)category range:(NSRange)range{
    GKLeaderboard *leaderboardRequest = [[[GKLeaderboard alloc] init] autorelease];
    if (leaderboardRequest != nil)
    {
        leaderboardRequest.playerScope = GKLeaderboardPlayerScopeGlobal;
        leaderboardRequest.timeScope = GKLeaderboardTimeScopeAllTime;
        leaderboardRequest.range = range;
        leaderboardRequest.category = category;
        [leaderboardRequest loadScoresWithCompletionHandler: ^(NSArray *scores, NSError *error) {
            if (error != nil){
                NSLog(@"下载失败");
            }
            if (scores != nil){
                NSLog(@"下载成功....");
                NSArray *tempScore = [NSArray arrayWithArray:leaderboardRequest.scores];
                for (GKScore *obj in tempScore) {
                    NSLog(@"    playerID            : %@",obj.playerID);
                    NSLog(@"    category            : %@",obj.category);
                    NSLog(@"    date                : %@",obj.date);
                    NSLog(@"    formattedValue    : %@",obj.formattedValue);
                    NSLog(@"    value                : %lld",obj.value);
                    NSLog(@"    rank                : %d",obj.rank);
                    NSLog(@"**************************************");
                }
//                
//                if (gcowerner_&&[gcowerner_ respondsToSelector:@selector(afterGetRange:score:)]) {
//                    [gcowerner_ afterGetRange:category score:tempScore];
//                }
            }
        }];
    }
}

- (void)authenticationChanged { 
    
    if ([GKLocalPlayer localPlayer].isAuthenticated && !userAuthenticated) {
        NSLog(@"Authentication changed: player authenticated.");
        userAuthenticated = TRUE; 
        
        
    } else if (![GKLocalPlayer localPlayer].isAuthenticated && userAuthenticated) {
        NSLog(@"Authentication changed: player not authenticated");
        userAuthenticated = FALSE;
    }
    
}

#pragma mark User functions

- (void)authenticateLocalUser { 
    
    if (!gameCenterAvailable) return;
    
    NSLog(@"Authenticating local user...");
    if ([GKLocalPlayer localPlayer].authenticated == NO) { 
        [[GKLocalPlayer localPlayer] authenticateWithCompletionHandler:nil];
        NSString *reqSysVer = @"6.0";
        NSString *currSysVer = [[UIDevice currentDevice] systemVersion];
        if ([currSysVer compare:reqSysVer options:NSNumericSearch] != NSOrderedAscending)
        {
            // Gamekit login for ios 6
            [[GKLocalPlayer localPlayer] setAuthenticateHandler:(^(UIViewController* viewcontroller, NSError *error) {
                if(error){
                    NSLog(@"ERROR CODE:%d MSG:%@",[error code],[[[error userInfo] allValues] objectAtIndex:0]);
                   // NSLog(error ge)
                }
                if (viewcontroller != nil) {
                   UIViewController * root =  [UIApplication sharedApplication].keyWindow.rootViewController;
                   //AppDelegate* delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
                    //RootViewController* root = (RootViewController*)delegate.viewController;
                    [root presentViewController:viewcontroller animated:YES completion:nil];
                }
            })];
        } else {
            // Gamekit login for ios 5
            [[GKLocalPlayer localPlayer] authenticateWithCompletionHandler:^(NSError *error){
                if (error != nil) {
                    //错误处理
                    NSLog(@"失败  %@",error);
                }
            }];
        }
        NSLog(@"gameCenter认证");
    } else {
        NSLog(@"Already authenticated!");
    }
} 

+(void)reportScore: (int64_t) score forCategory: (NSString*) category
{
    int score_=score;
    NSString *category_=category;
    GKScore *scoreReporter = [[[GKScore alloc] initWithCategory:category_] autorelease];
    scoreReporter.value = score_;
    
    [scoreReporter reportScoreWithCompletionHandler:^(NSError *error) 
     {
         if (error != nil)
         {
             // handle the reporting error
             NSLog(@"上传分数出错.");
             //If your application receives a network error, you should not discard the score.
             //Instead, store the score object and attempt to report the player’s process at
             //a later time.
         }else {
             NSLog(@"上传分数成功"); 
             
         }
         
     }];
    
}

+ (void) reportAchievementIdentifier: (NSString*) identifier percentComplete: (float) percent
{
    NSString *identifier_=identifier;
    float percent_=percent;
    GKAchievement *achievement = [[[GKAchievement alloc] initWithIdentifier: identifier_] autorelease];
    if (achievement)
    {
        achievement.percentComplete = percent_;
        [achievement reportAchievementWithCompletionHandler:^(NSError *error)
         {
             if (error != nil)
             {
                 //The proper way for your application to handle network errors is retain
                 //the achievement object (possibly adding it to an array). Then, periodically
                 //attempt to report the progress until it is successfully reported.
                 //The GKAchievement class supports the NSCoding protocol to allow your
                 //application to archive an achie
                 NSLog(@"报告成就进度失败 ,错误信息为: \n %@",error);
             }else {
                 //对用户提示,已经完成XX%进度
                 NSLog(@"报告成就进度---->成功!");
                 NSLog(@"    completed:%d",achievement.completed);
                 NSLog(@"    hidden:%d",achievement.hidden);
                 NSLog(@"    lastReportedDate:%@",achievement.lastReportedDate);
                 NSLog(@"    percentComplete:%f",achievement.percentComplete);
                 NSLog(@"    identifier:%@",achievement.identifier);
             }
         }];
    }
}


////remove G:
-(NSString*)getLocalPlayID{
    if ([GKLocalPlayer localPlayer].isAuthenticated) {
        NSLog(@"playid:%@",[[GKLocalPlayer localPlayer].playerID substringFromIndex:2]);
        return [[GKLocalPlayer localPlayer].playerID substringFromIndex:2];
    }
    else{

#ifdef __IPHONE_6_0
//            [[GKLocalPlayer localPlayer] setAuthenticateHandler:(^(UIViewController* viewcontroller, NSError *error) {
//                if (viewcontroller != nil) {
//                    AppDelegate* delegate = (AppDelegate*)[UIApplication sharedApplication].delegate;
//                    UIViewController* root = (UIViewController*)delegate.viewController;
//                    [root presentViewController:viewcontroller animated:YES completion:nil];
//                }
//            })];
#else
            [[GKLocalPlayer localPlayer] authenticateWithCompletionHandler:^(NSError *error){
                if (error == nil) {
                    //成功处理
                    //[GameHelper resetAll:NO];//切换用户时看是否要重新复制Plist文件
                    NSLog(@"成功");
                    NSLog(@"1--alias--.%@",[GKLocalPlayer localPlayer].alias);
                    //            NSLog(@"2--authenticated--.%d",[GKLocalPlayer localPlayer].authenticated);
                    //            NSLog(@"3--isFriend--.%d",[GKLocalPlayer localPlayer].isFriend);
                    NSLog(@"4--playerID--.%@",[GKLocalPlayer localPlayer].playerID);
                    NSLog(@"5--underage--.%d",[GKLocalPlayer localPlayer].underage);
                    //tempPalyID=[GKLocalPlayer localPlayer].playerID;
                }else {
                    //错误处理
                    NSLog(@"失败  %@",error);
                }
            }];
#endif
        //}
        return @"testUser";
    }
    //NSLog(@"playid:%@",[[GKLocalPlayer localPlayer].playerID substringFromIndex:2]);
    //return [[GKLocalPlayer localPlayer].playerID substringFromIndex:2];
}

-(void)AchievementviewController
{
    if(!gameCenterAvailable)return;
    self.presentingviewController=[UIApplication sharedApplication].keyWindow.rootViewController;
    GKAchievementViewController* scoreview2=[[[GKAchievementViewController alloc] init] autorelease];
    scoreview2.achievementDelegate=self;
    [presentingviewController presentModalViewController:scoreview2 animated:YES];
    
}


-(void)LeaderboardviewControler
{
    if(!gameCenterAvailable)return;
    self.presentingviewController=[UIApplication sharedApplication].keyWindow.rootViewController;
    GKLeaderboardViewController* scoreview2=[[[GKLeaderboardViewController alloc] init] autorelease];
    scoreview2.leaderboardDelegate=self;
    [presentingviewController presentModalViewController:scoreview2 animated:YES];
}

- (void)achievementViewControllerDidFinish:(GKAchievementViewController *)viewController
{
    [[UIApplication sharedApplication].keyWindow.rootViewController dismissModalViewControllerAnimated:YES];
}
- (void)leaderboardViewControllerDidFinish:(GKLeaderboardViewController *)viewController
{
    [[UIApplication sharedApplication].keyWindow.rootViewController dismissModalViewControllerAnimated:YES];
}
@end

