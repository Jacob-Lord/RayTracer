import * as cvs from "../libs/canvas.feature.js";
import * as tf from "../libs/tuples.feature.js";
import * as sphere from "../libs/spheres.feature.js";
import * as ray from "../libs/rays.feature.js";
import * as transform from "../libs/transformations.feature.js";
import { hit } from "../libs/intersections.feature.js";
import { matrix, multiplyMatrix } from "../libs/matrices.feature.js";

//start ray at z =-5
let ray_origin = tf.point(0, 0, -5);
let ray_direction = tf.vector(0, 0, 1);

//put wall at z = 10
let wall_z = 10;

//7 units should be able to capture the size of the image.
let wall_size = 7;

//set size of canvas
const canvas_pixels = 100;

//calculate world size of a pixel
const pixel_size = (wall_size / canvas_pixels);

//half of the wall is to the left of the sphere
const half = (wall_size / 2);

//initialize canvas, color, and object
let canvas = cvs.canvas(canvas_pixels, canvas_pixels);
let my_color = tf.color(1, 0, 0);
let shape = new sphere.Sphere(1);

//shrink it along the y axis
//shape.transform = transform.scaling(1, 0.5, 1);
//shrink it along the x axis
//shape.transform = transform.scaling(0.5, 1, 1);
//shrink it, and rotate it!
//shape.transform = multiplyMatrix(transform.rotation_z(Math.PI / 4), transform.scaling(0.5, 1, 1));
//shrink it, and skew it!
//shape.transform = multiplyMatrix(transform.shearing(1, 0, 0, 0, 0, 0), transform.scaling(0.5, 1, 1));

//iterate through pixels in canvas
for (let y = 0; y < canvas_pixels-1; y++) {
    //compute the world y coordinate (top = +half, bottom = -half)
        let world_y = half - pixel_size * y;

        for (let x = 0; x < canvas_pixels-1; x++) {
            //compute the world x coordinate (left = -half, right = half)
            let world_x = -half + pixel_size * x;

            //describe point on wall ray will target
            let position = tf.point(world_x, world_y, wall_z);

            //describe ray and ray-sphere intersection
            let r = new ray.Ray(ray_origin, tf.normalize(tf.subtractTuples(position, ray_origin)));
            let xs = sphere.intersect(shape, r);

            if (hit(xs) != undefined) {
                cvs.write_pixel(canvas, x, y, my_color);
            }
        }
}

cvs.canvas_to_ppm(canvas);
