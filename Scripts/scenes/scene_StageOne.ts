module scenes
{
    export class StageOne extends objects.Scene
    {
        private background: objects.Background;
        private title: objects.Label;
        private titleShadow: objects.Label;

        private backButton: objects.Button;
        private txtButton: objects.Label;
        private enemies:objects.Enemy[];        

        private player: objects.Player;

        private background_main: objects.Background;
        private background_shadow: objects.Background;

        private platforms:objects.EmptyGameObject[];
        private walls:objects.EmptyGameObject[];


        constructor(assetManager: createjs.LoadQueue)
        {
            super(assetManager);
            this.Start();
        }

        private fn_ButtonClick():void
        {
            objects.Game.currentScene = config.Scene.FINISH;
        }

        public Start():void
        {
            this.platforms = new Array<objects.EmptyGameObject>();
            this.walls = new Array<objects.EmptyGameObject>();

            this.enemies = new Array<objects.Enemy>();

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
            this.player.boxCollider = new objects.BoxCollider(this.player.width/4.4, this.player.height - 8, this.player.x, 
                this.player.y, 
                this.player.width/2.2, 8);

            this.Main();
        }

        public Update():void
        {
            this.player.Update();
            this.player.DebugLine();

            
            this.enemies.forEach(enemy => {
                enemy.Update();
            });

            /*this.platforms.forEach(platform => {
            });*/
            for(let i = 0; i < this.platforms.length; i++) {
                var platform = this.platforms[i];
                if (managers.Collision.CheckAABB(this.player, platform)) {
                    /*console.log('Collided with : ' + platform.name + ' <> py:' + this.player.y
                            + ' pfy:' + platform.y);    */
                    if(!this.player.isGrounded) {                    
                        this.player.isGrounded = true;
                    }
                    break;// dont verify another platform in the case of one be grounded
                } else {
                    this.player.isGrounded = false;
                }
            //console.log('is Grounded:' + this.player.isGrounded);
            }
            for(let i = 0; i < this.walls.length; i++) {     
                var wall = this.walls[i];        
                if (managers.Collision.CheckAABB(this.player, wall)) {
                    if(!this.player.isColliding) {
                        this.player.isColliding = true;
                        if (wall.name === 'wall_l') {
                            this.player.canMoveL = false;
                        } else if (wall.name === 'wall_r') {
                            this.player.canMoveR = false;
                        }
                        //Todo: make it work to any object
                        break;
                    }
                } else {
                    this.player.isColliding = false;
                    if (wall.name === 'wall_l') {
                        this.player.canMoveL = true;
                    } else if (wall.name === 'wall_r') {
                        this.player.canMoveR = true;
                    }
                }
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
            this.enemies.forEach(ghost => {
                this.addChild(ghost);  
            });
            this.addChild(this.background_shadow);
            
            //create the empties gameobjects to be the stage boundaries
            this.CreateScenery();

            this.backButton.on("click", this.fn_ButtonClick);

            var callback = () : void => {
                this.removeChild(this.title);
                this.removeChild(this.titleShadow);
            }

            this.StartCountdown(3, callback);
        }

        stage:createjs.Stage;
        drawingCanvas:createjs.Shape;
        private CreateScenery() {
            var wall_l = new objects.EmptyGameObject(this.assetManager, "wall_l", 1, 600);
            wall_l.isDebug = true;
            wall_l.x = 220;
            wall_l.y = 10;
            wall_l.boxCollider = new objects.BoxCollider(0, 0, wall_l.x, wall_l.y, wall_l.width, wall_l.height);
            this.addChild(wall_l);
            
            var wall_r = new objects.EmptyGameObject(this.assetManager, "wall_r", 1, 600);
            wall_r.isDebug = true;
            wall_r.x = 840;
            wall_r.y = 10;
            wall_r.boxCollider = new objects.BoxCollider(0, 0, wall_r.x, wall_r.y, wall_r.width, wall_r.height);
            this.addChild(wall_r);

            this.walls[0] = wall_l;
            this.walls[1] = wall_r;
            wall_l.DebugLine();
            wall_r.DebugLine();

            this.player.isDebug = true;

            this.CreateFloors();
            this.CreatePlatformsStairs();
            this.CreateObjects();

        }
        private CreateObjects():void {
            var floor_3_Crate = new objects.EmptyGameObject(this.assetManager, "floor_3_stairs", 35, 35); 
            this.addChild(floor_3_Crate);
            
            this.platforms[9] = floor_3_Crate;
            this.walls[2] = floor_3_Crate;

            floor_3_Crate.x = 415;
            floor_3_Crate.y = 210;
            floor_3_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_3_Crate.x, floor_3_Crate.y, floor_3_Crate.width, floor_3_Crate.height);
            floor_3_Crate.isDebug = true;
            floor_3_Crate.DebugLine();
        }

        private CreatePlatformsStairs():void {
            var floor_3_stairs = new objects.EmptyGameObject(this.assetManager, "floor_3_stairs", 30, 1); 
            this.addChild(floor_3_stairs);
            this.platforms[8] = floor_3_stairs;
            floor_3_stairs.x = 320;
            floor_3_stairs.y = 185;
            floor_3_stairs.boxCollider = new objects.BoxCollider(0, 0, floor_3_stairs.x, floor_3_stairs.y, floor_3_stairs.width, floor_3_stairs.height);
            floor_3_stairs.isDebug = true;
            floor_3_stairs.DebugLine();

            var floor_1_stairs = new objects.EmptyGameObject(this.assetManager, "floor_1_stairs", 30, 1); 
            this.addChild(floor_1_stairs);
            this.platforms[7] = floor_1_stairs;
            floor_1_stairs.x = 706;
            floor_1_stairs.y = 412;
            floor_1_stairs.boxCollider = new objects.BoxCollider(0, 0, floor_1_stairs.x, floor_1_stairs.y, floor_1_stairs.width, floor_1_stairs.height);
            floor_1_stairs.isDebug = true;
            floor_1_stairs.DebugLine();
        }
        
        private CreateFloors():void {
            //Floors platforms
            var floor_4_1 = new objects.EmptyGameObject(this.assetManager, "floor_4_1", 60, 1); 
            this.addChild(floor_4_1);
            this.platforms[6] = floor_4_1;
            floor_4_1.x = 220;
            floor_4_1.y = 130;
            floor_4_1.boxCollider = new objects.BoxCollider(0, 0, floor_4_1.x, floor_4_1.y, floor_4_1.width, floor_4_1.height);
            floor_4_1.isDebug = true;
            floor_4_1.DebugLine();
    
            var floor_4_2 = new objects.EmptyGameObject(this.assetManager, "floor_4_2", 460, 1); 
            this.addChild(floor_4_2);
            this.platforms[5] = floor_4_2;
            floor_4_2.x = 380;
            floor_4_2.y = 130;
            floor_4_2.boxCollider = new objects.BoxCollider(0, 0, floor_4_2.x, floor_4_2.y, floor_4_2.width, floor_4_2.height);
            floor_4_2.isDebug = true;
            floor_4_2.DebugLine();
    
            var floor_3 = new objects.EmptyGameObject(this.assetManager, "floor_3", 620, 1); 
            this.addChild(floor_3);
            this.platforms[4] = floor_3;
            floor_3.x = 220;
            floor_3.y = 245;
            floor_3.boxCollider = new objects.BoxCollider(0, 0, floor_3.x, floor_3.y, floor_3.width, floor_3.height);
            floor_3.isDebug = true;
            floor_3.DebugLine();
            
            var floor_2_1 = new objects.EmptyGameObject(this.assetManager, "floor_2_1", 60, 1); 
            this.addChild(floor_2_1);
            this.platforms[3] = floor_2_1;
            floor_2_1.x = 780;
            floor_2_1.y = 360;
            floor_2_1.boxCollider = new objects.BoxCollider(0, 0, floor_2_1.x, floor_2_1.y, floor_2_1.width, floor_2_1.height);
            floor_2_1.isDebug = true;
            floor_2_1.DebugLine();
    
            var floor_2_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_2", 460, 1); 
            this.addChild(floor_2_2);
            this.platforms[2] = floor_2_2;
            floor_2_2.x = 220;
            floor_2_2.y = 360;
            floor_2_2.boxCollider = new objects.BoxCollider(0, 0, floor_2_2.x, floor_2_2.y, floor_2_2.width, floor_2_2.height);
            floor_2_2.isDebug = true;
            floor_2_2.DebugLine();
    
            var floor_1 = new objects.EmptyGameObject(this.assetManager, "floor_1", 620, 1); 
            this.addChild(floor_1);
            this.platforms[1] = floor_1;
            floor_1.x = 220;
            floor_1.y = 475;
            floor_1.boxCollider = new objects.BoxCollider(0, 0, floor_1.x, floor_1.y, floor_1.width, floor_1.height);
            floor_1.isDebug = true;
            floor_1.DebugLine();
    
            var floor_0 = new objects.EmptyGameObject(this.assetManager, "floor_0", 620, 1); 
            this.addChild(floor_0);
            this.platforms[0] = floor_0;
            floor_0.x = 220;
            floor_0.y = 590;
            floor_0.boxCollider = new objects.BoxCollider(0, 0, floor_0.x, floor_0.y, floor_0.width, floor_0.height);
            floor_0.isDebug = true;
            floor_0.DebugLine();

        } 

    }
}
