module managers {
    export class Collision {

        public static CheckDistance(obj1: objects.GameObject, obj2: objects.GameObject):boolean {
            // Create 2 temporary Vec2 objects used for collision detections
            let p1: math.Vec2 = new math.Vec2(obj1.x, obj1.y);
            let p2: math.Vec2 = new math.Vec2(obj2.x, obj2.y);

            if(math.Vec2.Distance(p1, p2) < (obj1.boxCollider.halfH/2 + obj2.boxCollider.halfH/2)) {
                if(!obj2.isColliding) {
                    // console.log("Colliding with " + obj2.name);
                    switch(obj2.name) {
                        case "enemy":

                        break;
                    }
                    obj2.isColliding = true;
                }

                return true;
            }
            else {
                obj2.isColliding = false;
                return false;
            }
        }
        public static CheckDistanceDoubled(obj1: objects.GameObject, obj2: objects.GameObject):boolean {
            // Create 2 temporary Vec2 objects used for collision detections
            let p1: math.Vec2 = new math.Vec2(obj1.x, obj1.y);
            let p2: math.Vec2 = new math.Vec2(obj2.x, obj2.y);

            if(math.Vec2.Distance(p1, p2) < (obj1.boxCollider.width + obj2.boxCollider.width)) {
                if(!obj2.isColliding) {
                    // console.log("Colliding with " + obj2.name);
                    switch(obj2.name) {
                        case "enemy":

                        break;
                    }
                    obj2.isColliding = true;
                }

                return true;
            }
            else {
                obj2.isColliding = false;
                return false;
            }
        }

        public static CheckAABB(obj1: objects.GameObject, obj2: objects.GameObject):boolean {
            let aabb1 = obj1.boxCollider.aabb;
            let aabb2 = obj2.boxCollider.aabb;

            let md = aabb1.minkowskiDifference(aabb2);


            if (md.CheckCollided())
            {
                if(!obj2.isColliding) {
                    obj2.isColliding = true;
                   var penetrationVector:math.Vec2 = md.closestPointOnBoundsToPoint(math.Vec2.zero);
                   obj1.OnColliderEnter(penetrationVector, obj2);
                }
                return true;
            }

            if (obj2.isColliding) {
                obj1.OnColliderExit(penetrationVector, obj2);
            }
            //boxA.center += penetrationVector;
            obj2.isColliding = false;
            return false;
        }

        public static CheckAABBCollision(aabb1: managers.AABB, aabb2: managers.AABB):managers.AABB {
            return aabb1.minkowskiDifference(aabb2);
        }
    }
}
