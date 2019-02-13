module objects{
  export class Player extends objects.GameObject {

    // Variables
    private speed:number = 5;
    public canMoveR: boolean;
    public canMoveL: boolean;

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

    }

    public Update():void{
      this.boxCollider.Update(this.x, this.y);
      if (!this.isGrounded) {
        this.GravityEffect();
      }
      this.Jump();
      this.Move();
      this.CheckBounds();
    }

    public Reset(): void{

    }

    public Jump() : void {
      if (this.isGrounded) {
        if (objects.Game.keyboard.moveUp) {
          console.log('Jump');
          this.y+=config.Gravity.gravity*this.height*2;
          this.isGrounded = false;
        }
      }
    }

    public Move() :void{
      //this.x = objects.Game.stage.mouseX;
      if (objects.Game.keyboard.moveLeft && this.canMoveL) {
          this.x-=this.speed;
        }

      if (objects.Game.keyboard.moveRight && this.canMoveR) {
          this.x+=this.speed;
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
