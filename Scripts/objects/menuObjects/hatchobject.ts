module objects{
    export class Hatch extends objects.ActionableObject {

        private activatedImage: any;
        private deactivatedImage: any;

        public hatch:objects.DynamicObject;

        public final:number = 0;
        public initial:number = 0;
        public velocity:number = 1;

        public blocked:boolean;
        public activated:boolean = false;

        constructor(assetManager: createjs.LoadQueue){
            super(assetManager, "lever_off");
            this.activatedImage = assetManager.getResult("lever_on");
            this.deactivatedImage = assetManager.getResult("lever_off");

            this.hatch = new DynamicObject(assetManager, "hatch");
            this.hatch.Move = ()=> {
                if (this.hatch.y != this.final) {
                    if (this.activated) {
                        this.hatch.y += this.velocity;
                    } else {
                        this.hatch.y -= this.velocity;
                    }
                }
            };
            this.isGravityAffected = false;
        }

        public SetDeactivated():void {
            this.activated = false;
            this.image = this.deactivatedImage;
            this.final = this.initial;
        }

        public SetActivated():void {
            this.activated = true;
            this.image = this.activatedImage;
            this.initial = this.final - 50;
        }

        public SetPosition (x:number, y:number):void {
            this.hatch.x = x;
            this.hatch.y = y;
            this.hatch.boxCollider = new objects.BoxCollider(0, this.hatch.halfH, this.hatch.x, this.hatch.y,
                this.hatch.width, this.hatch.halfH);
            
            this.x = x;
            this.y = y;

            this.initial = y;
            this.final = y;
        }

        public AddAsAChild(f: (gameObject:GameObject) => void) {
            f(this);
            f(this.hatch);
        }

        Update() {
            super.Update();
            this.hatch.Update();
        }

        public secondaryAction(): void {
        }

        public Action(): void {

            if(this.blocked){
                return;
            }

            console.log('action');
            this.activated = !this.activated;
            super.Action();
            this.hatch.Action();
            if (this.activated) {
                
                this.image = this.activatedImage;
                this.final = this.initial + 50;                
            } else {

                this.image = this.deactivatedImage;
                this.final = this.initial;
            }
            this.secondaryAction();
        }
    }    
}