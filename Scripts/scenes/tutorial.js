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
    var nextClicked = false;
    var Tutorial = /** @class */ (function (_super) {
        __extends(Tutorial, _super);
        function Tutorial(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.currentLayer = 0;
            _this.Start();
            return _this;
        }
        Tutorial.prototype.Start = function () {
            this.background = new objects.Background(this.assetManager, "tutorial");
            this.background.alpha = 0;
            this.heading = new objects.Label("Tutorial", "bold 48px", "Cambay", "#000000", 1066 / 2, 600 / 2, true);
            this.heading.alpha = 0;
            this.headingMaxReached = false;
            this.headingDone = false;
            this.backgroundDone = false;
            this.loadDone = false;
            this.bbs = [];
            this.bbs[0] = new objects.Image(this.assetManager, "bb_1", 520, 180, true);
            this.bbs[0].alpha = 0;
            this.bbs[1] = new objects.Image(this.assetManager, "bb_2", 425, 410, true);
            this.bbs[1].alpha = 0;
            this.bbs[2] = new objects.Image(this.assetManager, "bb_3", 925, 37, true);
            this.bbs[2].alpha = 0;
            this.bbs[3] = new objects.Image(this.assetManager, "bb_4", 140, 330, true);
            this.bbs[3].alpha = 0;
            this.bbs[4] = new objects.Image(this.assetManager, "bb_5", 240, 520, true);
            this.bbs[4].alpha = 0;
            this.bbs[5] = new objects.Image(this.assetManager, "bb_6", 440, 140, true);
            this.bbs[5].alpha = 0;
            this.bbs[6] = new objects.Image(this.assetManager, "bb_7", 300, 60, true);
            this.bbs[6].alpha = 0;
            this.bbs[7] = new objects.Image(this.assetManager, "bb_8", 950, 570, true);
            this.bbs[7].alpha = 0;
            this.layers = [[0, 1, 2, 3], [4], [5], [6], [7]];
            this.nextBtn = new objects.Button(this.assetManager, "nextBtn", 980, 550, null, false);
            this.nextBtn.alpha = 0;
            this.playBtn = new objects.Button(this.assetManager, "playBtn", 980, 550, null, false);
            this.currentLayer = 0;
            this.Main();
        };
        Tutorial.prototype.Update = function () {
            if (!this.backgroundDone) {
                if (!this.headingDone) {
                    if (!this.headingMaxReached) {
                        this.heading.alpha += 0.02;
                        if (this.heading.alpha >= 1) {
                            this.headingMaxReached = true;
                        }
                    }
                    else {
                        this.heading.alpha -= 0.02;
                        if (this.heading.alpha <= 0) {
                            this.headingDone = true;
                        }
                    }
                }
                else {
                    this.background.alpha += 0.02;
                    if (this.background.alpha >= 1) {
                        this.backgroundDone = true;
                    }
                }
            }
            else {
                if (!this.loadDone) {
                    console.log("back done");
                    this.background.alpha = 1;
                    for (var x = 0; x < this.layers[this.currentLayer].length; x++) {
                        this.bbs[this.layers[this.currentLayer][x]].alpha = 1;
                    }
                    this.nextBtn.alpha = 1;
                    this.loadDone = true;
                }
            }
            if (nextClicked) {
                nextClicked = false;
                for (var x = 0; x < this.layers[this.currentLayer].length; x++) {
                    this.bbs[this.layers[this.currentLayer][x]].alpha = 0;
                }
                // load next layers
                this.currentLayer += 1;
                if (this.currentLayer == this.layers.length - 1) {
                    this.removeChild(this.nextBtn);
                    this.addChild(this.playBtn);
                    this.playBtn.on("click", this.fn_PlayClicked);
                }
                for (var x = 0; x < this.layers[this.currentLayer].length; x++) {
                    this.bbs[this.layers[this.currentLayer][x]].alpha = 1;
                }
            }
        };
        Tutorial.prototype.Main = function () {
            var _this = this;
            this.addChild(this.background);
            this.addChild(this.heading);
            this.bbs.forEach(function (element) {
                _this.addChild(element);
            });
            this.addChild(this.nextBtn);
            this.nextBtn.on("click", this.fn_NextClick);
        };
        Tutorial.prototype.fn_NextClick = function () {
            nextClicked = true;
        };
        Tutorial.prototype.fn_PlayClicked = function () {
            objects.Game.currentScene = config.Scene.INGAME;
        };
        return Tutorial;
    }(objects.Scene));
    scenes.Tutorial = Tutorial;
})(scenes || (scenes = {}));
//# sourceMappingURL=tutorial.js.map