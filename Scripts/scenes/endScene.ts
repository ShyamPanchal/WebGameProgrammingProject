module scenes
{
    export class EndScene extends objects.Scene
    {
        private background: objects.Background;
        private label: objects.Label;
        private label2: objects.Label;
        private label3: objects.Label;
        private label4: objects.Label;
        private backButton: objects.Button;
        private txtButton: objects.Label;
        private buttonBlack: objects.Image;
        private blackCover: objects.Image;
       

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
            this.blackCover = new objects.Image(this.assetManager,"hdivider" ,1066 * 0.5, 600 * 0.9, true); //Black image to cover
            this.blackCover.scaleX = 2;
            this.blackCover.scaleY = 2;
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.8, true);
            this.txtButton = new objects.Label("Main Menu", "20px", "Cambay", "#ffffff", this.backButton.x, this.backButton.y + 3, true);
            this.backButton.scaleX = 0.75;
          //  this.buttonBlack = new objects.Image(this.assetManager, "buttonBlack",1066 * 0.5, 600 * 0.9, true);  
          //  this.buttonBlack.scaleX = 1.2;
            this.label = new objects.Label("Game Over", "bold 96px", "Crackman", "#00adad", 1066 * 0.5, 600 * 0.48, true);
            this.label2 = new objects.Label("After eating Pac-Dots, Pacman realised what heaven is...", "28px", "Crackman", "#ffff00", 1066 * 0.5, 600 * 0.6, true);
            this.label3 = new objects.Label("Then he went in search for more pac-dots...", "28px", "Crackman", "#dfdf00", 1066 * 0.5, 600 * 0.65, true);
            this.label4 = new objects.Label("and he met Toru Iwatani of Namco and Rest is HISTORY", "28px", "Crackman", "#bfbf00", 1066 * 0.5, 600 * 0.7, true);
           

            this.Main();
        }
        
        public Update():void
        {

        }

        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.label);
            this.addChild(this.label2);
            this.addChild(this.label3);
            this.addChild(this.label4);
            this.addChild(this.blackCover);
            this.addChild(this.backButton);
         //   this.addChild(this.buttonBlack);
            this.addChild(this.txtButton);
            
            
            this.backButton.on("click", this.fn_ButtonClick);
        
        }
      
    }
}
