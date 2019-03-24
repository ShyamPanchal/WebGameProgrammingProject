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
    var DynamicObject = /** @class */ (function (_super) {
        __extends(DynamicObject, _super);
        function DynamicObject(assetManager, imageString) {
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.alreadyHandled = false;
            return _this;
        }
        DynamicObject.prototype.Action = function () {
            this.alreadyHandled = true;
            //console.log('ACTION');
        };
        DynamicObject.prototype.UpdateIfPossible = function (Check) {
            this.CheckCollision = Check;
            this.Update();
        };
        DynamicObject.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.DoGravityEffect();
            this.Move();
        };
        DynamicObject.prototype.DoGravityEffect = function () {
            if (this.isGravityAffected) {
                this.Move_Vertically(false, config.Gravity.gravitySpeed * this.GetGravityFactor());
            }
        };
        DynamicObject.prototype.Move_Vertically = function (up, speed) {
            if (up) {
                if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) {
                    this.y += speed;
                }
            }
            else {
                if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
                    this.y -= speed;
                }
            }
        };
        DynamicObject.prototype.CheckMovement = function (Check, isLeftMovement, speed) {
            var md = Check(this.x + (isLeftMovement ? 0 - speed : speed), this.y);
            return !md.isCollided;
        };
        DynamicObject.prototype.CheckVerticalMovement = function (Check, isUp, speed) {
            var md = Check(this.x, this.y + (isUp ? speed : 0 - speed));
            return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
        };
        return DynamicObject;
    }(objects.GameObject));
    objects.DynamicObject = DynamicObject;
})(objects || (objects = {}));
//# sourceMappingURL=dynamicObject.js.map