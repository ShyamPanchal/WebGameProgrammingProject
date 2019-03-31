module objects{
    export class PushableObject extends objects.DynamicObject {

        constructor(assetManager: createjs.LoadQueue, imageString: string){
            super(assetManager, imageString);
            this.isGravityAffected = true;
          }
        
        public Action(): void {
            super.Action();
            if (this.aabbResultPlayer !== null) {
                let isLeft = this.aabbResultPlayer.closestPointOnBoundsToPoint(math.Vec2.zero).x < 0;
                console.log('isLeft: ' + isLeft);
                if (this.aabbResultPlayer.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0) {
                  createjs.Sound.play("push").volume = 0.3;
                    this.Push(10, isLeft);
                }
            }
        }

        private Push(speed:number, isLeft:boolean) :void {
            //this.x = objects.Game.stage.mouseX;
            if (isLeft) {
              if (this.CheckMovement(this.CheckCollision, true, speed)) {
                this.x -= speed;
              }
            } else {
              if (this.CheckMovement(this.CheckCollision, false, speed)) {
                this.x += speed;
              }
            }
        }


    }
}