module scenes {
    export class SplashScreen extends objects.Scene {

        private devIcon: objects.Image;
        private splashDone: boolean;
        private splashMaxed: boolean;
        private stayCounter:number;
        private background: objects.Background;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void {

            this.background = new objects.Background(this.assetManager, "background");
            this.background.alpha = 0;

            this.devIcon = new objects.Image(this.assetManager, "devIcon", 1066 / 2, 600 / 2, true);
            this.devIcon.alpha = 0;
            this.devIcon.scaleX = 0.3;
            this.devIcon.scaleY = 0.3;

            this.splashDone = false;
            this.splashMaxed = false;

            this.stayCounter = 0;

            this.Main();
        }

        public Update(): void {

            if(!this.splashMaxed && !this.splashDone){
                this.devIcon.alpha += 0.015;
            }

            if(this.devIcon.alpha >= 1 && !this.splashMaxed && !this.splashDone){
                this.stayCounter++;
                if(this.stayCounter >= objects.Game.frameRate){
                    this.splashMaxed = true;
                }
            }

            if(this.splashMaxed && !this.splashDone){
                this.devIcon.alpha -= 0.015;
            }

            if(this.devIcon.alpha <= 0 && this.splashMaxed && !this.splashDone){
                this.splashDone = true;
            }

            if(this.splashDone){
                this.background.alpha += 0.02;
            }

            if(this.background.alpha >= 1)
            objects.Game.currentScene = config.Scene.START;
        }

        public Main(): void {
            this.addChild(this.background);
            this.addChild(this.devIcon);
        }
    }
}