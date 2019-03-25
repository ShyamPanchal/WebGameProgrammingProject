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
    var StageThree = /** @class */ (function (_super) {
        __extends(StageThree, _super);
        //Audio
        // private backgroundMusic:createjs.AbstractSoundInstance;
        //#region Stage Variables
        //#endregion
        function StageThree(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.CreateEnemies = function () {
            };
            //Ghost
            _this.GetPositionE1 = function () {
                return new math.Vec2(1, 0); //Put (800,250) if yellow ghost needed
            };
            _this.GetPositionE2 = function () {
                return new math.Vec2(0, 0); //Put (800,485) if red ghost needed
            };
            _this.GetPositionP1 = function () {
                return new math.Vec2(700, 60);
            };
            _this.GetPositionP2 = function () {
                return new math.Vec2(400, 390);
            };
            _this.GetLevelName = function () {
                return "Haunted Hall!";
            };
            _this.GetBackgroundAsset = function () {
                return "level_03_house";
            };
            _this.GetBackgroundShadowAsset = function () {
                return "level_03_shadow";
            };
            _this.CreateScenery = function () {
                var wall_l = new objects.EmptyGameObject(_this.assetManager, "wall_l", 1, 600);
                wall_l.x = 220;
                wall_l.y = 10;
                _this.addChild(wall_l);
                var wall_r_1 = new objects.EmptyGameObject(_this.assetManager, "wall_r", 1, 50);
                wall_r_1.x = 970;
                wall_r_1.y = 10;
                _this.addChild(wall_r_1);
                var wall_r_2 = new objects.EmptyGameObject(_this.assetManager, "wall_r", 1, 170);
                wall_r_2.x = 840;
                wall_r_2.y = 125;
                _this.addChild(wall_r_2);
                var wall_r_3 = new objects.EmptyGameObject(_this.assetManager, "wall_r", 1, 200);
                wall_r_3.x = 840;
                wall_r_3.y = 375;
                _this.addChild(wall_r_3);
                var wall_r = new objects.EmptyGameObject(_this.assetManager, "wall_r", 55, 212);
                wall_r.x = 845;
                wall_r.y = 87;
                _this.addChild(wall_r);
                var wall_r_4 = new objects.EmptyGameObject(_this.assetManager, "wall_r", 1, 50);
                wall_r_4.x = 970;
                wall_r_4.y = 330;
                _this.addChild(wall_r_4);
                _this.gameSceneryStaticObjects.push(wall_l);
                _this.gameSceneryStaticObjects.push(wall_r);
                _this.gameSceneryStaticObjects.push(wall_r_3);
                _this.gameSceneryStaticObjects.push(wall_r_2);
                _this.gameSceneryStaticObjects.push(wall_r_1);
                _this.gameSceneryStaticObjects.push(wall_r_4);
                _this.CreateFloors();
                _this.CreatePlatformsStairs();
                _this.CreateObjects();
            };
            //this.currentLevel = config.Scene.INGAME_3;
            _this.Start();
            return _this;
        }
        StageThree.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.FINISH;
        };
        StageThree.prototype.CheckDead = function () {
            if (!this.player1.isDead && !this.player2.isDead) {
                if (this.player1.y < 0 || this.player1.y > 520) {
                    this.removeChild(this.player1);
                    this.player1.isDead = true;
                    this.GoDie();
                }
                if (this.player2.y < 0 || this.player2.y > 520) {
                    this.removeChild(this.player2);
                    this.player2.isDead = true;
                    this.GoDie();
                }
            }
        };
        StageThree.prototype.Start = function () {
            //objects.Game.isDebug = true;
            _super.prototype.Start.call(this);
            if (objects.Game.isPlayingMusic == false) {
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic = true;
            }
            this.Main();
        };
        StageThree.prototype.Update = function () {
            _super.prototype.Update.call(this);
            this.CheckDead();
        };
        StageThree.prototype.Main = function () {
            _super.prototype.Main.call(this);
        };
        StageThree.prototype.CreateObjectsBasement = function () {
        };
        StageThree.prototype.CreateObjectsFloorOneAndTwo = function () {
            var _this = this;
            var objectsFloorOneAndTwo = new Array();
            objectsFloorOneAndTwo.push(this.player2);
            var floor_1_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_1_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_1_Crate.x, floor_1_Crate.y, floor_1_Crate.width, floor_1_Crate.height);
            this.addChild(floor_1_Crate);
            floor_1_Crate.x = 555;
            floor_1_Crate.y = 390;
            this.gameSceneryDynamicObjects.push(floor_1_Crate);
            objectsFloorOneAndTwo.push(floor_1_Crate);
            var floor_1_Key = new objects.Key(this.assetManager, "key_red");
            floor_1_Key.keyCode = 2;
            this.addChild(floor_1_Key);
            floor_1_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Key);
            objectsFloorOneAndTwo.push(floor_1_Key);
            var floor_1_Treasure = new objects.HandableObject(this.assetManager, "sack", 1000);
            this.addChild(floor_1_Treasure);
            floor_1_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Treasure);
            objectsFloorOneAndTwo.push(floor_1_Treasure);
            var floor_1_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_1_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_1_Desk.x, floor_1_Desk.y, floor_1_Desk.width, floor_1_Desk.height);
            this.addChild(floor_1_Desk);
            floor_1_Desk.gravityFactor = -1;
            floor_1_Desk.x = 425;
            floor_1_Desk.y = 280;
            this.gameSceneryDynamicObjects.push(floor_1_Desk);
            //floor_1_Key.isGravityAffected = false;
            //floor_1_Desk.objectInside.push(floor_1_Key);
            objectsFloorOneAndTwo.push(floor_1_Desk);
            var floor_2_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_2_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_2_Desk.x, floor_2_Desk.y, floor_2_Desk.width, floor_2_Desk.height);
            floor_2_Desk.gravityFactor = -1;
            this.addChild(floor_2_Desk);
            floor_2_Desk.x = 615;
            floor_2_Desk.y = 280;
            this.gameSceneryDynamicObjects.push(floor_2_Desk);
            //floor_1_Key.isGravityAffected = false;
            //floor_2_Desk.objectInside.push(floor_1_Treasure);
            objectsFloorOneAndTwo.push(floor_2_Desk);
            var floor_3_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk.x, floor_3_Desk.y, floor_3_Desk.width, floor_3_Desk.height);
            this.addChild(floor_3_Desk);
            floor_3_Desk.x = 425;
            floor_3_Desk.y = 280;
            this.gameSceneryDynamicObjects.push(floor_3_Desk);
            floor_1_Key.isGravityAffected = false;
            floor_3_Desk.objectInside.push(floor_1_Key);
            objectsFloorOneAndTwo.push(floor_3_Desk);
            var floor_4_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_4_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_4_Desk.x, floor_4_Desk.y, floor_4_Desk.width, floor_4_Desk.height);
            this.addChild(floor_4_Desk);
            floor_4_Desk.x = 615;
            floor_4_Desk.y = 280;
            this.gameSceneryDynamicObjects.push(floor_4_Desk);
            floor_1_Key.isGravityAffected = false;
            floor_4_Desk.objectInside.push(floor_1_Treasure);
            objectsFloorOneAndTwo.push(floor_4_Desk);
            var floor_2_Door = new objects.Door(this.assetManager, true);
            floor_2_Door.isLocked = true;
            floor_2_Door.boxCollider = new objects.BoxCollider(0, 0, floor_2_Door.x, floor_2_Door.y, floor_2_Door.width, floor_2_Door.height);
            floor_2_Door.AddEnterDoorAction(function () { return _this.timer; }, this.GoToNextLevel, this.RemovePlayer);
            this.addChild(floor_2_Door);
            floor_2_Door.gravityFactor = -1;
            floor_2_Door.x = 280;
            floor_2_Door.y = 380;
            this.gameSceneryDynamicObjects.push(floor_2_Door);
            objectsFloorOneAndTwo.forEach(function (obj) {
                obj.gravityFactor = obj.gravityFactor;
            });
            var lever = new objects.Lever(this.assetManager);
            lever.x = 240;
            lever.y = 420;
            this.addChild(lever);
            this.gameSceneryDynamicObjects.push(lever);
            lever.DoAction = function (activated) {
                objectsFloorOneAndTwo.forEach(function (obj) {
                    obj.gravityFactor = 0 - obj.gravityFactor;
                });
                if (activated) {
                    _this.StartCountdown(3, function () { lever.Action(); });
                }
            };
            var key_hole = new objects.KeyHole(this.assetManager, "key_hole_blue_on", "key_hole_blue_off");
            key_hole.keyCode = 1;
            key_hole.x = 320;
            key_hole.y = 395;
            key_hole.gravityFactor = -1;
            this.addChild(key_hole);
            this.gameSceneryDynamicObjects.push(key_hole);
            key_hole.DoAction = function (activated) {
                floor_2_Door.isLocked = false;
                //removing the key does not closes the door                
                if (activated) {
                }
                else {
                }
            };
        };
        //upside down
        StageThree.prototype.CreateObjectsFloorThreeAndFour = function () {
            var _this = this;
            var objectsFloorThreeAndFour = new Array();
            objectsFloorThreeAndFour.push(this.player1);
            var floor_3_Treasure = new objects.HandableObject(this.assetManager, "sack", 1000);
            this.addChild(floor_3_Treasure);
            floor_3_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Treasure);
            objectsFloorThreeAndFour.push(floor_3_Treasure);
            var floor_3_Key = new objects.Key(this.assetManager, "key_blue");
            floor_3_Key.keyCode = 1;
            this.addChild(floor_3_Key);
            floor_3_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Key);
            objectsFloorThreeAndFour.push(floor_3_Key);
            var floor_3_Desk_4 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_4.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_4.x, floor_3_Desk_4.y, floor_3_Desk_4.width, floor_3_Desk_4.height);
            this.addChild(floor_3_Desk_4);
            floor_3_Desk_4.gravityFactor = -1;
            floor_3_Desk_4.x = 425;
            floor_3_Desk_4.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_4);
            //floor_3_Treasure.isGravityAffected = false;
            //floor_3_Desk_4.objectInside.push(floor_3_Treasure);
            objectsFloorThreeAndFour.push(floor_3_Desk_4);
            var floor_3_Desk_2 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_2.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_2.x, floor_3_Desk_2.y, floor_3_Desk_2.width, floor_3_Desk_2.height);
            this.addChild(floor_3_Desk_2);
            floor_3_Desk_2.x = 425;
            floor_3_Desk_2.y = 140;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_2);
            //floor_3_Key.isGravityAffected = false;
            //floor_3_Desk_2.objectInside.push(floor_3_Key);
            objectsFloorThreeAndFour.push(floor_3_Desk_2);
            var floor_3_Desk_3 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_3.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_3.x, floor_3_Desk_3.y, floor_3_Desk_3.width, floor_3_Desk_3.height);
            this.addChild(floor_3_Desk_3);
            floor_3_Desk_3.gravityFactor = -1;
            floor_3_Desk_3.x = 615;
            floor_3_Desk_3.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_3);
            floor_3_Key.isGravityAffected = false;
            floor_3_Desk_3.objectInside.push(floor_3_Key);
            objectsFloorThreeAndFour.push(floor_3_Desk_3);
            var floor_3_Desk_1 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_1.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_1.x, floor_3_Desk_1.y, floor_3_Desk_1.width, floor_3_Desk_1.height);
            this.addChild(floor_3_Desk_1);
            floor_3_Desk_1.x = 615;
            floor_3_Desk_1.y = 140;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_1);
            floor_3_Treasure.isGravityAffected = false;
            floor_3_Desk_1.objectInside.push(floor_3_Treasure);
            objectsFloorThreeAndFour.push(floor_3_Desk_1);
            var floor_4_Door = new objects.Door(this.assetManager, true);
            floor_4_Door.isLocked = true;
            floor_4_Door.boxCollider = new objects.BoxCollider(0, 0, floor_4_Door.x, floor_4_Door.y, floor_4_Door.width, floor_4_Door.height + 5);
            floor_4_Door.AddEnterDoorAction(function () { return _this.timer; }, this.GoToNextLevel, this.RemovePlayer);
            this.addChild(floor_4_Door);
            floor_4_Door.x = 770;
            floor_4_Door.y = 190;
            this.gameSceneryDynamicObjects.push(floor_4_Door);
            var floor_3_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_3_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_3_Crate.x, floor_3_Crate.y, floor_3_Crate.width, floor_3_Crate.height);
            this.addChild(floor_3_Crate);
            floor_3_Crate.x = 435;
            floor_3_Crate.y = 50;
            this.gameSceneryDynamicObjects.push(floor_3_Crate);
            objectsFloorThreeAndFour.push(floor_3_Crate);
            objectsFloorThreeAndFour.forEach(function (obj) {
                obj.gravityFactor = 0 - obj.gravityFactor;
            });
            var lever = new objects.Lever(this.assetManager);
            lever.x = 810;
            lever.y = 150;
            this.addChild(lever);
            this.gameSceneryDynamicObjects.push(lever);
            lever.DoAction = function (activated) {
                objectsFloorThreeAndFour.forEach(function (obj) {
                    obj.gravityFactor = 0 - obj.gravityFactor;
                });
                if (activated) {
                    _this.StartCountdown(3, function () { lever.Action(); });
                }
            };
            var key_hole = new objects.KeyHole(this.assetManager, "key_hole_red_on", "key_hole_red_off");
            key_hole.x = 730;
            key_hole.y = 200;
            key_hole.keyCode = 2;
            this.addChild(key_hole);
            this.gameSceneryDynamicObjects.push(key_hole);
            key_hole.DoAction = function (activated) {
                floor_4_Door.isLocked = false;
                //removing the key does not closes the door   
                if (activated) {
                }
                else {
                }
            };
        };
        StageThree.prototype.CreateObjects = function () {
            this.CreateObjectsBasement();
            this.CreateObjectsFloorOneAndTwo();
            this.CreateObjectsFloorThreeAndFour();
        };
        StageThree.prototype.CreatePlatformsStairs = function () {
            var floor_4_stairs = new objects.EmptyGameObject(this.assetManager, "floor_3_stairs", 30, 1);
            this.addChild(floor_4_stairs);
            this.gameSceneryStaticObjects.push(floor_4_stairs);
            floor_4_stairs.x = 320;
            floor_4_stairs.y = 86;
            var floor_1_stairs = new objects.EmptyGameObject(this.assetManager, "floor_1_stairs", 30, 1);
            this.addChild(floor_1_stairs);
            this.gameSceneryStaticObjects.push(floor_1_stairs);
            floor_1_stairs.x = 706;
            floor_1_stairs.y = 414;
        };
        StageThree.prototype.CreateFloorFour = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_5 = new objects.EmptyGameObject(this.assetManager, "floor_5", 760, 1 + platform_offset);
            this.addChild(floor_5);
            this.gameSceneryStaticObjects.push(floor_5);
            floor_5.x = 220;
            floor_5.y = 8 + platform_offset;
            var floor_4_1 = new objects.EmptyGameObject(this.assetManager, "floor_4_1", 60, 1 + platform_offset);
            this.addChild(floor_4_1);
            this.gameSceneryStaticObjects.push(floor_4_1);
            floor_4_1.x = 220;
            floor_4_1.y = 117 + platform_offset;
            var floor_4_2 = new objects.EmptyGameObject(this.assetManager, "floor_4_2", 460, 1 + platform_offset);
            this.addChild(floor_4_2);
            this.gameSceneryStaticObjects.push(floor_4_2);
            floor_4_2.x = 380;
            floor_4_2.y = 117 + platform_offset;
        };
        StageThree.prototype.CreateFloorThree = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_3 = new objects.EmptyGameObject(this.assetManager, "floor_3", 620, 1 + platform_offset);
            this.addChild(floor_3);
            this.gameSceneryStaticObjects.push(floor_3);
            floor_3.x = 220;
            floor_3.y = 242 + platform_offset;
        };
        StageThree.prototype.CreateFloorTwo = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_2_1 = new objects.EmptyGameObject(this.assetManager, "floor_2_1", 200, 1 + platform_offset);
            this.addChild(floor_2_1);
            this.gameSceneryStaticObjects.push(floor_2_1);
            floor_2_1.x = 780;
            floor_2_1.y = 357 + platform_offset;
            var floor_2_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_2", 455, 1 + platform_offset);
            this.addChild(floor_2_2);
            this.gameSceneryStaticObjects.push(floor_2_2);
            floor_2_2.x = 220;
            floor_2_2.y = 357 + platform_offset;
        };
        StageThree.prototype.CreateFloorOne = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_1 = new objects.EmptyGameObject(this.assetManager, "floor_1", 620, 1 + platform_offset);
            this.addChild(floor_1);
            this.gameSceneryStaticObjects.push(floor_1);
            floor_1.x = 220;
            floor_1.y = 472 + platform_offset;
        };
        StageThree.prototype.CreateBasement = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_0 = new objects.EmptyGameObject(this.assetManager, "floor_0", 620, 1 + platform_offset);
            this.addChild(floor_0);
            this.gameSceneryStaticObjects.push(floor_0);
            floor_0.x = 220;
            floor_0.y = 580 + platform_offset;
        };
        StageThree.prototype.CreateFloors = function () {
            //Floors platforms
            this.CreateBasement();
            this.CreateFloorOne();
            this.CreateFloorTwo();
            this.CreateFloorThree();
            this.CreateFloorFour();
        };
        return StageThree;
    }(objects.Scene));
    scenes.StageThree = StageThree;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageThree.js.map