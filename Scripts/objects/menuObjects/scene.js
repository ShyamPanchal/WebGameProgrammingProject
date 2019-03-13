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
var objects;
(function (objects) {
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        function Scene(assetManager) {
            var _this = _super.call(this) || this;
            _this.assetManager = assetManager;
            return _this;
        }
        Scene.prototype.Start = function () {
        };
        Scene.prototype.Update = function () {
        };
        Scene.prototype.Main = function () {
        };
        Scene.prototype.CheckPaused = function () {
            this.isPaused = objects.Game.keyboard.pause;
        };
        Scene.prototype.StartCountdown = function (seconds, callback) {
            var counter = seconds;
            var interval = setInterval(function () {
                //console.log(counter);
                counter--;
                if (counter < 0) {
                    clearInterval(interval);
                    callback();
                    //console.log('Ding!');
                }
                ;
            }, 1000);
        };
        ;
        Scene.prototype.StartCount = function (seconds, overNote) {
            var counter = seconds;
            var interval = setInterval(function () {
                //console.log(counter);
                counter--;
                if (counter < 0) {
                    clearInterval(interval);
                    overNote();
                    //console.log('Ding!');
                }
                ;
            }, 1000);
        };
        ;
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map