import {describe, test, it, expect} from "vitest";
import { intersect, Sphere } from "../src/libs/spheres.feature";
import { intersections, Intersection } from "../src/libs/intersections.feature";


describe(Intersection, () => {
    it('intersection encapsulates t and object', () => {
        let s = new Sphere(1);
        let i = new Intersection(3.5, s);
        expect(i.t).toBe(3.5);
        expect(i.object).toBe(s);
    });
})

describe(intersections, () => {
    it('should aggregate intersections', () => {
        let s = new Sphere(2);
        let i1 = new Intersection(1, s);
        let i2 = new Intersection(2, s);
        let xs = intersections(i1, i2);
        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(1);
        expect(xs[1].t).toBe(2);
    });

    
})
