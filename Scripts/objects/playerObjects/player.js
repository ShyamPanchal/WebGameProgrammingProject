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
        function Player(assetManager, playerNum, inventory, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, assetManager, playerNum == 1 ? "player" : "player") || this;
            _this.timeToAction = 0.5;
            _this.animationState = "Jump";
            _this.fixed_flipOffsetX = 27;
            _this.flipOffsetX = 0;
            _this.playerNum = playerNum;
            if (playerNum == 1) {
                _this.spriteRenderer = new createjs.Sprite(objects.Game.player1TextureAtlas, "Idle");
                _this.picture = new objects.GameObject(assetManager, "p1");
            }
            else {
                _this.spriteRenderer = new createjs.Sprite(objects.Game.player2TextureAtlas, "Idle");
                _this.picture = new objects.GameObject(assetManager, "p2");
            }
            _this.spriteRenderer.scaleX = 0.1;
            _this.spriteRenderer.scaleY = 0.1;
            _this.Start();
            _this.picture.alpha = 0.5;
            _this.isGravityAffected = true;
            _this.inventory = inventory;
            _this.inventory.player = _this;
            _this.picture.x = inventory.x;
            _this.picture.y = inventory.y;
            _this.time = 0;
            _this.deltaTime = 0;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        // Methods / Functions
        Player.prototype.Start = function () {
            this.isJumping = false;
        };
        Player.prototype.UpdateIfPossible = function (Check) {
            this.CheckCollision = Check;
            this.Update();
        };
        Player.prototype.Update = function () {
            this.spriteRenderer.x = this.flipOffsetX + this.x;
            this.spriteRenderer.y = this.y;
            _super.prototype.Update.call(this);
            this.CheckGrounded(this.CheckCollision);
            if (!this.isGrounded && !this.isJumping) {
                this.DoGravityEffect();
            }
            else if (this.isGrounded) {
                this.maxJumpHeight = this.y - (this.height * Player.maxHightRate) * this.GetGravityFactor();
                this.isJumping = false;
            }
            this.Jump();
            this.Move();
            this.Action();
            this.CheckBounds();
            this.lastPosition.x = this.x;
            this.lastPosition.y = this.y;
            if (this.dialog != null) {
                this.dialog.dialog.Update(this.x + this.width, this.y - 0.3 * this.halfH);
            }
        };
        Player.prototype.Reset = function () {
        };
        Player.prototype.OnColliderEnter = function (penetration, obj) {
            console.log(obj.name + ' penetration : ' + math.Vec2.Print(penetration));
        };
        Player.prototype.OnColliderExit = function (penetration, obj) {
        };
        Player.prototype.cancelStopEvent = function (e) {
            this.spriteRenderer.stop();
            this.spriteRenderer.off("animationend", this.listener);
            this.animationState = "Waiting";
        };
        Player.prototype.CheckKeyboardPlayerJump = function () {
            return (objects.Game.keyboard.player1MoveUp && this.playerNum == 1) || (objects.Game.keyboard.player2MoveUp && this.playerNum == 2);
        };
        Player.prototype.Jump = function () {
            if (this.isGrounded) {
                if (this.CheckKeyboardPlayerJump() && !this.isJumping) {
                    this.isGrounded = false;
                    this.isJumping = true;
                    this.spriteRenderer.gotoAndPlay("Jump");
                    this.animationState = "Jump";
                    this.listener = this.on("animationend", this.cancelStopEvent);
                    //this.y += config.Gravity.gravityForce*this.height;
                    this.Move_Vertically(true, config.Gravity.gravityForce * this.GetGravityFactor() * this.height);
                }
            }
            else if (this.isJumping) {
                if (this.maxJumpHeight * this.GetGravityFactor() <= this.y * this.GetGravityFactor()) {
                    //going higher
                    //this.y += config.Gravity.gravityForce*this.height/2;
                    this.Move_Vertically(true, config.Gravity.gravityForce * this.GetGravityFactor() * this.height / 2);
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
        Player.prototype.CheckKeyboardPlayerAction = function () {
            return (objects.Game.keyboard.player1Action && this.playerNum == 1) ||
                (objects.Game.keyboard.player2Action && this.playerNum == 2);
        };
        Player.prototype.Action = function () {
            if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
                this.deltaTime += 1 / 60;
                return;
            }
            if (this.animationState != "Idle" && this.animationState != "Run") {
                this.spriteRenderer.gotoAndPlay("Idle");
                this.animationState = "Idle";
            }
            this.deltaTime = 0;
            if (this.CheckKeyboardPlayerAction()) {
                this.spriteRenderer.gotoAndPlay("Action");
                this.animationState = "Action";
                this.listener = this.on("animationend", this.cancelStopEvent);
                if (this.actionObject == null) {
                    this.inventory.DropItem();
                    this.deltaTime += 1 / 60;
                }
                else {
                    this.actionObject.Action();
                    this.deltaTime += 1 / 60;
                }
            }
        };
        Player.prototype.CheckKeyboardPlayerMoveLeft = function () {
            return (objects.Game.keyboard.player1MoveLeft && this.playerNum == 1) ||
                (objects.Game.keyboard.player2MoveLeft && this.playerNum == 2);
        };
        Player.prototype.CheckKeyboardPlayerMoveRight = function () {
            return (objects.Game.keyboard.player1MoveRight && this.playerNum == 1) ||
                (objects.Game.keyboard.player2MoveRight && this.playerNum == 2);
        };
        Player.prototype.Move = function () {
            //this.x = objects.Game.stage.mouseX;
            var isMovement = false;
            if (this.CheckKeyboardPlayerMoveLeft()) {
                if (this.CheckMovement(this.CheckCollision, true, Player.speed)) {
                    //this.scaleX *=-1;          
                    this.x -= Player.speed;
                    isMovement = true;
                }
                if (!this.isLeft) {
                    this.FlipHorizontally();
                }
            }
            if (this.CheckKeyboardPlayerMoveRight()) {
                if (this.CheckMovement(this.CheckCollision, false, Player.speed)) {
                    this.x += Player.speed;
                    isMovement = true;
                }
                if (this.isLeft) {
                    this.FlipHorizontally();
                }
            }
            if (this.isGrounded) {
                if (isMovement) {
                    if (this.animationState != "Run" && this.animationState != "Action") {
                        this.spriteRenderer.gotoAndPlay("Run");
                        this.animationState = "Run";
                    }
                }
                else {
                    if (this.animationState != "Idle" && this.animationState != "Action") {
                        this.spriteRenderer.gotoAndPlay("Idle");
                        this.animationState = "Idle";
                    }
                }
            }
        };
        Player.prototype.CheckGrounded = function (Check) {
            var md = Check(this.x, this.y - config.Gravity.gravitySpeed * this.GetGravityFactor());
            if (md.isCollided && (md.objectCollided instanceof objects.Door || md.objectCollided instanceof objects.HandableObject)) {
                this.isGrounded = false;
                return;
            }
            //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
            this.isGrounded = md.isCollided && (md.closestPointOnBoundsToPoint(math.Vec2.zero).y * this.GetGravityFactor() > 0);
        };
        Player.prototype.CheckMovement = function (Check, isLeftMovement, speed) {
            var md = Check(this.x + (isLeftMovement ? 0 - speed : speed), this.y);
            if (md.objectCollided instanceof objects.OpenableObject || md.objectCollided instanceof objects.HandableObject) {
                return true;
            }
            return !md.isCollided; // && md.closestPointOnBoundsToPoint(math.Vec2.zero).x != 0;
        };
        Player.prototype.CheckVerticalMovement = function (Check, isUp, speed) {
            var md = Check(this.x, this.y + (isUp ? speed : 0 - speed));
            //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
            if (md.isCollided && (md.objectCollided instanceof objects.Door || this.actionObject instanceof objects.HandableObject)) {
                return true;
            }
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
        Player.speed = 5;
        Player.maxHightRate = 0.9; //the player can jump at highest 90% of the height
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map