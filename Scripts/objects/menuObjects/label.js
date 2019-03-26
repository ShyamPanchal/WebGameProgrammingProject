var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var objects;
(function (objects) {
    var Label = /** @class */ (function (_super) {
        __extends(Label, _super);
        function Label(labelString, fontSize, fontFamily, fontColour, x, y, isCentered) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            if (isCentered === void 0) { isCentered = false; }
            var _this = _super.call(this, labelString, fontSize + " " + fontFamily, fontColour) || this;
            if (isCentered) {
                _this.regX = _this.getMeasuredWidth() * 0.5;
                _this.regY = _this.getMeasuredHeight() * 0.5;
            }
            _this.is_paused = false;
            _this.x = x;
            _this.y = y;
            return _this;
        }
        /*
                public fn_TimerTicker(seconds): void {
                    timer = seconds;
        
                    var timeLimit = setInterval(function () {
                        if (!this.is_paused) {
                            timer--;
                            //console.log(timer);
                            if (timer <= 0) {
                                clearInterval(timeLimit);
                                objects.Game.currentScene = config.Scene.FINISH;
                            };
                        }
        
                    }, 1000)
                }
        */
        Label.prototype.fn_ChangeLabel = function (timer) {
            var minutes = Math.floor(timer / 60);
            if (minutes < 0)
                minutes = 0;
            var seconds = timer % 60;
            if (seconds < 10)
                return minutes + " : 0" + seconds;
            else
                return minutes + " : " + seconds;
        };
        return Label;
    }(createjs.Text));
    objects.Label = Label;
})(objects || (objects = {}));
//# sourceMappingURL=label.js.map