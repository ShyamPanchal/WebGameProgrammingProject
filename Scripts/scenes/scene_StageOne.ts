
module scenes
{
    export class StageOne extends objects.Scene
    {
        private background: objects.Background;
        private label: objects.Label;
        private backButton: objects.Button;
        private pauseButton: objects.Button;
        private txtButton: objects.Label;
        private pauseTxtButton: objects.Label;


        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.FINISH;
        }

        private fn_pauseButtonClick():void
        {
            objects.Game.currentScene = config.Scene.PAUSE;
        }

        public Start():void
        {
            




            console.log("GAME SCENE(S)...");        
        
            this.background = new objects.Background(this.assetManager, "level_01");           
            
            this.txtButton = new objects.Label("Bypass!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 910;
            this.txtButton.y = 565;  
            
            //pause button            
            this.pauseButton = new objects.Button(this.assetManager, "startButton", -10, 550);
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff",this.pauseButton.x+80, this.pauseButton.y+10);
            //pause button end

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
            this.addChild(this.pauseButton);
            this.addChild(this.pauseTxtButton);
            
            this.backButton.on("click", this.fn_ButtonClick);

            this.pauseButton.on("click", this.fn_pauseButtonClick);//pause
        
        }
      
    }
}
