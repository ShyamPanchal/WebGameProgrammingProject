<<<<<<< Updated upstream
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
    var HandableObject = /** @class */ (function (_super) {
        __extends(HandableObject, _super);
        function HandableObject(assetManager, imageString, scorePoints) {
            if (scorePoints === void 0) { scorePoints = 0; }
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.timeToAction = 0.5;
            _this.isGravityAffected = true;
            _this.scorePoints = scorePoints;
            return _this;
        }
        HandableObject.prototype.Action = function () {
            _super.prototype.Action.call(this);
            if (this.player == null) {
                //this.Drop();
                //Really not needed - the player herself will handle it
            }
            else {
                this.Catch();
            }
        };
        //addforce
        HandableObject.prototype.UpdateIfPossible = function (Check) {
            this.CheckCollision = Check;
            //this.AddForce();
            this.Update();
        };
        HandableObject.prototype.AddForce = function () {
            this.Move_Vertically(false, 1);
            this.Move_Horizontally(false, 1);
            if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
                this.deltaTime += 1 / 60;
                return;
            }
            this.deltaTime = 0;
        };
        HandableObject.prototype.Drop = function () {
            this.player.inventory.DropItem();
            //console.log('Drop Object');
        };
        HandableObject.prototype.Catch = function () {
            this.player.inventory.AddItem(this);
            this.powerup = createjs.Sound.play("powerup");
            //console.log('Get Object');
        };
        return HandableObject;
    }(objects.DynamicObject));
    objects.HandableObject = HandableObject;
})(objects || (objects = {}));
=======
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
    var HandableObject = /** @class */ (function (_super) {
        __extends(HandableObject, _super);
        function HandableObject(assetManager, imageString, scorePoints) {
            if (scorePoints === void 0) { scorePoints = 0; }
            var _this = _super.call(this, assetManager, imageString) || this;
            _this.timeToAction = 0.5;
            _this.isGravityAffected = true;
            _this.scorePoints = scorePoints;
            return _this;
        }
        HandableObject.prototype.Action = function () {
            _super.prototype.Action.call(this);
            if (this.player == null) {
                //this.Drop();
                //Really not needed - the player herself will handle it
            }
            else {
                this.Catch();
            }
        };
        //addforce
        HandableObject.prototype.UpdateIfPossible = function (Check) {
            this.CheckCollision = Check;
            //this.AddForce();
            this.Update();
        };
        HandableObject.prototype.AddForce = function () {
            this.Move_Vertically(false, 1);
            this.Move_Horizontally(false, 1);
            if (this.deltaTime != 0 && (this.timeToAction > this.deltaTime)) {
                this.deltaTime += 1 / 60;
                return;
            }
            this.deltaTime = 0;
        };
        HandableObject.prototype.Drop = function () {
            this.player.inventory.DropItem();
            //console.log('Drop Object');
        };
        HandableObject.prototype.Catch = function () {
            this.player.inventory.AddItem(this);
            //console.log('Get Object');
        };
        return HandableObject;
    }(objects.DynamicObject));
    objects.HandableObject = HandableObject;
})(objects || (objects = {}));
>>>>>>> Stashed changes
//# sourceMappingURL=handableobject.js.map