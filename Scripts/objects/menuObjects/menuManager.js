var objects;
(function (objects) {
    var Game = /** @class */ (function () {
        function Game() {
        }
        Game.stageTimer = 180; // in seconds || 3 minutes
        Game.scoreP1 = 0;
        Game.scoreP2 = 0;
        Game.skip = false;
        Game.isPlayingMusic = false;
        Game.playerDead = false;
        Game.easyMode = false;
        return Game;
    }());
    objects.Game = Game;
})(objects || (objects = {}));
//# sourceMappingURL=menuManager.js.map