module scenes {
    export class Prologue extends objects.Scene {

        private storyLabel: objects.Label;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void{
            this.storyLabel = new objects.Label("Some Story","20px","Cambay","#000000",1066/2,600/2,true);
            this.Main();
        }

        public Update(): void{

        }

        public Main():void{
            this.addChild(this.storyLabel);
        }
    }
}