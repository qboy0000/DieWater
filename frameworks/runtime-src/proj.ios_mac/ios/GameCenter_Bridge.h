//
//  GameCenter_Bridge.h
//  DieWater3
//
//  Created by q on 14-10-2.
//
//

#ifndef __DieWater3__GameCenterHelper__
#define __DieWater3__GameCenterHelper__


#include <stdio.h>

class GameCenter_Bridge
{
public:
    //认证用户
    static void authenticateLocalUserCPP();
    
    //显示成就
    static void showAchievementsCPP();
    
    //显示排行榜
    static void showLeaderboardCPP();
    //上传成就
    static void reportAchievementIdentifierCPP(const char* achId);
    
    //打开评价页面
    static void showEvaluationCPP();

    static void reportScoreCPP(int score);
};

#endif /* defined(__DieWater3__GameCenterHelper__) */
