var res = {
		HelloWorld_png : "res/HelloWorld.png",
		CloseNormal_png : "res/CloseNormal.png",
		CloseSelected_png : "res/CloseSelected.png",
        MENUITEM_PNG:
        {
            Continue_PNG:"res/continueItem.png",//Continue
            MENU_PNG:"res/menuItem.png",        //MENU
            RESTART_PNG:"res/restartItem.png",  //RESTART
            SETTINGS_PNG:"res/settingsItem.png",//SETTINGS
            SHARE_PNG:"res/shareItem.png",      //SHARE
            RANKING_PNG:"res/rankingItem.png",  //RANKING
            RESTART_S_PNG:"res/restartItem_s.png",//RESTART_SMALL
            SHARE_S_PNG:"res/shareItem_s.png"//SHARE_SMALL
        },
        BG_COLOR:cc.color(250,248,239),
        Effect_MP3:"res/select.mp3",
        BG_PNG:'res/bg.png',
        TITLE_PNG:'res/title.png',
        GameOver:'res/gameover.png'
};

var g_resources = [
                   //image
                   res.HelloWorld_png,
                   res.CloseNormal_png,
                   res.CloseSelected_png,

                   //plist

                   //fnt

                   //tmx

                   //bgm

                   //effect

                   ];

var g_water_res = [];
for(i = 1;i<=12;i++){
    var temp = "res/Image/ttq_"+i+".png";
    g_water_res.push(temp);
}