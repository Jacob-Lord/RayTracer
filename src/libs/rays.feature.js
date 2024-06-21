import { addTuples, multiplyTuple, point, vector } from "./tuples.feature.js";
import { multiplyMatrix } from "./matrices.feature.js";

export class Ray {
    constructor(origin, direction) {
        this.origin = origin;
        this.direction = direction;
    }
}

export function position(ray, t) {
    //to find position, multiply ray's dir by t to find distance travelled,
    //then add that to ray's origin
    return addTuples(ray.origin, (multiplyTuple(ray.direction, t)));
}

export function transform(ray, matrix) {
    let pos_val = multiplyMatrix(matrix, ray.origin)
    let dir_val = multiplyMatrix(matrix, ray.direction)
    let new_ray = new Ray(pos_val, dir_val);
    return new_ray;
}
