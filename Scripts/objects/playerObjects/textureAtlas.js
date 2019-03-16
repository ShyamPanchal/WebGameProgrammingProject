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
    var TextureAtlas = /** @class */ (function (_super) {
        __extends(TextureAtlas, _super);
        // Constructor
        function TextureAtlas(textureAtlas, imageString, scaleX, scaleY, flipOffsetX) {
            var _this = _super.call(this, textureAtlas, imageString) || this;
            _this.name = imageString;
            _this.gravityFactor = config.Gravity.gravityFactor;
            _this.scaleX = scaleX;
            _this.scaleY = scaleY;
            _this.flipOffsetX = flipOffsetX;
            _this.Init();
            return _this;
        }
        TextureAtlas.prototype.GetGravityFactor = function () {
            return this.gravityFactor;
        };
        // Methods / Functions
        TextureAtlas.prototype.Init = function () {
            this.isInverted = false;
            this.isLeft = false;
            this.width = this.GetWidthBounds() * this.scaleX;
            this.height = this.GetHeightBounds() * this.scaleY;
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
        TextureAtlas.prototype.GetWidthBounds = function () {
            return this.getBounds().width;
        };
        TextureAtlas.prototype.GetHeightBounds = function () {
            return this.getBounds().height;
        };
        TextureAtlas.prototype.Start = function () {
        };
        TextureAtlas.prototype.Update = function () {
            this.boxCollider.Update(this.x, this.y);
            if (objects.Game.isDebug) {
                this.DrawDebugLine();
            }
            if (this.isGravityAffected) {
                //this.DoGravityEffect();
            }
            if (this.GetGravityFactor() == -1 && !(this.isInverted)) {
                this.FlipVertically();
            }
        };
        TextureAtlas.prototype.CheckNextWorldPosition = function () {
            return false;
        };
        TextureAtlas.prototype.Reset = function () {
        };
        TextureAtlas.prototype.CheckBounds = function () {
        };
        TextureAtlas.prototype.Move = function () {
        };
        TextureAtlas.prototype.DoGravityEffect = function () {
            this.y -= config.Gravity.gravitySpeed * this.GetGravityFactor();
        };
        //called only when the function managers.Collision.CheckAABB is called
        TextureAtlas.prototype.OnColliderEnter = function (penetration, obj) {
        };
        //called only when the function managers.Collision.CheckAABB is called
        TextureAtlas.prototype.OnColliderExit = function (penetration, obj) {
        };
        TextureAtlas.prototype.FlipHorizontally = function () {
            this.isLeft = !this.isLeft;
            this.scaleX = this.scaleX * -1;
            // this.boxCollider.offset_x = this.width - this.boxCollider.width - this.boxCollider.offset_x;
            this.boxCollider.offset_x += this.flipOffsetX * this.scaleX / Math.abs(this.scaleX);
            this.x -= this.flipOffsetX * this.scaleX / Math.abs(this.scaleX);
            if (this.isLeft) {
                this.regX = this.width;
            }
            else {
                this.regX = 0;
            }
        };
        TextureAtlas.prototype.FlipVertically = function () {
            this.isInverted = !this.isInverted;
            this.scaleY = this.scaleY * -1;
            if (this.isInverted) {
                this.regY = this.height;
            }
            else {
                this.regY = 0;
            }
            this.boxCollider.offset_y = this.height - this.boxCollider.height - this.boxCollider.offset_y;
        };
        TextureAtlas.prototype.DrawDebugLine = function () {
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
        return TextureAtlas;
    }(createjs.Sprite));
    objects.TextureAtlas = TextureAtlas;
})(objects || (objects = {}));
//# sourceMappingURL=textureAtlas.js.map