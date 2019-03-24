module objects{
    export class InformativePoint extends objects.DynamicObject {
        constructor(assetManager: createjs.LoadQueue){
            super(assetManager, "empty");
            this.isGravityAffected = false;
        }
    }
}