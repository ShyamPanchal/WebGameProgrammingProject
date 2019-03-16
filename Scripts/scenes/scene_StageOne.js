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
            _this.timerCounter = 0;
            _this.Start();
            return _this;
        }
        StageOne.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.FINISH;
        };
        StageOne.prototype.fn_pauseButtonClick = function () {
            console.log("called");
            objects.Game.keyboard.pause = !objects.Game.keyboard.pause;
            if (objects.Game.controlsImage.visible) {
                objects.Game.controlsImage.visible = false;
            }
        };
        StageOne.prototype.fn_controlsButtonClick = function () {
            console.log('show controls');
            objects.Game.controlsImage.visible = true;
            if (objects.Game.controlsImage.visible) {
            }
            else {
                objects.Game.controlsImage.visible = false;
            }
        };
        StageOne.prototype.Start = function () {
            //config.Gravity.gravityFactor = -1;
            objects.Game.isDebug = true;
            this.isPaused = false;
            this.gameSceneryStaticObjects = new Array();
            this.gameSceneryDynamicObjects = new Array();
            this.enemies = new Array();
            objects.Game.keyboard = new managers.Keyboard();
            var ghost = new objects.Enemy(this.assetManager, "ghost", 550, 245);
            ghost.y = ghost.y - ghost.height;
            this.enemies[0] = ghost;
            console.log("GAME SCENE(S)...");
            //this.timeRemaining = new objects.Timer(objects.Game.stageTimer, (1066/2), 50, true);
            this.timeRemaining = new objects.Label(objects.Game.stageTimer.toString(), "bold 32px", "Cambay", "#000000", 50, 65, true);
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
            //pause button: controls button
            this.menuButton = new objects.Button(this.assetManager, "startButton", -10, 500);
            this.menuTxtButton = new objects.Label("Controls", "20px", "Cambay", "#ffffff", this.menuButton.x + 80, this.menuButton.y + 10);
            this.menuButton.visible = false;
            this.menuTxtButton.visible = false;
            objects.Game.controlsImage = new objects.UIHelper(this.assetManager, "controls", 1066 * 0.5 / 2, 600 * 0.5 / 2);
            objects.Game.controlsImage.visible = false;
            //pause button controls: button end
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;
            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            this.player = new objects.Player(this.assetManager);
            this.player.boxCollider = new objects.BoxCollider(18, 16, this.player.x, this.player.y, this.player.width - 45, this.player.height - 20);
            this.Main();
        };
        StageOne.prototype.CreateFunctionCheck = function (gameObject) {
            var _this = this;
            var boxCollider = gameObject.boxCollider;
            return function (x, y) {
                var collided = false;
                var aabbCollider = boxCollider.GetAABB(x, y);
                var result;
                for (var i = 0; i < _this.gameSceneryStaticObjects.length; i++) {
                    var platform = _this.gameSceneryStaticObjects[i];
                    result = managers.Collision.CheckAABBCollision(aabbCollider, platform.boxCollider.aabb);
                    if (result.CheckCollided()) {
                        collided = true;
                        break;
                    }
                }
                if (!collided) {
                    for (var i = 0; i < _this.gameSceneryDynamicObjects.length; i++) {
                        var object = _this.gameSceneryDynamicObjects[i];
                        if (object.name !== gameObject.name) {
                            result = managers.Collision.CheckAABBCollision(aabbCollider, object.boxCollider.aabb);
                            if (result.CheckCollided()) {
                                collided = true;
                                if (gameObject.name === _this.player.name) {
                                    object.aabbResultPlayer = result;
                                    _this.player.actionObject = object;
                                }
                                break;
                            }
                        }
                    }
                }
                if (!collided) {
                    _this.player.actionObject = null;
                }
                return result;
            };
        };
        StageOne.prototype.Update = function () {
            this.CheckPaused();
            //this.timeRemaining.is_paused = this.isPaused;
            if (this.isPaused) {
                //attempt to change 'pause' text to 'resume' text on pause button
                /*
                objects.Game.stage.removeChild(this.pauseTxtButton);
                this.pauseTxtButton = new objects.Label("Resume", "20px", "Cambay", "#ffffff", this.pauseButton.x + 80, this.pauseButton.y + 10)
                objects.Game.stage.addChild(this.pauseTxtButton);
                */
                this.menuButton.visible = true;
                this.menuTxtButton.visible = true;
                return;
            }
            else {
                this.menuButton.visible = false;
                this.menuTxtButton.visible = false;
            }
            this.timerCounter++;
            if (this.timerCounter == objects.Game.frameRate) {
                this.timer--;
                this.timerCounter = 0;
            }
            if (this.timer <= 0) {
                objects.Game.currentScene = config.Scene.FINISH;
            }
            this.timeRemaining.text = this.timeRemaining.fn_ChangeLabel(this.timer);
            var CheckMovement = this.CreateFunctionCheck(this.player);
            this.player.UpdateIfPossible(CheckMovement);
            this.enemies.forEach(function (enemy) {
                enemy.Update();
            });
            for (var i = 0; i < this.gameSceneryStaticObjects.length; i++) {
                var platform = this.gameSceneryStaticObjects[i];
                platform.Update();
            }
            for (var i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
                var object = this.gameSceneryDynamicObjects[i];
                object.UpdateIfPossible(this.CreateFunctionCheck(object));
            }
        };
        StageOne.prototype.Main = function () {
            var _this = this;
            //this.timeRemaining.fn_TimerTicker(objects.Game.stageTimer);
            //this.addChild(this.background);
            this.timer = objects.Game.stageTimer;
            this.addChild(this.background_main);
            this.addChild(this.timeRemaining);
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            this.CreateScenery();
            this.addChild(this.player);
            this.enemies.forEach(function (ghost) {
                _this.addChild(ghost);
            });
            this.addChild(this.background_shadow);
            //create the empties gameobjects to be the stage boundaries
            this.backButton.on("click", this.fn_ButtonClick);
            var callback = function () {
                _this.removeChild(_this.title);
                _this.removeChild(_this.titleShadow);
            };
            this.StartCountdown(3, callback);
            this.addChild(this.pauseButton);
            this.addChild(this.pauseTxtButton);
            this.addChild(this.menuButton);
            this.addChild(this.menuTxtButton);
            this.addChild(objects.Game.controlsImage);
            this.backButton.on("click", this.fn_ButtonClick);
            this.pauseButton.on("click", this.fn_pauseButtonClick);
            this.menuButton.on("click", this.fn_controlsButtonClick);
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
            this.gameSceneryStaticObjects[10] = wall_l;
            this.gameSceneryStaticObjects[11] = wall_r;
            this.CreateFloors();
            this.CreatePlatformsStairs();
            this.CreateObjects();
        };
        StageOne.prototype.CreateObjects = function () {
            var floor_3_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk.x, floor_3_Desk.y, floor_3_Desk.width, floor_3_Desk.height);
            this.addChild(floor_3_Desk);
            floor_3_Desk.x = 615;
            floor_3_Desk.y = 190;
            this.gameSceneryDynamicObjects[1] = floor_3_Desk;
            var floor_3_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_3_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_3_Crate.x, floor_3_Crate.y, floor_3_Crate.width, floor_3_Crate.height - 5);
            this.addChild(floor_3_Crate);
            floor_3_Crate.x = 415;
            floor_3_Crate.y = 190;
            this.gameSceneryDynamicObjects[0] = floor_3_Crate;
        };
        StageOne.prototype.CreatePlatformsStairs = function () {
            var floor_3_stairs = new objects.EmptyGameObject(this.assetManager, "floor_3_stairs", 30, 1);
            this.addChild(floor_3_stairs);
            this.gameSceneryStaticObjects[9] = floor_3_stairs;
            floor_3_stairs.x = 320;
            floor_3_stairs.y = 184;
            var floor_1_stairs = new objects.EmptyGameObject(this.assetManager, "floor_1_stairs", 30, 1);
            this.addChild(floor_1_stairs);
            this.gameSceneryStaticObjects[8] = floor_1_stairs;
            floor_1_stairs.x = 706;
            floor_1_stairs.y = 414;
        };
        StageOne.prototype.CreateFloors = function () {
            //Floors platforms
            var platform_offset = 8;
            var floor_5 = new objects.EmptyGameObject(this.assetManager, "floor_5", 620, 1 + platform_offset);
            this.addChild(floor_5);
            this.gameSceneryStaticObjects[7] = floor_5;
            floor_5.x = 220;
            floor_5.y = 12 + platform_offset;
            var floor_4_1 = new objects.EmptyGameObject(this.assetManager, "floor_4_1", 60, 1 + platform_offset);
            this.addChild(floor_4_1);
            this.gameSceneryStaticObjects[6] = floor_4_1;
            floor_4_1.x = 220;
            floor_4_1.y = 130 + platform_offset;
            var floor_4_2 = new objects.EmptyGameObject(this.assetManager, "floor_4_2", 460, 1 + platform_offset);
            this.addChild(floor_4_2);
            this.gameSceneryStaticObjects[5] = floor_4_2;
            floor_4_2.x = 380;
            floor_4_2.y = 130 + platform_offset;
            var floor_3 = new objects.EmptyGameObject(this.assetManager, "floor_3", 620, 1 + platform_offset);
            this.addChild(floor_3);
            this.gameSceneryStaticObjects[4] = floor_3;
            floor_3.x = 220;
            floor_3.y = 242 + platform_offset;
            //this.player.y = 300;
            var floor_2_1 = new objects.EmptyGameObject(this.assetManager, "floor_2_1", 60, 1 + platform_offset);
            this.addChild(floor_2_1);
            this.gameSceneryStaticObjects[3] = floor_2_1;
            floor_2_1.x = 780;
            floor_2_1.y = 357 + platform_offset;
            var floor_2_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_2", 455, 1 + platform_offset);
            this.addChild(floor_2_2);
            this.gameSceneryStaticObjects[2] = floor_2_2;
            floor_2_2.x = 220;
            floor_2_2.y = 357 + platform_offset;
            var floor_1 = new objects.EmptyGameObject(this.assetManager, "floor_1", 620, 1 + platform_offset);
            this.addChild(floor_1);
            this.gameSceneryStaticObjects[1] = floor_1;
            floor_1.x = 220;
            floor_1.y = 472 + platform_offset;
            var floor_0 = new objects.EmptyGameObject(this.assetManager, "floor_0", 620, 1 + platform_offset);
            this.addChild(floor_0);
            this.gameSceneryStaticObjects[0] = floor_0;
            floor_0.x = 220;
            floor_0.y = 580 + platform_offset;
        };
        return StageOne;
    }(objects.Scene));
    scenes.StageOne = StageOne;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageOne.js.map