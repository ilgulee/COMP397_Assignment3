module objects{
    export class Laser extends objects.SpriteGameObject{
        
        constructor(){
            super("laser");
            this._speed.y=-15;
            this._reset(this._bottomBounds);
        }

        public start():void{

        }

        protected _checkBounds(value:number):void {
            // check to see if the top of the cloud 
            // is outside the viewport         
            if(this.y <= value) {
                this._reset(this._topBounds);
            }
        }
        protected _reset(value:number):void {
            this.y = value;
        }
        public update():void{
            super.update();
            this.y+=this._speed.y;  
            this._checkBounds(this._topBounds);          
        }
    }
}