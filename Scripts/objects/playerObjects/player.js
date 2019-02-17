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
            }
            else if (this.isGrounded) {
                this.maxJumpHeight = this.y - (this.height * 0.7);
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
            this.x = this.x - penetration.x;
            this.y = this.y - penetration.y;
            this.boxCollider.Update(this.x, this.y);
            if (penetration.y != 0) {
                var bellow = Math.abs((this.boxCollider.aabb.max.y - penetration.y) - obj.boxCollider.aabb.min.y);
                var above = Math.abs((this.boxCollider.aabb.min.y - penetration.y) - obj.boxCollider.aabb.max.y);
                console.log('above : ' + above);
                console.log('bellow : ' + bellow);
                if (above > bellow) {
                    //player is above the object
                }
                else {
                    //player is bellow the object
                    this.isJumping = false;
                }
                this.canMoveR = true;
                this.canMoveL = true;
            }
            else {
                var leftSide = Math.abs((this.boxCollider.aabb.max.x - penetration.x) - obj.boxCollider.aabb.min.x);
                var rightSide = Math.abs((this.boxCollider.aabb.min.x - penetration.x) - obj.boxCollider.aabb.max.x);
                console.log('leftSide : ' + leftSide);
                console.log('rightSide : ' + rightSide);
                if (rightSide > leftSide) {
                    //player is at right side of the object
                    this.canMoveR = false;
                    console.log('right side');
                    this.x = this.x - Math.abs(penetration.x); //this.halfW);
                }
                else {
                    //player is at left side of the object
                    this.canMoveL = false;
                    console.log('left side');
                    this.x = this.x + Math.abs(penetration.x); //this.halfW);
                }
                this.boxCollider.Update(this.x, this.y);
            }
            /*
                  console.log('player min x' + this.boxCollider.aabb.min.x);
                  console.log('player max x' + this.boxCollider.aabb.max.x);
            
                  console.log('obj min x' + obj.boxCollider.aabb.min.x);
                  console.log('obj max x' + obj.boxCollider.aabb.max.x);
            */
            /*
            this.y = this.lastPosition.y;
            if (penetration.x > 0) {
              this.canMoveR = false;
             } else {
               this.canMoveR = true;
             }
             
             if (penetration.x < 0) {
               this.canMoveL = false;
             } else {
               this.canMoveL = true;
             }
            */
        };
        Player.prototype.OnColliderExit = function (penetration, obj) {
            this.canMoveR = true;
            this.canMoveL = true;
            this.isColliding = false;
        };
        Player.prototype.Jump = function () {
            if (this.isGrounded) {
                if (objects.Game.keyboard.moveUp && !this.isJumping) {
                    this.isGrounded = false;
                    this.isJumping = true;
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
        Player.prototype.CanMove = function () {
            return false;
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