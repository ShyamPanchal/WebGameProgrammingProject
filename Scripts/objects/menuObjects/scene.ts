module objects {
  export class Scene extends createjs.Container {
    public assetManager;
    public isPaused: boolean;
    public timer:number;

    constructor(assetManager: createjs.LoadQueue) {
      super();
      this.assetManager = assetManager;
    }

    public Start(): void {

    }

    public Update(): void {

    }

    public Main(): void {

    }

    public CheckPaused(): void {
      this.isPaused = objects.Game.keyboard.pause;
    }

    public StartCountdown(seconds, callback: () => any): void {
      var counter = seconds;

      var interval = setInterval(() => {
        //console.log(counter);
        counter--;

        if (counter < 0) {
          clearInterval(interval);
          callback();
          //console.log('Ding!');
        };
      }, 1000);
    };


    public StartCount(seconds, trial: () => any): void {
      var counter = seconds;

      var interval = setInterval(() => {
        //console.log(counter);
        counter--;

        if (counter < 0) {
          clearInterval(interval);
          trial();
          //console.log('Ding!');
        };
      }, 1000);
    };

  }
}