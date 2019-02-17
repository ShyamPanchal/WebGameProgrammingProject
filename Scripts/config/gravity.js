var config;
(function (config) {
    var Gravity = /** @class */ (function () {
        function Gravity() {
        }
        // Gravity constant (1/60)*(-9.8)
        Gravity.gravityForce = -0.163;
        //60 (size of character) divided by 3 (scale for 1 meter )
        Gravity.gravitySpeed = -0.163 * 20;
        return Gravity;
    }());
    config.Gravity = Gravity;
})(config || (config = {}));
//# sourceMappingURL=gravity.js.map