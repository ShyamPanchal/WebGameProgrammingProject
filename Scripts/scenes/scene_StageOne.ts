module scenes
{
    export class StageOne extends objects.Scene
    {
        private background: objects.Background;
        private label: objects.Label;
        private backButton: objects.Button;
        private txtButton: objects.Label;


        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.FINISH;
        }

        public Start():void
        {
            console.log("GAME SCENE(S)...");        
        
            this.background = new objects.Background(this.assetManager, "background");           
            
            this.txtButton = new objects.Label("SCENE SAMPLE!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 360;
            this.txtButton.y = 365;           

            this.backButton = new objects.Button(this.assetManager, "startButton", 340, 350);
            this.label = new objects.Label("SCENE SAMPLE!", "48px", "Arial", "#000000", 250, 100);
            this.Main();
        }
        
        public Update():void
        {

        }

        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            
            this.backButton.on("click", this.fn_ButtonClick);
        
        }
      
    }
}
