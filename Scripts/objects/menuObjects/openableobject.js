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
            _this.keyCode = 0;
            _this.openedImage = assetManager.getResult(imageStringOpened);
            _this.closedImage = assetManager.getResult(imageStringClosed);
            _this.isClosed = true;
            _this.isLocked = false;
            _this.objectInside = new Array();
            _this.isGravityAffected = true;
            return _this;
        }
        OpenableObject.prototype.AddObjectInside = function (object) {
            this.objectInside.push(object);
            object.isGravityAffected = false;
            object.x = 1500;
        };
        OpenableObject.prototype.Action = function () {
            if (this.isLocked) {
                if (this.player.inventory.CheckKey(this.keyCode) && this.player.inventory.UseKey()) {
                    this.isLocked = false;
                    console.log('key used');
                }
                else {
                    console.log('has not the key');
                }
            }
            else {
                _super.prototype.Action.call(this);
                if (this.aabbResultPlayer !== null) {
                    this.OpenClose();
                }
            }
        };
        OpenableObject.prototype.OpenClose = function () {
            this.isClosed = !this.isClosed;
            if (this.isClosed) {
                this.open_sound = createjs.Sound.play("open_drawer");
                this.image = this.closedImage;
            }
            else {
                this.open_sound = createjs.Sound.play("open_drawer");
                this.image = this.openedImage;
                if (this.objectInside.length > 0) {
                    var object = this.objectInside.pop();
                    object.y = this.y;
                    object.x = this.x + object.width + 10;
                    object.isGravityAffected = true;
                }
            }
        };
        return OpenableObject;
    }(objects.DynamicObject));
    objects.OpenableObject = OpenableObject;
})(objects || (objects = {}));
//# sourceMappingURL=openableobject.js.map