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
            this.player.actionObjects.pop();

        }

        private RemoveItem():HandableObject {
            if (this.player != null) {
                var item = this.objects.pop();
                if (item != null) { //if has one item at least
                    this.Drop(item);
                    return item;
                }
            }
        }
        public DropItem():HandableObject {
            return this.RemoveItem();
        }

        private Drop(item:HandableObject):void {
            let force = 1;
            item.x = this.player.boxCollider.x; // + (this.player.isLeft?-30:30)
            item.y = this.player.boxCollider.y + (this.player.halfH/2)*this.player.GetGravityFactor(); // - (this.player.halfH)*this.player.GetGravityFactor()
            let x0 = item.x;
            let y0 = item.y;
            let d = 30;
            let left = this.player.isLeft;
            //place it above the player
            item.AddForceHorizontally = () => {
                if (left) {
                    if (item.x >= x0 - d) {
                        item.Move_Horizontally(false, force);
                        //item.x-=force;
                    } else {
                        item.AddForceHorizontally = () => {};
                    }
                } else {
                    if (item.x <= x0 + d) {
                        item.Move_Horizontally(true, force);
                        //item.x+=force;
                    } else {
                        item.AddForceHorizontally = () => {};
                    }
                }
            };
            item.AddForceVertically = () => {
                if (item.y >= y0 - d) {
                    item.Move_Vertically(true, force);
                    //item.y-=force*item.GetGravityFactor();
                } else {
                    item.AddForceVertically = () => {};
                }
            };
            //make sure that the x is next to the player;
            this.player.actionObjects.push(item);
            item.isGravityAffected = true;
            console.log('inventory.drop: ' + item.name);
        }

        public CheckKey(code:number):boolean {
            let hasKey = false;
            this.objects.forEach(item => {
                if(item instanceof Key) {
                    if (code == item.keyCode){
                        hasKey = true;
                        return;
                    }
                }
            });

            return hasKey;
        }

        public UseKeyTemporary():HandableObject {
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
                let key = this.objects[position];
                this.objects[position] = null;
                return key;
            }
            return null;
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