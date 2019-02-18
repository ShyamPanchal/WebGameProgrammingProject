module objects{
    export class DynamicObject extends objects.GameObject {

        public aabbResultPlayer:managers.AABB;

        constructor(assetManager: createjs.LoadQueue, imageString: string){
            super(assetManager, imageString);
          }

        public Action(): void {
            console.log('ACTION');
        }

        protected CheckCollision: (x:number, y:number) => managers.AABB;

        public UpdateIfPossible(Check: (x:number, y:number) => managers.AABB): void {
            this.CheckCollision = Check;
            this.Update();
        }

        public Update():void{
            super.Update();
            this.DoGravityEffect();
            this.Move();
        }

        public DoGravityEffect():void {
            this.Move_Vertically(false, config.Gravity.gravitySpeed*this.GetGravityFactor());
        }

        public Move_Vertically(up:boolean, speed:number) :void {
            if (up) {
              if (this.CheckVerticalMovement(this.CheckCollision, true, speed)) {
                this.y += speed;
              }
            } else {
              if (this.CheckVerticalMovement(this.CheckCollision, false, speed)) {
                this.y -= speed;
              }          
            }
        }

        public CheckMovement(Check: (x:number, y:number) => managers.AABB, isLeftMovement: boolean, speed:number): boolean {
            let md:managers.AABB = Check(this.x + (isLeftMovement? 0 - speed:speed), this.y);
            return !md.isCollided;
        }
      
        public CheckVerticalMovement(Check: (x:number, y:number) => managers.AABB, isUp: boolean, speed:number): boolean {
            let md:managers.AABB = Check(this.x, this.y + (isUp?speed:0 - speed));
            return !md.isCollided || md.closestPointOnBoundsToPoint(math.Vec2.zero).y == 0;
        }
    }
}