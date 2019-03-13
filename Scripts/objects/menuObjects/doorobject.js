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
    var Door = /** @class */ (function (_super) {
        __extends(Door, _super);
        function Door() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Door;
    }(objects.OpenableObject));
    objects.Door = Door;
})(objects || (objects = {}));
//# sourceMappingURL=doorobject.js.map