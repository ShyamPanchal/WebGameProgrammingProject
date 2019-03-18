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
    var UIHelper = /** @class */ (function (_super) {
        __extends(UIHelper, _super);
        function UIHelper(assetManager, imageString, x, y) {
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            _this.x = x;
            _this.y = y;
            _this.on("click", _this.fn_OnClick);
            _this.on("mouseover", _this.fn_LabelMouseOver);
            _this.on("mouseout", _this.fn_LabelMouseOut);
            return _this;
        }
        UIHelper.prototype.Start = function () {
            this.width = this.getBounds().width;
            this.halfW = this.width / 2;
            this.visible = false;
        };
        UIHelper.prototype.fn_LabelMouseOver = function () {
            console.log('created labels');
            this.labelHelp_P1 = new objects.Label("Player One \n\n W - Jump \n A - Move Left \n D - Move Right \n E - Interact", "26px", "Cambay", "#ffffff", 1066 * 0.5 / 2 - 200, 150);
            objects.Game.stage.addChild(this.labelHelp_P1);
            this.labelHelp_P2 = new objects.Label("Player Two \n\n ↑ - Jump \n  ← - Move Left \n → - Move Right \n Rshift - Interact", "26px", "Cambay", "#ffffff", 1066 / 2 + 330, 150);
            objects.Game.stage.addChild(this.labelHelp_P2);
        };
        UIHelper.prototype.fn_LabelMouseOut = function () {
            objects.Game.stage.removeChild(this.labelHelp_P1);
            objects.Game.stage.removeChild(this.labelHelp_P2);
            console.log('removed labels');
        };
        UIHelper.prototype.Update = function () {
        };
        UIHelper.prototype.fn_OnClick = function () {
            console.log('calling fn_OnClick on UIHelper.ts');
            this.visible = false;
        };
        return UIHelper;
    }(createjs.Bitmap));
    objects.UIHelper = UIHelper;
})(objects || (objects = {}));
//# sourceMappingURL=UIhelper.js.map