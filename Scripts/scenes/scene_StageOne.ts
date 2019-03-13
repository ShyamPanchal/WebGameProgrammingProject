
module scenes {
    export class StageOne extends objects.Scene {
        //#region Stage Variables
        private title: objects.Label;
        private titleShadow: objects.Label;

        private backButton: objects.Button;
        private pauseButton: objects.Button;
        private txtButton: objects.Label;

        private enemies: objects.Enemy[];

        //private ghost: objects.Enemy;
        private player: objects.Player;

        private pauseTxtButton: objects.Label;

        private background_main: objects.Background;
        private background_shadow: objects.Background;

        private gameSceneryStaticObjects: objects.EmptyGameObject[];
        private gameSceneryDynamicObjects: objects.DynamicObject[];

        private timeRemaining: objects.Label;
        private timerCounter: number = 0;

        private pauseBackground: objects.Background;
        private resumeText: objects.Label;
        private gamePausedText: objects.Label;

        private overTitle: objects.Label;
        //#endregion

        constructor(assetManager: createjs.LoadQueue) {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick(): void {
            objects.Game.currentScene = config.Scene.FINISH;
        }

        private fn_pauseButtonClick(): void {
            objects.Game.keyboard.pause = !objects.Game.keyboard.pause;
        }

        public Start(): void {

            //config.Gravity.gravityFactor = -1;
            objects.Game.isDebug = false;
            this.isPaused = false;
            this.gameSceneryStaticObjects = new Array<objects.EmptyGameObject>();
            this.gameSceneryDynamicObjects = new Array<objects.DynamicObject>();

            this.enemies = new Array<objects.Enemy>();

            objects.Game.keyboard = new managers.Keyboard();
            var ghost = new objects.Enemy(this.assetManager, "ghost", 550, 245);
            ghost.alpha = 0.8;
            ghost.y = ghost.y - ghost.height;
            this.enemies[0] = ghost;
        
            

            console.log("GAME SCENE(S)...");

            this.timeRemaining = new objects.Label(objects.Game.stageTimer.toString(), "bold 32px", "Cambay", "#000000", 50, 65, true);

            this.background_main = new objects.Background(this.assetManager, "level_01_house");
            this.background_shadow = new objects.Background(this.assetManager, "level_01_shadow");

            this.txtButton = new objects.Label("Bypass!", "18px", "bold Cambay", "#ffffff");
            this.txtButton.x = 910;
            this.txtButton.y = 565;

            //#region pause button
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.resumeText = new objects.Label("Resume", "20px", "Cambay", "#ffffff", 0, 0, true);
            this.pauseButton = new objects.Button(this.assetManager, "startButton", 1066 * 0.088, 600 * 0.95, this.pauseTxtButton, true);
            this.pauseButton.scaleX = 0.75;
            this.gamePausedText = new objects.Label("Game Paused", "bold 48px", "Cambay", "#ffffff", 1066 / 2, 600 / 4, true);
            this.gamePausedText.visible = false;
            //#endregion

            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;
            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550, this.title);

            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;

            //#region Player Init
            this.player = new objects.Player(this.assetManager);
            this.player.boxCollider = new objects.BoxCollider(18, 16, this.player.x, this.player.y, this.player.width - 45, this.player.height - 20);
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

            this.overTitle = new objects.Label("Player dead...", "bold 50px", "Cambay", "#960000", (1066 / 2), 600 *0.35, true);

            this.Main();

        }

        public CreateFunctionCheck(gameObject: objects.GameObject) {
            let boxCollider: objects.BoxCollider = gameObject.boxCollider;
            return (x: number, y: number): managers.AABB => {
                let collided = false;
                let aabbCollider = boxCollider.GetAABB(x, y);
                let result: managers.AABB;

                for (let i = 0; i < this.gameSceneryStaticObjects.length; i++) {
                    var platform = this.gameSceneryStaticObjects[i];
                    result = managers.Collision.CheckAABBCollision(aabbCollider, platform.boxCollider.aabb);
                    if (result.CheckCollided()) {
                        collided = true;
                        break;
                    }
                }
                if (!collided) {
                    for (let i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
                        var object = this.gameSceneryDynamicObjects[i];
                        if (object.name !== gameObject.name) {
                            result = managers.Collision.CheckAABBCollision(aabbCollider, object.boxCollider.aabb);
                            if (result.CheckCollided()) {
                                collided = true;
                                if (gameObject.name === this.player.name) {
                                    object.aabbResultPlayer = result;
                                    this.player.actionObject = object;
                                }
                                break;
                            }
                        }
                    }
                }

                if (!collided) {
                    this.player.actionObject = null;
                }
                return result;
            };
        }

        public Update(): void {
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

            let CheckMovement = this.CreateFunctionCheck(this.player);

            this.player.UpdateIfPossible(CheckMovement);

            this.enemies.forEach(enemy => {
                enemy.Update();

                this.player.isDead = managers.Collision.CheckDistance(this.player, enemy);
                if(this.player.isDead){
                    var trial = (): void => {
                        objects.Game.currentScene = config.Scene.FINISH;
                    }
                    this.StartCount(2, trial);
                    this.overTitle.visible = true;
                    this.player.x = 1500; //sending player and ghost to out of screen 
                    enemy.x = 1500;
                }
            });

            for (let i = 0; i < this.gameSceneryStaticObjects.length; i++) {
                var platform = this.gameSceneryStaticObjects[i];
                platform.Update();
            }

            for (let i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
                var object = this.gameSceneryDynamicObjects[i];
                object.UpdateIfPossible(this.CreateFunctionCheck(object));
            }
        }

        public Main(): void {
            this.timer = objects.Game.stageTimer;
            this.addChild(this.background_main);

            this.addChild(this.timeRemaining);

            this.addChild(this.titleShadow);
            this.addChild(this.title);

            this.addChild(this.backButton);
            //this.addChild(this.txtButton);

            this.CreateScenery();
            this.addChild(this.player);
            this.enemies.forEach(ghost => {
                this.addChild(ghost);
            });

            this.addChild(this.background_shadow);

            //create the empties gameobjects to be the stage boundaries

            this.backButton.on("click", this.fn_ButtonClick);

            var callback = (): void => {
                this.removeChild(this.title);
                this.removeChild(this.titleShadow);
            }
            this.StartCountdown(3, callback);
            
            this.addChild(this.overTitle);
            this.overTitle.visible = false;
            this.addChild(this.pauseBackground);

            this.addChild(this.pauseButton);
            this.addChild(this.pauseButton.text);

            this.addChild(this.gamePausedText);

            this.backButton.on("click", this.fn_ButtonClick);
            this.pauseButton.on("click", this.fn_pauseButtonClick);

        }

        private CreateScenery() {
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

        }

        private CreateObjects(): void {
            var floor_3_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk.x, floor_3_Desk.y,
                floor_3_Desk.width, floor_3_Desk.height);
            this.addChild(floor_3_Desk);

            floor_3_Desk.x = 615;
            floor_3_Desk.y = 190;

            this.gameSceneryDynamicObjects[1] = floor_3_Desk;

            var floor_3_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_3_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_3_Crate.x, floor_3_Crate.y,
                floor_3_Crate.width, floor_3_Crate.height - 5);
            this.addChild(floor_3_Crate);

            floor_3_Crate.x = 415;
            floor_3_Crate.y = 190;

            this.gameSceneryDynamicObjects[0] = floor_3_Crate;

        }

        private CreatePlatformsStairs(): void {
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
        }

        private CreateFloors(): void {
            //Floors platforms
            let platform_offset = 8;
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

        }

    }
}
