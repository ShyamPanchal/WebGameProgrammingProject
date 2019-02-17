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
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        // Constructor
        function GameObject(assetManager, imageString) {
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            _this.name = imageString;
            _this.Init();
            return _this;
        }
        // Methods / Functions
        GameObject.prototype.Init = function () {
            this.width = this.GetWidthBounds();
            this.height = this.GetHeightBounds();
            this.halfW = this.width * 0.5;
            this.halfH = this.height * 0.5;
            /*this.regX = this.halfW;
            this.regY = this.halfH;*/
            this.regX = 0;
            this.regY = 0;
            this.isColliding = false;
            this.isGrounded = false;
            this.isGravityAffected = false;
            this.isDebug = false;
            this.lastPosition = new math.Vec2();
            this.boxCollider = new objects.BoxCollider(0, 0, this.x, this.y, this.width, this.height);
        };
        GameObject.prototype.GetWidthBounds = function () {
            return this.getBounds().width;
        };
        GameObject.prototype.GetHeightBounds = function () {
            return this.getBounds().height;
        };
        GameObject.prototype.Start = function () {
        };
        GameObject.prototype.Update = function () {
            this.boxCollider.x = this.x;
            this.boxCollider.y = this.y;
        };
        GameObject.prototype.Reset = function () {
        };
        GameObject.prototype.CheckBounds = function () {
        };
        GameObject.prototype.Move = function () {
        };
        GameObject.prototype.GravityEffect = function () {
            if (this.isGravityAffected) {
                //console.log(this.height); player height = 60
                this.y -= config.Gravity.gravity * 60 / 3;
            }
        };
        GameObject.prototype.OnColliderEnter = function (penetration, obj) {
        };
        GameObject.prototype.OnColliderExit = function (penetration, obj) {
        };
        GameObject.prototype.DebugLine = function () {
            if (this.isDebug) {
                if (this.boxCollider != null) {
                    this.boxCollider.DebugLine();
                }
                if (this.cached !== null) {
                    this.parent.removeChild(this.cached);
                }
                this.graphics = new createjs.Graphics();
                this.graphics.beginStroke("#FF0099")
                    .drawRect(this.x, this.y, this.width, this.height)
                    .endStroke();
                this.cached = new createjs.Shape(this.graphics);
                this.parent.addChild(this.cached);
            }
        };
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameObjects.js.map