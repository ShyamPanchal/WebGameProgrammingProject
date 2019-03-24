module objects{
    export class Key extends objects.HandableObject {

        public keyCode:number = 0;

        constructor(assetManager:createjs.LoadQueue, imageString: string = "key"){
            super(assetManager, imageString);
            this.isGravityAffected = true;
            this.boxCollider = new objects.BoxCollider(this.halfW/3, 0, this.halfW, this.y, 
                this.width/3, this.height);
        }
    }
}