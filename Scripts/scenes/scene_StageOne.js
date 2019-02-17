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
        StageOne.prototype.fn_pauseButtonClick = function () {
            objects.Game.currentScene = config.Scene.PAUSE;
        };
        StageOne.prototype.Start = function () {
            objects.Game.isDebug = true;
            this.isPaused = false;
            this.platforms = new Array();
            this.walls = new Array();
            this.enemies = new Array();
            objects.Game.keyboard = new managers.Keyboard();
            var ghost = new objects.Enemy(this.assetManager, "ghost", 550, 245);
            ghost.y = ghost.y - ghost.height;
            this.enemies[0] = ghost;
            console.log("GAME SCENE(S)...");
            this.background = new objects.Background(this.assetManager, "level_01");
            this.background_main = new objects.Background(this.assetManager, "level_01_house");
            this.background_shadow = new objects.Background(this.assetManager, "level_01_shadow");
            this.txtButton = new objects.Label("Bypass!", "18px", "bold Cambay", "#ffffff");
            this.txtButton.x = 910;
            this.txtButton.y = 565;
            //pause button            
            this.pauseButton = new objects.Button(this.assetManager, "startButton", -10, 550);
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff", this.pauseButton.x + 80, this.pauseButton.y + 10);
            //pause button end
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;
            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            this.player = new objects.Player(this.assetManager);
            this.player.boxCollider = new objects.BoxCollider(16, 16, this.player.x, this.player.y, this.player.width / 2.2, this.player.height - 20);
            this.Main();
        };
        StageOne.prototype.Update = function () {
            var _this = this;
            this.CheckPaused();
            if (this.isPaused) {
                return;
            }
            var CheckPlayerMovement = function (x, y) {
                var collided = false;
                var aabbPlayerCollider = _this.player.boxCollider.GetAABB(x, y);
                var result;
                for (var i = 0; i < _this.platforms.length; i++) {
                    var platform = _this.platforms[i];
                    result = managers.Collision.CheckAABBCollision(aabbPlayerCollider, platform.boxCollider.aabb);
                    if (result.CheckCollided()) {
                        collided = true;
                        break;
                    }
                }
                if (!collided) {
                    for (var i = 0; i < _this.walls.length; i++) {
                        var wall = _this.walls[i];
                        result = managers.Collision.CheckAABBCollision(aabbPlayerCollider, wall.boxCollider.aabb);
                        if (result.CheckCollided()) {
                            collided = true;
                            break;
                        }
                    }
                }
                return result;
            };
            this.player.UpdateIfPossible(CheckPlayerMovement);
            this.enemies.forEach(function (enemy) {
                enemy.Update();
            });
            for (var i = 0; i < this.platforms.length; i++) {
                var platform = this.platforms[i];
                platform.Update();
            }
            for (var i = 0; i < this.walls.length; i++) {
                var wall = this.walls[i];
                wall.Update();
            }
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
            this.addChild(this.pauseButton);
            this.addChild(this.pauseTxtButton);
            this.backButton.on("click", this.fn_ButtonClick);
            this.pauseButton.on("click", function () { _this.isPaused = !_this.isPaused; _this.fn_pauseButtonClick; }); //pause
        };
        StageOne.prototype.CreateScenery = function () {
            var wall_l = new objects.EmptyGameObject(this.assetManager, "wall_l", 1, 600);
            wall_l.x = 220;
            wall_l.y = 10;
            this.addChild(wall_l);
            var wall_r = new objects.EmptyGameObject(this.assetManager, "wall_r", 1, 600);
            wall_r.x = 840;
            wall_r.y = 10;
            this.addChild(wall_r);
            this.walls[0] = wall_l;
            this.walls[1] = wall_r;
            this.CreateFloors();
            this.CreatePlatformsStairs();
            this.CreateObjects();
        };
        StageOne.prototype.CreateObjects = function () {
            var floor_3_Crate = new objects.EmptyGameObject(this.assetManager, "floor_3_crate", 35, 35);
            this.addChild(floor_3_Crate);
            floor_3_Crate.x = 415;
            floor_3_Crate.y = 210;
            this.platforms[9] = floor_3_Crate;
            this.walls[2] = floor_3_Crate;
        };
        StageOne.prototype.CreatePlatformsStairs = function () {
            var floor_3_stairs = new objects.EmptyGameObject(this.assetManager, "floor_3_stairs", 30, 1);
            this.addChild(floor_3_stairs);
            this.platforms[8] = floor_3_stairs;
            floor_3_stairs.x = 320;
            floor_3_stairs.y = 184;
            var floor_1_stairs = new objects.EmptyGameObject(this.assetManager, "floor_1_stairs", 30, 1);
            this.addChild(floor_1_stairs);
            this.platforms[7] = floor_1_stairs;
            floor_1_stairs.x = 706;
            floor_1_stairs.y = 414;
        };
        StageOne.prototype.CreateFloors = function () {
            //Floors platforms
            var floor_4_1 = new objects.EmptyGameObject(this.assetManager, "floor_4_1", 60, 1);
            this.addChild(floor_4_1);
            this.platforms[6] = floor_4_1;
            floor_4_1.x = 220;
            floor_4_1.y = 130;
            var floor_4_2 = new objects.EmptyGameObject(this.assetManager, "floor_4_2", 460, 1);
            this.addChild(floor_4_2);
            this.platforms[5] = floor_4_2;
            floor_4_2.x = 380;
            floor_4_2.y = 130;
            var floor_3 = new objects.EmptyGameObject(this.assetManager, "floor_3", 620, 1);
            this.addChild(floor_3);
            this.platforms[4] = floor_3;
            floor_3.x = 220;
            floor_3.y = 245;
            var floor_2_1 = new objects.EmptyGameObject(this.assetManager, "floor_2_1", 60, 1);
            this.addChild(floor_2_1);
            this.platforms[3] = floor_2_1;
            floor_2_1.x = 780;
            floor_2_1.y = 360;
            var floor_2_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_2", 460, 1);
            this.addChild(floor_2_2);
            this.platforms[2] = floor_2_2;
            floor_2_2.x = 220;
            floor_2_2.y = 360;
            var floor_1 = new objects.EmptyGameObject(this.assetManager, "floor_1", 620, 1);
            this.addChild(floor_1);
            this.platforms[1] = floor_1;
            floor_1.x = 220;
            floor_1.y = 475;
            var floor_0 = new objects.EmptyGameObject(this.assetManager, "floor_0", 620, 1);
            this.addChild(floor_0);
            this.platforms[0] = floor_0;
            floor_0.x = 220;
            floor_0.y = 590;
        };
        return StageOne;
    }(objects.Scene));
    scenes.StageOne = StageOne;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageOne.js.map