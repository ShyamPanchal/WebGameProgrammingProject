module objects{
    export class EmptyGameObject extends GameObject {
      // Variables

      // Constructor
      constructor(assetManager: createjs.LoadQueue, imageString: string, width:number = 1, height:number = 1) {
        super(assetManager, imageString);
        this.width = width;
        this.height = height;
        //it must call Init again in order to use another bounds
        this.Init();
      }

      protected GetWidthBounds() : number {
        return this.width;
      }
  
      protected GetHeightBounds() : number {
        return this.height;
      }

      public Update() {
        super.Update();
      }
    }
    export class Stair extends EmptyGameObject {
      constructor(assetManager: createjs.LoadQueue, imageString: string, width:number = 1, height:number = 1) {
        super(assetManager, imageString, width, height);        
      }
    }
  }
  