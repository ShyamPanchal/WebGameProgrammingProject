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
    var EndingScene = /** @class */ (function (_super) {
        __extends(EndingScene, _super);
        function EndingScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            objects.Game.skip = true;
            return _this;
        }
        EndingScene.prototype.fn_ButtonEndClick = function () {
            objects.Game.currentScene = config.Scene.FINISH;
        };
        EndingScene.prototype.Start = function () {
            if (objects.Game.isPlayingMusic == false) {
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic = true;
            }
            console.log("ENIDING MENU...");
            this.background = new objects.Background(this.assetManager, "level_04_house");
            this.txtContinueButton = new objects.Label("Continue", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.continueButton = new objects.Button(this.assetManager, "startButton", (1066 * 0.5) + 15, 600 * 0.8, this.txtContinueButton, true);
            this.continueButton.scaleX = 0.75;
            this.label = new objects.Label("Game End!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.25, true);
            this.label1 = new objects.Label("Thank you for Helping Us Escape!", "bold 50px", "Cambay", "#ffffff", 1066 * 0.5, this.label.y + 100, true);
            this.p1 = new objects.GameObject(this.assetManager, "player");
            this.p2 = new objects.GameObject(this.assetManager, "player2");
            this.p2.scaleX = this.p2.scaleX * -1;
            this.p1.x = 490;
            this.p1.y = 350;
            this.p2.x = 590;
            this.p2.y = 350;
            this.Main();
        };
        EndingScene.prototype.Update = function () {
        };
        EndingScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.label1);
            this.addChild(this.continueButton);
            this.addChild(this.txtContinueButton);
            this.addChild(this.p1);
            this.addChild(this.p2);
            this.continueButton.on("click", this.fn_ButtonEndClick);
        };
        return EndingScene;
    }(objects.Scene));
    scenes.EndingScene = EndingScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=endingScene.js.map