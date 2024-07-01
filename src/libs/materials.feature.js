import { color } from "./tuples.feature";

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