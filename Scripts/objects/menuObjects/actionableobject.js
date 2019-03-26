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
    var ActionableObject = /** @class */ (function (_super) {
        __extends(ActionableObject, _super);
        function ActionableObject(assetManager, imageString) {
            return _super.call(this, assetManager, imageString) || this;
        }
        return ActionableObject;
    }(objects.DynamicObject));
    objects.ActionableObject = ActionableObject;
    var Lever = /** @class */ (function (_super) {
        __extends(Lever, _super);
        function Lever(assetManager) {
            var _this = _super.call(this, assetManager, "lever_off") || this;
            _this.activated = false;
            _this.blocked = false;
            _this.activatedImage = assetManager.getResult("lever_on");
            _this.deactivatedImage = assetManager.getResult("lever_off");
            _this.isGravityAffected = false;
            return _this;
        }
        Lever.prototype.SetActivated = function () {
            this.image = this.activatedImage;
        };
        Lever.prototype.SetDeactivated = function () {
            this.image = this.deactivatedImage;
        };
        Lever.prototype.DoAction = function (activated) {
        };
        Lever.prototype.Action = function () {
            if (!this.blocked) {
                this.activated = !this.activated;
                _super.prototype.Action.call(this);
                if (this.activated) {
                    this.image = this.activatedImage;
                }
                else {
                    this.image = this.deactivatedImage;
                }
                this.on_sound = createjs.Sound.play("switch_light");
                this.DoAction(this.activated);
            }
        };
        return Lever;
    }(objects.ActionableObject));
    objects.Lever = Lever;
    var KeyHole = /** @class */ (function (_super) {
        __extends(KeyHole, _super);
        function KeyHole(assetManager, imageOn, imageOff) {
            if (imageOn === void 0) { imageOn = "key_hole_on"; }
            if (imageOff === void 0) { imageOff = "key_hole_off"; }
            var _this = _super.call(this, assetManager, imageOff) || this;
            _this.enabled = false;
            _this.keyCode = 0;
            _this.usingKeyImage = assetManager.getResult(imageOn);
            _this.withoutKeyImage = assetManager.getResult(imageOff);
            _this.isGravityAffected = false;
            _this.key = [];
            _this.boxCollider = new objects.BoxCollider(0, 0, _this.x, _this.y, _this.halfW, _this.height);
            return _this;
        }
        KeyHole.prototype.SetActivated = function () {
            this.image = this.usingKeyImage;
        };
        KeyHole.prototype.DoAction = function (activated) {
        };
        KeyHole.prototype.Action = function () {
            this.enabled = !this.enabled;
            if (this.enabled) {
                if (!this.player.inventory.CheckKey(this.keyCode)) {
                    this.enabled = !this.enabled;
                    return;
                }
                var k = this.player.inventory.UseKeyTemporary();
                if (k != null && k instanceof objects.Key && this.keyCode == k.keyCode) {
                    k.isGravityAffected = false;
                    this.key.push(k);
                    this.image = this.usingKeyImage;
                }
                else {
                    this.enabled = !this.enabled;
                    return;
                }
            }
            else {
                //this.player.inventory.AddItem(this.key);
                this.image = this.withoutKeyImage;
                var key = this.key.pop();
                key.x = this.x + this.width;
                key.y = this.y;
                key.isGravityAffected = true;
                this.alreadyHandled = true;
            }
            this.DoAction(this.enabled);
            //super.Action();
        };
        return KeyHole;
    }(objects.ActionableObject));
    objects.KeyHole = KeyHole;
})(objects || (objects = {}));
//# sourceMappingURL=actionableobject.js.map