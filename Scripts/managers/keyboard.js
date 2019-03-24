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
                case config.Keys.S:
                    this.player1MoveDown = true;
                    break;
                case config.Keys.DOWN_ARROW:
                    this.player2MoveDown = true;
                    break;
                case config.Keys.W:
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
                    break;
                case config.Keys.ESCAPE:
                    //console.log("Pause!!");
                    break;
            }
        };
        Keyboard.prototype.onKeyUp = function (event) {
            switch (event.keyCode) {
                case config.Keys.S:
                    this.player1MoveDown = false;
                    break;
                case config.Keys.DOWN_ARROW:
                    this.player2MoveDown = false;
                    break;
                case config.Keys.W:
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