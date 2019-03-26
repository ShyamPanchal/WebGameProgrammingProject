/// <reference path="_references.ts"/>
// IIFE - Immediate Invoked Fucntion Expression
/*
    Closure
    Calls an anonympous self-executing function
    Anything in braces is in a closure. Won't go to global namespace.
*/
(function() {
console.log('code ran');
    // Global Game Variables
    let canvas = document.getElementById("canvas");
    let stage: createjs.Stage;
    //let nextStage:createjs.Stage;

    let assetManager: createjs.LoadQueue;
    let assetManifest: any[];

    let currentScene: objects.Scene;
    let currentState: number;

    let player1TextureAtlasData: any;
    let player1TextureAtlas: createjs.SpriteSheet;

    let player2TextureAtlasData: any;
    let player2TextureAtlas: createjs.SpriteSheet;

    player1TextureAtlasData = {

        "images": [
            ""
        ],
        "frames": [
            [0, 0, 37, 57, 0, 0, 0],
            [38, 0, 307, 494, 0, 0, 0],
            [346, 0, 307, 494, 0, 0, 0],
            [654, 0, 308, 494, 0, 0, 0],
            [963, 0, 308, 494, 0, 0, 0],
            [1272, 0, 308, 493, 0, 0, 0],
            [1581, 0, 308, 493, 0, 0, 0],
            [0, 495, 308, 492, 0, 0, 0],
            [309, 495, 308, 492, 0, 0, 0],
            [618, 495, 309, 491, 0, 0, 0],
            [928, 495, 309, 491, 0, 0, 0],
            [1238, 495, 310, 491, 0, 0, 0],
            [1549, 495, 310, 494, 0, 0, 0],
            [0, 990, 316, 496, 0, 0, 0],
            [317, 990, 329, 488, 0, 0, 0],
            [647, 990, 332, 496, 0, 0, 0],
            [980, 990, 334, 482, 0, 0, 0],
            [1315, 990, 334, 482, 0, 0, 0],
            [1650, 990, 335, 496, 0, 0, 0],
            [0, 1487, 335, 499, 0, 0, 0],
            [336, 1487, 336, 487, 0, 0, 0],
            [673, 1487, 336, 482, 0, 0, 0],
            [1010, 1487, 336, 482, 0, 0, 0],
            [1347, 1487, 336, 487, 0, 0, 0],
            [1684, 1487, 336, 487, 0, 0, 0],
            [0, 1987, 337, 488, 0, 0, 0],
            [338, 1987, 340, 503, 0, 0, 0],
            [679, 1987, 341, 480, 0, 0, 0],
            [1021, 1987, 344, 471, 0, 0, 0],
            [1366, 1987, 345, 490, 0, 0, 0],
            [0, 2491, 346, 505, 0, 0, 0],
            [347, 2491, 347, 470, 0, 0, 0],
            [695, 2491, 348, 495, 0, 0, 0],
            [1044, 2491, 354, 480, 0, 0, 0],
            [1399, 2491, 363, 490, 0, 0, 0],
            [0, 2997, 365, 479, 0, 0, 0],
            [366, 2997, 402, 436, 0, 0, 0],
            [769, 2997, 407, 480, 0, 0, 0],
            [1177, 2997, 422, 351, 0, 0, 0],
            [1600, 2997, 434, 493, 0, 0, 0],
            [0, 3491, 468, 300, 0, 0, 0],
            [469, 3491, 480, 265, 0, 0, 0],
            [950, 3491, 498, 268, 0, 0, 0],
            [1449, 3491, 498, 268, 0, 0, 0],
            [0, 3792, 498, 268, 0, 0, 0],
            [499, 3792, 498, 268, 0, 0, 0]
        ],

        "animations": {
            "Idle":{
                "frames": [2, 4, 6, 8, 10, 11, 9, 7, 5, 3],
                "speed": 0.15
            },
            "Run":{
                "frames": [14, 30, 29, 37, 27, 26, 33, 35],
                "speed": 0.35
            },
            "Jump":{
                // , 21, 17, 18, 20, 23, 24
                "frames": [25, 19, 16, 22],
                "speed": 0.5
            },
            "Action":{
                "frames": [1, 12, 34, 39, 32, 15, 13],
                "speed": 0.5
            },
            "Dead":{
                "frames": [31, 28, 36, 38, 40, 41, 44, 42, 45, 43],
                "speed": 0.15
            }
        }
    };

    player2TextureAtlasData = {

        "images": [
            ""
        ],
        "frames": [
            [0, 0, 307, 494, 0, 0, 0],
            [308, 0, 307, 494, 0, 0, 0],
            [616, 0, 308, 494, 0, 0, 0],
            [925, 0, 308, 493, 0, 0, 0],
            [1234, 0, 308, 492, 0, 0, 0],
            [1543, 0, 308, 494, 0, 0, 0],
            [0, 495, 308, 493, 0, 0, 0],
            [309, 495, 308, 492, 0, 0, 0],
            [618, 495, 309, 491, 0, 0, 0],
            [928, 495, 309, 491, 0, 0, 0],
            [1238, 495, 310, 491, 0, 0, 0],
            [1549, 495, 310, 494, 0, 0, 0],
            [0, 990, 316, 496, 0, 0, 0],
            [317, 990, 329, 488, 0, 0, 0],
            [647, 990, 332, 496, 0, 0, 0],
            [980, 990, 334, 482, 0, 0, 0],
            [1315, 990, 334, 482, 0, 0, 0],
            [1650, 990, 335, 496, 0, 0, 0],
            [0, 1487, 335, 499, 0, 0, 0],
            [336, 1487, 336, 487, 0, 0, 0],
            [673, 1487, 336, 482, 0, 0, 0],
            [1010, 1487, 336, 482, 0, 0, 0],
            [1347, 1487, 336, 487, 0, 0, 0],
            [1684, 1487, 336, 487, 0, 0, 0],
            [0, 1987, 337, 488, 0, 0, 0],
            [338, 1987, 340, 503, 0, 0, 0],
            [679, 1987, 341, 480, 0, 0, 0],
            [1021, 1987, 344, 471, 0, 0, 0],
            [1366, 1987, 345, 490, 0, 0, 0],
            [0, 2491, 346, 505, 0, 0, 0],
            [347, 2491, 347, 470, 0, 0, 0],
            [695, 2491, 348, 495, 0, 0, 0],
            [1044, 2491, 354, 480, 0, 0, 0],
            [1399, 2491, 363, 490, 0, 0, 0],
            [0, 2997, 365, 479, 0, 0, 0],
            [366, 2997, 402, 436, 0, 0, 0],
            [769, 2997, 407, 480, 0, 0, 0],
            [1177, 2997, 422, 351, 0, 0, 0],
            [1600, 2997, 434, 493, 0, 0, 0],
            [0, 3491, 468, 300, 0, 0, 0],
            [469, 3491, 480, 265, 0, 0, 0],
            [950, 3491, 498, 268, 0, 0, 0],
            [1449, 3491, 498, 268, 0, 0, 0],
            [0, 3792, 498, 268, 0, 0, 0],
            [499, 3792, 498, 268, 0, 0, 0]
        ],
        "animations": {
            "Idle":{
                "frames": [1, 5, 6, 7, 9, 10, 8, 4, 3, 2],
                "speed": 0.15
            },
            "Run":{
                "frames": [13, 29, 28, 36, 26, 25, 32, 34],
                "speed": 0.35
            },
            "Jump":{
                // , 21, 17, 18, 20, 23, 24
                "frames": [24, 18, 16, 21],
                "speed": 0.5
            },
            "Action":{
                "frames": [0, 11, 33, 38, 31, 14, 12],
                "speed": 0.5
            },
            "Dead":{
                "frames": [30, 27, 35, 37, 39, 40, 43, 41, 44, 42],
                "speed": 0.15
            }
        },
    };



    assetManifest = [
        {id: "player1TextureAtlas", src:"./Assets/Sprites/player1Sprites.png"},
        {id: "player2TextureAtlas", src:"./Assets/Sprites/player2Sprites.png"},
        {id: "startButton", src:"../Assets/Sprites/buttonWood.png"},
        { id: "background", src: "../Assets/Background/mainMenu.jpg" },
        { id: "level_01", src: "../Assets/Background/level_01.png" },
        { id: "hdivider", src: "../Assets/Sprites/horizontalDivider.png" },
        { id: "player", src: "../Assets/Sprites/Player1/Idle.png" },
        { id: "ghost", src: "../Assets/Sprites/Ghost.png"},
        { id: "ghost2", src: "../Assets/Sprites/Ghost2.png"},
        { id: "level_01_house", src: "../Assets/Background/level_01_house.png" },
        { id: "level_01_shadow", src: "../Assets/Background/level_01_shadow.png" },
        { id: "level_02_house", src: "../Assets/Background/level_02_house.png" },
        { id: "level_02_shadow", src: "../Assets/Background/level_02_shadow.png" },
        { id: "level_02_shadow_1", src: "../Assets/Background/level_02_shadow_1.png" },
        { id: "level_02_efects", src: "../Assets/Background/level_02_efects.png" },
        { id: "level_03_house", src: "../Assets/Background/level_03_house.png" },
        { id: "level_03_shadow", src: "../Assets/Background/level_03_shadow.png" },
        { id: "empty", src: "../Assets/Background/empty.png" },
        { id: "player", src: "../Assets/Sprites/Player1/Idle.png" },
        { id: "crate", src: "../Assets/Sprites/Objects/crate.png" },
        { id: "opened_desk", src: "../Assets/Sprites/Objects/open_desk.png" },
        { id: "closed_desk", src: "../Assets/Sprites/Objects/closed_desk.png" },
        { id: "pauseBackground", src: "../Assets/Background/pause.png" },
        { id: "closed_door", src: "../Assets/Sprites/Objects/closed_door.png" },
        { id: "open_door", src: "../Assets/Sprites/Objects/open_door.png" },
        { id: "open_door_out", src: "../Assets/Sprites/Objects/open_door_out.png" },
        { id: "open_door_dark", src: "../Assets/Sprites/Objects/open_door_dark.png" },
        { id: "open_door_light", src: "../Assets/Sprites/Objects/open_door_light.png" },
        { id: "bkc_door", src: "../Assets/Sprites/Objects/bck_door.png" },
        { id: "speech_ballom", src: "../Assets/Sprites/Objects/speech_ballom_alpha.png" },
        { id: "globet", src: "../Assets/Sprites/Objects/Items/loot01goblet.png" },
        { id: "crystal", src: "../Assets/Sprites/Objects/Items/loot02crystal.png" },
        { id: "coins", src: "../Assets/Sprites/Objects/Items/loot04coins.png" },
        { id: "key", src: "../Assets/Sprites/Objects/Items/loot05key.png" },
        { id: "key_blue", src: "../Assets/Sprites/Objects/Items/key_blue.png" },
        { id: "key_red", src: "../Assets/Sprites/Objects/Items/key_red.png" },
        { id: "sack", src: "../Assets/Sprites/Objects/Items/loot07treasuresack.png" },
        { id: "inventory", src: "../Assets/Sprites/Objects/inventory.png" },
        { id: "p1", src: "../Assets/Sprites/Objects/p1.png" },
        { id: "p2", src: "../Assets/Sprites/Objects/p2.png" },
        { id: "p1_big", src: "../Assets/Sprites/Objects/p1_big.png" },
        { id: "p2_big", src: "../Assets/Sprites/Objects/p2_big.png" },
        { id: "hatch", src: "../Assets/Sprites/Objects/hatch.png" },
        { id: "lever_on", src: "../Assets/Sprites/Objects/operating_lever_on.png" },
        { id: "lever_off", src: "../Assets/Sprites/Objects/operating_lever_off.png" },
        { id: "key_hole_on", src: "../Assets/Sprites/Objects/key_hole_on.png" },
        { id: "key_hole_off", src: "../Assets/Sprites/Objects/key_hole_off.png" },
        { id: "key_hole_blue_on", src: "../Assets/Sprites/Objects/key_hole_blue_on.png" },
        { id: "key_hole_blue_off", src: "../Assets/Sprites/Objects/key_hole_blue.png" },
        { id: "key_hole_red_on", src: "../Assets/Sprites/Objects/key_hole_red_on.png" },
        { id: "key_hole_red_off", src: "../Assets/Sprites/Objects/key_hole_red.png" },
        { id: "play_music", src:"./Assets/Sound/spook.mp3"},
        {id: "coin_drop", src:"./Assets/Sound/Coin_Drop.mp3"},
        {id: "dying", src:"./Assets/Sound/Dying.mp3"},
        {id: "getting_attacked", src:"./Assets/Sound/getting_attacked.mp3"},
        {id: "ghost_wind", src:"./Assets/Sound/Ghost_wind.mp3"},
        {id: "gravity_sound", src:"./Assets/Sound/gravity_sound.mp3"},
        {id: "houl", src:"./Assets/Sound/houl.mp3"},
        {id: "metal_drop", src:"./Assets/Sound/Metal_Drop.mp3"},
        {id: "door", src:"./Assets/Sound/open_door.mp3"},
        {id: "open_drawer", src:"./Assets/Sound/open_drawer.mp3"},
        {id: "powerup", src:"./Assets/Sound/power_pickup.mp3"},
        {id: "casset", src:"./Assets/Sound/casset.mp3"},
        {id: "shell_fall", src:"./Assets/Sound/shell_fall.mp3"},
        {id: "stabbing", src:"./Assets/Sound/stabbing.mp3"},
        {id: "switch_light", src:"./Assets/Sound/switch_light.mp3"},
        {id: "TaDa", src:"./Assets/Sound/TaDa.mp3"},
        {id: "wrench_drop", src:"./Assets/Sound/Wrench_Drop.mp3"},
        {id: "zombie", src:"./Assets/Sound/zombie.mp3"},
        {id: "push", src:"./Assets/Sound/push.mp3"},
        { id: "controls", src: "../Assets/Images/Controls-preFinal.png" }                
    ];
    function Init():void {
        console.log("Initialization start");

        assetManager = new createjs.LoadQueue;
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }

    function Start():void {
        console.log("Starting Application...");

        player1TextureAtlasData.images = [assetManager.getResult("player1TextureAtlas")];
        player1TextureAtlas = new createjs.SpriteSheet(player1TextureAtlasData);

        player2TextureAtlasData.images = [assetManager.getResult("player2TextureAtlas")];
        player2TextureAtlas = new createjs.SpriteSheet(player2TextureAtlasData);

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);

        objects.Game.frameRate = 60;
        createjs.Ticker.framerate = objects.Game.frameRate; // 60 FPS
        createjs.Ticker.on("tick", Update);

        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.INGAME;
        currentState = config.Scene.INGAME;

        objects.Game.player1TextureAtlas = player1TextureAtlas;
        objects.Game.player2TextureAtlas = player2TextureAtlas;

        console.log(objects.Game.currentScene);
        Main();
    }

    function Update():void {
        if(currentState != objects.Game.currentScene) {
            //console.log(objects.Game.currentScene);
            Main();
        }
        currentScene.Update();
        //console.log(objects.Game.currentScene);
        stage.update();
    }

    function Main():void {
        switch(objects.Game.currentScene)
        {
            case config.Scene.START:
            stage.removeAllChildren();            
            currentScene = new scenes.StartScene(assetManager);
            stage.addChild(currentScene);
            break;

            case config.Scene.PROLOGUE:
            stage.removeAllChildren();
            currentScene = new scenes.Prologue(assetManager);
            stage.addChild(currentScene);
            break;

            case config.Scene.INGAME:
            stage.removeAllChildren();
            currentScene = new scenes.StageOne(assetManager);
            objects.Game.previousScene = config.Scene.INGAME;
            stage.addChild(currentScene);
            break;

            case config.Scene.INGAME_2:
            stage.removeAllChildren();
            currentScene = new scenes.StageTwo(assetManager);
            objects.Game.previousScene = config.Scene.INGAME_2; 
            stage.addChild(currentScene);
            break;

            case config.Scene.INGAME_3:
            stage.removeAllChildren();
            currentScene = new scenes.StageThree(assetManager);
            objects.Game.previousScene = config.Scene.INGAME_3;
            stage.addChild(currentScene);
            break;

            case config.Scene.REWARD:
            stage.removeAllChildren();
            currentScene = new scenes.SceneReward(assetManager);
            stage.addChild(currentScene);
            break;

            case config.Scene.FINISH:
            stage.removeAllChildren();
            currentScene = new scenes.EndScene(assetManager);
            stage.addChild(currentScene);
            break;
        }
        currentState = objects.Game.currentScene;
        stage.addChild(currentScene);
    }


    window.onload = Init;
})();
