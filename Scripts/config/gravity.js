var config;
(function (config) {
    var Gravity = /** @class */ (function () {
        function Gravity() {
        }
        // Gravity constant (1/60)*(-9.8)
        Gravity.gravity = -0.163;
        return Gravity;
    }());
    config.Gravity = Gravity;
})(config || (config = {}));
//# sourceMappingURL=gravity.js.map