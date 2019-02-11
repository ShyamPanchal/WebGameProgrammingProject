module objects{
  export class Player extends objects.GameObject {

    // Variables


    // Constructor
    constructor(assetManager:createjs.LoadQueue){
      super(assetManager, "player");
      this.Start();
    }

    // Methods / Functions
    public Start():void{
      this.y = 445;
    }

    public Update():void{
      this.Move();
      this.CheckBounds();
    }

    public Reset(): void{

    }

    public Move() :void{
      this.x = objects.Game.stage.mouseX;
    }

    public CheckBounds(): void{
      // hardcoding the play area for now
      if (this.x >= 837.5){
        this.x = 837.5;
      }

      if (this.x <= 235.5){
        this.x = 235.5;
      }
    }
  }
}
