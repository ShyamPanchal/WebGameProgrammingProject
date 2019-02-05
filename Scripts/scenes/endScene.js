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
            return _this;
        }
        EndScene.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.START;
        };
        EndScene.prototype.Start = function () {
            console.log("END MENU...");
            this.background = new objects.Background(this.assetManager, "background");
            this.txtButton = new objects.Label("Return to Main Menu!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 350;
            this.txtButton.y = 365;
            this.backButton = new objects.Button(this.assetManager, "startButton", 340, 350);
            this.label = new objects.Label("Game End!", "48px", "Arial", "#000000", 320, 100);
            this.Main();
        };
        EndScene.prototype.Update = function () {
        };
        EndScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            this.backButton.on("click", this.fn_ButtonClick);
        };
        return EndScene;
    }(objects.Scene));
    scenes.EndScene = EndScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=endScene.js.map