//
//  GameCenter_Bridge.cpp
//  DieWater3
//
//  Created by q on 14-10-2.
//
//

#include "GameCenter_Bridge.h"
#include "GameCenterHelper-Interface.h"

void GameCenter_Bridge::authenticateLocalUserCPP()
{
    authenticateLocalUserI();
}

void GameCenter_Bridge::showAchievementsCPP()
{
    showAchievementsI();
}

void GameCenter_Bridge::showLeaderboardCPP()
{
    showLeaderboardI();
}

//上传成就
void GameCenter_Bridge::reportAchievementIdentifierCPP(const char* achId)
{
    reportAchievementIdentifierI(achId);
}

//打开评价页面
void GameCenter_Bridge::showEvaluationCPP()
{
    showEvaluationI();
}

void GameCenter_Bridge::reportScoreCPP(int score)
{
    reportScoreI(LeaderBorder_Score_ID, score);
}