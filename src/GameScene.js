
//require("src/FrameBroder.js");


GameLayer = cc.Layer.extend({
    _horizontalCount: 5,//横向
    _verticalCount: 5,//纵向
    _waterStateArr: null,//水位置状态，0代表无，其他是水的实例
    _waterFramer: null,
    _touchesPoint: null,
    _minMoveDistance: 50,
    _blMoving: false,
    _moveCount: 0,//移动次数
    _score: 0,
    _scoreLabel: null,
    _moveCountLabel: null,
    _bestScoreLable: null,
    _besetScore:0,
    ctor: function () {
        this._super();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        var size = cc.director.getWinSize();

        var title = new cc.LabelTTF("Die Water", "Arial", 94);
        // position the label on the center of the screen
        title.x = size.width / 2;
        title.y = size.height - 60;
        title.setFontFillColor(cc.color(119, 110, 101));
        this.addChild(title);

        var iconWidth = FrameBroder.DefaultWidth;
        var iconHeight = FrameBroder.DefaultHeight;
        var w = (size.width /2 ) - iconWidth * (this._verticalCount -1)/2;
        var h = (size.height /2 ) - iconHeight * (this._horizontalCount ) /2;

        this._waterStateArr = new Array();
        this._waterFramer = new Array();
        for (var i = 0; i < this._horizontalCount; i++) {
            this._waterStateArr[i] = new Array();
            this._waterFramer[i] = new Array();
            for (var j = 0; j < this._verticalCount; j++) {
                this._waterStateArr[i][j] = 0;
                var sprite = FrameBroder.create();
                sprite.attr({
                    x: iconWidth * i + w,
                    y: iconHeight * j + h
                });
                sprite.addLabel(i, j);
                this.addChild(sprite, 0);
                this._waterFramer[i][j] = sprite;
            }
        }

        this._scoreLabel = new cc.LabelTTF("Score:" + this._score);
        this._scoreLabel.fontSize = 46;
        this._scoreLabel.attr({
            x: size.width / 4,
            y: size.height / 2 + iconHeight * (this._horizontalCount) / 2 - 20
        });
        this.addChild(this._scoreLabel);
        this._scoreLabel.setFontFillColor(cc.color(187, 173, 160));

        this._moveCountLabel = new cc.LabelTTF("Move:" + this._score);
        this._moveCountLabel.fontSize = 46;
        this._moveCountLabel.attr({
            x: size.width * 0.75,
            y: size.height / 2 + iconHeight * (this._horizontalCount ) / 2 - 20
        });
        this.addChild(this._moveCountLabel);
        this._moveCountLabel.setFontFillColor(cc.color(187, 173, 160));

        this.addWater(5);

        this._besetScore = cc.sys.localStorage.getItem("BestScore");
        this._besetScore = this._besetScore || 0;
        this._bestScoreLable = new cc.LabelTTF("Best Score:"+ this._besetScore);

        this._bestScoreLable.fontSize = 46;
        this._bestScoreLable.attr({
            x: size.width * 0.25,
            y: size.height / 2 + iconHeight * (this._horizontalCount) / 2 + 45
        });
        this.addChild(this._bestScoreLable);
        this._bestScoreLable.setFontFillColor(cc.color(187, 173, 160));
        this.updateLabel();
        this.addMenu();

        if(jsb_register_addAd){
            jsb_register_addAd();
        }

        return true;
    },
    restart:function(){
        for (var i = 0; i < this._horizontalCount; i++) {
            for (var j = 0; j < this._verticalCount; j++) {
                if(this._waterStateArr[i][j]!=0){
                    this._waterStateArr[i][j].removeFromParent();
                    this._waterStateArr[i][j] = 0;
                }
            }
        }
        this._moveCount = 0;//移动次数
        this._score = 0;
        this.addWater(5);
        //this.scheduleOnce(this.addWater, 0.2);

        this.updateLabel();
    },
    addMenu:function(){
        var y = this._bestScoreLable.y;
        var size = cc.director.getWinSize();
        var restartItem = new cc.MenuItemImage(
            res.MENUITEM_PNG.RESTART_S_PNG,
            res.MENUITEM_PNG.RESTART_S_PNG,
            function (a) {
                this.restart();
                cc.log("Restart Menu is clicked!");
            }, this);
        restartItem.attr({
            x: this._bestScoreLable.x + (this._bestScoreLable.width+110)/2 +70,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var ranking = new cc.MenuItemImage(
            res.MENUITEM_PNG.RANKING_PNG,
            res.MENUITEM_PNG.RANKING_PNG,
            function () {
                //jsb_register_reportScore(100);
                if(jsb_register_ranking){
                    jsb_register_ranking();
                }
            }, this);
        ranking.attr({
            x: restartItem.x+120,
            y: y,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = new cc.Menu([restartItem,ranking]);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);
    },
    onTouchBegan: function (touch, event) {
        var contain = false;
        var me = event.getCurrentTarget();
        me._touchesPoint = touch.getLocation();
        //cc.log("TouchesPoint:x = "+me._touchesPoint.x+";y="+me._touchesPoint.y);
        for (i = 0; i < me._waterFramer.length && !contain; i++) {
            for (j = 0; j < me._waterFramer[i].length && !contain; j++) {
                var wrect = me._waterFramer[i][j].getTextureRect();
                wrect.x += me._waterFramer[i][j].x - wrect.width / 2;
                wrect.y += me._waterFramer[i][j].y - wrect.height / 2;
                contain = cc.rectContainsPoint(wrect, me._touchesPoint);
            }
        }
        return contain;
    },
    onTouchMoved: function (touch, event) {
        var me = event.getCurrentTarget();
        if (me._blMoving) {
            return;
        }
        var p = touch.getLocation();
        var absX = Math.abs(p.x - me._touchesPoint.x);
        var absY = Math.abs(p.y - me._touchesPoint.y);
        var blmove = false;
        if (absX > me._minMoveDistance)//moveX
        {
            blmove = true;
            //me.moveWater(p,true);
        }
        if (absY > me._minMoveDistance)//MoveY
        {
            blmove = true;
        }
        if (blmove) {
            if (absX > absY + me._minMoveDistance / 3) {
                me.moveWater(p, true);
            } else if (absY > absX + me._minMoveDistance / 3) {
                me.moveWater(p, false);
            }
        }
    },
    onTouchEnded: function (touch, event) {
        cc.log("onTouchEnded");
        var me = event.getCurrentTarget();
        if (me._blMoving) {
            me._blMoving = false;
            me._moveCount++;
            me.scheduleOnce(me.addWater, 0.2);

            me.updateLabel();
        }
    },
    updateLabel:function(){
        this._scoreLabel.setString("Score:" + this._score);
        this._moveCountLabel.setString("Move:" + this._moveCount);
        if(this._score>this._besetScore)
        {
            this._besetScore = this._score;
            jsb_register_reportScore(this._besetScore);
            cc.sys.localStorage.setItem("BestScore",this._besetScore);
            this._bestScoreLable.setString("Best Score:"+this._besetScore);
        }
    },
    moveWater: function (endPoint, isX) {
        cc.log("MoveWater");
        var dieCount = 0;
        if (isX) {
            if (endPoint.x > this._touchesPoint.x) {//To Right
                for (var i = this._horizontalCount - 2; i >= 0; i--) {
                    for (var j = this._verticalCount - 1; j >= 0; j--) {
                        var curWater = this._waterStateArr[i][j];
                        if (curWater == 0) {
                            continue;
                        }
                        var nextWater = this._waterStateArr[i + 1][j];
                        if (nextWater != 0) {
                            if (nextWater._waterType == curWater._waterType) {
                                this._waterStateArr[i][j] = 0;
                                this._waterStateArr[i + 1][j] = 0;
                                this.dieWater(curWater, nextWater);
                                dieCount++;
                                this._blMoving = true;
                            }
                        } else {
                            curWater.setPosition(this._waterFramer[i + 1][j].getPosition());
                            this._waterStateArr[i + 1][j] = curWater;
                            this._waterStateArr[i][j] = 0;
                            this._blMoving = true;
                        }
                    }
                }

            } else {//To Left
                for (var i = 1; i < this._horizontalCount; i++) {
                    for (var j = this._verticalCount - 1; j >= 0; j--) {
                        var curWater = this._waterStateArr[i][j];
                        if (curWater == 0) {
                            continue;
                        }
                        var nextWater = this._waterStateArr[i - 1][j];
                        if (nextWater != 0) {
                            if (nextWater._waterType == curWater._waterType) {
                                this._waterStateArr[i][j] = 0;
                                this._waterStateArr[i - 1][j] = 0;
                                this.dieWater(curWater, nextWater);
                                dieCount++;
                                this._blMoving = true;
                            }

                        } else {
                            curWater.setPosition(this._waterFramer[i - 1][j].getPosition());
                            this._waterStateArr[i - 1][j] = curWater;
                            this._waterStateArr[i][j] = 0;
                            this._blMoving = true;
                        }
                    }
                }
            }
        } else {
            if (endPoint.y > this._touchesPoint.y)//To Top
            {
                for (var j = this._horizontalCount - 2; j >= 0; j--) {
                    for (var i = this._horizontalCount - 1; i >= 0; i--) {
                        var curWater = this._waterStateArr[i][j];
                        if (curWater == 0) {
                            continue;
                        }
                        var nextWater = this._waterStateArr[i][j + 1];
                        if (nextWater != 0) {
                            if (nextWater._waterType == curWater._waterType) {
                                this._waterStateArr[i][j] = 0;
                                this._waterStateArr[i][j + 1] = 0;
                                this.dieWater(curWater, nextWater);
                                dieCount++;
                                this._blMoving = true;
                            }
                        } else {
                            curWater.setPosition(this._waterFramer[i][j + 1].getPosition());
                            this._waterStateArr[i][j + 1] = curWater;
                            this._waterStateArr[i][j] = 0;
                            this._blMoving = true;
                        }
                    }
                }
            } else //To Down
            {
                for (var j = 1; j < this._verticalCount; j++) {
                    for (var i = this._horizontalCount - 1; i >= 0; i--) {
                        var curWater = this._waterStateArr[i][j];
                        if (curWater == 0) {
                            continue;
                        }
                        var nextWater = this._waterStateArr[i][j - 1];
                        if (nextWater != 0) {
                            if (nextWater._waterType == curWater._waterType) {
                                this._waterStateArr[i][j] = 0;
                                this._waterStateArr[i][j - 1] = 0;
                                this.dieWater(curWater, nextWater);
                                dieCount++;
                                this._blMoving = true;
                            }
                        } else {
                            curWater.setPosition(this._waterFramer[i][j - 1].getPosition());
                            this._waterStateArr[i][j - 1] = curWater;
                            this._waterStateArr[i][j] = 0;
                            this._blMoving = true;
                        }
                    }
                }
            }
        }
        this._score+=Math.pow(dieCount,2);//每获得一个都是其平方倍的分数，例如：1^2 = 1;2^2 = 4;3^2 = 9;
    },
    dieWater: function (beginWater, endWater) {
        //this._score++;
        cc.log("beginType:" + beginWater._waterType + "endWaterType:" + endWater._waterType);
        beginWater.removeFromParent();
        endWater.removeFromParent();
    },
    addWater: function (num) {
        var num = num || 1;
        if (num<2&&Math.random() * 10 < 2) {
            num = 2;
        }

        for (k = 0; k < num; k++) {
            var i, j;
            var whileIndex = 0;
            do {
                i = Math.round(Math.random() * (this._horizontalCount - 1));
                j = Math.round(Math.random() * (this._verticalCount - 1));
                whileIndex++;
            } while (this._waterStateArr[i][j] != 0 && whileIndex < 50);
            if (whileIndex == 50) {
                cc.log("Game Over");
            } else {
                var waterdrip = WaterDrip.createRand();
                cc.log("i = " + i + "   j = " + j);

                var p = this._waterFramer[i][j].getPosition();
                waterdrip.setPosition(p);
                this.addChild(waterdrip);
                this._waterStateArr[i][j] = waterdrip;
            }
        }
        if (!this.checkFail()) {
            var gameOver = GameOver.create();
            gameOver.owerner = this;
            this.addChild(gameOver, 10);
            cc.log("Game Over");
        }
    },
    checkFail: function () {
        var blret = false;
        for (i = 0; i < this._waterStateArr.length && !blret; i++) {
            for (j = 0; j < this._waterStateArr[i].length && !blret; j++) {
                if (this._waterStateArr[i][j] == 0) {
                    blret = true;
                } else {
                    if (j < this._waterStateArr[i].length - 1) {
                        if (this._waterStateArr[i][j + 1] == 0) {
                            blret = true;
                        } else if (this._waterStateArr[i][j]._waterType == this._waterStateArr[i][j + 1]._waterType) {
                            blret = true;
                        }
                    }
                    if (i < this._waterStateArr.length - 1) {
                        if (this._waterStateArr[i + 1][j] == 0) {
                            blret = true;
                        } else if (this._waterStateArr[i + 1][j]._waterType == this._waterStateArr[i][j]._waterType) {
                            blret = true;
                        }
                    }
                }
            }
        }
        return blret;
    },
    onEnter:function(){
        this._super();

    }
});

var GameScene = cc.Scene.extend({
	onEnter:function () {
		this._super();
        var bgLayer = new cc.LayerColor(res.BG_COLOR);
        this.addChild(bgLayer, 0);
		var layer = new GameLayer();
		this.addChild(layer,1);
	}
});