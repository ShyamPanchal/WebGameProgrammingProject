/// <reference path="_references.ts"/>
// IIFE - Immediate Invoked Fucntion Expression
/*
    Closure
    Calls an anonympous self-executing function
    Anything in braces is in a closure. Won't go to global namespace.
*/
(function () {
    console.log('code ran');
    // Global Game Variables
    var canvas = document.getElementById("canvas");
    var stage;
    //let nextStage:createjs.Stage;
    var assetManager;
    var assetManifest;
    var currentScene;
    var currentState;
    assetManifest = [
        { id: "startButton", src: "../Assets/Sprites/buttonWood.png" },
        { id: "background", src: "../Assets/Background/mainMenu.jpg" },
        { id: "level_01", src: "../Assets/Background/level_01.png" },
        { id: "hdivider", src: "../Assets/Sprites/horizontalDivider.png" },
        { id: "player", src: "../Assets/Sprites/Player1/Idle.png" },
        { id: "ghost", src: "../Assets/Sprites/Ghost.png" },
        { id: "level_01_house", src: "../Assets/Background/level_01_house.png" },
        { id: "level_01_shadow", src: "../Assets/Background/level_01_shadow.png" },
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
        { id: "bkc_door", src: "../Assets/Sprites/Objects/bck_door.png" },
        { id: "speech_ballom", src: "../Assets/Sprites/Objects/speech_ballom_alpha.png" },
        { id: "globet", src: "../Assets/Sprites/Objects/Items/loot01goblet.png" },
        { id: "crystal", src: "../Assets/Sprites/Objects/Items/loot02crystal.png" },
        { id: "coins", src: "../Assets/Sprites/Objects/Items/loot04coins.png" },
        { id: "key", src: "../Assets/Sprites/Objects/Items/loot05key.png" },
        { id: "sack", src: "../Assets/Sprites/Objects/Items/loot07treasuresack.png" },
        { id: "inventory", src: "../Assets/Sprites/Objects/inventory.png" },
        { id: "p1", src: "../Assets/Sprites/Objects/p1.png" },
        { id: "p2", src: "../Assets/Sprites/Objects/p2.png" },
        { id: "p1_big", src: "../Assets/Sprites/Objects/p1_big.png" },
        { id: "p2_big", src: "../Assets/Sprites/Objects/p2_big.png" }
    ];
    function Init() {
        console.log("Initialization start");
        assetManager = new createjs.LoadQueue;
        assetManager.installPlugin(createjs.Sound);
        assetManager.loadManifest(assetManifest);
        assetManager.on("complete", Start, this);
    }
    function Start() {
        console.log("Starting Application...");
        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        objects.Game.frameRate = 60;
        createjs.Ticker.framerate = objects.Game.frameRate; // 60 FPS
        createjs.Ticker.on("tick", Update);
        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
        console.log(objects.Game.currentScene);
        Main();
    }
    function Update() {
        if (currentState != objects.Game.currentScene) {
            //console.log(objects.Game.currentScene);
            Main();
        }
        currentScene.Update();
        //console.log(objects.Game.currentScene);
        stage.update();
    }
    function Main() {
        switch (objects.Game.currentScene) {
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
//# sourceMappingURL=game.js.map