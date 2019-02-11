var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        // Constructor
        function Enemy(assetManager, imageString, x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            var _this = _super.call(this, assetManager.getResult(imageString)) || this;
            // Variables
            _this.leftSide = true;
            _this.x = 550;
            _this.y = 205;
            console.log('In Enemy');
            return _this;
        }
        Enemy.prototype.Start = function () {
        };
        Enemy.prototype.Update = function () {
            this.Move();
        };
        Enemy.prototype.Reset = function () { };
        Enemy.prototype.Move = function () {
            this.x -= 3;
            if (this.x < 200)
                this.x = 800;
        };
        return Enemy;
    }(createjs.Bitmap));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map