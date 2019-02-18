module objects{
    export class OpenableObject extends objects.DynamicObject {

        private openedImage: any;
        private closedImage: any;
        private isClosed: boolean;


        constructor(assetManager: createjs.LoadQueue, imageStringClosed : string, imageStringOpened: string){
            super(assetManager, imageStringClosed);
            this.openedImage = assetManager.getResult(imageStringOpened);
            this.closedImage = assetManager.getResult(imageStringClosed);
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