import { isVector, point, vector, equal, areTuplesEqual, addTuples, subtractTuples, negateTuple, multiplyTuple, magnitude, normalize, dot, cross } from "./tuples.feature.js";

driver();


function driver() {
    let p = projectile(point(0, 1, 0), normalize(vector(1, 1, 0)));
    let e = environment(vector(0, -0.1, 0), vector(-0.01, 0, 0));
    let tick_count = 0;
    console.log('start');
    while( p.position[1] >= 0 ) {
        tick_count += 1;
        console.log('(x: ' + p.position[0] + ', y: ' + p.position[1] + ')');
        p = tick(e, p);
    }

    console.log('Total number of ticks to reach ground: ' + tick_count);

    function tick(environment, proj) {
        let position = addTuples(proj.position, proj.velocity);
        let velocity = addTuples(addTuples(proj.velocity, environment.gravity), environment.wind); //add three tuples (function could be improved)
        let myProj = projectile(position, velocity); 
        return myProj;
    }

    function environment(gravity, wind) {
        let environment = {
            gravity: gravity,
            wind: wind
        };
        return environment;
    }
    
    function projectile(position, velocity) {
        let proj = {position: position,
            velocity: velocity};
        return proj;
    }

}






