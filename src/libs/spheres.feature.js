import { dot, multiplyTuple, normalize, point, vector, subtractTuples } from "./tuples.feature.js";
import { intersections, Intersection } from "./intersections.feature.js";
import { Ray, transform } from "./rays.feature.js";
import { inverse, multiplyMatrix, transpose } from "./matrices.feature.js";
import { Material } from "./materials.feature.js";
export class Sphere {
    constructor(id) {
        this.id = id;
        this.transform = [[1, 0, 0, 0],
                          [0, 1, 0, 0],
                          [0, 0, 1, 0],
                          [0, 0, 0, 1]];
        this.material = new Material(id);
    }
}

export function intersect(sphere, ray) {

    //allow a transformation to be assigned to a sphere
    ray = transform(ray, inverse(sphere.transform));

    //distance of sphere from origin
    let sphere_to_ray = subtractTuples(ray.origin, point(0, 0, 0));
    let a = dot(ray.direction, ray.direction);
    let b = 2 * dot(ray.direction, sphere_to_ray);
    let c = dot(sphere_to_ray, sphere_to_ray) - 1;

    let discriminant = Math.pow(b, 2) - 4 * a * c;

    //if ray misses sphere
    if (discriminant < 0) {
        return [];
    }

    let t1 = (-b - Math.sqrt(discriminant)) / (2 * a);
    let t2 = (-b + Math.sqrt(discriminant)) / (2 * a);

    //ensure values are returned in ascending order for future access
    if (t1 < t2) {
        let t1_obj = new Intersection(t1, sphere);
        let t2_obj = new Intersection(t2, sphere);
        let t = intersections([t1_obj, t2_obj]);
        return t;
    }
    else if (t2 < t1) {
        let t1_obj = new Intersection(t1, sphere);
        let t2_obj = new Intersection(t2, sphere);
        let t = intersections([t2_obj, t1_obj]);
        return t;
    }
    else {
        let t1_obj = new Intersection(t1, sphere);
        let t = intersections([t1_obj, t1_obj]);
        return t;
    }
}

export function set_transform(sphere, transform) {
    //Set the transform for a sphere object
    sphere.transform = transform;
}

export function normal_at(sphere, world_point) {
    let object_point = multiplyMatrix(inverse(sphere.transform), world_point);
    let object_normal = subtractTuples(object_point, point(0,0,0));
    let world_normal = multiplyMatrix(transpose(inverse(sphere.transform)), object_normal);
    //avoid finding a submatrix and multiplying by inverse/ transposing that by setting world_normal.w to 0 after multiplying by transpose matrix
    world_normal[3] = 0; 
    return normalize(world_normal);
}
