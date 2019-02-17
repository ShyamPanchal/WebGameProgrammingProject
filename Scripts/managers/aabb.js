var managers;
(function (managers) {
    var AABB = /** @class */ (function () {
        function AABB(center, extents) {
            this.center = new math.Vec2();
            this.extents = new math.Vec2();
            this.center = center;
            this.extents = extents;
            this.min = new math.Vec2(this.center.x - this.extents.x, this.center.y - this.extents.y);
            this.max = new math.Vec2(this.center.x + this.extents.x, this.center.y + this.extents.y);
            this.size = new math.Vec2(this.extents.x * 2, this.extents.y * 2);
        }
        AABB.prototype.minkowskiDifference = function (other) {
            var topLeft = math.Vec2.Difference(other.max, this.min);
            var fullSize = math.Vec2.Sum(this.size, other.size);
            return new AABB(math.Vec2.Sum(topLeft, math.Vec2.Divide(fullSize, 2)), math.Vec2.Divide(fullSize, 2));
        };
        AABB.prototype.closestPointOnBoundsToPoint = function (point) {
            var minDist = Math.abs(point.x - this.min.x);
            var boundsPoint = new math.Vec2(this.min.x, point.y);
            if (Math.abs(this.max.x - point.x) < minDist) {
                minDist = Math.abs(this.max.x - point.x);
                boundsPoint = new math.Vec2(this.max.x, point.y);
            }
            if (Math.abs(this.max.y - point.y) < minDist) {
                minDist = Math.abs(this.max.y - point.y);
                boundsPoint = new math.Vec2(point.x, this.max.y);
            }
            if (Math.abs(this.min.y - point.y) < minDist) {
                minDist = Math.abs(this.min.y - point.y);
                boundsPoint = new math.Vec2(point.x, this.min.y);
            }
            return boundsPoint;
        };
        //work only if this object is the result of checking aabb collision using minkowskiDifference
        AABB.prototype.CheckCollided = function () {
            this.isCollided = this.min.x <= 0 &&
                this.max.x >= 0 &&
                this.min.y <= 0 &&
                this.max.y >= 0;
            return this.isCollided;
        };
        return AABB;
    }());
    managers.AABB = AABB;
})(managers || (managers = {}));
//# sourceMappingURL=aabb.js.map