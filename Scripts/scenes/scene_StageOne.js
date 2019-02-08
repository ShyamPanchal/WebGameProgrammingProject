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
        StageOne.prototype.Start = function () {
            console.log("GAME SCENE(S)...");
            this.background = new objects.Background(this.assetManager, "level_01");
            this.ghost = new objects.Enemy(this.assetManager, "ghost", 550, 100);
            this.txtButton = new objects.Label("Bypass!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 910;
            this.txtButton.y = 565;
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.label = new objects.Label("Tutorial!", "48px", "Arial", "#000000", 550, 50, true);
            this.Main();
        };
        StageOne.prototype.Update = function () {
            this.ghost.Update();
        };
        StageOne.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.ghost);
            this.addChild(this.label);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            this.backButton.on("click", this.fn_ButtonClick);
        };
        return StageOne;
    }(objects.Scene));
    scenes.StageOne = StageOne;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageOne.js.map