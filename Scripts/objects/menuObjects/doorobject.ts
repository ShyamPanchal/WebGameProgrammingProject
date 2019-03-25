module objects{
    export class Door extends objects.OpenableObject {
        private backgroundImage: any;
        private foregroundImage: any;

        public isOut:boolean;
        
        constructor(assetManager: createjs.LoadQueue,
            isOut:boolean = false,
            backgroundImage: string = "open_door",
            foregroundImage: string = "open_door"){
            super(assetManager, "closed_door", isOut? "open_door_light":"open_door_dark");

            this.isOut = isOut;
            this.backgroundImage = assetManager.getResult(backgroundImage);
            this.foregroundImage = assetManager.getResult(foregroundImage);
            
        }

        public AddEnterDoorAction(getTimer: ()=>number, goNextLevel: ()=>void) {
            this.EnterDoorAction = new EnterFinalDoorAction(getTimer, goNextLevel).action;
        }

        private EnterDoorAction(player:Player) {
            console.log("Going to the next level!!!!");
        }

        public Action(): void {
            if (!this.isOut || (this.isClosed && this.isOut)) {
                super.Action();
                this.alreadyHandled = false;
            } else {
                this.EnterDoorAction(this.player);
                console.log('enter door action');
            }            
        }
    }

    export class EnterFinalDoorAction {

        action: (player:Player) => void; 

        constructor(getTimer: ()=>number, goNextLevel: ()=>void) {
            this.action = (player:objects.Player)=>{
                player.spriteRenderer.visible = false;
                player.visible = false;
                player.hasPassed = true;
                if (player.playerNum == 2 ) {
                    let score = 0;
                    if (objects.Game.scoreManagerP2 != null) {
                        score = objects.Game.scoreManagerP2.score;
                    } 
                    objects.Game.scoreManagerP2 = new managers.Score(player.inventory.GetItems(), getTimer(), score);
                    console.log('p2 finished ' + getTimer());
                } else {
                    let score = 0;
                    if (objects.Game.scoreManagerP1 != null) {
                        score = objects.Game.scoreManagerP1.score;
                    } 
                    objects.Game.scoreManagerP1 = new managers.Score(player.inventory.GetItems(), getTimer(), score);
                    console.log('p1 finished '  + getTimer());
                }

                if (!Player.onePlayerGone) {
                    Player.onePlayerGone = true
                } else {
                    goNextLevel();
                }
            }
        }


    }
}