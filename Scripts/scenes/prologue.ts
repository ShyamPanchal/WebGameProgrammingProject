module scenes {
    export class Prologue extends objects.Scene {
        //Audio
        private backgroundMusic:createjs.AbstractSoundInstance;
        private isPlaying: boolean=false;


        private storyLabel1: objects.Label;
        private storyLabel2: objects.Label;
        private storyLabel3: objects.Label;
        private storyLabel4: objects.Label;
        private storyLabel5: objects.Label;
        private storyLabel6: objects.Label;

        private storyText1: string = "Alice and Alisha, the world's greatest treasure-hunting twins";
        private storyText2: string = "sought out the mansion in the mountains after hearing tales of its great lost treasures.";
        private storyText3: string = "Little did they know, the ghosts of the slaughtered family who previously";
        private storyText4: string = "resided there are still patrolling its halls in search of revenge on all who seek the manor's treasure.";
        private storyText5: string = "Now, separated from each other, the twins must find a way to";
        private storyText6: string = "escape - without further disrupting the dead.";

        private nextButton: objects.Button;
        private nextText: objects.Label;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void{
            if(this.isPlaying==false){
                
            this.backgroundMusic = createjs.Sound.play("play_music");
            this.backgroundMusic.loop = -1; // Looping forever
            this.backgroundMusic.volume = 0.3;
            this.isPlaying=true;
            }
            

            this.storyLabel1 = new objects.Label(this.storyText1,"20px","Cambay","#000000",1066/2,600/1.5,true);
            this.storyLabel2 = new objects.Label(this.storyText2,"20px","Cambay","#000000",1066/2,600/1.5 + 20,true);
            this.storyLabel3 = new objects.Label(this.storyText3,"20px","Cambay","#000000",1066/2,600/1.5 + 60,true);
            this.storyLabel4 = new objects.Label(this.storyText4,"20px","Cambay","#000000",1066/2,600/1.5 + 80,true);
            this.storyLabel5 = new objects.Label(this.storyText5,"20px","Cambay","#000000",1066/2,600/1.5 + 120,true);
            this.storyLabel6 = new objects.Label(this.storyText6,"20px","Cambay","#000000",1066/2,600/1.5 + 140,true);
            
            this.nextText = new objects.Label("Next","20px","Cambay","#ffffff",0,0,true);
            this.nextButton = new objects.Button(this.assetManager,"startButton",1066/2,600 * 0.75,this.nextText,true);
            this.nextButton.scaleX = 0.75;
            this.nextButton.visible = false;
            this.nextButton.text.visible = false;

            this.Main();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.INGAME;
        }

        public Update(): void{
            if(this.storyLabel1.y > 150){
                this.storyLabel1.y -= 0.5;
                this.storyLabel2.y -= 0.5;
                this.storyLabel3.y -= 0.5;
                this.storyLabel4.y -= 0.5;
                this.storyLabel5.y -= 0.5;
                this.storyLabel6.y -= 0.5;
            }
            else{
                this.nextButton.visible = true;
            this.nextButton.text.visible = true;
            }
        }

        public Main():void{
            this.addChild(this.storyLabel1);
            this.addChild(this.storyLabel2);
            this.addChild(this.storyLabel3);
            this.addChild(this.storyLabel4);
            this.addChild(this.storyLabel5);
            this.addChild(this.storyLabel6);

            this.addChild(this.nextButton);
            this.addChild(this.nextButton.text);
            this.nextButton.on("click", this.fn_ButtonClick);
        }
    }
}