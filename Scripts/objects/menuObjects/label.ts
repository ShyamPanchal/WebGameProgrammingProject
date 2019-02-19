module objects
{
    var timer;
    export class Label extends createjs.Text
    {
        constructor(labelString:string, fontSize:string, fontFamily:string, fontColour:string, x: number = 0, y: number = 0, isCentered: boolean = false) {
            super(labelString, fontSize + " " + fontFamily, fontColour);

            if(isCentered) {
                this.regX = this.getMeasuredWidth() * 0.5;
                this.regY = this.getMeasuredHeight() * 0.5;
            }
            

            this.x = x;
            this.y = y;
        }
        
        public fn_TimerTicker(seconds):void
        {
            timer = seconds;

            var timeLimit = setInterval(function()
            {
                timer--;
                console.log(timer);
                if(timer <= 0)
                {
                    clearInterval(timeLimit);
                    objects.Game.currentScene = config.Scene.FINISH;
                };
                
            }, 1000)

          
        }

        public fn_ChangeLabel()
        {  
            return timer;
        }
        
    }

    
}