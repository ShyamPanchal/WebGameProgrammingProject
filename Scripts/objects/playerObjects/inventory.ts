module objects{
    export class Inventory extends objects.GameObject {

        public player: Player;
        public objects: objects.HandableObject[];

        constructor(assetManager: createjs.LoadQueue){
            super(assetManager, "inventory");
            this.objects = new Array<objects.HandableObject>();
            this.alpha = 0.7;
        }

        public Update():void{
            super.Update();
        }

        public AddItem(item:HandableObject):void {
            this.objects.push(item);
            item.x = this.x + this.halfW;
            item.y = this.y + this.halfH;
            item.isGravityAffected = false;
            //no more item to be actioned 
            this.player.actionObject = null;

        }

        private RemoveItem():void {
            if (this.player != null) {
                var item = this.objects.pop();
                if (item != null) { //if has one item at least
                    this.Drop(item);
                }
            }
        }
        public DropItem():void {
            this.RemoveItem();
        }

        private Drop(item:HandableObject):void {
            item.x = this.player.x;
            //place it above the player
            item.y = this.player.y - (this.player.halfH)*this.player.GetGravityFactor();
            //make sure that the x is next to the player;
            this.player.actionObject = item;
            item.isGravityAffected = true;
            console.log('inventory.drop: ' + item.name);
        }

        public UseKey():boolean {
            //TODO the key must be the last item to be catched (making the use hard to the player)
            let hasKey = false;
            let p = -1;
            let position = -1;
            this.objects.forEach(item => {
                p++;
                if(item instanceof Key) {
                    position = p;
                    hasKey = true;
                    return;
                }
            });
            if (hasKey) {
                this.objects[position].x = 1500;
                this.objects[position] = null;
            }
            return hasKey;
        }

        public GetItems():HandableObject[] {
            return this.objects;
        }
    }
}