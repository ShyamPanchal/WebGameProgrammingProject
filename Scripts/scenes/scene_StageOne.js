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
    var StageOne = /** @class */ (function (_super) {
        __extends(StageOne, _super);
        function StageOne(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        StageOne.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.FINISH;
        };
        StageOne.prototype.fn_pauseButtonClick = function () {
            objects.Game.currentScene = config.Scene.PAUSE;
        };
        StageOne.prototype.Start = function () {
            console.log("GAME SCENE(S)...");
            this.background = new objects.Background(this.assetManager, "level_01");
            this.txtButton = new objects.Label("Bypass!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 910;
            this.txtButton.y = 565;
            //pause button            
            this.pauseButton = new objects.Button(this.assetManager, "startButton", -10, 550);
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff", this.pauseButton.x + 80, this.pauseButton.y + 10);
            //pause button end
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.label = new objects.Label("Tutorial!", "48px", "Arial", "#000000", 550, 50, true);
            this.Main();
        };
        StageOne.prototype.Update = function () {
        };
        StageOne.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            this.addChild(this.pauseButton);
            this.addChild(this.pauseTxtButton);
            this.backButton.on("click", this.fn_ButtonClick);
            this.pauseButton.on("click", this.fn_pauseButtonClick); //pause
        };
        return StageOne;
    }(objects.Scene));
    scenes.StageOne = StageOne;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageOne.js.map
