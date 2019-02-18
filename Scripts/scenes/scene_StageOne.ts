
module scenes
{
    export class StageOne extends objects.Scene
    {
        private background: objects.Background;
        private title: objects.Label;
        private titleShadow: objects.Label;

        private backButton: objects.Button;
        private pauseButton: objects.Button;
        private txtButton: objects.Label;

        private enemies:objects.Enemy[];        

        //private ghost: objects.Enemy;
        private player: objects.Player;

        private pauseTxtButton: objects.Label;

        private background_main: objects.Background;
        private background_shadow: objects.Background;

        private gameSceneryStaticObjects:objects.EmptyGameObject[];
        private gameSceneryDynamicObjects:objects.DynamicObject[];


        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.FINISH;
        }

        private fn_pauseButtonClick():void
        {
            objects.Game.currentScene = config.Scene.PAUSE;
        }

        public Start():void
        {
            //config.Gravity.gravityFactor = -1;

            objects.Game.isDebug = true;
            this.isPaused = false;
            this.gameSceneryStaticObjects = new Array<objects.EmptyGameObject>();
            this.gameSceneryDynamicObjects = new Array<objects.DynamicObject>();
            
            this.enemies = new Array<objects.Enemy>();

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
            this.pauseTxtButton = new objects.Label("Pause", "20px", "Cambay", "#ffffff",this.pauseButton.x+80, this.pauseButton.y+10);
            //pause button end

            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;

            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;

            this.player = new objects.Player(this.assetManager);            
            this.player.boxCollider = new objects.BoxCollider(18, 16, this.player.x, 
                this.player.y, 
                this.player.width - 45, this.player.height - 20);
                
            this.Main();

        }

        public CreateFunctionCheck(gameObject:objects.GameObject) {
            let boxCollider:objects.BoxCollider = gameObject.boxCollider;
            return (x:number, y:number) : managers.AABB => {
                let collided = false;                                
                let aabbCollider = boxCollider.GetAABB(x, y);
                let result: managers.AABB;

                for(let i = 0; i < this.gameSceneryStaticObjects.length; i++) {
                    var platform = this.gameSceneryStaticObjects[i];                    
                    result = managers.Collision.CheckAABBCollision(aabbCollider, platform.boxCollider.aabb);
                    if (result.CheckCollided()) {
                        collided = true;
                        break;
                    } 
                }
                if (!collided) {
                    for(let i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
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


        public Update():void
        {
            this.CheckPaused();
            if (this.isPaused){
                return;
            } 

            
            let CheckMovement = this.CreateFunctionCheck(this.player);

            this.player.UpdateIfPossible(CheckMovement);
            
            this.enemies.forEach(enemy => {
                enemy.Update();
            });

            for(let i = 0; i < this.gameSceneryStaticObjects.length; i++) {
                var platform = this.gameSceneryStaticObjects[i];
                platform.Update();
            }

            for(let i = 0; i < this.gameSceneryDynamicObjects.length; i++) {
                var object = this.gameSceneryDynamicObjects[i];
                object.UpdateIfPossible(this.CreateFunctionCheck(object));
            }
        }

        public Main():void
        {        

            //this.addChild(this.background);
            this.addChild(this.background_main);
            
            
            this.addChild(this.titleShadow);
            this.addChild(this.title);
            
            this.addChild(this.backButton);
            this.addChild(this.txtButton);
            
            this.addChild(this.player);
            this.CreateScenery();
            this.enemies.forEach(ghost => {
                this.addChild(ghost);  
            });
            this.addChild(this.background_shadow);
            
            //create the empties gameobjects to be the stage boundaries

            this.backButton.on("click", this.fn_ButtonClick);

            var callback = () : void => {
                this.removeChild(this.title);
                this.removeChild(this.titleShadow);
            }
            this.StartCountdown(3, callback);

            this.addChild(this.pauseButton);
            this.addChild(this.pauseTxtButton);
            
            this.backButton.on("click", this.fn_ButtonClick);
            this.pauseButton.on("click", ()=>{this.isPaused = !this.isPaused; this.fn_pauseButtonClick;});//pause
        
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
        private CreateObjects():void {
            var floor_3_Crate = new objects.PushableObject(this.assetManager, "crate"); 
            floor_3_Crate.boxCollider = new objects.BoxCollider(0 , 0, floor_3_Crate.x, floor_3_Crate.y, 
                floor_3_Crate.width, floor_3_Crate.height-5);
            this.addChild(floor_3_Crate);
                        
            floor_3_Crate.x = 415;
            floor_3_Crate.y = 190;

            this.gameSceneryDynamicObjects[0] = floor_3_Crate;
        }

        private CreatePlatformsStairs():void {
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
        
        private CreateFloors():void {
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
