module objects{
  export class Player extends objects.TextureAtlas {

    // Variables
    private speed:number = 5;
    private maxHightRate:number = 0.9 ; //the player can jump at highest 90% of the height
    public isDead:boolean;
    public maxJumpHeight: number;
    public isJumping: boolean;

    public actionObject:DynamicObject;
    public time: number;
    private timeToAction:number = 0.5;
    public deltaTime: number;

    public dialog: any;

    public listener: any;

    public animationState = "Jump";

    public playerNum;

    // Constructor
    constructor(textureAtlas: createjs.SpriteSheet, imageString: string, scaleX:number, scaleY:number, flipOffsetX: number,  x: number, y: number, playerNum: number = 1,){
      super(textureAtlas, imageString, scaleX, scaleY, flipOffsetX);
      this.Start();
      this.isGravityAffected = true;
      this.playerNum = playerNum;
      this.time = 0;
      this.deltaTime = 0;
      this.x = x;
      this.y = y;
    }

    // Methods / Functions
    public Start():void{
      this.isJumping = false;
    }

    private CheckCollision: (x:number, y:number) => managers.AABB;

    public UpdateIfPossible(Check: (x:number, y:number) => managers.AABB): void {
      this.CheckCollision = Check;
      this.Update();
    }

    public Update():void{
      super.Update();

      this.CheckGrounded(this.CheckCollision);

      if (!this.isGrounded && !this.isJumping) {
        this.DoGravityEffect();
      } else if (this.isGrounded){
        this.maxJumpHeight = this.y - (this.height * this.maxHightRate)*this.GetGravityFactor();
        this.isJumping = false;
      }

      this.Jump();
      this.Move();

      this.Action();

      this.CheckBounds();

      this.lastPosition.x = this.x;
      this.lastPosition.y = this.y;

      if (this.dialog != null) {
        this.dialog.dialog.Update(this.x + this.width, this.y - this.halfH)
      }
    }

    public Reset(): void{

    }

    public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {
      console.log(obj.name + ' penetration : ' + math.Vec2.Print(penetration));
    }

    public OnColliderExit(penetration: math.Vec2, obj: GameObject) {
    }

    public cancelStopEvent(e){
        this.stop();
        this.off("animationend", this.listener);
        this.animationState = "Waiting";
    }

    public Jump() : void {
      if (this.isGrounded) {
        if ((objects.Game.keyboard.player1MoveUp && this.playerNum == 1) || (objects.Game.keyboard.player2MoveUp && this.playerNum == 2) && !this.isJumping) {
          this.isGrounded = false;
          this.isJumping = true;
          this.gotoAndPlay("Jump");
          this.animationState = "Jump";
          this.listener =  this.on("animationend", this.cancelStopEvent);
          //this.y += config.Gravity.gravityForce*this.height;
          this.Move_Vertically(true, config.Gravity.gravityForce*this.GetGravityFactor()*this.height);
        }
      } else if(this.isJumping) {
        if (this.maxJumpHeight*this.GetGravityFactor() <= this.y*this.GetGravityFactor()){
          //going higher
          //this.y += config.Gravity.gravityForce*this.height/2;
          this.Move_Vertically(true, config.Gravity.gravityForce*this.GetGravityFactor()*this.height/2);
        } else {
          //console.log('reach high');
          this.isJumping = false;
        }
      }
    }
    public Move_Vertically(up:boolean, speed:number) :void {

      if (up) {
        if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) {
          this.y += speed;
        }
      } else {
        if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
          this.y -= speed;
        }
      }
    }


    public Action() :void {

      if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
        this.deltaTime+=1/60;
        return;
      }
      this.deltaTime=0;

      if ((objects.Game.keyboard.player1Action && this.playerNum == 1) || (objects.Game.keyboard.player2Action && this.playerNum == 2)) {
        if (this.actionObject != null) {
            this.gotoAndPlay("Action");
            this.animationState = "Action";
            this.listener =  this.on("animationend", this.cancelStopEvent);
          this.actionObject.Action();
          this.deltaTime+=1/60;
        }
      }
    }

    public Move() :void {
      //this.x = objects.Game.stage.mouseX;
      if ((objects.Game.keyboard.player1MoveLeft && this.playerNum == 1) || (objects.Game.keyboard.player2MoveLeft && this.playerNum == 2)) {
        if (this.CheckMovement(this.CheckCollision, true, this.speed)) {
          //this.scaleX *=-1;
          this.x -= this.speed;
          if (this.isGrounded){
              if (this.animationState != "Run" && this.animationState != "Action"){
                  this.gotoAndPlay("Run");
                  this.animationState = "Run";
              }
          }
        }
        else{
            if (this.isGrounded){
                if (this.animationState != "Idle" && this.animationState != "Action"){
                    this.gotoAndPlay("Idle");
                    this.animationState = "Idle";
                }
            }
        }
        if (!this.isLeft) {
          this.FlipHorizontally();
        }
      }
      else if ((objects.Game.keyboard.player1MoveRight && this.playerNum == 1) || (objects.Game.keyboard.player2MoveRight && this.playerNum == 2)) {
        if (this.CheckMovement(this.CheckCollision, false, this.speed)) {
          this.x += this.speed;
          if (this.isGrounded){
              if (this.animationState != "Run" && this.animationState != "Action"){
                  this.gotoAndPlay("Run");
                  this.animationState = "Run";
              }

          }
        }
        else{
            if (this.isGrounded){
                if (this.animationState != "Idle" && this.animationState != "Action"){
                    this.gotoAndPlay("Idle");
                    this.animationState = "Idle";
                }

            }
        }
        if (this.isLeft) {
          this.FlipHorizontally();
        }
      }
      else{
          if (this.isGrounded){
              if (this.animationState != "Idle" && this.animationState != "Action"){
                  this.gotoAndPlay("Idle");
                  this.animationState = "Idle";
              }
          }
      }


    }

    public CheckGrounded(Check: (x:number, y:number) => managers.AABB): void {
      let md:managers.AABB = Check(this.x, this.y - config.Gravity.gravitySpeed*this.GetGravityFactor());

      if (md.isCollided && md.objectCollided instanceof OpenableObject) {
        this.isGrounded = false;
        return;
      }
      //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
      this.isGrounded = md.isCollided && (md.closestPointOnBoundsToPoint(math.Vec2.zero).y*this.GetGravityFactor() > 0);

    }

    public CheckMovement(Check: (x:number, y:number) => managers.AABB, isLeftMovement: boolean, speed:number): boolean {
      let md:managers.AABB = Check(this.x + (isLeftMovement? 0 - speed:speed), this.y);

      if (this.actionObject instanceof OpenableObject) {
        return true;
      }
      // if (this.actionObject instanceof PushableObject){
      //     return false;
      // }
      return !md.isCollided;// && md.closestPointOnBoundsToPoint(math.Vec2.zero).x != 0;
    }

    public CheckVerticalMovement(Check: (x:number, y:number) => managers.AABB, isUp: boolean, speed:number): boolean {
      let md:managers.AABB = Check(this.x, this.y + (isUp?speed:0 - speed));
      //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
      if (md.isCollided && this.actionObject instanceof OpenableObject) {
        return true;
      }
      this.isJumping = !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;

      return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
      //&& (md.closestPointOnBoundsToPoint(math.Vec2.zero).y > 0 || md.closestPointOnBoundsToPoint(math.Vec2.zero).y < 0));
    }

    public CheckBounds(): void {
      // hardcoding the play area for now
      /*if (this.x >= 837.5){
        this.x = 837.5;
      }

      if (this.x <= 235.5){
        this.x = 235.5;
      }*/
    }
  }
}
