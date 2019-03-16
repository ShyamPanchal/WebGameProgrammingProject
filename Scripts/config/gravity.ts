module config {
    export class Gravity {
        //used when changing the gravity
        public static gravityFactor = 1;
        // Gravity constant (1/60)*(-9.8)
        public static gravityForce:number = -0.163;
        //60 (size of character) divided by 3 (scale for 1 meter )
        public static gravitySpeed:number = -0.163*20;

    }
}