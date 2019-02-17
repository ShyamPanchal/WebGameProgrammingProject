module objects {
    export class BoxCollider {

        public x:number;
        public y:number;

        public offset_x:number;
        public offset_y:number;
    
        public width: number;
        public height: number;

        public halfW: number;
        public halfH: number;

        public center:math.Vec2 = new math.Vec2();
        public extends:math.Vec2 = new math.Vec2();
        public aabb: managers.AABB;

        constructor(offset_x:number, offset_y:number, x:number, y:number, width:number, height:number) {
            this.x = x;
            this.y = y;
            this.offset_x = offset_x;
            this.offset_y = offset_y;
            this.width = width;
            this.height = height;

            this.halfW = width / 2;
            this.halfH = height / 2;

            this.Update(x, y);
        }

        public Update(x:number, y:number):void {
            this.x = x;
            this.y = y;
            this.aabb = this.GetAABB(this.x, this.y);
        }

        public GetAABB(x:number, y:number):managers.AABB {
            this.center = new math.Vec2(this.offset_x + x + this.halfW, this.offset_y + y + this.halfH);
            this.extends = new math.Vec2(this.halfW, this.halfH);
            return new managers.AABB(this.center, this.extends);
        }

        private cached :createjs.Shape;
        public DebugLine() :void {
            
            if (this.cached !== null) {
                objects.Game.stage.removeChild(this.cached);
            }
            let graphics = new createjs.Graphics();
            graphics.beginStroke("#000637")
                .drawRect(this.offset_x + this.x, this.offset_y + this.y, this.width, this.height)
                .endStroke();

            this.cached = new createjs.Shape(graphics);
            objects.Game.stage.addChild(this.cached);
        
          }
    }
}