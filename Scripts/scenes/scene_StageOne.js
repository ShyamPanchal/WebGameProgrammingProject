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
        //#endregion
        function StageOne(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.timerCounter = 0;
            _this.positionInventoryP2 = new math.Vec2(25, 350);
            _this.positionInventoryP1 = new math.Vec2(970, 50);
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
            this.firstPlayerReachEnd = false;
            this.isPaused = false;
            this.gameSceneryStaticObjects = new Array();
            this.gameSceneryDynamicObjects = new Array();
            this.enemies = new Array();
            objects.Game.keyboard = new managers.Keyboard();
            var ghost = new objects.Enemy(this.assetManager, "ghost", 550, 245);
            ghost.alpha = 0.8;
            ghost.y = ghost.y - ghost.height;
            ghost.scaleX = 0.7;
            ghost.scaleY = 0.7;
            this.enemies.push(ghost);
            var ghost2 = new objects.Enemy(this.assetManager, "ghost", 550, 480);
            ghost2.alpha = 0.8;
            ghost2.y = ghost2.y - ghost2.height;
            ghost2.scaleX = 0.7;
            ghost2.scaleY = 0.7;
            this.enemies.push(ghost2);
            console.log("GAME SCENE(S)...");
            this.timeRemaining = new objects.Label(objects.Game.stageTimer.toString(), "bold 32px", "Cambay", "#000000", 50, 65, true);
            this.background_main = new objects.Background(this.assetManager, "level_01_house");
            this.background_shadow = new objects.Background(this.assetManager, "level_01_shadow");
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
            //this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550, this.title);
            this.titleShadow = new objects.Label("Corridors!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;
            //#region Player Init
            var inventory = new objects.Inventory(this.assetManager);
            inventory.x = this.positionInventoryP1.x;
            inventory.y = this.positionInventoryP1.y;
            this.player1 = new objects.Player(this.assetManager, 1, inventory, 400, 60);
            //for using bitmap
            //this.player1.boxCollider = new objects.BoxCollider(18, 16, this.player1.x, this.player1.y, this.player1.width - 45, this.player1.height - 20);
            this.player1.boxCollider = new objects.BoxCollider(0, 16, this.player1.x, this.player1.y, this.player1.width - 45, this.player1.height - 29);
            this.player1.dialog = this.createDialog(this, "...");
            var inventory2 = new objects.Inventory(this.assetManager);
            inventory2.x = this.positionInventoryP2.x;
            inventory2.y = this.positionInventoryP2.y;
            this.player2 = new objects.Player(this.assetManager, 2, inventory2, 400, 280);
            //for using bitmap
            //this.player2.boxCollider = new objects.BoxCollider(18, 16, this.player2.x, this.player2.y, this.player2.width - 45, this.player2.height - 20);
            this.player2.boxCollider = new objects.BoxCollider(0, 16, this.player2.x, this.player2.y, this.player2.width - 45, this.player2.height - 29);
            this.player2.dialog = this.createDialog(this, "...");
            //#endregion
            //#region PauseMenu
            this.pauseBackground = new objects.Background(this.assetManager, "pauseBackground");
            this.pauseBackground.alpha = 0.8;
            this.pauseBackground.regX = this.pauseBackground.getBounds().width * 0.5;
            this.pauseBackground.regY = this.pauseBackground.getBounds().height * 0.5;
            this.pauseBackground.x = 1066 / 2;
            this.pauseBackground.y = 600 / 2;
            this.pauseBackground.scaleX = 0.9;
            this.pauseBackground.scaleY = 0.9;
            this.pauseBackground.visible = false;
            //#endregion
            this.overTitle = new objects.Label("Player dead...", "bold 50px", "Cambay", "#960000", (1066 / 2), 600 * 0.35, true);
            this.Main();
        };
        StageOne.prototype.createDialog = function (scene, text) {
            return new function () {
                this.dialog = new objects.Dialog(scene.assetManager, text);
                this.showDialog = function () {
                    this.dialog.showDialog(scene);
                };
                this.disposeDialog = function () {
                    this.dialog.hideDialog(scene);
                };
            };
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
                                result.objectCollided = object;
                                if (gameObject instanceof objects.Player) {
                                    object.player = gameObject; //informing which player did the action
                                    object.aabbResultPlayer = result;
                                    gameObject.actionObject = object;
                                    if (!object.alreadyHandled) {
                                        //show Dialog
                                        if (gameObject.dialog != null) {
                                            gameObject.dialog.showDialog();
                                        }
                                    }
                                }
                                break;
                            }
                        }
                    }
                }
                if (!collided && gameObject instanceof objects.Player) {
                    if (gameObject.dialog != null) {
                        gameObject.dialog.disposeDialog();
                    }
                    gameObject.actionObject = null;
                }
                return result;
            };
        };
        StageOne.prototype.CheckNextLevel = function () {
            if (this.firstPlayerReachEnd && this.secondPlayerReachEnd) {
                var nextLevel = function () {
                    objects.Game.previousScene = config.Scene.INGAME;
                    objects.Game.currentScene = config.Scene.REWARD;
                };
                this.StartCount(1, nextLevel);
            }
        };
        StageOne.prototype.Update = function () {
            var _this = this;
            this.CheckPaused();
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
            //double the speed of the timer in the case the first player reach the end without the second player
            var speedTimer = this.firstPlayerReachEnd ? 1 / 2 : 1;
            if (this.timerCounter == objects.Game.frameRate * speedTimer) {
                this.timer--;
                this.timerCounter = 0;
            }
            if (this.timer <= 0) {
                objects.Game.currentScene = config.Scene.FINISH;
            }
            this.timeRemaining.text = this.timeRemaining.fn_ChangeLabel(this.timer);
            var CheckMovementP1 = this.CreateFunctionCheck(this.player1);
            var CheckMovementP2 = this.CreateFunctionCheck(this.player2);
            this.player1.UpdateIfPossible(CheckMovementP1);
            this.player2.UpdateIfPossible(CheckMovementP2);
            this.enemies.forEach(function (enemy) {
                enemy.Update();
                _this.player1.isDead = managers.Collision.CheckDistance(_this.player1, enemy);
                _this.player2.isDead = managers.Collision.CheckDistance(_this.player2, enemy);
                if (_this.player1.isDead || _this.player2.isDead) {
                    var overNote = function () {
                        objects.Game.currentScene = config.Scene.FINISH;
                    };
                    _this.StartCount(2, overNote);
                    _this.overTitle.visible = true;
                    if (_this.player1.isDead) {
                        _this.player1.x = 1500; //sending player and ghost to out of screen 
                    }
                    if (_this.player2.isDead) {
                        _this.player2.x = 1500; //sending player and ghost to out of screen 
                    }
                    enemy.x = 1500;
                }
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
            this.timer = objects.Game.stageTimer;
            this.addChild(this.background_main);
            this.addChild(this.timeRemaining);
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            //this.addChild(this.backButton);
            //this.addChild(this.txtButton);
            this.addChild(this.player1.inventory);
            this.addChild(this.player1.picture);
            this.addChild(this.player2.inventory);
            this.addChild(this.player2.picture);
            this.CreateScenery();
            this.addChild(this.player1.spriteRenderer);
            this.addChild(this.player2.spriteRenderer);
            this.enemies.forEach(function (ghost) {
                _this.addChild(ghost);
            });
            this.addChild(this.background_shadow);
            //create the empties gameobjects to be the stage boundaries
            //this.backButton.on("click", this.fn_ButtonClick);
            var callback = function () {
                _this.removeChild(_this.title);
                _this.removeChild(_this.titleShadow);
            };
            this.StartCountdown(3, callback);
            this.addChild(this.overTitle);
            this.overTitle.visible = false;
            this.addChild(this.pauseBackground);
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
            var _this = this;
            //#region Player1
            var floor_4_Door = new objects.Door(this.assetManager, true);
            floor_4_Door.isLocked = true;
            floor_4_Door.boxCollider = new objects.BoxCollider(0, 0, floor_4_Door.x, floor_4_Door.y, floor_4_Door.width, floor_4_Door.height + 5);
            floor_4_Door.EnterDoorAction = function (player) {
                if (_this.firstPlayerReachEnd) {
                    _this.secondPlayerReachEnd = true;
                }
                else {
                    _this.firstPlayerReachEnd = true;
                }
                player.x = 1500;
                if (player.playerNum == 2) {
                    objects.Game.scoreManagerP2 = new managers.Score(player.inventory.GetItems(), _this.timer);
                    console.log('p2 finished ' + _this.timer);
                }
                else {
                    objects.Game.scoreManagerP1 = new managers.Score(player.inventory.GetItems(), _this.timer);
                    console.log('p1 finished ' + _this.timer);
                }
            };
            this.addChild(floor_4_Door);
            floor_4_Door.x = 770;
            floor_4_Door.y = 50;
            this.gameSceneryDynamicObjects.push(floor_4_Door);
            var floor_3_Treasure = new objects.HandableObject(this.assetManager, "sack", 1000);
            this.addChild(floor_3_Treasure);
            floor_3_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Treasure);
            var floor_3_Key = new objects.Key(this.assetManager);
            this.addChild(floor_3_Key);
            floor_3_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Key);
            var floor_3_Desk_2 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_2.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_2.x, floor_3_Desk_2.y, floor_3_Desk_2.width, floor_3_Desk_2.height);
            this.addChild(floor_3_Desk_2);
            floor_3_Desk_2.x = 615;
            floor_3_Desk_2.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_2);
            floor_3_Key.isGravityAffected = false;
            floor_3_Desk_2.objectInside.push(floor_3_Key);
            var floor_3_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk.x, floor_3_Desk.y, floor_3_Desk.width, floor_3_Desk.height);
            this.addChild(floor_3_Desk);
            floor_3_Desk.x = 715;
            floor_3_Desk.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk);
            floor_3_Treasure.isGravityAffected = false;
            floor_3_Desk.objectInside.push(floor_3_Treasure);
            var floor_3_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_3_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_3_Crate.x, floor_3_Crate.y, floor_3_Crate.width, floor_3_Crate.height - 5);
            this.addChild(floor_3_Crate);
            floor_3_Crate.x = 415;
            floor_3_Crate.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Crate);
            //#endregion player1
            var floor_1_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_1_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_1_Crate.x, floor_1_Crate.y, floor_1_Crate.width, floor_1_Crate.height - 5);
            this.addChild(floor_1_Crate);
            floor_1_Crate.x = 515;
            floor_1_Crate.y = 390;
            this.gameSceneryDynamicObjects.push(floor_1_Crate);
            var floor_2_Door = new objects.Door(this.assetManager, true);
            floor_2_Door.isLocked = true;
            floor_2_Door.boxCollider = new objects.BoxCollider(0, 0, floor_2_Door.x, floor_2_Door.y, floor_2_Door.width, floor_2_Door.height + 5);
            floor_2_Door.EnterDoorAction = function (player) {
                if (_this.firstPlayerReachEnd) {
                    _this.secondPlayerReachEnd = true;
                }
                else {
                    _this.firstPlayerReachEnd = true;
                }
                player.x = 1500;
                if (player.playerNum == 2) {
                    objects.Game.scoreManagerP2 = new managers.Score(player.inventory.GetItems(), _this.timer);
                    console.log('p2 finished ' + _this.timer);
                }
                else {
                    objects.Game.scoreManagerP1 = new managers.Score(player.inventory.GetItems(), _this.timer);
                    console.log('p1 finished ' + _this.timer);
                }
            };
            this.addChild(floor_2_Door);
            floor_2_Door.x = 240;
            floor_2_Door.y = 280;
            this.gameSceneryDynamicObjects.push(floor_2_Door);
            var floor_1_Key = new objects.Key(this.assetManager);
            this.addChild(floor_1_Key);
            floor_1_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Key);
            var floor_1_Treasure = new objects.HandableObject(this.assetManager, "sack", 1000);
            this.addChild(floor_1_Treasure);
            floor_1_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Treasure);
            var floor_1_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_1_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_1_Desk.x, floor_1_Desk.y, floor_1_Desk.width, floor_1_Desk.height);
            this.addChild(floor_1_Desk);
            floor_1_Desk.x = 455;
            floor_1_Desk.y = 390;
            this.gameSceneryDynamicObjects.push(floor_1_Desk);
            floor_1_Key.isGravityAffected = false;
            floor_1_Desk.objectInside.push(floor_1_Key);
            var floor_2_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_2_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_2_Desk.x, floor_2_Desk.y, floor_2_Desk.width, floor_2_Desk.height);
            this.addChild(floor_2_Desk);
            floor_2_Desk.x = 315;
            floor_2_Desk.y = 390;
            this.gameSceneryDynamicObjects.push(floor_2_Desk);
            floor_1_Key.isGravityAffected = false;
            floor_2_Desk.objectInside.push(floor_1_Treasure);
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