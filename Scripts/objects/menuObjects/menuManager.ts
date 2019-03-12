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
        public static controlsImage: objects.UIHelper;

        public static stageTimer: number = 180; // in seconds || 3 minutes
        
    }
}