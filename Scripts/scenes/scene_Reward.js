var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var scenes;
(function (scenes) {
    var SceneReward = /** @class */ (function (_super) {
        __extends(SceneReward, _super);
        function SceneReward(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            console.log('Reward current Level: ' + objects.Game.previousScene);
            _this.Start();
            return _this;
        }
        SceneReward.prototype.fn_ButtonClick = function () {
            console.log("PREVIOUS... " + objects.Game.previousScene);
            switch (objects.Game.previousScene) {
                case config.Scene.INGAME:
                    console.log("NEXT... Level 2");
                    objects.Game.currentScene = config.Scene.INGAME_2;
                    break;
                case config.Scene.INGAME_2:
                    console.log("NEXT... Level 3");
                    objects.Game.currentScene = config.Scene.INGAME_3;
                    break;
                case config.Scene.INGAME_3:
                    console.log("NEXT... Finish");
                    objects.Game.currentScene = config.Scene.FINISH;
                    break;
            }
        };
        SceneReward.prototype.Start = function () {
            console.log("REWARD MENU...");
            this.background = new objects.Background(this.assetManager, "background");
            this.txtButton = new objects.Label("Next Level", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75, this.txtButton, true);
            this.backButton.scaleX = 0.75;
            this.label = new objects.Label("Stage Complete!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.1, true);
            this.picturePlayer1 = new objects.GameObject(this.assetManager, "p1_big");
            this.picturePlayer1.x = 80;
            this.picturePlayer1.y = 150;
            //180, 150
            this.picturePlayer2 = new objects.GameObject(this.assetManager, "p2_big");
            this.picturePlayer2.x = 500;
            this.picturePlayer2.y = 150;
            //600, 150
            this.Main();
        };
        SceneReward.prototype.Update = function () {
            //updating the total score
            if (objects.Game.scoreManagerP1) {
                objects.Game.scoreManagerP1.Update();
            }
            if (objects.Game.scoreManagerP2) {
                objects.Game.scoreManagerP2.Update();
            }
        };
        SceneReward.prototype.Main = function () {
            var _this = this;
            this.addChild(this.background);
            this.addChild(this.label);
            //#region score
            this.addChild(this.picturePlayer1);
            this.addChild(this.picturePlayer2);
            //calculating the total
            if (objects.Game.scoreManagerP1) {
                objects.Game.scoreManagerP1.AddScoreToScene(this, 180, 150);
                objects.Game.scoreManagerP1.Calculate();
            }
            if (objects.Game.scoreManagerP2) {
                objects.Game.scoreManagerP2.AddScoreToScene(this, 600, 150);
                objects.Game.scoreManagerP2.Calculate();
            }
            //#endregion score
            //wait some seconds to show the button
            var callback = function () {
                _this.addChild(_this.backButton);
                _this.addChild(_this.txtButton);
            };
            this.StartCountdown(3, callback);
            this.backButton.on("click", this.fn_ButtonClick);
        };
        return SceneReward;
    }(objects.Scene));
    scenes.SceneReward = SceneReward;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_Reward.js.map