module scenes
{
    export class EndingScene extends objects.Scene
    {
        private background: objects.Background;
        private label: objects.Label;
        private label1: objects.Label;

        private p1: objects.GameObject;
        private p2: objects.GameObject;

        private continueButton: objects.Button;
        private txtContinueButton: objects.Label;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
            objects.Game.skip = true;
        }

        private fn_ButtonEndClick():void
        {
            objects.Game.currentScene = config.Scene.FINISH;
        }

        public Start():void
        {
            if(objects.Game.isPlayingMusic==false){                
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic=true;
            }
            console.log("ENIDING MENU...");        
        
            
            this.background = new objects.Background(this.assetManager, "level_04_house");
           
            this.txtContinueButton = new objects.Label("Continue", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.continueButton = new objects.Button(this.assetManager, "startButton", (1066 * 0.5) + 15, 600 * 0.8,this.txtContinueButton, true);

            this.continueButton.scaleX = 0.75;
            
            this.label = new objects.Label("Game End!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.25, true);
            this.label1 = new objects.Label("Thank you for Helping Us Escape!", "bold 50px", "Cambay", "#ffffff", 1066 * 0.5, this.label.y + 100, true);

            this.p1 = new objects.GameObject(this.assetManager, "player");
            this.p2 = new objects.GameObject(this.assetManager, "player2");
            this.p2.scaleX = this.p2.scaleX*-1;

            this.p1.x = 490;
            this.p1.y = 350;
            this.p2.x = 590;
            this.p2.y = 350;

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

            this.addChild(this.continueButton);
            this.addChild(this.txtContinueButton);

            this.addChild(this.p1);
            this.addChild(this.p2);
            this.continueButton.on("click", this.fn_ButtonEndClick);
        
        }
      
    }
}
