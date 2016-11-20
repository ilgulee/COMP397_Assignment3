var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    // PLAYER CLASS ++++++++++++++++++++++++++++++
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player() {
            _super.call(this, "ship");
            this._timeBetweenShots = 1;
            this._timer = 0;
            this._shots = [];
            window.onkeydown = this._onKeyDown;
            window.onkeyup = this._onKeyUp;
            this.scaleX = 0.2;
            this.scaleY = 0.2;
            this.width = this.getBounds().width * 0.2;
            this.height = this.getBounds().height * 0.2;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            this._leftBounds = this.width * 0.5;
            this._rightBounds = config.Screen.WIDTH - (this.width * 0.5);
            this.y = 430;
            // assign and play the engine sound
            this.engineSound = createjs.Sound.play("engine");
            // Loop engine sound forever
            this.engineSound.loop = -1;
        }
        Object.defineProperty(Player.prototype, "getShots", {
            get: function () {
                return this._shots;
            },
            enumerable: true,
            configurable: true
        });
        // PRIVATE METHODS
        Player.prototype._checkBounds = function () {
            if (this.x < this._leftBounds) {
                this.x = this._leftBounds;
            }
            if (this.x > this._rightBounds) {
                this.x = this._rightBounds;
            }
        };
        // PUBLIC METHODS
        Player.prototype.update = function () {
            _super.prototype.update.call(this);
            //
            this.x = stage.mouseX;
            this._checkBounds();
            //
            this._timer += createjs.Ticker.interval;
            if (controls.SHOOT && this._timer > 100.0) {
                var newLaser = new objects.Laser();
                newLaser.x = this.x;
                //newLaser.setPosition(new objects.Vector2(this.position.x + 25, this.position.y - 18));
                currentScene.addChild(newLaser);
                this._shots.push(newLaser);
                this._timer = 0.0;
            }
            for (var _i = 0, _a = this._shots; _i < _a.length; _i++) {
                var laser = _a[_i];
                laser.update();
            }
            console.log(this._timer);
            //
        };
        Player.prototype._onKeyDown = function (event) {
            switch (event.keyCode) {
                case keys.SPACE:
                    controls.SHOOT = true;
                    break;
            }
        };
        Player.prototype._onKeyUp = function (event) {
            switch (event.keyCode) {
                case keys.SPACE:
                    controls.SHOOT = false;
                    break;
            }
        };
        return Player;
    }(objects.SpriteGameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map