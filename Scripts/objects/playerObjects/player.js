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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        // Constructor
        function Player(assetManager) {
            var _this = _super.call(this, assetManager, "player") || this;
            // Variables
            _this.speed = 5;
            _this.Start();
            _this.isGravityAffected = true;
            return _this;
        }
        // Methods / Functions
        Player.prototype.Start = function () {
            this.x = 400;
            this.y = 45;
            this.canMoveL = true;
            this.canMoveR = true;
        };
        Player.prototype.Update = function () {
            this.boxCollider.Update(this.x, this.y);
            if (!this.isGrounded) {
                this.GravityEffect();
            }
            this.Jump();
            this.Move();
            this.CheckBounds();
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.Jump = function () {
            if (this.isGrounded) {
                if (objects.Game.keyboard.moveUp) {
                    console.log('Jump');
                    this.y += config.Gravity.gravity * this.height * 2;
                    this.isGrounded = false;
                }
            }
        };
        Player.prototype.Move = function () {
            //this.x = objects.Game.stage.mouseX;
            if (objects.Game.keyboard.moveLeft && this.canMoveL) {
                this.x -= this.speed;
            }
            if (objects.Game.keyboard.moveRight && this.canMoveR) {
                this.x += this.speed;
            }
        };
        Player.prototype.CheckBounds = function () {
            // hardcoding the play area for now
            /*if (this.x >= 837.5){
              this.x = 837.5;
            }
      
            if (this.x <= 235.5){
              this.x = 235.5;
            }*/
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map