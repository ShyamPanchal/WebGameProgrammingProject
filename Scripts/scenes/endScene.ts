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
            
            this.txtButton = new objects.Label("Return to Main Menu!", "18px", "Arial", "#a3a3a3a");
            this.txtButton.x = 350;
            this.txtButton.y = 365;           

            this.backButton = new objects.Button(this.assetManager, "startButton", 340, 350);
            this.label = new objects.Label("Game End!", "48px", "Arial", "#000000", 320, 100);
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
