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
            this.center = new math.Vec2(this.offset_x + x + this.halfW, this.offset_y + y + this.halfH);
            this.extends = new math.Vec2(this.halfW, this.halfH);
        };
        BoxCollider.prototype.DebugLine = function () {
            if (this.cached !== null) {
                objects.Game.stage.removeChild(this.cached);
            }
            this.graphics = new createjs.Graphics();
            this.graphics.beginStroke("#000637")
                .drawRect(this.offset_x + this.x, this.offset_y + this.y, this.width, this.height)
                .endStroke();
            //console.log('w : ' + this.width + ' h : ' + this.height);
            this.cached = new createjs.Shape(this.graphics);
            objects.Game.stage.addChild(this.cached);
        };
        return BoxCollider;
    }());
    objects.BoxCollider = BoxCollider;
})(objects || (objects = {}));
//# sourceMappingURL=boxcollider.js.map