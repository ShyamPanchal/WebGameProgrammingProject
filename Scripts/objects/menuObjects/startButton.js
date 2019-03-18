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
    var Button = /** @class */ (function (_super) {
        __extends(Button, _super);
        function Button(assetManager, imageString, x, y, textLabel, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            if (isCentered) {
                _this.regX = _this.getBounds().width * 0.5;
                _this.regY = _this.getBounds().height * 0.5;
            }
            _this.x = x;
            _this.y = y;
            _this.text = textLabel;
            _this.text.x = _this.x;
            _this.text.y = _this.y;
            _this.on("mouseover", _this.mouseOver);
            _this.on("mouseout", _this.mouseOut);
            return _this;
        }
        Button.prototype.mouseOver = function () {
            this.alpha = 0.7;
            this.text.alpha = 0.7;
        };
        Button.prototype.mouseOut = function () {
            this.alpha = 1.0;
            this.text.alpha = 1.0;
<<<<<<< HEAD
=======
        };
        Button.prototype.Update = function () {
            this.text.x = this.x;
            this.text.y = this.y;
>>>>>>> master
        };
        return Button;
    }(createjs.Bitmap));
    objects.Button = Button;
    var Dialog = /** @class */ (function () {
        function Dialog(assetManager, text) {
            this.txtLabel = new objects.Label(text, "20px bold", "Cambay", "#ffffff", 0, 0, true);
            this.dialogObj = new objects.Button(assetManager, "speech_ballom", 0, 0, this.txtLabel, true);
            this.dialogObj.on("mouseover", function () { });
            this.dialogObj.on("mouseout", function () { });
            this.dialogObj.scaleX = 0.75;
            this.isShown = false;
        }
        Dialog.prototype.Update = function (x, y) {
            this.dialogObj.x = x;
            this.dialogObj.y = y;
            this.dialogObj.Update();
        };
        Dialog.prototype.showDialog = function (scene) {
            if (!this.isShown) {
                this.isShown = true;
                scene.addChild(this.dialogObj);
                scene.addChild(this.txtLabel);
            }
        };
        Dialog.prototype.hideDialog = function (scene) {
            if (this.isShown) {
                this.isShown = false;
                scene.removeChild(this.dialogObj);
                scene.removeChild(this.txtLabel);
            }
        };
        return Dialog;
    }());
    objects.Dialog = Dialog;
})(objects || (objects = {}));
//# sourceMappingURL=startButton.js.map