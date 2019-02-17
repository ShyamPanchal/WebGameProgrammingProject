module objects{
  export class Player extends objects.GameObject {

    // Variables
    private static speed:number = 5;
    public canMoveR: boolean;
    public canMoveL: boolean;
    public maxJumpHeight: number;
    public isJumping: boolean;

    // Constructor
    constructor(assetManager:createjs.LoadQueue){
      super(assetManager, "player");
      this.Start();
      this.isGravityAffected = true;
    }

    // Methods / Functions
    public Start():void{
      this.x = 400;
      this.y = 45;
      this.canMoveL = true;
      this.canMoveR = true;
      this.isJumping = false;      
    }

    public Update():void{
      this.boxCollider.Update(this.x, this.y);

      if (!this.isGrounded && !this.isJumping) {
        this.GravityEffect();
      } else if (this.isGrounded){
        this.maxJumpHeight = this.y - (this.height * 0.7);
      }
      
      this.Jump();
      this.Move();
      this.CheckBounds();
      
      this.lastPosition.x = this.x;
      this.lastPosition.y = this.y;
    }

    public Reset(): void{

    }

    public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {
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
        } else {
          //player is bellow the object
          this.isJumping = false;
        }
        this.canMoveR = true;
        this.canMoveL = true;
      } else {
        var leftSide = Math.abs((this.boxCollider.aabb.max.x - penetration.x) - obj.boxCollider.aabb.min.x);
        var rightSide = Math.abs((this.boxCollider.aabb.min.x - penetration.x) - obj.boxCollider.aabb.max.x);
        
        console.log('leftSide : ' + leftSide);
        console.log('rightSide : ' + rightSide);

        if (rightSide > leftSide) {
          //player is at right side of the object
          this.canMoveR = false;
          console.log('right side');
          this.x = this.x - Math.abs( penetration.x);//this.halfW);
        } else {
          //player is at left side of the object
          this.canMoveL = false;
          console.log('left side');
          this.x = this.x + Math.abs(penetration.x);//this.halfW);

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
    }

    public OnColliderExit(penetration: math.Vec2, obj: GameObject) {
      
      this.canMoveR = true;
      this.canMoveL = true;
      this.isColliding = false;
      
    }

    public Jump() : void {
      if (this.isGrounded) {
        if (objects.Game.keyboard.moveUp && !this.isJumping) {
          this.isGrounded = false;
          this.isJumping = true;
          this.y += config.Gravity.gravity*this.height;
        }
      } else if(this.isJumping) {
        if (this.maxJumpHeight <= this.y){
          //going higher         
          //console.log('going higher : '+ this.y + '- max :' + this.maxJumpHeight);   
          this.y += config.Gravity.gravity*this.height/2;
        } else {
          //console.log('reach high');
          this.isJumping = false;
        }
      }
    }

    public Move() :void{
      //this.x = objects.Game.stage.mouseX;
      if (objects.Game.keyboard.moveLeft && this.canMoveL) {
          this.x-=Player.speed;
        }

      if (objects.Game.keyboard.moveRight && this.canMoveR) {
          this.x+=Player.speed;
      }
    }

    public CanMove(): Boolean {
      
      return false;
    }

    public CheckBounds(): void{
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
