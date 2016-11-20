module objects {
    // OCEAN CLASS ++++++++++++++++++++++++++++++++++++

    export class Ocean extends objects.GameObject {
        // PRIVATE INSTANCE VARIABLES +++++++++++++++++
       public _scrollDown:number;
        // CONSTRUCTOR METHOD +++++++++++++++++++++++++
        constructor() {
            super("galaxy");
     
            this._scrollDown=0;
           this._speed.y = 5; //ocean speed
           this._reset(-960);
        }
        
        // PRIVATE METHODS ++++++++++++++++++++++++++++
        protected _checkBounds(value:number):void {
            // check to see if the top of the ocean 
            // is met the top of the scene
            
            if(this.y >= value) {
                this._reset(-960);
               this._scrollDown+=1;
            }
        }
        
        // reset the ocean offscreen
        protected _reset(value:number):void {
            this.y = value;
        }
        
        
        // PUBLIC METHODS ++++++++++++++++++++++++++++++
        public update():void {
            // scroll the ocean 5 px per frame
            this.y += this._speed.y;
            this._checkBounds(0);
        }
    }
}