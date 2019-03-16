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
            _this.animtimer = 0;
            _this.zoomInOut = false;
            _this.Start();
            return _this;
        }
        StartScene.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.PROLOGUE;
        };
        StartScene.prototype.Start = function () {
            console.log("Main Menu/Start Menu...");
            this.background = new objects.Background(this.assetManager, "background");
            this.txtStartButton = new objects.Label("PLAY", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.startButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75, this.txtStartButton, true);
            this.startButton.scaleX = 0.75;
            this.gameTitle = new objects.Label("Help us Escape!", "bold 48px", "Cambay", "#ffffff", 1066 / 2, 600 / 4, true);
            this.gameTitle.alpha = 1;
            this.gameTitleShadow = new objects.Label("Help us Escape!", "bold 48px", "Cambay", "#828166", (1066 / 2) + 4, 600 / 4, true);
            this.gameTitleShadow.alpha = 0.75;
            this.hDivider = new objects.Image(this.assetManager, "hdivider", 1066 * 0.5, 600 * 0.3, true);
            this.hDivider.scaleX = 2;
            this.hDivider2 = new objects.Image(this.assetManager, "hdivider", 1066 * 0.5, 600 * 0.175, true);
            this.hDivider2.scaleX = 2;
            this.Main();
        };
        StartScene.prototype.Update = function () {
            this.animtimer += 1;
            if (this.animtimer >= 30) {
                this.animtimer = 0;
                if (this.zoomInOut) {
                    this.startButton.scaleX = 0.85;
                    this.startButton.text.scaleX = 1.25;
                    this.startButton.scaleY = 1;
                    this.startButton.text.scaleY = 1.3;
                }
                else {
                    this.startButton.scaleX = 0.75;
                    this.startButton.text.scaleX = 1;
                    this.startButton.scaleY = 1;
                    this.startButton.text.scaleY = 1;
                }
                this.zoomInOut = !this.zoomInOut;
            }
        };
        StartScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.gameTitleShadow);
            this.addChild(this.gameTitle);
            this.addChild(this.startButton);
            this.addChild(this.startButton.text);
            this.addChild(this.hDivider);
            this.addChild(this.hDivider2);
            this.startButton.on("click", this.fn_ButtonClick);
        };
        return StartScene;
    }(objects.Scene));
    scenes.StartScene = StartScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=startScene.js.map