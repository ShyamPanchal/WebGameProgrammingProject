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
    var OpenableObject = /** @class */ (function (_super) {
        __extends(OpenableObject, _super);
        function OpenableObject(assetManager, imageStringClosed, imageStringOpened) {
            var _this = _super.call(this, assetManager, imageStringClosed) || this;
            _this.openedImage = assetManager.getResult(imageStringOpened);
            _this.closedImage = assetManager.getResult(imageStringClosed);
            _this.isClosed = true;
            _this.isGravityAffected = true;
            return _this;
        }
        OpenableObject.prototype.Action = function () {
            _super.prototype.Action.call(this);
            if (this.aabbResultPlayer !== null) {
                this.Open();
            }
        };
        OpenableObject.prototype.Open = function () {
            this.isClosed = !this.isClosed;
            if (this.isClosed) {
                this.image = this.closedImage;
            }
            else {
                this.image = this.openedImage;
            }
        };
        return OpenableObject;
    }(objects.DynamicObject));
    objects.OpenableObject = OpenableObject;
})(objects || (objects = {}));
//# sourceMappingURL=openableobject.js.map