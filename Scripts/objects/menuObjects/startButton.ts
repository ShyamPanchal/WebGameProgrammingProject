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
        
        public Update():void {
            this.text.x = this.x;
            this.text.y = this.y;
        }
       
    }

    export class Dialog {
        txtLabel:objects.Label;
        dialogObj:objects.Button;
        isShown: boolean;

        constructor(assetManager: createjs.LoadQueue, text:string)
        {
            this.txtLabel = new objects.Label(text, "20px bold", "Cambay", "#000000",0,0, true);     
            this.dialogObj = new objects.Button(assetManager, "speech_ballom", 0, 0, this.txtLabel, true);
            this.dialogObj.on("mouseover", ()=>{});
            this.dialogObj.on("mouseout",  ()=>{});
            this.dialogObj.scaleX = 0.75;
            this.isShown = false;
        }

        public Update(x: number, y:number):void {
            this.dialogObj.x = x;
            this.dialogObj.y = y;
            this.dialogObj.Update()
        }

        public showDialog(scene:objects.Scene):void {
            if (!this.isShown) {
                this.isShown = true;
                scene.addChild(this.dialogObj);
                scene.addChild(this.txtLabel);
            }

        }
        public hideDialog(scene:objects.Scene):void{
            if (this.isShown) {
                this.isShown = false;
                scene.removeChild(this.dialogObj);
                scene.removeChild(this.txtLabel);
            }
        }
    }
}