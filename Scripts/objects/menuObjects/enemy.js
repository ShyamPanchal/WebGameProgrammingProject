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
            var _this = _super.call(this, assetManager, imageString) || this;
            // Variables
            _this.leftSide = true;
            _this.x = x;
            _this.y = y;
            _this.Start();
            return _this;
        }
        Enemy.prototype.Start = function () {
            console.log('In Enemy');
        };
        Enemy.prototype.Update = function () {
            _super.prototype.Update.call(this);
            if (this.x != 0 && this.y != 0) {
                this.Move();
            }
        };
        Enemy.prototype.Reset = function () { };
        Enemy.prototype.Move = function () {
            this.x -= 1.5;
            if ((this.x > 200 && this.x < 350) || (this.x > 500 && this.x < 650)) {
                this.y = 145;
            }
            else if ((this.x > 350 && this.x < 500) || (this.x > 650)) {
                this.y = 200;
            }
            else if (this.x < 200)
                this.x = 800;
        };
        Enemy.prototype.Update2 = function () {
            _super.prototype.Update.call(this);
            if (this.x != 0 && this.y != 0) {
                this.Move2();
            }
        };
        Enemy.prototype.Move2 = function () {
            this.x -= 2;
            if ((this.x > 200 && this.x < 350) || (this.x > 500 && this.x < 650)) {
                this.y += 1;
            }
            else if ((this.x > 350 && this.x < 500) || (this.x > 650)) {
                this.y -= 1;
            }
            else if (this.x < 200)
                this.x = 800;
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map