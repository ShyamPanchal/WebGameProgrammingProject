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
    var StageTwo = /** @class */ (function (_super) {
        __extends(StageTwo, _super);
        function StageTwo(assetManager) {
            var _this = _super.call(this, assetManager) || this;
            _this.CreateEnemies = function () {
            };
            _this.GetPositionP1 = function () {
                return new math.Vec2(400, 60);
            };
            _this.GetPositionP2 = function () {
                return new math.Vec2(540, 490);
            };
            _this.GetLevelName = function () {
                return "Dangerous Mansion!";
            };
            _this.GetBackgroundAsset = function () {
                return "level_02_house";
            };
            _this.GetBackgroundShadowAsset = function () {
                return "level_02_shadow";
            };
            _this.CreateBackgroundEffects = function () {
                _this.addChild(_this.background_effects);
            };
            _this.lightsOn = false;
            _this.changedLight = true;
            _this.ChangeBackground = function () {
                if (_this.changedLight) {
                    if (_this.lightsOn) {
                        _this.removeChild(_this.background_shadow_1);
                        _this.addChild(_this.background_shadow);
                    }
                    else {
                        _this.removeChild(_this.background_shadow);
                        _this.addChild(_this.background_shadow_1);
                    }
                    _this.changedLight = false;
                }
            };
            _this.CreateScenery = function () {
                var wall_l = new objects.EmptyGameObject(_this.assetManager, "wall_l", 1, 600);
                wall_l.x = 220;
                wall_l.y = 10;
                _this.addChild(wall_l);
                var wall_r = new objects.EmptyGameObject(_this.assetManager, "wall_r", 1, 600);
                wall_r.x = 840;
                wall_r.y = 10;
                _this.addChild(wall_r);
                _this.gameSceneryStaticObjects.push(wall_l);
                _this.gameSceneryStaticObjects.push(wall_r);
                _this.CreateFloors();
                _this.CreatePlatformsStairs();
                _this.CreateObjects();
            };
            //this.currentLevel = config.Scene.INGAME_2;
            _this.Start();
            return _this;
        }
        StageTwo.prototype.fn_ButtonClick = function () {
            objects.Game.currentScene = config.Scene.FINISH;
        };
        StageTwo.prototype.Start = function () {
            _super.prototype.Start.call(this);
            if (objects.Game.isPlayingMusic == false) {
                this.backgroundMusic = createjs.Sound.play("play_music");
                this.backgroundMusic.loop = -1; // Looping forever
                this.backgroundMusic.volume = 0.3;
                objects.Game.isPlayingMusic = true;
            }
            this.background_effects = new objects.Background(this.assetManager, "level_02_efects");
            this.background_shadow_1 = new objects.Background(this.assetManager, "level_02_shadow_1");
            this.Main();
        };
        StageTwo.prototype.Update = function () {
            this.ChangeBackground();
            _super.prototype.Update.call(this);
        };
        StageTwo.prototype.Main = function () {
            _super.prototype.Main.call(this);
        };
        StageTwo.prototype.CreateObjectsBasement = function () {
            var basement_Crate = new objects.PushableObject(this.assetManager, "crate");
            basement_Crate.boxCollider = new objects.BoxCollider(0, 0, basement_Crate.x, basement_Crate.y, basement_Crate.width, basement_Crate.height - 5);
            this.addChild(basement_Crate);
            basement_Crate.x = 455;
            basement_Crate.y = 490;
            this.gameSceneryDynamicObjects.push(basement_Crate);
            var floor_1_Treasure = new objects.HandableObject(this.assetManager, "sack", 1000);
            this.addChild(floor_1_Treasure);
            floor_1_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Treasure);
            var floor_2_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_2_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_2_Desk.x, floor_2_Desk.y, floor_2_Desk.width, floor_2_Desk.height);
            this.addChild(floor_2_Desk);
            floor_2_Desk.x = 315;
            floor_2_Desk.y = 490;
            this.gameSceneryDynamicObjects.push(floor_2_Desk);
            floor_2_Desk.objectInside.push(floor_1_Treasure);
        };
        StageTwo.prototype.CreateObjectsFloorOne = function () {
            var floor_1_Crate = new objects.PushableObject(this.assetManager, "crate");
            floor_1_Crate.boxCollider = new objects.BoxCollider(0, 0, floor_1_Crate.x, floor_1_Crate.y, floor_1_Crate.width, floor_1_Crate.height - 5);
            this.addChild(floor_1_Crate);
            floor_1_Crate.x = 455;
            floor_1_Crate.y = 390;
            this.gameSceneryDynamicObjects.push(floor_1_Crate);
            /*
                        var floor_1_Key = new objects.Key(this.assetManager);
                        this.addChild(floor_1_Key);
                        floor_1_Key.x = 1500;
                        //floor_3_Key.y = 180;
                        this.gameSceneryDynamicObjects.push(floor_1_Key);
                        floor_1_Key.isGravityAffected = false;*/
            var floor_1_Treasure = new objects.HandableObject(this.assetManager, "globet", 1500);
            this.addChild(floor_1_Treasure);
            floor_1_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_1_Treasure);
            var floor_1_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_1_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_1_Desk.x, floor_1_Desk.y, floor_1_Desk.width, floor_1_Desk.height);
            this.addChild(floor_1_Desk);
            floor_1_Desk.x = 515;
            floor_1_Desk.y = 450;
            this.gameSceneryDynamicObjects.push(floor_1_Desk);
            floor_1_Desk.objectInside.push(floor_1_Treasure);
        };
        StageTwo.prototype.CreateObjectsFloorTwo = function () {
            var _this = this;
            var floor_2_Door = new objects.Door(this.assetManager, true);
            floor_2_Door.isLocked = true;
            floor_2_Door.boxCollider = new objects.BoxCollider(0, 0, floor_2_Door.x, floor_2_Door.y, floor_2_Door.width, floor_2_Door.height + 5);
            floor_2_Door.AddEnterDoorAction(function () { return _this.timer; }, this.GoToNextLevel, this.RemovePlayer);
            this.addChild(floor_2_Door);
            floor_2_Door.x = 240;
            floor_2_Door.y = 280;
            this.gameSceneryDynamicObjects.push(floor_2_Door);
            var floor_2_Treasure = new objects.HandableObject(this.assetManager, "coins", 500);
            this.addChild(floor_2_Treasure);
            floor_2_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_2_Treasure);
            var floor_2_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_2_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_2_Desk.x, floor_2_Desk.y, floor_2_Desk.width, floor_2_Desk.height);
            this.addChild(floor_2_Desk);
            floor_2_Desk.x = 715;
            floor_2_Desk.y = 280;
            this.gameSceneryDynamicObjects.push(floor_2_Desk);
            floor_2_Treasure.isGravityAffected = false;
            floor_2_Desk.objectInside.push(floor_2_Treasure);
        };
        StageTwo.prototype.CreateObjectsFloorThree = function () {
            var floor_3_Treasure_2 = new objects.HandableObject(this.assetManager, "globet", 1500);
            this.addChild(floor_3_Treasure_2);
            floor_3_Treasure_2.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Treasure_2);
            var floor_3_Treasure_1 = new objects.HandableObject(this.assetManager, "sack", 1000);
            this.addChild(floor_3_Treasure_1);
            floor_3_Treasure_1.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Treasure_1);
            var floor_3_Desk = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk.x, floor_3_Desk.y, floor_3_Desk.width, floor_3_Desk.height);
            this.addChild(floor_3_Desk);
            floor_3_Desk.x = 240;
            floor_3_Desk.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk);
            floor_3_Treasure_1.isGravityAffected = false;
            floor_3_Desk.objectInside.push(floor_3_Treasure_1);
            var floor_3_Desk_1 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_1.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_1.x, floor_3_Desk_1.y, floor_3_Desk_1.width, floor_3_Desk_1.height);
            this.addChild(floor_3_Desk_1);
            floor_3_Desk_1.x = 715;
            floor_3_Desk_1.y = 190;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_1);
            floor_3_Treasure_1.isGravityAffected = false;
            floor_3_Desk_1.objectInside.push(floor_3_Treasure_2);
        };
        StageTwo.prototype.CreateObjectsFloorFour = function () {
            var _this = this;
            var hatch = new objects.Hatch(this.assetManager);
            var addAsChild = function (gameObject) {
                _this.addChild(gameObject);
            };
            hatch.AddAsAChild(addAsChild);
            this.gameSceneryDynamicObjects.push(hatch);
            this.gameSceneryDynamicObjects.push(hatch.hatch);
            hatch.SetPosition(332, 126);
            hatch.x = 230;
            hatch.y = 80;
            hatch.blocked = true;
            //hatch.hatch.x = 220;
            //hatch.hatch.y = 138;
            var hatch2 = new objects.Hatch(this.assetManager);
            hatch2.velocity = 2;
            this.addChild(hatch2.hatch);
            hatch.secondaryAction = function () {
                hatch2.Action();
            };
            this.gameSceneryDynamicObjects.push(hatch2.hatch);
            hatch2.SetPosition(332, 354 + 50);
            hatch2.SetActivated();
            var key_hole_floor_2 = new objects.KeyHole(this.assetManager);
            key_hole_floor_2.x = 255;
            key_hole_floor_2.y = 80;
            this.addChild(key_hole_floor_2);
            this.gameSceneryDynamicObjects.push(key_hole_floor_2);
            key_hole_floor_2.DoAction = function (activated) {
                if (activated) {
                    hatch.blocked = false;
                }
                else {
                    hatch.SetDeactivated();
                    hatch.blocked = true;
                }
            };
            var lever_basement = new objects.Lever(this.assetManager);
            var lever_floor_2 = new objects.Lever(this.assetManager);
            lever_floor_2.x = 690;
            lever_floor_2.y = 425;
            lever_floor_2.blocked = true;
            this.addChild(lever_floor_2);
            this.gameSceneryDynamicObjects.push(lever_floor_2);
            lever_floor_2.DoAction = function (activated) {
                if (lever_basement.activated) {
                    if (activated) {
                        hatch.secondaryAction = function () {
                        };
                        hatch.blocked = false;
                        hatch.Action();
                        hatch.blocked = true;
                    }
                    else {
                        hatch.Action();
                    }
                }
            };
            var key_hole_1 = new objects.KeyHole(this.assetManager);
            key_hole_1.x = 715;
            key_hole_1.y = 425;
            this.addChild(key_hole_1);
            this.gameSceneryDynamicObjects.push(key_hole_1);
            key_hole_1.DoAction = function (activated) {
                if (activated) {
                    lever_floor_2.blocked = false;
                }
                else {
                    lever_floor_2.SetDeactivated();
                    lever_floor_2.blocked = true;
                    hatch.SetDeactivated();
                }
            };
            var floor_3_Key = new objects.Key(this.assetManager);
            this.addChild(floor_3_Key);
            floor_3_Key.x = 1500;
            //floor_3_Key.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Key);
            var floor_3_Desk_2 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_2.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_2.x, floor_3_Desk_2.y, floor_3_Desk_2.width, floor_3_Desk_2.height);
            this.addChild(floor_3_Desk_2);
            floor_3_Desk_2.x = 615;
            floor_3_Desk_2.y = 90;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_2);
            floor_3_Key.isGravityAffected = false;
            floor_3_Desk_2.objectInside.push(floor_3_Key);
            var floor_3_Treasure = new objects.HandableObject(this.assetManager, "coins", 500);
            this.addChild(floor_3_Treasure);
            floor_3_Treasure.x = 1570;
            //floor_3_Treasure.y = 180;
            this.gameSceneryDynamicObjects.push(floor_3_Treasure);
            var floor_3_Desk_1 = new objects.OpenableObject(this.assetManager, "closed_desk", "opened_desk");
            floor_3_Desk_1.boxCollider = new objects.BoxCollider(0, 0, floor_3_Desk_1.x, floor_3_Desk_1.y, floor_3_Desk_1.width, floor_3_Desk_1.height);
            this.addChild(floor_3_Desk_1);
            floor_3_Desk_1.x = 415;
            floor_3_Desk_1.y = 90;
            this.gameSceneryDynamicObjects.push(floor_3_Desk_1);
            floor_3_Desk_1.objectInside.push(floor_3_Treasure);
            var lever_basement = new objects.Lever(this.assetManager);
            lever_basement.x = 415;
            lever_basement.y = 522;
            this.addChild(lever_basement);
            this.gameSceneryDynamicObjects.push(lever_basement);
            lever_basement.DoAction = function (activated) {
                if (activated) {
                    _this.lightsOn = true;
                    if (lever_floor_2.activated) {
                        lever_floor_2.DoAction(true);
                    }
                    else {
                        _this.StartCountdown(3, function () { lever_basement.Action(); });
                    }
                }
                else {
                    _this.lightsOn = false;
                }
                _this.changedLight = true;
            };
        };
        StageTwo.prototype.CreateObjects = function () {
            this.CreateObjectsBasement();
            this.CreateObjectsFloorOne();
            this.CreateObjectsFloorTwo();
            this.CreateObjectsFloorThree();
            this.CreateObjectsFloorFour();
        };
        StageTwo.prototype.CreatePlatformsStairs = function () {
            var floor_2_2_stairs = new objects.Stair(this.assetManager, "floor_3_stairs", 90, 1);
            this.addChild(floor_2_2_stairs);
            this.gameSceneryStaticObjects.push(floor_2_2_stairs);
            floor_2_2_stairs.x = 500;
            floor_2_2_stairs.y = 304;
            var floor_2_stairs = new objects.Stair(this.assetManager, "floor_3_stairs", 100, 1);
            this.addChild(floor_2_stairs);
            this.gameSceneryStaticObjects.push(floor_2_stairs);
            floor_2_stairs.x = 490;
            floor_2_stairs.y = 334;
            var floor_0_1_stairs = new objects.Stair(this.assetManager, "floor_1_stairs", 50, 2);
            this.addChild(floor_0_1_stairs);
            this.gameSceneryStaticObjects.push(floor_0_1_stairs);
            floor_0_1_stairs.x = 440;
            floor_0_1_stairs.y = 282;
            var floor_1_1_stairs = new objects.Stair(this.assetManager, "floor_1_stairs", 50, 2);
            this.addChild(floor_1_1_stairs);
            this.gameSceneryStaticObjects.push(floor_1_1_stairs);
            floor_1_1_stairs.x = 606;
            floor_1_1_stairs.y = 282;
            var floor_1_stairs = new objects.Stair(this.assetManager, "floor_1_stairs", 30, 1);
            this.addChild(floor_1_stairs);
            this.gameSceneryStaticObjects.push(floor_1_stairs);
            floor_1_stairs.x = 226;
            floor_1_stairs.y = 534;
        };
        StageTwo.prototype.CreateFloorFour = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_5 = new objects.EmptyGameObject(this.assetManager, "floor_5", 620, 1 + platform_offset);
            this.addChild(floor_5);
            this.gameSceneryStaticObjects.push(floor_5);
            floor_5.x = 220;
            floor_5.y = 12 + platform_offset;
            var floor_4_2 = new objects.EmptyGameObject(this.assetManager, "floor_4_2", 115, 1 + platform_offset);
            this.addChild(floor_4_2);
            this.gameSceneryStaticObjects.push(floor_4_2);
            floor_4_2.x = 220;
            floor_4_2.y = 130 + platform_offset;
            var floor_4_1 = new objects.EmptyGameObject(this.assetManager, "floor_4_1", 20, 1 + platform_offset);
            this.addChild(floor_4_1);
            this.gameSceneryStaticObjects.push(floor_4_1);
            floor_4_1.x = 820;
            floor_4_1.y = 130 + platform_offset;
            var floor_4 = new objects.EmptyGameObject(this.assetManager, "floor_4_0", 422, 1 + platform_offset);
            this.addChild(floor_4);
            this.gameSceneryStaticObjects.push(floor_4);
            floor_4.x = 377;
            floor_4.y = 130 + platform_offset;
            var info = new objects.InformativePoint(this.assetManager);
            this.gameSceneryDynamicObjects.push(info);
            info.x = 780;
            info.y = 120;
        };
        StageTwo.prototype.CreateFloorThree = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_3_0 = new objects.EmptyGameObject(this.assetManager, "floor_3_0", 220, 1 + platform_offset);
            this.addChild(floor_3_0);
            this.gameSceneryStaticObjects.push(floor_3_0);
            floor_3_0.x = 220;
            floor_3_0.y = 242 + platform_offset;
            var floor_3 = new objects.EmptyGameObject(this.assetManager, "floor_3", 140, 1 + platform_offset);
            this.addChild(floor_3);
            this.gameSceneryStaticObjects.push(floor_3);
            floor_3.x = 660;
            floor_3.y = 242 + platform_offset;
            var floor_3_1 = new objects.EmptyGameObject(this.assetManager, "floor_3_1", 20, 1 + platform_offset);
            this.addChild(floor_3_1);
            this.gameSceneryStaticObjects.push(floor_3_1);
            floor_3_1.x = 820;
            floor_3_1.y = 242 + platform_offset;
        };
        StageTwo.prototype.CreateFloorTwo = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_2_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_2", 115, 1 + platform_offset);
            this.addChild(floor_2_2);
            this.gameSceneryStaticObjects.push(floor_2_2);
            floor_2_2.x = 220;
            floor_2_2.y = 357 + platform_offset;
            var floor_2_1 = new objects.EmptyGameObject(this.assetManager, "floor_2_1", 20, 1 + platform_offset);
            this.addChild(floor_2_1);
            this.gameSceneryStaticObjects.push(floor_2_1);
            floor_2_1.x = 820;
            floor_2_1.y = 357 + platform_offset;
            var floor_2 = new objects.EmptyGameObject(this.assetManager, "floor_2_0", 422, 1 + platform_offset);
            this.addChild(floor_2);
            this.gameSceneryStaticObjects.push(floor_2);
            floor_2.x = 377;
            floor_2.y = 357 + platform_offset;
        };
        StageTwo.prototype.CreateFloorOne = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_1_0 = new objects.EmptyGameObject(this.assetManager, "floor_1_0", 20, 1 + platform_offset);
            this.addChild(floor_1_0);
            this.gameSceneryStaticObjects.push(floor_1_0);
            floor_1_0.x = 220;
            floor_1_0.y = 472 + platform_offset;
            var floor_1 = new objects.EmptyGameObject(this.assetManager, "floor_1", 490, 1 + platform_offset);
            this.addChild(floor_1);
            this.gameSceneryStaticObjects.push(floor_1);
            floor_1.x = 310;
            floor_1.y = 472 + platform_offset;
            var floor_1_1 = new objects.EmptyGameObject(this.assetManager, "floor_1_1", 20, 1 + platform_offset);
            this.addChild(floor_1_1);
            this.gameSceneryStaticObjects.push(floor_1_1);
            floor_1_1.x = 820;
            floor_1_1.y = 472 + platform_offset;
        };
        StageTwo.prototype.CreateBasement = function (platform_offset) {
            if (platform_offset === void 0) { platform_offset = 8; }
            var floor_0_1 = new objects.EmptyGameObject(this.assetManager, "floor_0_1", 580, 1 + platform_offset);
            this.addChild(floor_0_1);
            this.gameSceneryStaticObjects.push(floor_0_1);
            floor_0_1.x = 220;
            floor_0_1.y = 580 + platform_offset;
            var floor_0 = new objects.EmptyGameObject(this.assetManager, "floor_0", 20, 1 + platform_offset);
            this.addChild(floor_0);
            this.gameSceneryStaticObjects.push(floor_0);
            floor_0.x = 820;
            floor_0.y = 580 + platform_offset;
        };
        StageTwo.prototype.CreateFloors = function () {
            //Floors platforms
            this.CreateBasement();
            this.CreateFloorOne();
            this.CreateFloorTwo();
            this.CreateFloorThree();
            this.CreateFloorFour();
        };
        return StageTwo;
    }(objects.Scene));
    scenes.StageTwo = StageTwo;
})(scenes || (scenes = {}));
//# sourceMappingURL=scene_StageTwo.js.map