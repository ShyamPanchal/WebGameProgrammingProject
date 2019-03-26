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
    var EndScene = /** @class */ (function (_super) {
        __extends(EndScene, _super);
        function EndScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            objects.Game.skip = true;
            return _this;
        }
        EndScene.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        EndScene.prototype.fn_ButtonKeepClick = function () {
            objects.Game.currentScene = objects.Game.previousScene;
        };
        EndScene.prototype.Start = function () {
            console.log("END MENU...");
            this.background = new objects.Background(this.assetManager, "background");
            this.txtButton = new objects.Label("Exit", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75, this.txtButton, true);
            this.backButton.scaleX = 0.75;
            this.txtkeepButton = new objects.Label("Continue", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.keepButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75 - 70, this.txtkeepButton, true);
            this.keepButton.scaleX = 0.75;
            this.label = new objects.Label("Game End!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.25, true);
            this.label1 = new objects.Label("Thank you for Helping Us Escape!", "bold 50px", "Cambay", "#ffffff", 1066 * 0.5, this.label.y + 100, true);
            this.Main();
        };
        EndScene.prototype.Update = function () {
        };
        EndScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.label1);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            if (objects.Game.playerDead) {
                this.addChild(this.keepButton);
                this.addChild(this.txtkeepButton);
            }
            this.backButton.on("click", this.fn_ButtonClick);
            this.keepButton.on("click", this.fn_ButtonKeepClick);
        };
        return EndScene;
    }(objects.Scene));
    scenes.EndScene = EndScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=endScene.js.map