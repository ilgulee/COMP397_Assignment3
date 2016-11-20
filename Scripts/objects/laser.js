var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var objects;
(function (objects) {
    var Laser = (function (_super) {
        __extends(Laser, _super);
        function Laser() {
            _super.call(this, "laser");
            this._speed.y = -15;
            this._reset(this._bottomBounds);
        }
        Laser.prototype.start = function () {
        };
        Laser.prototype._checkBounds = function (value) {
            // check to see if the top of the cloud 
            // is outside the viewport         
            if (this.y <= value) {
                this._reset(this._topBounds);
            }
        };
        Laser.prototype._reset = function (value) {
            this.y = value;
        };
        Laser.prototype.update = function () {
            _super.prototype.update.call(this);
            this.y += this._speed.y;
            this._checkBounds(this._topBounds);
        };
        return Laser;
    }(objects.SpriteGameObject));
    objects.Laser = Laser;
})(objects || (objects = {}));
//# sourceMappingURL=laser.js.map