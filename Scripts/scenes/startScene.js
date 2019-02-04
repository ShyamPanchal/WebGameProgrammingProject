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
    var StartScene = /** @class */ (function (_super) {
        __extends(StartScene, _super);
        function StartScene(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        StartScene.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.INGAME;
        };
        StartScene.prototype.Start = function () {
            console.log("Main Menu/Start Menu...");
            this.background = new objects.Background(this.assetManager, "background");
            this.startButton = new objects.Button(this.assetManager, "startButton", 340, 350);
            this.txtStartButton = new objects.Label("Game Start!", "18px", "Arial", "#a3a3a3a");
            this.txtStartButton.x = 385;
            this.txtStartButton.y = 365;
            this.gameTitle = new objects.Label("Help us Escape!", "48px", "Arial", "#000000", 280, 100);
            this.Main();
        };
        StartScene.prototype.Update = function () {
        };
        StartScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.gameTitle);
            this.addChild(this.startButton);
            this.addChild(this.txtStartButton);
            this.startButton.on("click", this.fn_ButtonClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=startScene.js.map