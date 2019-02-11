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

    assetManifest = [
        {id: "startButton", src:"../Assets/Sprites/buttonWood.png"},
        { id: "background", src: "../Assets/Background/mainMenu.jpg" },
        { id: "level_01", src: "../Assets/Background/level_01.png" },
        { id: "hdivider", src: "../Assets/Sprites/horizontalDivider.png" },

        { id: "player", src: "../Assets/Sprites/Player1/Idle.png" }

        { id: "ghost", src: "../Assets/Sprites/Ghost.png"}
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

        // Initialize CreateJS
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60; // 60 FPS
        createjs.Ticker.on("tick", Update);

        objects.Game.stage = stage;
        objects.Game.currentScene = config.Scene.START;
        currentState = config.Scene.START;
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
            case config.Scene.INGAME:
            stage.removeAllChildren();
            currentScene = new scenes.StageOne(assetManager);
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
