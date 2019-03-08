module managers {
    export class Keyboard {
        public moveUp: boolean;
        public moveLeft: boolean;
        public moveRight: boolean;
        public action: boolean;
        public enabled: boolean;
        public pause: boolean;

        // Constructor
        constructor() {
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        }

        // Methods
        public onKeyDown(event:KeyboardEvent):void {
            switch(event.keyCode) {
                case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveUp = true;
                break;
                case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = true;
                break;
                case config.Keys.E:
                case config.Keys.RIGHT_SHIFT:
                    this.action = true;
                break;
                case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = true;
                break;
                case config.Keys.ESCAPE:
                    //console.log("Pause!!");
                    
                break;
            }
        }

        public onKeyUp(event:KeyboardEvent):void {
            switch(event.keyCode) {
                case config.Keys.W:
                case config.Keys.UP_ARROW:
                    this.moveUp = false;
                break;
                case config.Keys.A:
                case config.Keys.LEFT_ARROW:
                    this.moveLeft = false;
                break;
                case config.Keys.E:
                case config.Keys.RIGHT_SHIFT:
                    this.action = false;
                break;
                case config.Keys.D:
                case config.Keys.RIGHT_ARROW:
                    this.moveRight = false;
                break;
                case config.Keys.ESCAPE:    
                    //  this.pause = false;
                    this.pause = !this.pause;
                break;
            }
        }
    }
}