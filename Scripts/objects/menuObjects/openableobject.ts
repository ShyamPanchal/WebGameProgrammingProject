module objects{
    export class OpenableObject extends objects.DynamicObject {

        private backgroundImage: any;
        private openedImage: any;
        private closedImage: any;
        private isClosed: boolean;
        private  gameObject: objects.GameObject;

        constructor(assetManager: createjs.LoadQueue, imageStringClosed : string, imageStringOpened: string, backgroundImage: string = imageStringOpened){
            super(assetManager, imageStringClosed);
            this.openedImage = assetManager.getResult(imageStringOpened);
            this.closedImage = assetManager.getResult(imageStringClosed);
            this.backgroundImage = assetManager.getResult(backgroundImage);
            this.isClosed = true;

            this.isGravityAffected = true;
          }

        public Action(): void {
            super.Action();
            if (this.aabbResultPlayer !== null) {                
                this.Open();
            }
        }

        private Open() :void {
            this.isClosed = !this.isClosed;
            if (this.isClosed) {
                this.image = this.closedImage;
            } else {
                this.image = this.openedImage;
            }
        }

    }
}