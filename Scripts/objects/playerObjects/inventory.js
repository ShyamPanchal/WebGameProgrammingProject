<<<<<<< Updated upstream
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
    var Inventory = /** @class */ (function (_super) {
        __extends(Inventory, _super);
        function Inventory(assetManager) {
            var _this = _super.call(this, assetManager, "inventory") || this;
            _this.objects = new Array();
            _this.alpha = 0.7;
            return _this;
        }
        Inventory.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        Inventory.prototype.AddItem = function (item) {
            this.objects.push(item);
            item.x = this.x + this.halfW;
            item.y = this.y + this.halfH;
            item.isGravityAffected = false;
            //no more item to be actioned 
            this.player.actionObject = null;
        };
        Inventory.prototype.RemoveItem = function () {
            if (this.player != null) {
                var item = this.objects.pop();
                if (item != null) { //if has one item at least
                    this.Drop(item);
                    return item;
                }
            }
        };
        Inventory.prototype.DropItem = function () {
            return this.RemoveItem();
        };
        Inventory.prototype.Drop = function (item) {
            item.x = this.player.x;
            //place it above the player
            item.y = this.player.y - (this.player.halfH) * this.player.GetGravityFactor();
            //make sure that the x is next to the player;
            this.player.actionObject = item;
            item.isGravityAffected = true;
            console.log('inventory.drop: ' + item.name);
        };
        Inventory.prototype.CheckKey = function (code) {
            var hasKey = false;
            this.objects.forEach(function (item) {
                if (item instanceof objects.Key) {
                    if (code == item.keyCode) {
                        hasKey = true;
                        return;
                    }
                }
            });
            return hasKey;
        };
        Inventory.prototype.UseKeyTemporary = function () {
            //TODO the key must be the last item to be catched (making the use hard to the player)
            var hasKey = false;
            var p = -1;
            var position = -1;
            this.objects.forEach(function (item) {
                p++;
                if (item instanceof objects.Key) {
                    position = p;
                    hasKey = true;
                    return;
                }
            });
            if (hasKey) {
                this.objects[position].x = 1500;
                var key = this.objects[position];
                this.objects[position] = null;
                return key;
            }
            return null;
        };
        Inventory.prototype.UseKey = function () {
            //TODO the key must be the last item to be catched (making the use hard to the player)
            var hasKey = false;
            var p = -1;
            var position = -1;
            this.objects.forEach(function (item) {
                p++;
                if (item instanceof objects.Key) {
                    position = p;
                    hasKey = true;
                    return;
                }
            });
            if (hasKey) {
                this.objects[position].x = 1500;
                this.objects[position] = null;
            }
            return hasKey;
        };
        Inventory.prototype.GetItems = function () {
            return this.objects;
        };
        return Inventory;
    }(objects.GameObject));
    objects.Inventory = Inventory;
})(objects || (objects = {}));
=======
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
    var Inventory = /** @class */ (function (_super) {
        __extends(Inventory, _super);
        function Inventory(assetManager) {
            var _this = _super.call(this, assetManager, "inventory") || this;
            _this.objects = new Array();
            _this.alpha = 0.7;
            return _this;
        }
        Inventory.prototype.Update = function () {
            _super.prototype.Update.call(this);
        };
        Inventory.prototype.AddItem = function (item) {
            this.objects.push(item);
            item.x = this.x + this.halfW;
            item.y = this.y + this.halfH;
            item.isGravityAffected = false;
            //no more item to be actioned 
            this.player.actionObject = null;
        };
        Inventory.prototype.RemoveItem = function () {
            if (this.player != null) {
                var item = this.objects.pop();
                if (item != null) { //if has one item at least
                    this.Drop(item);
                    return item;
                }
            }
        };
        Inventory.prototype.DropItem = function () {
            return this.RemoveItem();
        };
        Inventory.prototype.Drop = function (item) {
            item.x = this.player.x + (this.player.isLeft ? -30 : 30);
            //place it above the player
            item.y = this.player.y - (this.player.halfH) * this.player.GetGravityFactor();
            //make sure that the x is next to the player;
            this.player.actionObject = item;
            item.isGravityAffected = true;
            console.log('inventory.drop: ' + item.name);
        };
        Inventory.prototype.CheckKey = function (code) {
            var hasKey = false;
            this.objects.forEach(function (item) {
                if (item instanceof objects.Key) {
                    if (code == item.keyCode) {
                        hasKey = true;
                        return;
                    }
                }
            });
            return hasKey;
        };
        Inventory.prototype.UseKeyTemporary = function () {
            //TODO the key must be the last item to be catched (making the use hard to the player)
            var hasKey = false;
            var p = -1;
            var position = -1;
            this.objects.forEach(function (item) {
                p++;
                if (item instanceof objects.Key) {
                    position = p;
                    hasKey = true;
                    return;
                }
            });
            if (hasKey) {
                this.objects[position].x = 1500;
                var key = this.objects[position];
                this.objects[position] = null;
                return key;
            }
            return null;
        };
        Inventory.prototype.UseKey = function () {
            //TODO the key must be the last item to be catched (making the use hard to the player)
            var hasKey = false;
            var p = -1;
            var position = -1;
            this.objects.forEach(function (item) {
                p++;
                if (item instanceof objects.Key) {
                    position = p;
                    hasKey = true;
                    return;
                }
            });
            if (hasKey) {
                this.objects[position].x = 1500;
                this.objects[position] = null;
            }
            return hasKey;
        };
        Inventory.prototype.GetItems = function () {
            return this.objects;
        };
        return Inventory;
    }(objects.GameObject));
    objects.Inventory = Inventory;
})(objects || (objects = {}));
>>>>>>> Stashed changes
//# sourceMappingURL=inventory.js.map