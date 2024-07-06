import * as cvs from "../libs/canvas.feature.js";
import * as tf from "../libs/tuples.feature.js";
import * as sphere from "../libs/spheres.feature.js";
import * as ray from "../libs/rays.feature.js";
import { hit } from "../libs/intersections.feature.js";
import { Material, lighting } from "../libs/materials.feature.js";
import { Point_light } from "../libs/lights.feature.js";

//start ray at z =-5
let ray_origin = tf.point(0, 0, -5);

//put wall at z = 10
let wall_z = 10;

//7 units should be able to capture the size of the image.
let wall_size = 7;

//set size of canvas
//the larger the pixels, the higher the resolution
//O(n^2) time with the double loop to write pixels to canvas, so more pixels takes forever
const canvas_pixels = 250; //1000px takes ~1 minute

//calculate world size of a pixel
const pixel_size = (wall_size / canvas_pixels);

//half of the wall is to the left of the sphere
const half = (wall_size / 2);

//initialize canvas and object
let canvas = cvs.canvas(canvas_pixels, canvas_pixels);
let shape = new sphere.Sphere(1);

//assign a material to the sphere
shape.material = new Material();
shape.material.color = tf.color(0.4, 0.4, 1); //light grayish-blue

//add a light source | this one is a white light, above and to the left of the eye
let light_position = tf.point(-10, -10, -10);
let light_color = tf.color(1, 1, 1);
let light = new Point_light(light_position, light_color);

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
        
        //if the ray intersects the sphere, write the pixel to the canvas
        //this will provide a silhouette of the object
        let a_hit = hit(xs);
        if (a_hit != undefined) {
            //find normal vector and eye vector at the intersection
            let point = ray.position(r, a_hit.t);
            let normal = sphere.normal_at(a_hit.object, point);
            let eye = tf.negateTuple(r.direction);

            //calculate the color with lighting function
            let color = lighting(a_hit.object.material, light, point, eye, normal);

            //write pixel to canvas
            cvs.write_pixel(canvas, x, y, color);
        }
    }
}

//save canvas contents to ppm file
cvs.canvas_to_ppm(canvas);
