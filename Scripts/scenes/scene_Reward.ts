module scenes
{
    export class SceneReward extends objects.Scene
    {
        private background: objects.Background;
        private label: objects.Label;
        private backButton: objects.Button;
        private txtButton: objects.Label;

        //Players
        private picturePlayer1:objects.GameObject;
        private picturePlayer2:objects.GameObject;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            console.log('Reward current Level: ' + objects.Game.previousScene);
            this.Start();
        }
        private fn_ButtonClick():void
        {
            console.log("PREVIOUS... " + objects.Game.previousScene);        
            switch(objects.Game.previousScene)
            {
                case config.Scene.INGAME:
                    console.log("NEXT... Level 2");
                    objects.Game.currentScene = config.Scene.INGAME_2;
                break;
                case config.Scene.INGAME_2:
                    console.log("NEXT... Level 3");
                    objects.Game.currentScene = config.Scene.INGAME_3;
                break;
                case config.Scene.INGAME_3:
                    console.log("NEXT... Finish");
                    objects.Game.currentScene = config.Scene.FINISH;
                break;

            }
        }

        public Start():void
        {
            if(objects.Game.isPlayingMusic==false){                
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic=true;
            }
            
            console.log("REWARD MENU...");
        
            this.background = new objects.Background(this.assetManager, "background");
           
            this.txtButton = new objects.Label("Next Level", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.backButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75,this.txtButton, true);

            this.backButton.scaleX = 0.75;
            
            this.label = new objects.Label("Stage Complete!", "bold 80px", "Cambay", "#ffffff", 1066 * 0.5, 600 * 0.1, true);

            this.picturePlayer1 = new objects.GameObject(this.assetManager, "p1_big");
            this.picturePlayer1.x = 80;
            this.picturePlayer1.y = 150;
            //180, 150
             
            this.picturePlayer2 = new objects.GameObject(this.assetManager, "p2_big");
            this.picturePlayer2.x = 500;
            this.picturePlayer2.y = 150;
            //600, 150


            this.Main();
        }
        
        public Update():void
        {
            //updating the total score
            if (objects.Game.scoreManagerP1) {
                objects.Game.scoreManagerP1.Update();
            }
            if (objects.Game.scoreManagerP2) {
                objects.Game.scoreManagerP2.Update();
            }
        }

        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.label);

            //#region score
            this.addChild(this.picturePlayer1);            
            
            this.addChild(this.picturePlayer2);

            //calculating the total
            
            if (objects.Game.scoreManagerP1) {
                objects.Game.scoreManagerP1.AddScoreToScene(this, 180, 150);
                objects.Game.scoreManagerP1.Calculate();
            }
            
            if (objects.Game.scoreManagerP2) {
                objects.Game.scoreManagerP2.AddScoreToScene(this, 600, 150);
                objects.Game.scoreManagerP2.Calculate();
            }
            //#endregion score

            
            //wait some seconds to show the button
            let callback = () => {
                this.addChild(this.backButton);
                this.addChild(this.txtButton);
            };
            this.StartCountdown(3, callback);
            
            this.backButton.on("click", this.fn_ButtonClick);
        
        }

    }
}