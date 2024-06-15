import * as tf from "../libs/tuples.feature.js";
import * as cf from "../libs/canvas.feature.js";
import * as mf from "../libs/matrices.feature.js";
import * as trans from "../libs/transformations.feature.js";

//sim does not work!

driver();

function driver() {
    let canvas = cf.canvas(25, 35);
    let center = tf.point(12, 16, 0);
    let r = trans.rotation_y( 3 * (Math.PI)/6);
    let twelve = tf.point(0, 0, 1);
    let three = mf.multiplyMatrix(r, twelve);
    console.log(three);
    let p_color = tf.color(1, 1, 1);
    cf.write_pixel(canvas, center[0], center[1], p_color);
    cf.canvas_to_ppm(canvas);
    return;
}