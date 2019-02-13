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
var scenes;
(function (scenes) {
    var StageOne = /** @class */ (function (_super) {
        __extends(StageOne, _super);
        function StageOne(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.Start();
            return _this;
        }
        StageOne.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.FINISH;
        };
        StageOne.prototype.Start = function () {
            this.platforms = new Array();
            this.walls = new Array();
            this.enemies = new Array();
            objects.Game.keyboard = new managers.Keyboard();
            var ghost = new objects.Enemy(this.assetManager, "ghost", 550, 245);
            ghost.y = ghost.y - ghost.height;
            ghost.isDebug = true;
            this.enemies[0] = ghost;
            console.log("GAME SCENE(S)...");
            this.background = new objects.Background(this.assetManager, "level_01");
            this.background_main = new objects.Background(this.assetManager, "level_01_house");
            this.background_shadow = new objects.Background(this.assetManager, "level_01_shadow");
            this.txtButton = new objects.Label("Bypass!", "18px", "bold Cambay", "#ffffff");
            this.txtButton.x = 910;
            this.txtButton.y = 565;
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;
            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            this.player = new objects.Player(this.assetManager);
            this.player.boxCollider = new objects.BoxCollider(this.player.width / 4.4, 0, this.player.x, this.player.y, this.player.width / 2.2, this.player.height);
            this.Main();
        };
        StageOne.prototype.Update = function () {
            var _this = this;
            this.player.Update();
            this.player.DebugLine();
            this.enemies.forEach(function (enemy) {
                enemy.Update();
            });
            this.platforms.forEach(function (platform) {
                if (managers.Collision.CheckAABB(_this.player, platform)) {
                    /*console.log('Collided with : ' + platform.name + ' <> py:' + this.player.y
                            + ' pfy:' + platform.y);    */
                    if (!_this.player.isGrounded) {
                        _this.player.isGrounded = true;
                    }
                }
                else {
                    _this.player.isGrounded = false;
                }
                //console.log('is Grounded:' + this.player.isGrounded);
            });
            this.walls.forEach(function (wall) {
                if (managers.Collision.CheckAABB(_this.player, wall)) {
                    if (!_this.player.isColliding) {
                        _this.player.isColliding = true;
                        if (wall.name === 'wall_l') {
                            _this.player.canMoveL = false;
                        }
                        else if (wall.name === 'wall_r') {
                            _this.player.canMoveR = false;
                        }
                    }
                }
                else {
                    _this.player.isColliding = false;
                    if (wall.name === 'wall_l') {
                        _this.player.canMoveL = true;
                    }
                    else if (wall.name === 'wall_r') {
                        _this.player.canMoveR = true;
                    }
                }
            });
        };
        StageOne.prototype.Main = function () {
            var _this = this;
            //this.addChild(this.background);
            this.addChild(this.background_main);
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            this.addChild(this.player);
            this.enemies.forEach(function (ghost) {
                _this.addChild(ghost);
            });
            this.addChild(this.background_shadow);
            //create the empties gameobjects to be the stage boundaries
            this.CreateScenery();
            this.backButton.on("click", this.fn_ButtonClick);
            var callback = function () {
                _this.removeChild(_this.title);
                _this.removeChild(_this.titleShadow);
            };
            this.StartCountdown(3, callback);
        };
        StageOne.prototype.CreateScenery = function () {
            var wall_l = new objects.EmptyGameObject(this.assetManager, "wall_l", 1, 600);
            wall_l.isDebug = true;
            wall_l.x = 220;
            wall_l.y = 10;
            wall_l.boxCollider = new objects.BoxCollider(0, 0, wall_l.x, wall_l.y, wall_l.width, wall_l.height);
            var wall_r = new objects.EmptyGameObject(this.assetManager, "wall_r", 1, 600);
            wall_r.isDebug = true;
            wall_r.x = 840;
            wall_r.y = 10;
            wall_r.boxCollider = new objects.BoxCollider(0, 0, wall_r.x, wall_r.y, wall_r.width, wall_r.height);
            this.addChild(wall_l);
            this.addChild(wall_r);
            this.walls[0] = wall_l;
            this.walls[1] = wall_r;
            wall_l.DebugLine();
            wall_r.DebugLine();
            var floor = new objects.EmptyGameObject(this.assetManager, "floor", 620, 1);
            this.addChild(floor);
            this.platforms[0] = floor;
            floor.x = 220;
            floor.y = 245;
            floor.boxCollider = new objects.BoxCollider(0, 0, floor.x, floor.y, floor.width, floor.height);
            floor.isDebug = true;
            this.player.isDebug = true;
            floor.DebugLine();
        };
        return StageOne;
    }(objects.Scene));
    scenes.StageOne = StageOne;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageOne.js.map