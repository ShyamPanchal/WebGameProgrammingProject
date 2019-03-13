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
            _this.Start();
            return _this;
        }
        Prologue.prototype.Start = function () {
            this.storyLabel = new objects.Label("Some Story", "20px", "Cambay", "#000000", 1066 / 2, 600 / 2, true);
            this.Main();
        };
        Prologue.prototype.Update = function () {
        };
        Prologue.prototype.Main = function () {
            this.addChild(this.storyLabel);
        };
        return Prologue;
    }(objects.Scene));
    scenes.Prologue = Prologue;
})(scenes || (scenes = {}));
//# sourceMappingURL=prologue.js.map