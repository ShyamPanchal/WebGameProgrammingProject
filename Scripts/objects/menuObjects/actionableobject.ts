module objects{
    export class ActionableObject extends objects.DynamicObject {
        constructor(assetManager: createjs.LoadQueue, imageString: string){
            super(assetManager, imageString);            
        }
    }
    
    export class Lever extends objects.ActionableObject {
        private activatedImage: any;
        private deactivatedImage: any;
        public activated:boolean = false;
        public blocked:boolean = false;

        constructor(assetManager: createjs.LoadQueue){
            super(assetManager, "lever_off");
            this.activatedImage = assetManager.getResult("lever_on");
            this.deactivatedImage = assetManager.getResult("lever_off");
            this.isGravityAffected = false;
        }

        public SetActivated():void {
            this.image = this.activatedImage;
        }

        public SetDeactivated():void {
            this.image = this.deactivatedImage;
        }
        
        public DoAction(activated:boolean) {

        }

        public Action(): void {
            if (!this.blocked) {
                this.activated = !this.activated;
                super.Action();
                if (this.activated) {
                    this.image = this.activatedImage;
                } else {
                    this.image = this.deactivatedImage;
                }
                this.DoAction(this.activated);
            }
        }
    }

    export class KeyHole extends objects.ActionableObject {
        private usingKeyImage: any;
        private withoutKeyImage: any;
        public enabled:boolean = false;
        public key:Key[];
        public keyCode:number = 0;
        
        constructor(assetManager: createjs.LoadQueue, 
            imageOn:string = "key_hole_on", 
            imageOff:string = "key_hole_off"){

            super(assetManager, imageOff);
            this.usingKeyImage = assetManager.getResult(imageOn);
            this.withoutKeyImage = assetManager.getResult(imageOff);
            this.isGravityAffected = false;
            this.key = [];

            this.boxCollider = new objects.BoxCollider(0, 0, this.x, this.y,
                this.halfW, this.height);
        }

        public SetActivated():void {
            this.image = this.usingKeyImage;
        }
        
        public DoAction(activated:boolean) {

        }

        public Action(): void {
            this.enabled = !this.enabled;
            if (this.enabled) {
                if (!this.player.inventory.CheckKey(this.keyCode)) {
                    this.enabled = !this.enabled;
                    return;
                }
                let k = this.player.inventory.UseKeyTemporary();
                if (k != null && k instanceof Key && this.keyCode == k.keyCode) {
                    k.isGravityAffected = false;
                    this.key.push(k);
                    this.image = this.usingKeyImage;                    
                } else {
                    this.enabled = !this.enabled;
                    return;
                }
            } else {
                //this.player.inventory.AddItem(this.key);
                this.image = this.withoutKeyImage;
                let key = this.key.pop()
                key.x = this.x + this.width;
                key.y = this.y;
                key.isGravityAffected = true;
                this.alreadyHandled = true;
            }
            this.DoAction(this.enabled);
            //super.Action();
        }
    }
}