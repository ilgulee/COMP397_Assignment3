var managers;
(function (managers) {
    // COLLISION MANAGER CLASS
    var Collision = (function () {
        function Collision(player) {
            this._player = player;
        }
        Collision.prototype.distance = function (startPoint, endPoint) {
            return Math.sqrt(Math.pow((endPoint.x - startPoint.x), 2) + Math.pow(endPoint.y - startPoint.y, 2));
        };
        Collision.prototype.laserBossCheck = function (laser, topBoss) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var object1HalfHeight = laser.height * 0.5;
            var object2HalfHeight = topBoss.height * 0.5;
            var minimumDistance = object1HalfHeight + object2HalfHeight;
            startPoint.x = laser.x;
            startPoint.y = laser.y;
            endPoint.x = topBoss.x;
            endPoint.y = topBoss.y;
            if (this.distance(startPoint, endPoint) < minimumDistance) {
                console.log("laser hits boss");
            }
        };
        Collision.prototype.check = function (object) {
            var startPoint = new createjs.Point();
            var endPoint = new createjs.Point();
            var playerHalfHeight = this._player.height * 0.5;
            var objectHalfHeight = object.height * 0.5;
            var minimumDistance = playerHalfHeight + objectHalfHeight;
            startPoint.x = this._player.x;
            startPoint.y = this._player.y;
            endPoint.x = object.centerX + object.x;
            endPoint.y = object.centerY + object.y;
            /* check if the distance between the player and
              the other object is less than the minimum distance */
            if (this.distance(startPoint, endPoint) < minimumDistance) {
                if (!object.isColliding) {
                    // check if it's an island hit
                    if (object.name === "island") {
                        createjs.Sound.play("yay");
                        scoreValue += 100; //award 100 points
                    }
                    if (object.name === "top") {
                        createjs.Sound.play("thunder");
                        livesValue = 0;
                        this._player.engineSound.stop();
                        scene = config.Scene.END;
                        changeScene();
                    }
                    // check if it's a cloud hit
                    if (object.name === "cloud") {
                        createjs.Sound.play("thunder");
                        livesValue--; // lose a life
                        // check if player has no more lives
                        if (livesValue <= 0) {
                            // turn off player engine
                            this._player.engineSound.stop();
                            // show the Game Over Screen
                            scene = config.Scene.END;
                            changeScene();
                        }
                    }
                    object.isColliding = true;
                }
            }
            else {
                object.isColliding = false;
            }
        };
        return Collision;
    }());
    managers.Collision = Collision;
})(managers || (managers = {}));
//# sourceMappingURL=collision.js.map