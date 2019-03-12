module objects {

    export class Label extends createjs.Text {

        public is_paused: boolean;
        constructor(labelString: string, fontSize: string, fontFamily: string, fontColour: string, x: number = 0, y: number = 0, isCentered: boolean = false) {
            super(labelString, fontSize + " " + fontFamily, fontColour);

            if (isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
            this.is_paused = false;

            this.x = x;
            this.y = y;
        }
        /*
                public fn_TimerTicker(seconds): void {
                    timer = seconds;
        
                    var timeLimit = setInterval(function () {
                        if (!this.is_paused) {
                            timer--;
                            //console.log(timer);
                            if (timer <= 0) {
                                clearInterval(timeLimit);
                                objects.Game.currentScene = config.Scene.FINISH;
                            };
                        }
        
                    }, 1000)
                }
        */
        public fn_ChangeLabel(timer) {
            let minutes = Math.floor(timer / 60);
            if (minutes < 0)
                minutes = 0;
            let seconds = timer % 60;
            if (seconds < 10)
                return minutes + " : 0" + seconds;
            else
                return minutes + " : " + seconds;
        }
    }
}