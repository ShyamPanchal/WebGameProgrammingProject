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
    var InformativePoint = /** @class */ (function (_super) {
        __extends(InformativePoint, _super);
        function InformativePoint(assetManager) {
            var _this = _super.call(this, assetManager, "empty") || this;
            _this.isGravityAffected = false;
            return _this;
        }
        return InformativePoint;
    }(objects.DynamicObject));
    objects.InformativePoint = InformativePoint;
})(objects || (objects = {}));
//# sourceMappingURL=informativepointobject.js.map