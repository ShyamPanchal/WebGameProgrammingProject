module objects{
    export class HandableObject extends objects.DynamicObject {
        private powerup:createjs.AbstractSoundInstance;
        public time: number;
        private timeToAction:number = 0.5;
        public deltaTime: number;

        scorePoints: number;
        constructor(assetManager: createjs.LoadQueue, imageString: string, scorePoints:number = 0){
            super(assetManager, imageString);
            this.isGravityAffected = true;
            this.scorePoints = scorePoints;
        }

        public Action(): void {
            super.Action();
            if (this.player == null) {
                //this.Drop();
                //Really not needed - the player herself will handle it
            } else {
                this.Catch();
            }
        }

        //addforce
        public UpdateIfPossible(Check: (x:number, y:number, g:boolean) => managers.AABB): void {
            this.CheckCollision = Check;
            this.AddForceHorizontally();
            this.AddForceHorizontally();
            this.Update();
        }
        public AddForceVertically():void {
        }
        public AddForceHorizontally():void {
            /*
            this.Move_Vertically(false, 1);
            this.Move_Horizontally(false, 1);

            if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
                this.deltaTime+=1/60;
                return;
              }        
              this.deltaTime=0;
              */
        }

        private Drop():void {
            this.player.inventory.DropItem();
            //console.log('Drop Object');
        }

        private Catch():void {
            this.player.inventory.AddItem(this);  
            this.powerup = createjs.Sound.play("powerup");          
            //console.log('Get Object');
        }
    
    }
}