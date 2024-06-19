import { dot, point, subtractTuples } from "./tuples.feature.js";

export class Sphere {
    constructor(id) {
        this.id = id;
    }
}

export function intersect(sphere, ray) {
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
        return [t1, t2];
    }
    else {
        return [t2, t1];
    }
}