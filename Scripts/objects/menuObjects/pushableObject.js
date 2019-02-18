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
    var PushableObject = /** @class */ (function (_super) {
        __extends(PushableObject, _super);
        function PushableObject(assetManager, imageString) {
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.isGravityAffected = true;
            return _this;
        }
        PushableObject.prototype.Action = function () {
            _super.prototype.Action.call(this);
            if (this.aabbResultPlayer !== null) {
                var isLeft = this.aabbResultPlayer.closestPointOnBoundsToPoint(math.Vec2.zero).x < 0;
                console.log('isLeft: ' + isLeft);
                this.Push(10, isLeft);
            }
        };
        PushableObject.prototype.Push = function (speed, isLeft) {
            //this.x = objects.Game.stage.mouseX;
            if (isLeft) {
                if (this.CheckMovement(this.CheckCollision, true, speed)) {
                    this.x -= speed;
                }
            }
            else {
                if (this.CheckMovement(this.CheckCollision, false, speed)) {
                    this.x += speed;
                }
            }
        };
        return PushableObject;
    }(objects.DynamicObject));
    objects.PushableObject = PushableObject;
})(objects || (objects = {}));
//# sourceMappingURL=pushableObject.js.map