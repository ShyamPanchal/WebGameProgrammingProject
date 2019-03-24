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
    var Key = /** @class */ (function (_super) {
        __extends(Key, _super);
        function Key(assetManager, imageString) {
            if (imageString === void 0) { imageString = "key"; }
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.keyCode = 0;
            _this.isGravityAffected = true;
            _this.boxCollider = new objects.BoxCollider(_this.halfW / 3, 0, _this.halfW, _this.y, _this.width / 3, _this.height);
            return _this;
        }
        return Key;
    }(objects.HandableObject));
    objects.Key = Key;
})(objects || (objects = {}));
//# sourceMappingURL=key.js.map