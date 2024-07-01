import { addColors, color, dot, hadamard_product, multiplyColor, negateTuple, normalize, point, reflect, subtractTuples, vector } from "./tuples.feature.js";
import { Point_light } from "./lights.feature.js";
export class Material {
    //id parameter 
    constructor(id) {
        this.id = id;
        this.color = color(1, 1, 1);
        this.ambient = 0.1;
        this.diffuse = 0.9;
        this.specular = 0.9;
        this.shininess = 200.0;
    }
}

export function lighting(material, light, point, eyev, normalv) {
    //combine surface color with the light's color/intensity
    let effective_color = hadamard_product(material.color, light.intensity);

    //find the direction to the light source
    let lightv = normalize(subtractTuples(light.position, point));

    //compute the ambient contribution
    let ambient = multiplyColor(effective_color, material.ambient);

    //light_dot_normal represents cosine of the angle between the light vector
    // and the normal vector. A negative number means the light is on the other side
    //of the surface.
    let light_dot_normal = dot(lightv, normalv);
    let diffuse;
    let specular;
    if (light_dot_normal < 0) {
        diffuse = color(0, 0, 0);
        specular = color(0, 0, 0);
    }
    else {
        //compute the diffusion contribution
        diffuse = multiplyColor(effective_color, (material.diffuse * light_dot_normal));

        //reflect_dot_eye represent the cosine of the angle between the reflection
        //vector and the eye vector. A negative number means the light reflects
        //away from the eye.
        let reflectv = reflect(negateTuple(lightv), normalv);
        let reflect_dot_eye = dot(reflectv, eyev);

        if (reflect_dot_eye <= 0) {
            specular = color(0, 0, 0);
        }
        else {
            //compute the specular contribution
            let factor = Math.pow(reflect_dot_eye, material.shininess);
            specular = multiplyColor(light.intensity, (material.specular * factor));
        }
    }

    return addColors(addColors(ambient, diffuse), specular);
}

let m = new Material(1);
let position = point(0, 0, 0);
let eyev = vector(0, 0, -1);
let normalv = vector(0, 0, -1);
let light = new Point_light(point(0, 0, -10), color(1, 1, 1));
let result = lighting(m, light, position, eyev, normalv);