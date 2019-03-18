module objects
{
    
    export class UIHelper extends createjs.Bitmap
    {
        //variables
        public width: number;
        public halfW: number;

        public labelHelp_P1: objects.Label;
        public labelHelp_P2: objects.Label;
        

        constructor(assetManager: createjs.LoadQueue, imageString: string, x: number, y: number)
        {            
            super(assetManager.getResult(imageString));            

            this.x = x;
            this.y = y;           

            this.on("click", this.fn_OnClick);
            this.on("mouseover", this.fn_LabelMouseOver);
            this.on("mouseout", this.fn_LabelMouseOut);
        }

        public Start():void
        {
            this.width = this.getBounds().width;
            this.halfW = this.width / 2;            
            this.visible = false;

            
        }

        private fn_LabelMouseOver():void
        {
            console.log('created labels');
            
            this.labelHelp_P1 = new objects.Label("Player One \n\n W - Jump \n A - Move Left \n D - Move Right \n E - Interact", "26px", "Cambay", "#ffffff", 1066 * 0.5 / 2 - 200, 150);
            objects.Game.stage.addChild(this.labelHelp_P1);

            this.labelHelp_P2 = new objects.Label("Player Two \n\n ↑ - Jump \n  ← - Move Left \n → - Move Right \n Rshift - Interact", "26px", "Cambay", "#ffffff", 1066 / 2 + 330, 150);
            objects.Game.stage.addChild(this.labelHelp_P2);
            
                
            
        }

        private fn_LabelMouseOut():void
        {
           
                objects.Game.stage.removeChild(this.labelHelp_P1);
                objects.Game.stage.removeChild(this.labelHelp_P2);
          
                console.log('removed labels');
        }
        
        public Update():void
        {

        }      

        public fn_OnClick():void
        {
            console.log('calling fn_OnClick on UIHelper.ts')
            this.visible = false;
        }
        

    }
}