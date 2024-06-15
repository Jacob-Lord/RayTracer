import * as tf from "../libs/tuples.feature.js";
import * as cf from "../libs/canvas.feature.js";
driver();


function driver() {

    //initialize starting position and velocity of projectile
    const start = tf.point(0, 1, 0);
    let velocity = tf.multiplyTuple((tf.normalize(tf.vector(1, 1.8, 0))), 11.25);
    let p = projectile(start, velocity);

    //initialize environment for projectile
    let gravity = tf.vector(0, -0.1, 0);
    let wind = tf.vector(-0.01, 0, 0);
    let e = environment(gravity, wind);

    //initialize canvas to display projectile
    let w = 900;
    let h = 550;
    let c = cf.canvas(w, h);
    let p_color = tf.color(1, 0, 0);

     let tick_count = 0;
    console.log('start');
    while(p.position[1] >= 0 ) {
        let x_pos = Math.round(p.position[0]);
        let y_pos = Math.round((h - p.position[1]));
        cf.write_pixel(c, x_pos, y_pos, p_color);
        tick_count += 1;
        console.log('(x: ' + x_pos + ', y: ' + p.position[1] + ')');
        p = tick(e, p);
    }

    console.log('Total number of ticks to reach ground: ' + tick_count);
    let ppm = cf.canvas_to_ppm(c);

    function tick(environment, proj) {
        let position = tf.addTuples(proj.position, proj.velocity);
        let velocity = tf.addTuples(tf.addTuples(proj.velocity, environment.gravity), environment.wind); //add three tuples (function could be improved)
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






