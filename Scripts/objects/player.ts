module objects {
    // PLAYER CLASS ++++++++++++++++++++++++++++++
    export class Player extends objects.SpriteGameObject {
        // PRIVATE INSTANCE VARIABLES
        private _keyPressed : number;
        private _shots : objects.Laser[];

        private _timeBetweenShots : number = 1;
        private _timer : number = 0;
        //private _leftBounds: number;
        //private _rightBounds: number;

        // PUBLIC INSTANCE VARIABLES
        //public width: number;
        //public height: number;
        public engineSound: createjs.AbstractSoundInstance;
        constructor() {
            super("ship");
            this._shots=[];
            window.onkeydown=this._onKeyDown;
            window.onkeyup=this._onKeyUp;

            this.scaleX=0.2;
            this.scaleY=0.2;
            this.width = this.getBounds().width*0.2;
            this.height = this.getBounds().height*0.2;

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

        get getShots():objects.Laser[]{
            return this._shots;
        }

        // PRIVATE METHODS
        protected _checkBounds(): void {
            if (this.x < this._leftBounds) {
                this.x = this._leftBounds;
            }

            if (this.x > this._rightBounds) {
                this.x = this._rightBounds;
            }
        }


        // PUBLIC METHODS
        public update(): void {
            super.update();
            //
            this.x = stage.mouseX;
            
            this._checkBounds();
            //
            this._timer+=createjs.Ticker.interval;
            if(controls.SHOOT && this._timer > 100.0) {
                let newLaser = new objects.Laser();
                newLaser.x=this.x;
                
                //newLaser.setPosition(new objects.Vector2(this.position.x + 25, this.position.y - 18));
                currentScene.addChild(newLaser);
                this._shots.push(newLaser);

                this._timer = 0.0;
            }

            for (let laser of this._shots) {
                laser.update();
            }

            console.log(this._timer);
            //
           
        }
        private _onKeyDown(event : KeyboardEvent) {
            switch(event.keyCode) {
                case keys.SPACE:
                    controls.SHOOT = true;
                    break;
            }
        }
        private _onKeyUp(event : KeyboardEvent) {
             switch(event.keyCode) {
                case keys.SPACE:
                    controls.SHOOT = false;
                    break;
            }
        }
    }
}