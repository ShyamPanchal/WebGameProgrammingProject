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
    var Hatch = /** @class */ (function (_super) {
        __extends(Hatch, _super);
        function Hatch(assetManager) {
            var _this = _super.call(this, assetManager, "lever_off") || this;
            _this.final = 0;
            _this.initial = 0;
            _this.velocity = 1;
            _this.activated = false;
            _this.activatedImage = assetManager.getResult("lever_on");
            _this.deactivatedImage = assetManager.getResult("lever_off");
            _this.hatch = new objects.DynamicObject(assetManager, "hatch");
            _this.hatch.Move = function () {
                if (_this.hatch.y != _this.final) {
                    if (_this.activated) {
                        _this.hatch.y += _this.velocity;
                    }
                    else {
                        _this.hatch.y -= _this.velocity;
                    }
                }
            };
            _this.isGravityAffected = false;
            return _this;
        }
        Hatch.prototype.SetDeactivated = function () {
            this.activated = false;
            this.image = this.deactivatedImage;
            this.final = this.initial;
        };
        Hatch.prototype.SetActivated = function () {
            this.activated = true;
            this.image = this.activatedImage;
            this.initial = this.final - 50;
        };
        Hatch.prototype.SetPosition = function (x, y) {
            this.hatch.x = x;
            this.hatch.y = y;
            this.hatch.boxCollider = new objects.BoxCollider(0, this.hatch.halfH, this.hatch.x, this.hatch.y, this.hatch.width, this.hatch.halfH);
            this.x = x;
            this.y = y;
            this.initial = y;
            this.final = y;
        };
        Hatch.prototype.AddAsAChild = function (f) {
            f(this);
            f(this.hatch);
        };
        Hatch.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.hatch.Update();
        };
        Hatch.prototype.secondaryAction = function () {
        };
        Hatch.prototype.Action = function () {
            if (this.blocked) {
                return;
            }
            console.log('action');
            this.activated = !this.activated;
            _super.prototype.Action.call(this);
            this.hatch.Action();
            if (this.activated) {
                this.image = this.activatedImage;
                this.final = this.initial + 50;
            }
            else {
                this.image = this.deactivatedImage;
                this.final = this.initial;
            }
            this.secondaryAction();
        };
        return Hatch;
    }(objects.ActionableObject));
    objects.Hatch = Hatch;
})(objects || (objects = {}));
//# sourceMappingURL=hatchobject.js.map