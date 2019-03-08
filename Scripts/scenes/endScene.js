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
            this.blackCover = new objects.Image(this.assetManager, "hdivider", 1066 * 0.5, 600 * 0.9, true); //Black image to cover
            this.blackCover.scaleX = 2;
            this.blackCover.scaleY = 2;
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.8, true);
            this.txtButton = new objects.Label("Main Menu", "20px", "Cambay", "#ffffff", this.backButton.x, this.backButton.y + 3, true);
            this.backButton.scaleX = 0.75;
            //  this.buttonBlack = new objects.Image(this.assetManager, "buttonBlack",1066 * 0.5, 600 * 0.9, true);  
            //  this.buttonBlack.scaleX = 1.2;
            this.label = new objects.Label("Game Over", "bold 96px", "Crackman", "#00adad", 1066 * 0.5, 600 * 0.48, true);
            this.label2 = new objects.Label("After eating Pac-Dots, Pacman realised what heaven is...", "28px", "Crackman", "#ffff00", 1066 * 0.5, 600 * 0.6, true);
            this.label3 = new objects.Label("Then he went in search for more pac-dots...", "28px", "Crackman", "#dfdf00", 1066 * 0.5, 600 * 0.65, true);
            this.label4 = new objects.Label("and he met Toru Iwatani of Namco and Rest is HISTORY", "28px", "Crackman", "#bfbf00", 1066 * 0.5, 600 * 0.7, true);
            this.Main();
        };
        EndScene.prototype.Update = function () {
        };
        EndScene.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.label2);
            this.addChild(this.label3);
            this.addChild(this.label4);
            this.addChild(this.blackCover);
            this.addChild(this.backButton);
            //   this.addChild(this.buttonBlack);
            this.addChild(this.txtButton);
            this.backButton.on("click", this.fn_ButtonClick);
        };
        return EndScene;
    }(objects.Scene));
    scenes.EndScene = EndScene;
})(scenes || (scenes = {}));
//# sourceMappingURL=endScene.js.map