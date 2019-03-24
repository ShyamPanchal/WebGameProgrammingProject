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
    var EmptyGameObject = /** @class */ (function (_super) {
        __extends(EmptyGameObject, _super);
        // Variables
        // Constructor
        function EmptyGameObject(assetManager, imageString, width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.width = width;
            _this.height = height;
            //it must call Init again in order to use another bounds
            _this.Init();
            return _this;
        }
        EmptyGameObject.prototype.GetWidthBounds = function () {
            return this.width;
        };
        EmptyGameObject.prototype.GetHeightBounds = function () {
            return this.height;
        };
        EmptyGameObject.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        return EmptyGameObject;
    }(objects.GameObject));
    objects.EmptyGameObject = EmptyGameObject;
    var Stair = /** @class */ (function (_super) {
        __extends(Stair, _super);
        function Stair(assetManager, imageString, width, height) {
            if (width === void 0) { width = 1; }
            if (height === void 0) { height = 1; }
            return _super.call(this, assetManager, imageString, width, height) || this;
        }
        return Stair;
    }(EmptyGameObject));
    objects.Stair = Stair;
})(objects || (objects = {}));
//# sourceMappingURL=emptyGameObject.js.map