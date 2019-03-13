module objects
{
    export class Button extends createjs.Bitmap
    {
        public text: objects.Label;
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0, textLabel:objects.Label, isCentered:boolean = false)
        {
            super(assetManager.getResult(imageString));

            if (isCentered) {
                this.regX = this.getBounds().width * 0.5;
                this.regY = this.getBounds().height * 0.5;
            }

            this.x = x;
            this.y = y;

            this.text = textLabel;
            this.text.x = this.x;
            this.text.y = this.y;

            this.on("mouseover", this.mouseOver);
            this.on("mouseout", this.mouseOut);
            
        }       

        private mouseOver():void
        {
            this.alpha = 0.7;
            this.text.alpha = 0.7;
        }

        private mouseOut():void
        {
            this.alpha = 1.0;
            this.text.alpha = 1.0;
        }
       
    }
}