module objects{
    export class Key extends objects.HandableObject {
        constructor(assetManager:createjs.LoadQueue){
            super(assetManager, "key");
            this.isGravityAffected = true;
        }
    }
}