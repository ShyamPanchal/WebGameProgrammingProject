var managers;
(function (managers) {
    var Score = /** @class */ (function () {
        function Score(items, time, previousScore) {
            if (previousScore === void 0) { previousScore = 0; }
            this.score = 0;
            this.timerCounter = 0;
            this.timer = 0;
            this.item = -1;
            this.score = previousScore;
            this.items = items;
            this.itemsScore = new Array();
            this.time = time;
            this.timer = time;
        }
        Score.prototype.Calculate = function () {
        };
        Score.prototype.Update = function () {
            if (this.timeScore != null) {
                this.timeScore.text = "" + this.time;
                //console.log('time update ' + this.time );
            }
            this.timerCounter++;
            //double the speed of the timer in the case the first player reach the end without the second player
            var speedTimer = 1 / 60;
            if (this.timerCounter == objects.Game.frameRate * speedTimer) {
                this.timer--;
                this.timerCounter = 0;
                switch (this.item) {
                    case -1:
                        if (this.time > 0) {
                            this.score += 1;
                            this.time -= 1;
                            //for the first item: time
                            if (this.totalScore != null) {
                                this.totalScore.text = "" + this.score;
                            }
                        }
                        else {
                            this.item++;
                        }
                        break;
                    default:
                        for (var i = 0; i < this.items.length; i++) {
                            var item = this.items[i];
                            if (i == this.item) {
                                if (item != null && item.scorePoints > 0) {
                                    var n = 10;
                                    if (item.scorePoints - n < 0) {
                                        n = 1;
                                    }
                                    item.scorePoints -= n;
                                    this.score += n;
                                    //for the first item: time
                                    if (this.itemsScore[this.item] != null) {
                                        this.itemsScore[this.item].text = "" + item.scorePoints;
                                        this.totalScore.text = "" + this.score;
                                    }
                                }
                                else {
                                    this.item++;
                                }
                            }
                        }
                        ;
                        break;
                }
            }
        };
        Score.prototype.AddScoreToScene = function (scene, x, y) {
            var _this = this;
            var lastYPosition = y;
            scene.addChild(new objects.Label("Time", "bold 28px", "Cambay", "#ffffff", x, lastYPosition, false));
            this.timeScore = new objects.Label("" + this.time, "bold 28px", "Cambay", "#ffffff", x + 200, lastYPosition, false);
            scene.addChild(this.timeScore);
            lastYPosition += 50;
            var i = 0;
            this.items.forEach(function (el) {
                if (el != null) { // removed item
                    scene.addChild(el);
                    el.x = x;
                    el.y = lastYPosition;
                    // add the amount
                    _this.itemsScore[i] = new objects.Label("" + _this.items[i].scorePoints, "bold 28px", "Cambay", "#ffffff", x + 200, lastYPosition, false);
                    scene.addChild(_this.itemsScore[i]);
                    lastYPosition += 50;
                }
                i++;
            });
            scene.addChild(new objects.Label("Total:", "bold 28px", "Cambay", "#ffffff", x, lastYPosition, false));
            this.totalScore = new objects.Label("0", "bold 28px", "Cambay", "#ffffff", x + 200, lastYPosition, false);
            scene.addChild(this.totalScore);
            return lastYPosition;
        };
        return Score;
    }());
    managers.Score = Score;
})(managers || (managers = {}));
//# sourceMappingURL=score.js.map