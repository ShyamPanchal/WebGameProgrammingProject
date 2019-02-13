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
            this.isJumping = false;
        };
        Player.prototype.Update = function () {
            this.boxCollider.Update(this.x, this.y);
            if (!this.isGrounded && !this.isJumping) {
                this.GravityEffect();
                //console.log('gravityEffect');
            }
            else if (this.isGrounded) {
                //this.isJumping = false;
                this.maxJumpHeight = this.y - (this.height * 0.7);
                //console.log('grounded : ' + this.maxJumpHeight);
            }
            this.Jump();
            this.Move();
            this.CheckBounds();
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.Jump = function () {
            if (this.isGrounded) {
                if (objects.Game.keyboard.moveUp && !this.isJumping) {
                    this.isGrounded = false;
                    this.isJumping = true;
                    //console.log('Perform Jump');
                    this.y += config.Gravity.gravity * this.height;
                }
            }
            else if (this.isJumping) {
                if (this.maxJumpHeight <= this.y) {
                    //going higher         
                    //console.log('going higher : '+ this.y + '- max :' + this.maxJumpHeight);   
                    this.y += config.Gravity.gravity * this.height / 2;
                }
                else {
                    //console.log('reach high');
                    this.isJumping = false;
                }
            }
        };
        Player.prototype.Move = function () {
            //this.x = objects.Game.stage.mouseX;
            if (objects.Game.keyboard.moveLeft && this.canMoveL) {
                this.x -= Player.speed;
            }
            if (objects.Game.keyboard.moveRight && this.canMoveR) {
                this.x += Player.speed;
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
        // Variables
        Player.speed = 5;
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map