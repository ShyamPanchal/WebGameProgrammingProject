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
            this.isJumping = false;
        };
        Player.prototype.UpdateIfPossible = function (CheckPlayerMovement) {
            this.CheckCollision = CheckPlayerMovement;
            this.Update();
        };
        Player.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.CheckGrounded(this.CheckCollision);
            if (!this.isGrounded && !this.isJumping) {
                this.DoGravityEffect();
            }
            else if (this.isGrounded) {
                this.maxJumpHeight = this.y - (this.height * Player.maxHightRate);
            }
            this.Jump();
            this.Move();
            this.CheckBounds();
            this.lastPosition.x = this.x;
            this.lastPosition.y = this.y;
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.OnColliderEnter = function (penetration, obj) {
            console.log(obj.name + ' penetration : ' + math.Vec2.Print(penetration));
        };
        Player.prototype.OnColliderExit = function (penetration, obj) {
        };
        Player.prototype.Jump = function () {
            if (this.isGrounded) {
                if (objects.Game.keyboard.moveUp && !this.isJumping) {
                    this.isGrounded = false;
                    this.isJumping = true;
                    //this.y += config.Gravity.gravityForce*this.height;
                    this.Move_Vertically(true, config.Gravity.gravityForce * this.height);
                }
            }
            else if (this.isJumping) {
                if (this.maxJumpHeight <= this.y) {
                    //going higher
                    //this.y += config.Gravity.gravityForce*this.height/2;
                    this.Move_Vertically(true, config.Gravity.gravityForce * this.height / 2);
                }
                else {
                    //console.log('reach high');
                    this.isJumping = false;
                }
            }
        };
        Player.prototype.Move_Vertically = function (up, speed) {
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
        Player.prototype.Move = function () {
            //this.x = objects.Game.stage.mouseX;
            if (objects.Game.keyboard.moveLeft) {
                if (this.CheckMovement(this.CheckCollision, true, Player.speed)) {
                    this.x -= Player.speed;
                }
            }
            if (objects.Game.keyboard.moveRight) {
                if (this.CheckMovement(this.CheckCollision, false, Player.speed)) {
                    this.x += Player.speed;
                }
            }
        };
        Player.prototype.CheckGrounded = function (Check) {
            var md = Check(this.x, this.y - config.Gravity.gravitySpeed);
            console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
            this.isGrounded = md.isCollided &&
                (md.closestPointOnBoundsToPoint(math.Vec2.zero).y > 0);
        };
        Player.prototype.CheckMovement = function (Check, isLeftMovement, speed) {
            var md = Check(this.x + (isLeftMovement ? 0 - speed : speed), this.y);
            return !md.isCollided; // && md.closestPointOnBoundsToPoint(math.Vec2.zero).x != 0;
        };
        Player.prototype.CheckVerticalMovement = function (Check, isUp, speed) {
            var md = Check(this.x, this.y + (isUp ? speed : 0 - speed));
            console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
            this.isJumping = !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
            return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
            //&& (md.closestPointOnBoundsToPoint(math.Vec2.zero).y > 0 || md.closestPointOnBoundsToPoint(math.Vec2.zero).y < 0));
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
        Player.maxHightRate = 0.9; //the player can jump at highest 90% of the height
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map