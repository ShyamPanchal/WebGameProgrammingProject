module managers{
    export class AABB
    {
        public center:math.Vec2 = new math.Vec2();
        public extents:math.Vec2 = new math.Vec2();
        public min:math.Vec2;
        public max:math.Vec2;
        public size:math.Vec2;


        constructor (center:math.Vec2, extents:math.Vec2) 
        {
            this.center = center;
            this.extents = extents;
            this.min = new math.Vec2(this.center.x - this.extents.x, this.center.y - this.extents.y);
            this.max = new math.Vec2(this.center.x + this.extents.x, this.center.y + this.extents.y);
            this.size = new math.Vec2(this.extents.x * 2, this.extents.y * 2);
        }

       public minkowskiDifference(other:AABB):AABB
       {
           var topLeft:math.Vec2 = math.Vec2.Difference(other.max, this.min);
           var fullSize:math.Vec2 = math.Vec2.Sum(this.size, other.size);
           return new AABB(math.Vec2.Sum(topLeft, math.Vec2.Divide(fullSize, 2)), math.Vec2.Divide(fullSize, 2));
       }

       public closestPointOnBoundsToPoint(point:math.Vec2):math.Vec2
        {
            var minDist:number = Math.abs(point.x - this.min.x);
            var boundsPoint:math.Vec2 = new math.Vec2(this.min.x, point.y);
            if (Math.abs(this.max.x - point.x) < minDist)
            {
                minDist = Math.abs(this.max.x - point.x);
                boundsPoint = new math.Vec2(this.max.x, point.y);
            }
            if (Math.abs(this.max.y - point.y) < minDist)
            {
                minDist = Math.abs(this.max.y - point.y);
                boundsPoint = new math.Vec2(point.x, this.max.y);
            }
            if (Math.abs(this.min.y - point.y) < minDist)
            {
                minDist = Math.abs(this.min.y - point.y);
                boundsPoint = new math.Vec2(point.x, this.min.y);
            }
            return boundsPoint;
        }
    }
}