module objects{
    export class Door extends objects.OpenableObject {
        private backgroundImage: any;
        private foregroundImage: any;

        public isOut:boolean;
        
        constructor(assetManager: createjs.LoadQueue,
            isOut:boolean = false,
            backgroundImage: string = "open_door",
            foregroundImage: string = "open_door"){
            super(assetManager, "closed_door", "open_door_dark");

            this.isOut = isOut;
            this.backgroundImage = assetManager.getResult(backgroundImage);
            this.foregroundImage = assetManager.getResult(foregroundImage);
        
        
        }

        public EnterDoorAction(player:Player) {
            console.log("Going to the next level!!!!");
        }

        public Action(): void {
            if (!this.isOut || (this.isClosed && this.isOut)) {
                super.Action();
                this.alreadyHandled = false;
            } else {
                this.EnterDoorAction(this.player);
                console.log('enter door action');
            }            
        }
    }
}