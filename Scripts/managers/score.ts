module managers {
    export class Score {

        items: objects.HandableObject[];
        itemsScore: objects.Label[];
        time:number; 
        score:number = 0;

        timeScore:objects.Label;
        totalScore:objects.Label;        
                
        private timerCounter: number = 0;
        private timer: number = 0;
        private item:number = -1;

        constructor(items:objects.HandableObject[], time:number){
            this.items = items;
            this.itemsScore = new Array<objects.Label>();
            this.time = time;
            this.timer = time;
            
        }

        public Calculate() {

            
        }

        public Update() {
            if (this.timeScore != null) {
                this.timeScore.text = "" + this.time;
                //console.log('time update ' + this.time );
            }           

            this.timerCounter++;
            //double the speed of the timer in the case the first player reach the end without the second player
            let speedTimer = 1/60;
            if (this.timerCounter == objects.Game.frameRate*speedTimer) {
                this.timer--;
                this.timerCounter = 0;
                switch(this.item){
                    case -1:
                        if (this.time > 0) {
                            this.score+=1;
                            this.time-=1;
                            //for the first item: time
                            if (this.totalScore != null) {
                                this.totalScore.text = "" + this.score;
                            }
                        } else {
                            this.item++;
                        }
                    break;
                    default:
                        for(let i = 0; i< this.items.length; i++) {
                            let item = this.items[i];
                            if (i == this.item) {
                                if (item != null && item.scorePoints > 0) {
                                    let n = 10;
                                    if (item.scorePoints - n < 0) {
                                        n = 1;
                                    }
                                    item.scorePoints-=n;
                                    this.score+=n;
                                    //for the first item: time
                                    if (this.itemsScore[this.item] != null) {
                                        this.itemsScore[this.item].text = "" + item.scorePoints;
                                        this.totalScore.text = "" + this.score;
                                    }
                                } else {
                                    this.item++;
                                }
                            }
                        };
                    break;
                }
            }
        }

        public AddScoreToScene(scene: objects.Scene, x:number, y:number) :number {
            let lastYPosition = y;
            scene.addChild(new objects.Label("Time", "bold 28px", "Cambay", "#ffffff", x, lastYPosition, false));
            this.timeScore = new objects.Label("" + this.time, "bold 28px", "Cambay", "#ffffff", x+ 200, lastYPosition, false);
            scene.addChild(this.timeScore);
            lastYPosition+= 50;
            let i = 0;
            this.items.forEach(el => {
                if (el != null) { // removed item
                    scene.addChild(el);
                    el.x = x;
                    el.y = lastYPosition;
                    // add the amount
                    this.itemsScore[i] = new objects.Label("" + this.items[i].scorePoints, "bold 28px", "Cambay", "#ffffff", x+ 200, lastYPosition, false);
                    scene.addChild(this.itemsScore[i]);
                    lastYPosition+= 50;
                }
            });
            scene.addChild(new objects.Label("Total:", "bold 28px", "Cambay", "#ffffff", x, lastYPosition, false));
            this.totalScore = new objects.Label("0", "bold 28px", "Cambay", "#ffffff", x+ 200, lastYPosition, false);
            scene.addChild(this.totalScore);
            return lastYPosition;
        }
    }
}