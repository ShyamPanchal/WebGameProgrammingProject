module managers {
    export class Collision {

        public static CheckDistance(obj1: objects.GameObject, obj2: objects.GameObject):boolean {
            // Create 2 temporary Vec2 objects used for collision detections
            let p1: math.Vec2 = new math.Vec2(obj1.x, obj1.y);
            let p2: math.Vec2 = new math.Vec2(obj2.x, obj2.y);

            if(math.Vec2.Distance(p1, p2) < (obj1.halfH + obj2.halfH)) {
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
            /*
            let center1: math.Vec2 = new math.Vec2(obj1.x, obj1.y);
            let extends1: math.Vec2 = new math.Vec2(obj1.halfW, obj1.halfH);
            
            let center2: math.Vec2 = new math.Vec2(obj2.x + obj2.halfW, obj2.y + obj2.halfH);
            let extends2: math.Vec2 = new math.Vec2(obj2.halfW, obj2.halfH);
            let aabb1 = new managers.AABB(center1, extends1);
            let aabb2 = new managers.AABB(center2, extends2);
            */
            
            let aabb1 = new managers.AABB(obj1.boxCollider.center, obj1.boxCollider.extends);
            let aabb2 = new managers.AABB(obj2.boxCollider.center, obj2.boxCollider.extends);

            let md = aabb1.minkowskiDifference(aabb2);
            /*
            if (Math.abs(obj1.y - obj2.y) < 50) {

                console.log('x : ' + obj1.x +  ' y: ' +  obj1.y);
                console.log('x : ' + obj2.x +  ' y: ' +  obj2.y);
    
                console.log(' md.min.x : ' +md.min.x 
                +  ' md.min.y : ' +  md.min.y
                +  ' md.max.x : ' +  md.max.x
                +  ' md.max.y : ' +  md.max.y
                );
            }*/

            if (md.min.x <= 0 &&
                md.max.x >= 0 &&
                md.min.y <= 0 &&
                md.max.y >= 0)
            {
                if(!obj2.isColliding) {                    
                    obj2.isColliding = true;
                    /*
                    console.log(obj1.name + ' y:' + obj1.y);
                    math.Vec2.Print(obj1.boxCollider.center);
                    math.Vec2.Print(obj1.boxCollider.extends);

                    console.log(obj2.name + ' y:' + obj2.y);
                    math.Vec2.Print(obj2.boxCollider.center);
                    math.Vec2.Print(obj2.boxCollider.extends);

                    console.log(' md.min.x : ' +md.min.x 
                    +  ' md.min.y : ' +  md.min.y
                    +  ' md.max.x : ' +  md.max.x
                    +  ' md.max.y : ' +  md.max.y
                    );  */               
                }
                return true;
            }
            //var penetrationVector:math.Vec2 = md.closestPointOnBoundsToPoint(math.Vec2.zero);
            //boxA.center += penetrationVector;
            obj1.isColliding = false;
            return false;
        }
    }
}