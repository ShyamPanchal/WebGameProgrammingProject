module objects {
    export class Enemy extends createjs.Bitmap {
        // Variables
        leftSide:Boolean = true;
        
        // Constructor
       
        constructor(assetManager: createjs.LoadQueue, imageString:string, x:number = 0, y:number = 0,)
        {
            super(assetManager.getResult(imageString));
            this.x=550;
            this.y=205;
            
            
            console.log('In Enemy');
        }

        public Start():void{
           
            console.log('In Enemy start');
        }
        public Update():void {
            this.Move();
            console.log('In enem update')
        }
        
        
        public Reset():void {}
        public Move():void {

                this.x -= 3;            

            if(this.x<200)
                this.x = 800;
            
            

           

        }
       
        

           
       

       
        

        

    }
}