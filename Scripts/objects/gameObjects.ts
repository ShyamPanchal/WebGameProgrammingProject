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
    public isDebug: boolean;

    public isGravityAffected:boolean;

    private graphics:createjs.Graphics;
    private cached :createjs.Shape;
        
    public boxCollider : objects.BoxCollider;
    public lastPosition: math.Vec2;

    // Constructor
    constructor(assetManager: createjs.LoadQueue, imageString: string){
      super(assetManager.getResult(imageString));

      this.name = imageString;
      this.Init();
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
      this.isDebug = false;
      this.lastPosition = new math.Vec2();
      this.boxCollider = new objects.BoxCollider(0 , 0,this.x, this.y, this.width, this.height);
    }

    protected GetWidthBounds() : number {
      return this.getBounds().width;
    }

    protected GetHeightBounds() : number {
      return this.getBounds().height;
    }

    public Start(): void{
    }

    public Update(): void{
      this.boxCollider.x = this.x;
      this.boxCollider.y = this.y;
    }

    public Reset(): void{

    }

    public CheckBounds(): void{

    }

    public Move(): void{

    }

    public GravityEffect(): void {
        if (this.isGravityAffected) {
          //console.log(this.height); player height = 60
          this.y-=config.Gravity.gravity*60/3;
        }
    }

    public OnColliderEnter(penetration: math.Vec2, obj: GameObject) {

    }

    public OnColliderExit(penetration: math.Vec2, obj: GameObject) {

    }

    public DebugLine() :void {

      if (this.isDebug) {
        if (this.boxCollider != null) {          
          this.boxCollider.DebugLine();
        }

        if (this.cached !== null) {
          this.parent.removeChild(this.cached);
        }
        this.graphics = new createjs.Graphics();
        this.graphics.beginStroke("#FF0099")
        .drawRect(this.x, this.y, this.width, this.height)
        .endStroke();
        this.cached = new createjs.Shape(this.graphics);
        this.parent.addChild(this.cached);
      }
    }
  }
}
