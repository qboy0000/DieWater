//
//  GChelper.h
//  AngryPiggy
//
//  Created by mac on 12-5-8.
//  Copyright 2012年 __MyCompanyName__. All rights reserved.
//

/*
//上传得分/每关
NSString *category=[NSString stringWithFormat:@"Money"];
[GCHelper reportScore:rc.AllGold forCategory:category];
*/

#import <Foundation/Foundation.h>
#import <GameKit/GameKit.h>

@interface GCHelper : NSObject<GKAchievementViewControllerDelegate,GKLeaderboardViewControllerDelegate>
{
    BOOL gameCenterAvailable;
    BOOL userAuthenticated;
    UIViewController *presentingviewController;
    //id<GCDelegate> gcowerner_;
}

@property (assign, readonly) BOOL gameCenterAvailable;
@property (retain)UIViewController *presentingviewController;
//@property (assign) id<GCDelegate> gcowerner;
+(GCHelper *)sharedInstance;
-(void)authenticateLocalUser;
+(void)reportScore: (int64_t) score forCategory: (NSString*) category;
+(void)reportAchievementIdentifier: (NSString*) identifier percentComplete: (float) percent;
-(void)AchievementviewController;
-(void)LeaderboardviewControler;
-(NSString*)getLocalPlayID;
-(void) retrieveTopTenScores;
-(void)getLocalPlayerRank:(NSString*)category;
-(void)getScoreRangeByCategory:(NSString*)category range:(NSRange)range;
@end

