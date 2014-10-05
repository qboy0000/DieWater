//
//  GameCenter_Bridge-Interface.h
//  Flip
//
//  Created by q on 14-8-20.
//
//

#ifndef Flip_GameCenterHelper_Interface_h
#define Flip_GameCenterHelper_Interface_h

//#define ACH_100_STARTS "com.shunchengfeng.game.flip.100star"
#define ACH_Get_START  "com.shunchengfeng.game.flip.GetStar"

#define LeaderBorder_Score_ID "com.shunchengfeng.game.diewater.score"
//认证用户
void authenticateLocalUserI();

//显示成就
void showAchievementsI();

//显示排行榜
void showLeaderboardI();
//上传成就
void reportAchievementIdentifierI(const char* achId);

//打开评价页面
void showEvaluationI();

void reportScoreI(const char* Leaderboardid,int score);

#endif
