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
        //console.log('gravityEffect');
      } else if (this.isGrounded){
        //this.isJumping = false;
        this.maxJumpHeight = this.y - (this.height * 0.7);
        //console.log('grounded : ' + this.maxJumpHeight);
      }
      this.Jump();
      this.Move();
      this.CheckBounds();
    }

    public Reset(): void{

    }

    public Jump() : void {
      if (this.isGrounded) {
        if (objects.Game.keyboard.moveUp && !this.isJumping) {
          this.isGrounded = false;
          this.isJumping = true;
          //console.log('Perform Jump');
          this.y+=config.Gravity.gravity*this.height;
        }
      } else if(this.isJumping) {
        if (this.maxJumpHeight <= this.y){
          //going higher         
          //console.log('going higher : '+ this.y + '- max :' + this.maxJumpHeight);   
          this.y+=config.Gravity.gravity*this.height/2;
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
