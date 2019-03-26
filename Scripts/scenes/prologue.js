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
    var Prologue = /** @class */ (function (_super) {
        __extends(Prologue, _super);
        function Prologue(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.storyText1 = "Alice and Alisha, the world's greatest treasure-hunting twins";
            _this.storyText2 = "sought out the mansion in the mountains after hearing tales of its great lost treasures.";
            _this.storyText3 = "Little did they know, the ghosts of the slaughtered family who previously";
            _this.storyText4 = "resided there are still patrolling its halls in search of revenge on all who seek the manor's treasure.";
            _this.storyText5 = "Now, separated from each other, the twins must find a way to";
            _this.storyText6 = "escape - without further disrupting the dead.";
            _this.Start();
            return _this;
        }
        Prologue.prototype.Start = function () {
            if (objects.Game.isPlayingMusic == false) {
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic = true;
            }
            this.background = new objects.Background(this.assetManager, "background");
            this.storyLabel1 = new objects.Label(this.storyText1, "20px", "Cambay", "#ffffff", 1066 / 2, 600 / 1.5, true);
            this.storyLabel2 = new objects.Label(this.storyText2, "20px", "Cambay", "#ffffff", 1066 / 2, 600 / 1.5 + 20, true);
            this.storyLabel3 = new objects.Label(this.storyText3, "20px", "Cambay", "#ffffff", 1066 / 2, 600 / 1.5 + 60, true);
            this.storyLabel4 = new objects.Label(this.storyText4, "20px", "Cambay", "#ffffff", 1066 / 2, 600 / 1.5 + 80, true);
            this.storyLabel5 = new objects.Label(this.storyText5, "20px", "Cambay", "#ffffff", 1066 / 2, 600 / 1.5 + 120, true);
            this.storyLabel6 = new objects.Label(this.storyText6, "20px", "Cambay", "#ffffff", 1066 / 2, 600 / 1.5 + 140, true);
            this.nextText = new objects.Label("Next", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.nextButton = new objects.Button(this.assetManager, "startButton", 1066 / 2, 600 * 0.75, this.nextText, true);
            this.nextButton.scaleX = 0.75;
            this.nextButton.visible = false;
            this.nextButton.text.visible = false;
            this.Main();
        };
        Prologue.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.INGAME;
        };
        Prologue.prototype.Update = function () {
            if (this.storyLabel1.y > 150) {
                this.storyLabel1.y -= 0.5;
                this.storyLabel2.y -= 0.5;
                this.storyLabel3.y -= 0.5;
                this.storyLabel4.y -= 0.5;
                this.storyLabel5.y -= 0.5;
                this.storyLabel6.y -= 0.5;
            }
            else {
                this.nextButton.visible = true;
                this.nextButton.text.visible = true;
            }
        };
        Prologue.prototype.Main = function () {
            this.addChild(this.background);
            this.addChild(this.storyLabel1);
            this.addChild(this.storyLabel2);
            this.addChild(this.storyLabel3);
            this.addChild(this.storyLabel4);
            this.addChild(this.storyLabel5);
            this.addChild(this.storyLabel6);
            this.addChild(this.nextButton);
            this.addChild(this.nextButton.text);
            this.nextButton.on("click", this.fn_ButtonClick);
        };
        return Prologue;
    }(objects.Scene));
    scenes.Prologue = Prologue;
})(scenes || (scenes = {}));
//# sourceMappingURL=prologue.js.map