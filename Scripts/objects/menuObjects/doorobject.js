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
    var Door = /** @class */ (function (_super) {
        __extends(Door, _super);
        function Door(assetManager, isOut, backgroundImage, foregroundImage) {
            if (isOut === void 0) { isOut = false; }
            if (backgroundImage === void 0) { backgroundImage = "open_door"; }
            if (foregroundImage === void 0) { foregroundImage = "open_door"; }
            var _this = _super.call(this, assetManager, "closed_door", isOut ? "open_door_light" : "open_door_dark") || this;
            _this.isOut = isOut;
            _this.backgroundImage = assetManager.getResult(backgroundImage);
            _this.foregroundImage = assetManager.getResult(foregroundImage);
            return _this;
        }
        Door.prototype.AddEnterDoorAction = function (getTimer, goNextLevel) {
            this.EnterDoorAction = new EnterFinalDoorAction(getTimer, goNextLevel).action;
        };
        Door.prototype.EnterDoorAction = function (player) {
            console.log("Going to the next level!!!!");
        };
        Door.prototype.Action = function () {
            if (!this.isOut || (this.isClosed && this.isOut)) {
                this.doorSound = createjs.Sound.play("door");
                _super.prototype.Action.call(this);
                this.alreadyHandled = false;
            }
            else {
                this.EnterDoorAction(this.player);
                this.doorSound = createjs.Sound.play("TaDa");
                console.log('enter door action');
            }
        };
        return Door;
    }(objects.OpenableObject));
    objects.Door = Door;
    var EnterFinalDoorAction = /** @class */ (function () {
        function EnterFinalDoorAction(getTimer, goNextLevel) {
            this.action = function (player) {
                player.spriteRenderer.visible = false;
                player.visible = false;
                player.hasPassed = true;
                if (player.playerNum == 2) {
                    var score = 0;
                    if (objects.Game.scoreManagerP2 != null) {
                        score = objects.Game.scoreManagerP2.score;
                    }
                    objects.Game.scoreManagerP2 = new managers.Score(player.inventory.GetItems(), getTimer(), score);
                    console.log('p2 finished ' + getTimer());
                }
                else {
                    var score = 0;
                    if (objects.Game.scoreManagerP1 != null) {
                        score = objects.Game.scoreManagerP1.score;
                    }
                    objects.Game.scoreManagerP1 = new managers.Score(player.inventory.GetItems(), getTimer(), score);
                    console.log('p1 finished ' + getTimer());
                }
                if (!objects.Player.onePlayerGone) {
                    objects.Player.onePlayerGone = true;
                }
                else {
                    goNextLevel();
                }
            };
        }
        return EnterFinalDoorAction;
    }());
    objects.EnterFinalDoorAction = EnterFinalDoorAction;
})(objects || (objects = {}));
//# sourceMappingURL=doorobject.js.map