module scenes {
    let nextClicked: boolean = false;
    export class Tutorial extends objects.Scene {

        private background: objects.Background;

        private heading: objects.Label;

        private headingMaxReached: boolean;
        private headingDone: boolean;
        private backgroundDone: boolean;
        private loadDone: boolean;

        private bbs: objects.Image[];
        private nextBtn: objects.Button;
        private playBtn: objects.Button;

        private layers: number[][];

        private currentLayer: number = 0;

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        public Start(): void {
            this.background = new objects.Background(this.assetManager, "tutorial");
            this.background.alpha = 0;

            this.heading = new objects.Label("Tutorial", "bold 48px", "Cambay", "#000000", 1066 / 2, 600 / 2, true);
            this.heading.alpha = 0;

            this.headingMaxReached = false;
            this.headingDone = false;
            this.backgroundDone = false;
            this.loadDone = false;

            this.bbs = [];

            this.bbs[0] = new objects.Image(this.assetManager, "bb_1", 520, 180, true);
            this.bbs[0].alpha = 0;

            this.bbs[1] = new objects.Image(this.assetManager, "bb_2", 425, 410, true);
            this.bbs[1].alpha = 0;

            this.bbs[2] = new objects.Image(this.assetManager, "bb_3", 925, 37, true);
            this.bbs[2].alpha = 0;

            this.bbs[3] = new objects.Image(this.assetManager, "bb_4", 140, 330, true);
            this.bbs[3].alpha = 0;

            this.bbs[4] = new objects.Image(this.assetManager, "bb_5", 240, 520, true);
            this.bbs[4].alpha = 0;

            this.bbs[5] = new objects.Image(this.assetManager, "bb_6", 440, 140, true);
            this.bbs[5].alpha = 0;

            this.bbs[6] = new objects.Image(this.assetManager, "bb_7", 300, 60, true);
            this.bbs[6].alpha = 0;

            this.bbs[7] = new objects.Image(this.assetManager, "bb_8", 950, 570, true);
            this.bbs[7].alpha = 0;

            this.layers = [[0, 1, 2, 3], [4], [5], [6], [7]];

            this.nextBtn = new objects.Button(this.assetManager,"nextBtn",980,550,null,false);
            this.nextBtn.alpha = 0;
            this.playBtn = new objects.Button(this.assetManager,"playBtn",980,550,null,false);

            this.currentLayer = 0;

            this.Main();
        }

        public Update(): void {
            if (!this.backgroundDone) {
                if (!this.headingDone) {
                    if (!this.headingMaxReached) {
                        this.heading.alpha += 0.02;
                        if (this.heading.alpha >= 1) {
                            this.headingMaxReached = true;
                        }
                    }
                    else {
                        this.heading.alpha -= 0.02;
                        if (this.heading.alpha <= 0) {
                            this.headingDone = true;
                        }
                    }
                }
                else {
                    this.background.alpha += 0.02;
                    if (this.background.alpha >= 1) {
                        this.backgroundDone = true;
                    }
                }
            }
            else {
                if (!this.loadDone) {
                    console.log("back done");
                    this.background.alpha = 1;
                    for(let x = 0;x<this.layers[this.currentLayer].length;x++){
                        this.bbs[this.layers[this.currentLayer][x]].alpha = 1;
                    }
                    this.nextBtn.alpha = 1;
                    this.loadDone = true;
                }
            }
            if(nextClicked){
                nextClicked = false;
                for(let x = 0;x<this.layers[this.currentLayer].length;x++){
                    this.bbs[this.layers[this.currentLayer][x]].alpha = 0;
                }

                // load next layers
                this.currentLayer += 1;

                if(this.currentLayer == this.layers.length -1){
                    this.removeChild(this.nextBtn);
                    this.addChild(this.playBtn);
                    this.playBtn.on("click", this.fn_PlayClicked);
                }

                for(let x = 0;x<this.layers[this.currentLayer].length;x++){
                    this.bbs[this.layers[this.currentLayer][x]].alpha = 1;
                }
            }
        }

        public Main(): void {
            this.addChild(this.background);
            this.addChild(this.heading);
            this.bbs.forEach(element => {
                this.addChild(element);
            });
            this.addChild(this.nextBtn);
            this.nextBtn.on("click", this.fn_NextClick);
        }

        private fn_NextClick():void
        {
            nextClicked = true;
        }

        private fn_PlayClicked():void
        {
            
            objects.Game.currentScene = config.Scene.INGAME;
        }
    }
}
