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
    var Scene = /** @class */ (function (_super) {
        __extends(Scene, _super);
        function Scene(assetManager) {
            var _this = _super.call(this) || this;
            _this.isPlaying = false;
            _this.timerCounter = 0;
            _this.positionInventoryP2 = new math.Vec2(25, 350);
            _this.positionInventoryP1 = new math.Vec2(970, 50);
            _this.assetManager = assetManager;
            return _this;
        }
        Scene.prototype.createDialog = function (scene, text) {
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
        Scene.prototype.CreateFunctionCheck = function (gameObject) {
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
        Scene.prototype.GoToNextLevel = function () {
            objects.Game.previousScene = config.Scene.INGAME;
            objects.Game.currentScene = config.Scene.REWARD;
            /*
              var nextLevel = (): void => {
              }
              this.StartCount(1, nextLevel);
            */
        };
        Scene.prototype.fn_pauseButtonClick = function () {
            console.log("called");
            objects.Game.keyboard.pause = !objects.Game.keyboard.pause;
            if (objects.Game.controlsImage.visible) {
                objects.Game.controlsImage.visible = false;
            }
        };
        Scene.prototype.fn_controlsButtonClick = function () {
            console.log('show controls');
            objects.Game.controlsImage.visible = true;
            if (objects.Game.controlsImage.visible) {
            }
            else {
                objects.Game.controlsImage.visible = false;
            }
        };
        Scene.prototype.Start = function () {
            objects.Game.keyboard = new managers.Keyboard();
            objects.Player.onePlayerGone = true;
            this.isPaused = false;
            this.gameSceneryStaticObjects = new Array();
            this.gameSceneryDynamicObjects = new Array();
            this.enemies = new Array();
            this.CreateEnemies();
            console.log("GAME SCENE(S)...");
            this.timeRemaining = new objects.Label(objects.Game.stageTimer.toString(), "bold 32px", "Cambay", "#000000", 50, 65, true);
            this.background_main = new objects.Background(this.assetManager, "level_01_house");
            this.background_shadow = new objects.Background(this.assetManager, "level_01_shadow");
            //pause button: controls button
            this.menuTxtButton = new objects.Label("Controls", "20px", "Cambay", "#ffffff", 70, 510);
            this.menuButton = new objects.Button(this.assetManager, "startButton", this.menuTxtButton.x - 10, this.menuTxtButton.y, this.menuTxtButton);
            this.menuButton.visible = false;
            this.menuTxtButton.visible = false;
            objects.Game.controlsImage = new objects.UIHelper(this.assetManager, "controls", 1066 * 0.5 / 2, 600 * 0.5 / 2);
            objects.Game.controlsImage.visible = false;
            //#region pause button
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.resumeText = new objects.Label("Resume", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.pauseButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.088, 600 * 0.95, this.pauseTxtButton, true);
            this.pauseButton.scaleX = 0.75;
            this.gamePausedText = new objects.Label("Game Paused", "bold 48px", "Cambay", "#ffffff", 1066 / 2, 600 / 4, true);
            this.gamePausedText.visible = false;
            //#endregion
            this.title = new objects.Label("Corridors!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
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
        };
        Scene.prototype.Update = function () {
            var _this = this;
            this.CheckPaused();
            this.pauseBackground.visible = this.isPaused;
            this.gamePausedText.visible = this.isPaused;
            if (this.isPaused) {
                this.pauseButton.text = this.resumeText;
                this.addChild(this.resumeText);
                this.removeChild(this.pauseTxtButton);
                this.pauseButton.x = 1066 / 2;
                this.pauseButton.y = 600 * 0.75;
                this.pauseButton.text.x = 1066 / 2;
                this.pauseButton.text.y = 600 * 0.75;
                this.menuButton.visible = true;
                this.menuTxtButton.visible = true;
                return;
            }
            else {
                this.pauseButton.text = this.pauseTxtButton;
                this.addChild(this.pauseTxtButton);
                this.removeChild(this.resumeText);
                this.pauseButton.x = 1066 * 0.088;
                this.pauseButton.y = 600 * 0.95;
                this.pauseButton.text.x = 1066 * 0.088;
                this.pauseButton.text.y = 600 * 0.95;
                this.menuButton.visible = false;
            }
            this.menuButton.visible = false;
            this.timerCounter++;
            //double the speed of the timer in the case the first player reach the end without the second player
            var speedTimer = objects.Player.onePlayerGone ? 1 / 2 : 1;
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
        Scene.prototype.Main = function () {
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
            this.addChild(this.pauseButton.text);
            this.addChild(this.gamePausedText);
            //this.backButton.on("click", this.fn_ButtonClick);
            this.pauseButton.on("click", this.fn_pauseButtonClick);
            this.addChild(this.pauseTxtButton);
            this.addChild(this.menuButton);
            this.addChild(this.menuTxtButton);
            this.addChild(objects.Game.controlsImage);
            //this.backButton.on("click", this.fn_ButtonClick);
            this.menuButton.on("click", this.fn_controlsButtonClick);
        };
        Scene.prototype.CheckPaused = function () {
            this.isPaused = objects.Game.keyboard.pause;
        };
        Scene.prototype.StartCountdown = function (seconds, callback) {
            var counter = seconds;
            var interval = setInterval(function () {
                //console.log(counter);
                counter--;
                if (counter < 0) {
                    clearInterval(interval);
                    callback();
                    //console.log('Ding!');
                }
                ;
            }, 1000);
        };
        ;
        Scene.prototype.StartCount = function (seconds, overNote) {
            var counter = seconds;
            var interval = setInterval(function () {
                //console.log(counter);
                counter--;
                if (counter < 0) {
                    clearInterval(interval);
                    overNote();
                    //console.log('Ding!');
                }
                ;
            }, 1000);
        };
        ;
        return Scene;
    }(createjs.Container));
    objects.Scene = Scene;
})(objects || (objects = {}));
//# sourceMappingURL=scene.js.map