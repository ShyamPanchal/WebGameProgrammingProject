//Will need to impiment multiple pause scenes to route back to indivdual levels
module scenes
{
    export class PauseScene extends objects.Scene
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
            objects.Game.currentScene = config.Scene.INGAME;
        }

        public Start():void
        {
            console.log("PAUSE MENU...");        
        
            this.background = new objects.Background(this.assetManager, "background");           
            
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75, true);
            this.txtButton = new objects.Label("Resume", "20px", "Cambay", "#ffffff", this.backButton.x, this.backButton.y + 3, true);
            this.backButton.scaleX = 0.75;

            this.label = new objects.Label("Game Paused...", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.25, true);
            
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
