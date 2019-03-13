module math {
    export class Vec2 extends createjs.Point {

        public static zero: Vec2 = new Vec2(0, 0);
        
        constructor(x: number = 0, y: number = 0) {
            super(x, y);
        }

        // Methods
        public static Distance(P1:Vec2, P2:Vec2): number {
            return Math.floor(Math.sqrt(Math.pow(P2.x - P1.x, 2) + Math.pow(P2.y - P1.y, 2)));
        }

        public static Difference(P1:Vec2, P2:Vec2): Vec2 {
            return new math.Vec2(P2.x - P1.x, P2.y - P1.y);
        }

        public static Sum(P1:Vec2, P2:Vec2): Vec2 {
            return new math.Vec2(P2.x + P1.x, P2.y + P1.y);
        }

        public static Divide(P:Vec2, d:number): Vec2 {
            return new math.Vec2(P.x/d, P.y/d);
        }

        public static Print (P:Vec2): string {
            return "x: " + P.x + " y: " + P.y;
        }
    }
}