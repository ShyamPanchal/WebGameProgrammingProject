var objects;
(function (objects) {
    var BoxCollider = /** @class */ (function () {
        function BoxCollider(offset_x, offset_y, x, y, width, height) {
            this.center = new math.Vec2();
            this.extends = new math.Vec2();
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
        BoxCollider.prototype.Update = function (x, y) {
            this.x = x;
            this.y = y;
            this.aabb = this.GetAABB(this.x, this.y);
        };
        BoxCollider.prototype.GetAABB = function (x, y) {
            this.center = new math.Vec2(this.offset_x + x + this.halfW, this.offset_y + y + this.halfH);
            this.extends = new math.Vec2(this.halfW, this.halfH);
            return new managers.AABB(this.center, this.extends);
        };
        BoxCollider.prototype.DebugLine = function () {
            if (this.cached !== null) {
                objects.Game.stage.removeChild(this.cached);
            }
            var graphics = new createjs.Graphics();
            graphics.beginStroke("#000637")
                .drawRect(this.offset_x + this.x, this.offset_y + this.y, this.width, this.height)
                .endStroke();
            this.cached = new createjs.Shape(graphics);
            objects.Game.stage.addChild(this.cached);
        };
        return BoxCollider;
    }());
    objects.BoxCollider = BoxCollider;
})(objects || (objects = {}));
//# sourceMappingURL=boxcollider.js.map