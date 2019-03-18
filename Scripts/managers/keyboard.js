var managers;
(function (managers) {
    var Keyboard = /** @class */ (function () {
        // Constructor
        function Keyboard() {
            document.addEventListener("keydown", this.onKeyDown.bind(this), false);
            document.addEventListener("keyup", this.onKeyUp.bind(this), false);
        }
        // Methods
        Keyboard.prototype.onKeyDown = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
<<<<<<< HEAD
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
=======
                    this.player1MoveUp = true;
                    break;
                case config.Keys.UP_ARROW:
                    this.player2MoveUp = true;
                    break;
                case config.Keys.A:
                    this.player1MoveLeft = true;
                    break;
                case config.Keys.LEFT_ARROW:
                    this.player2MoveLeft = true;
                    break;
                case config.Keys.E:
                    this.player1Action = true;
                    break;
                case config.Keys.RIGHT_CTRL:
                    this.player2Action = true;
                    break;
                case config.Keys.D:
                    this.player1MoveRight = true;
                    break;
                case config.Keys.RIGHT_ARROW:
                    this.player2MoveRight = true;
>>>>>>> master
                    break;
                case config.Keys.ESCAPE:
                    //console.log("Pause!!");
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Keys.W:
<<<<<<< HEAD
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
=======
                    this.player1MoveUp = false;
                    break;
                case config.Keys.UP_ARROW:
                    this.player2MoveUp = false;
                    break;
                case config.Keys.A:
                    this.player1MoveLeft = false;
                    break;
                case config.Keys.LEFT_ARROW:
                    this.player2MoveLeft = false;
                    break;
                case config.Keys.E:
                    this.player1Action = false;
                    break;
                case config.Keys.RIGHT_CTRL:
                    this.player2Action = false;
                    break;
                case config.Keys.D:
                    this.player1MoveRight = false;
                    break;
                case config.Keys.RIGHT_ARROW:
                    this.player2MoveRight = false;
>>>>>>> master
                    break;
                case config.Keys.ESCAPE:
                    //  this.pause = false;
                    this.pause = !this.pause;
                    break;
            }
        };
        return Keyboard;
    }());
    managers.Keyboard = Keyboard;
})(managers || (managers = {}));
//# sourceMappingURL=keyboard.js.map