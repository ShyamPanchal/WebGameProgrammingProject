module objects{
    export class OpenableObject extends objects.DynamicObject {

        private openedImage: any;
        private closedImage: any;
        public isClosed: boolean;
        public isLocked: boolean;
        keyCode:number = 0;

        public objectInside:GameObject[];

        constructor(assetManager: createjs.LoadQueue, imageStringClosed : string, imageStringOpened: string){
            super(assetManager, imageStringClosed);
            this.openedImage = assetManager.getResult(imageStringOpened);
            this.closedImage = assetManager.getResult(imageStringClosed);
            
            this.isClosed = true;
            this.isLocked = false;

            this.objectInside = new Array<GameObject>();
            this.isGravityAffected = true;
        }

        public AddObjectInside(object: GameObject):void {
            this.objectInside.push(object);
            object.isGravityAffected = false;
            object.x = 1500;
        }

        public Action(): void {
            if (this.isLocked) {
                if(this.player.inventory.CheckKey(this.keyCode) && this.player.inventory.UseKey()) {
                    this.isLocked = false;
                    createjs.Sound.play("casset").volume = 0.3;
                    console.log('key used');
                } else {
                    createjs.Sound.play("open_drawer").volume = 0.5;
                    console.log('has not the key');
                }
            } else {
                super.Action();                
                if (this.aabbResultPlayer !== null) {                
                    this.OpenClose();
                }
            }
        }

        private OpenClose() :void {
            this.isClosed = !this.isClosed;
            if (this.isClosed) {
                if (this instanceof Door) {
                    createjs.Sound.play("door").volume = 0.3;
                } else {
                    createjs.Sound.play("open_drawer").volume = 0.5;
                }
                this.image = this.closedImage;
            } else {                
                createjs.Sound.play("close_door").volume = 0.3;
                this.image = this.openedImage;
                if (this.objectInside.length > 0) {
                    let object = this.objectInside.pop();
                    object.y = this.y - object.height*this.gravityFactor;
                    object.x = this.x + object.width + 10;
                    object.isGravityAffected = true;
                }
            }
        }

    }
}