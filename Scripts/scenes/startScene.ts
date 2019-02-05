module scenes
{
    export class StartScene extends objects.Scene
    {
        private background: objects.Background;
        private gameTitle: objects.Label;
        private startButton: objects.Button;
        private txtStartButton: objects.Label;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.INGAME;
        }

        public Start():void
        {
            console.log("Main Menu/Start Menu...");        
        
            this.background = new objects.Background(this.assetManager, "background");
           

            this.startButton = new objects.Button(this.assetManager, "startButton", 340, 350);

            this.txtStartButton = new objects.Label("Game Start!", "18px", "Arial", "#a3a3a3a");
            this.txtStartButton.x = 385;
            this.txtStartButton.y = 365;           

            this.gameTitle = new objects.Label("Help us Escape!", "48px", "Arial", "#000000", 280, 100);
            this.Main();
        }
        
        public Update():void
        {

        }

        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.gameTitle);
            this.addChild(this.startButton);
            this.addChild(this.txtStartButton);
            this.startButton.on("click", this.fn_ButtonClick);
        
        }
      
    }
}