module scenes
{
    export class StartScene extends objects.Scene
    {
        private background: objects.Background;
        private gameTitle: objects.Label;
        private gameTitleShadow: objects.Label;
        private startButton: objects.Button;
        private txtStartButton: objects.Label;
        private hDivider: objects.Image;
        private hDivider2: objects.Image;

        private animtimer: number = 0;
        private zoomInOut: boolean = false;

        private controlsButton: objects.Button;
        private txtControlsButton: objects.Label;
        // private controlsImage: objects.UIHelper;
        private clicked: boolean = false;

        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.PROLOGUE;
        }

        private fn_ControlsButton():void
        {
            console.log(this.isPaused);
            //objects.Game.controlsImage.visible = true;
            if(objects.Game.controlsImage.visible)
            {
                console.log("reached");
                objects.Game.controlsImage.visible = false;
            }
            else
            {
                console.log('gone');
                objects.Game.controlsImage.visible = true;
            }
            
        }
       

        public Start():void
        {
            console.log("Main Menu/Start Menu...");      
            
            
        
            this.background = new objects.Background(this.assetManager, "background
            
            this.controlsButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.85, true);
            this.txtControlsButton = new objects.Label("CONTROLS", "20px", "Cambay", "#f7fffd", this.controlsButton.x, this.controlsButton.y, true);
            objects.Game.controlsImage.visible = false;
            objects.Game.controlsImage = new objects.UIHelper(this.assetManager, "controls", 1066 * 0.5 / 2, 600 * 0.5 / 2);
            
            this.txtStartButton = new objects.Label("PLAY", "20px", "Cambay", "#ffffff",0,0, true);     
            this.startButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.5, 600 * 0.75, this.txtStartButton, true);
            this.startButton.scaleX = 0.75;

            this.gameTitle = new objects.Label("Help us Escape!", "bold 48px", "Cambay", "#ffffff", 1066 / 2, 600 / 4, true);
            this.gameTitle.alpha = 1;

            this.gameTitleShadow = new objects.Label("Help us Escape!", "bold 48px", "Cambay", "#828166", (1066 / 2)+4, 600 / 4, true);
            this.gameTitleShadow.alpha = 0.75;

            this.hDivider = new objects.Image(this.assetManager,"hdivider" ,1066 * 0.5, 600 * 0.3, true);
            this.hDivider.scaleX = 2;

            this.hDivider2 = new objects.Image(this.assetManager,"hdivider" ,1066 * 0.5, 600 * 0.175, true);
            this.hDivider2.scaleX = 2;
            this.Main();
        }
        
        public Update():void
        {
            this.animtimer += 1;
            if (this.animtimer >= 30) {
                this.animtimer = 0;
                if (this.zoomInOut) {
                    this.startButton.scaleX = 0.85;
                    this.startButton.text.scaleX = 1.25;
                    this.startButton.scaleY = 1;
                    this.startButton.text.scaleY = 1.3;
                }
                else {
                    this.startButton.scaleX = 0.75;
                    this.startButton.text.scaleX = 1;
                    this.startButton.scaleY = 1;
                    this.startButton.text.scaleY = 1;
                }
                this.zoomInOut = !this.zoomInOut;
               
            }
        }

        
        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.controlsButton);
            this.addChild(this.txtControlsButton);
            this.addChild(objects.Game.controlsImage);
            this.addChild(this.gameTitleShadow);
            this.addChild(this.gameTitle);

            this.addChild(this.startButton);
            this.addChild(this.startButton.text);
            
            this.addChild(this.hDivider);
            this.addChild(this.hDivider2);
            this.startButton.on("click", this.fn_ButtonClick);
            this.controlsButton.on("click", this.fn_ControlsButton);

            
        }
    }
}