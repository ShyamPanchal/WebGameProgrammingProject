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
    var SplashScreen = /** @class */ (function (_super) {
        __extends(SplashScreen, _super);
        function SplashScreen(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        SplashScreen.prototype.Start = function () {
            this.background = new objects.Background(this.assetManager, "background");
            this.background.alpha = 0;
            this.devIcon = new objects.Image(this.assetManager, "devIcon", 1066 / 2, 600 / 2, true);
            this.devIcon.alpha = 0;
            this.devIcon.scaleX = 0.3;
            this.devIcon.scaleY = 0.3;
            this.splashDone = false;
            this.splashMaxed = false;
            this.stayCounter = 0;
            this.Main();
        };
        SplashScreen.prototype.Update = function () {
            if (!this.splashMaxed && !this.splashDone) {
                this.devIcon.alpha += 0.015;
            }
            if (this.devIcon.alpha >= 1 && !this.splashMaxed && !this.splashDone) {
                this.stayCounter++;
                if (this.stayCounter >= objects.Game.frameRate) {
                    this.splashMaxed = true;
                }
            }
            if (this.splashMaxed && !this.splashDone) {
                this.devIcon.alpha -= 0.015;
            }
            if (this.devIcon.alpha <= 0 && this.splashMaxed && !this.splashDone) {
                this.splashDone = true;
            }
            if (this.splashDone) {
                this.background.alpha += 0.02;
            }
            if (this.background.alpha >= 1)
                objects.Game.currentScene = config.Scene.START;
        };
        SplashScreen.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.devIcon);
        };
        return SplashScreen;
    }(objects.Scene));
    scenes.SplashScreen = SplashScreen;
})(scenes || (scenes = {}));
//# sourceMappingURL=splashScreen.js.map