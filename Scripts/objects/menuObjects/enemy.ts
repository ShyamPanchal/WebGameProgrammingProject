module objects {
    export class Enemy extends objects.GameObject {
        // Variables
        leftSide:Boolean = true;
        
        // Constructor
       
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,)
        {
            super(assetManager, imageString); 
            this.x = x;
            this.y = y;     
            this.Start();          
        }
        
        public Start():void{
            console.log('In Enemy');
        }

        public Update():void {
            super.Update();
            this.Move();
        }        
        
        public Reset():void {}
        public Move():void {
            this.x -= 3;            
            if(this.x < 200)
                this.x = 800;
        }
    }
}