module objects
{
    export class Game
    {
        public static stage: createjs.Stage;
        public static assetManager: createjs.LoadQueue;
        public static currentScene: number;
        public static keyboard: managers.Keyboard;
        public static isDebug: boolean;
        public static frameRate: number;
        public static currentSceneObject: objects.Scene;
        public static player1TextureAtlas: createjs.SpriteSheet;
        public static player2TextureAtlas: createjs.SpriteSheet;

        public static stageTimer: number = 180; // in seconds || 3 minutes
    }
}
