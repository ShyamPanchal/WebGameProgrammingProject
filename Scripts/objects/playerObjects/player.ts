module objects{
  export class Player extends objects.GameObject {

    // Variables
    private static speed:number = 5;
    private static maxHightRate:number = 0.9 ; //the player can jump at highest 90% of the height
    public isDead:boolean;
    public maxJumpHeight: number;
    public isJumping: boolean;

    public actionObject:DynamicObject;
    public time: number;
    private timeToAction:number = 0.5;
    public deltaTime: number;
    
    
    // Constructor
    constructor(assetManager:createjs.LoadQueue){
      super(assetManager, "player");
      this.Start();
      this.isGravityAffected = true;
      
      this.time = 0;
      this.deltaTime = 0;
    }

    // Methods / Functions
    public Start():void{
      this.x = 400;
      this.y = 45;
      
      this.isJumping = false;      
    }

    private CheckCollision: (x:number, y:number) => managers.AABB;

    public UpdateIfPossible(Check: (x:number, y:number) => managers.AABB): void {
      this.CheckCollision = Check;
      this.Update();
    }

    protected Update():void{
      super.Update();
      
      this.CheckGrounded(this.CheckCollision);

      if (!this.isGrounded && !this.isJumping) {
        this.DoGravityEffect();
      } else if (this.isGrounded){
        this.maxJumpHeight = this.y - (this.height * Player.maxHightRate)*this.GetGravityFactor();
        this.isJumping = false;
      }
      
      this.Jump();
      this.Move();
      
      this.Action();      
      
      this.CheckBounds();
      
      this.lastPosition.x = this.x;
      this.lastPosition.y = this.y;
    }

    public Reset(): void{

    }

    public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {
      console.log(obj.name + ' penetration : ' + math.Vec2.Print(penetration));  
    }

    public OnColliderExit(penetration: math.Vec2, obj: GameObject) {
    }

    public Jump() : void {
      if (this.isGrounded) {
        if (objects.Game.keyboard.moveUp && !this.isJumping) {
          this.isGrounded = false;
          this.isJumping = true;
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

      if (objects.Game.keyboard.action) {
        if (this.actionObject != null) {
          this.actionObject.Action();                    
          this.deltaTime+=1/60;
        }
      }            
    }

    public Move() :void {
      //this.x = objects.Game.stage.mouseX;
      if (objects.Game.keyboard.moveLeft) {
        if (this.CheckMovement(this.CheckCollision, true, Player.speed)) {
          //this.scaleX *=-1;          
          this.x -= Player.speed;
        }
        if (!this.isLeft) {
          this.FlipHorizontally();
        }
      }

      if (objects.Game.keyboard.moveRight) {
        if (this.CheckMovement(this.CheckCollision, false, Player.speed)) {
          this.x += Player.speed;
        }
        if (this.isLeft) {
          this.FlipHorizontally();
        }
      }
    }

    public CheckGrounded(Check: (x:number, y:number) => managers.AABB): void {
      let md:managers.AABB = Check(this.x, this.y - config.Gravity.gravitySpeed*this.GetGravityFactor());      

      //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
      this.isGrounded = md.isCollided && (md.closestPointOnBoundsToPoint(math.Vec2.zero).y*this.GetGravityFactor() > 0);

    }

    public CheckMovement(Check: (x:number, y:number) => managers.AABB, isLeftMovement: boolean, speed:number): boolean {
      let md:managers.AABB = Check(this.x + (isLeftMovement? 0 - speed:speed), this.y);

      if (this.actionObject instanceof OpenableObject) {
        return true;
      }

      return !md.isCollided;// && md.closestPointOnBoundsToPoint(math.Vec2.zero).x != 0;
    }

    public CheckVerticalMovement(Check: (x:number, y:number) => managers.AABB, isUp: boolean, speed:number): boolean {
      let md:managers.AABB = Check(this.x, this.y + (isUp?speed:0 - speed));
      //console.log(md.closestPointOnBoundsToPoint(math.Vec2.zero).y);
      this.isJumping = !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;

      if (this.actionObject instanceof OpenableObject) {
          return true;
      }

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
