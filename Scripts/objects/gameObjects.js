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
            _this.gravityFactor = config.Gravity.gravityFactor;
            _this.Init();
            return _this;
        }
        GameObject.prototype.GetGravityFactor = function () {
            return this.gravityFactor;
        };
        // Methods / Functions
        GameObject.prototype.Init = function () {
            this.isInverted = false;
            this.isLeft = false;
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
            this.boxCollider.Update(this.x, this.y);
            if (objects.Game.isDebug) {
                this.DrawDebugLine();
            }
            if (this.isGravityAffected) {
                //this.DoGravityEffect();
            }
            if ((this.GetGravityFactor() == -1 && !this.isInverted)
                || (this.GetGravityFactor() == 1 && this.isInverted)) {
                this.FlipVertically();
            }
        };
        GameObject.prototype.CheckNextWorldPosition = function () {
            return false;
        };
        GameObject.prototype.Reset = function () {
        };
        GameObject.prototype.CheckBounds = function () {
        };
        GameObject.prototype.Move = function () {
        };
        GameObject.prototype.DoGravityEffect = function () {
            this.y -= config.Gravity.gravitySpeed * this.GetGravityFactor();
        };
        //called only when the function managers.Collision.CheckAABB is called
        GameObject.prototype.OnColliderEnter = function (penetration, obj) {
        };
        //called only when the function managers.Collision.CheckAABB is called
        GameObject.prototype.OnColliderExit = function (penetration, obj) {
        };
        GameObject.prototype.FlipHorizontally = function () {
            if (this instanceof objects.Player) {
                this.isLeft = !this.isLeft;
                this.spriteRenderer.scaleX = this.spriteRenderer.scaleX * -1;
                if (this.isLeft) {
                    this.flipOffsetX = this.fixed_flipOffsetX;
                    this.regX = this.width;
                }
                else {
                    this.flipOffsetX = 0;
                    this.regX = 0;
                }
            }
            else {
                this.isLeft = !this.isLeft;
                this.scaleX = this.scaleX * -1;
                this.boxCollider.offset_x = this.width - this.boxCollider.width - this.boxCollider.offset_x;
                if (this.isLeft) {
                    this.regX = this.width;
                }
                else {
                    this.regX = 0;
                }
            }
        };
        GameObject.prototype.FlipVertically = function () {
            this.isInverted = !this.isInverted;
            if (this instanceof objects.Player) {
                this.spriteRenderer.scaleY = this.spriteRenderer.scaleY * -1;
                this.dialog.dialog.flip(this.isInverted, this.height * 1.7);
                if (this.isInverted) {
                    this.regY = this.height;
                    this.flipOffsetY = this.height; //this.fixed_flipOffsetY;
                }
                else {
                    this.dialog.dialog.regY = 0;
                    this.regY = 0;
                    this.flipOffsetY = 0;
                }
                this.boxCollider.offset_y = this.height - this.boxCollider.height - this.boxCollider.offset_y;
            }
            else {
                this.scaleY = this.scaleY * -1;
                if (this.isInverted) {
                    this.regY = this.height;
                }
                else {
                    this.regY = 0;
                }
                this.boxCollider.offset_y = this.height - this.boxCollider.height - this.boxCollider.offset_y;
            }
        };
        GameObject.prototype.DrawDebugLine = function () {
            if (this.boxCollider != null) {
                this.boxCollider.DebugLine();
            }
            if (this.cached !== null) {
                objects.Game.stage.removeChild(this.cached);
            }
            var graphics = new createjs.Graphics();
            graphics.beginStroke("#FF0099")
                .drawRect(this.x, this.y, this.width, this.height)
                .endStroke();
            this.cached = new createjs.Shape(graphics);
            objects.Game.stage.addChild(this.cached);
        };
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameObjects.js.map