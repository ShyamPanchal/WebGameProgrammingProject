var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.stageTimer = 180; // in seconds || 3 minutes
        Game.scoreP1 = 0;
        Game.scoreP2 = 0;
        Game.skip = true;
        Game.isPlayingMusic = false;
        Game.playerDead = true;
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
//# sourceMappingURL=menuManager.js.map