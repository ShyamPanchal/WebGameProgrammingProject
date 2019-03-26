module objects{
    export class HandableObject extends objects.DynamicObject {
        private powerup:createjs.AbstractSoundInstance;
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