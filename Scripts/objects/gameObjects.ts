module objects{
  export class GameObject extends createjs.Bitmap{
    // Variables
    protected speedX: number;
    protected speedY: number;

    public width: number;
    public height: number;

    public halfW: number;
    public halfH: number;

    public isColliding:boolean;
    public isGrounded:boolean;

    public isGravityAffected:boolean;
        
    public boxCollider : objects.BoxCollider;
    public lastPosition: math.Vec2;

    public gravityFactor:number;

    // Constructor
    constructor(assetManager: createjs.LoadQueue, imageString: string){
      super(assetManager.getResult(imageString));

      this.name = imageString;
      this.gravityFactor = config.Gravity.gravityFactor;
      this.Init();
    }

    protected GetGravityFactor():number{
      return this.gravityFactor;
    }

    // Methods / Functions
    protected Init():void{
      this.width = this.GetWidthBounds();
      this.height = this.GetHeightBounds();
      this.halfW = this.width * 0.5;
      this.halfH = this.height * 0.5;

      /*this.regX = this.halfW;
      this.regY = this.halfH;*/

      this.regX = 0;
      this.regY = 0;
      this.isColliding = false;
      this.isGrounded = false;
      this.isGravityAffected = false;
      this.lastPosition = new math.Vec2();
      this.boxCollider = new objects.BoxCollider(0 , 0, this.x, this.y, this.width, this.height);
    }

    protected GetWidthBounds() : number {
      return this.getBounds().width;
    }

    protected GetHeightBounds() : number {
      return this.getBounds().height;
    }

    public Start(): void{
    }

    protected Update(): void{
      this.boxCollider.Update(this.x, this.y);

      if (objects.Game.isDebug) {
        this.DrawDebugLine()
      }

      if (this.isGravityAffected) {
        //this.DoGravityEffect();
      }
    }
    public CheckNextWorldPosition(): boolean {
      return false;
    }

    public Reset(): void{

    }

    public CheckBounds(): void{

    }

    public Move(): void{

    }

    public DoGravityEffect(): void {
        this.y -= config.Gravity.gravitySpeed*this.GetGravityFactor();
    }

    //called only when the function managers.Collision.CheckAABB is called
    public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {

    }

    //called only when the function managers.Collision.CheckAABB is called
    public OnColliderExit(penetration: math.Vec2, obj: GameObject) {

    }

    private cached :createjs.Shape;
    public DrawDebugLine() :void {
      if (this.boxCollider != null) {          
        this.boxCollider.DebugLine();
      }

      if (this.cached !== null) {
        objects.Game.stage.removeChild(this.cached);
      }
      let graphics = new createjs.Graphics();
      graphics.beginStroke("#FF0099")
        .drawRect(this.x, this.y, this.width, this.height)
        .endStroke();
      this.cached = new createjs.Shape(graphics);
      objects.Game.stage.addChild(this.cached);
    }
  
  }
}
