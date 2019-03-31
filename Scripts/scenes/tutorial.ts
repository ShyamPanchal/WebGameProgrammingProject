module scenes {
    export class Tutorial extends objects.Scene {

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void{
            
            this.Main();
        }

        public Update(): void {

            
        }

        public Main():void{
            
        }
    }
}