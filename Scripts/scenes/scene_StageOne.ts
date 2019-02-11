module scenes
{
    export class StageOne extends objects.Scene
    {
        private background: objects.Background;
        private title: objects.Label;
        private titleShadow: objects.Label;

        private backButton: objects.Button;
        private txtButton: objects.Label;

        private player: objects.Player;

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
            console.log("GAME SCENE(S)...");

            this.background = new objects.Background(this.assetManager, "level_01");

            this.txtButton = new objects.Label("Bypass!", "18px", "bold Cambay", "#ffffff");
            this.txtButton.x = 910;
            this.txtButton.y = 565;

            this.backButton = new objects.Button(this.assetManager, "startButton", 870, 550);
            this.title = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#960000", (1066 / 2), 600 / 8, true);
            this.title.alpha = 1;

            this.titleShadow = new objects.Label("Tutorial!", "bold 48px", "Cambay", "#843e3e", (1066 / 2) + 2, 600 / 8 + 2, true);
            this.titleShadow.alpha = 0.5;

            this.player = new objects.Player(this.assetManager);


            this.Main();
        }

        public Update():void
        {
            this.player.Update();
        }

        public Main():void
        {
            this.addChild(this.background);
            this.addChild(this.titleShadow);
            this.addChild(this.title);

            this.addChild(this.backButton);
            this.addChild(this.txtButton);

            this.addChild(this.player);

            this.backButton.on("click", this.fn_ButtonClick);

            var callback = () : void => {
                this.removeChild(this.title);
                this.removeChild(this.titleShadow);

            }

            this.StartCountdown(3, callback);
        }

    }
}
