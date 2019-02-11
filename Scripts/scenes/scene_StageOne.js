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
            this.ghost = new objects.Enemy(this.assetManager, "ghost", 550, 100);
            console.log("GAME SCENE(S)...");
            this.background = new objects.Background(this.assetManager, "level_01");
            this.background_main = new objects.Background(this.assetManager, "level_01_house");
            this.background_shadow = new objects.Background(this.assetManager, "level_01_shadow");
            this.txtButton = new objects.Label("Bypass!", "18px", "bold Cambay", "#ffffff");
            this.txtButton.x = 910;
            this.txtButton.y = 565;
            //pause button            
            this.pauseButton = new objects.Button(this.assetManager, "startButton", -10, 550);
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff", this.pauseButton.x + 80, this.pauseButton.y + 10);
            //pause button end
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;
            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            this.player = new objects.Player(this.assetManager);
            this.Main();
        };
        StageOne.prototype.Update = function () {
            this.ghost.Update();
            this.player.Update();
        };
        StageOne.prototype.Main = function () {
            var _this = this;
            //this.addChild(this.background);
            this.addChild(this.background_main);
            this.addChild(this.ghost);
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);

            this.addChild(this.player);
            this.addChild(this.background_shadow);
            this.backButton.on("click", this.fn_ButtonClick);
            var callback = function () {
                _this.removeChild(_this.title);
                _this.removeChild(_this.titleShadow);
            };
            this.StartCountdown(3, callback);

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