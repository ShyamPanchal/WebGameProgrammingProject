module scenes
{
    export class EndScene extends objects.Scene
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
            objects.Game.currentScene = config.Scene.START;
        }

        public Start():void
        {
            console.log("END MENU...");        
        
            this.background = new objects.Background(this.assetManager, "background");           
           
            this.txtButton = new objects.Label("Exit", "20px", "Cambay", "#ffffff", 0,0, true);
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75,this.txtButton, true);
            this.backButton.scaleX = 0.75;
            
            this.label = new objects.Label("Game End!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.25, true);
            
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
