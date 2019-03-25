module scenes
{
    export class EndScene extends objects.Scene
    {
        private background: objects.Background;
        private label: objects.Label;
        private label1: objects.Label;

        private backButton: objects.Button;
        private txtButton: objects.Label;

        private keepButton: objects.Button;
        private txtkeepButton: objects.Label;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
            objects.Game.skip = true;
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.START;
        }

        private fn_ButtonKeepClick():void
        {
            objects.Game.currentScene = objects.Game.previousScene;
        }

        public Start():void
        {
            console.log("END MENU...");        
        
            this.background = new objects.Background(this.assetManager, "background");
           
            this.txtButton = new objects.Label("Exit", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75,this.txtButton, true);
            this.backButton.scaleX = 0.75;

            this.txtkeepButton = new objects.Label("Continue", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.keepButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75  - 70,this.txtkeepButton, true);

            this.keepButton.scaleX = 0.75;
            
            this.label = new objects.Label("Game End!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.25, true);
            this.label1 = new objects.Label("Thank you for Helping Us Escape!", "bold 50px", "Cambay", "#ffffff", 1066 * 0.5, this.label.y + 100, true);

            this.Main();
        }
        
        public Update():void
        {

        }

        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.label1);

            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            
            if (objects.Game.playerDead) {
                this.addChild(this.keepButton);
                this.addChild(this.txtkeepButton);
            }

            this.backButton.on("click", this.fn_ButtonClick);
            
            this.keepButton.on("click", this.fn_ButtonKeepClick);
        
        }
      
    }
}
