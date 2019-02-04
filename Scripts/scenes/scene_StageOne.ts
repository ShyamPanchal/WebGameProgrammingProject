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
        
            this.background = new objects.Background(this.assetManager, "level_01");           
            
            this.txtButton = new objects.Label("Bypass!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 910;
            this.txtButton.y = 565;           

            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.label = new objects.Label("Tutorial!", "48px", "Arial", "#000000", 550, 50, true);
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
