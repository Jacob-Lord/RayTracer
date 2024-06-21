import {describe, test, it, expect} from "vitest";
import { intersect, Sphere } from "../src/libs/spheres.feature";
import { hit, intersections, Intersection } from "../src/libs/intersections.feature";


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
        let xs = intersections([i1, i2]);
        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(1);
        expect(xs[1].t).toBe(2);
    });
})

describe('hit', () => {
    it('should return the lowest nonnegative t value as the hit when all intersections are positive', () => {
        let s = new Sphere(1);
        let i1 = new Intersection(1, s);
        let i2 = new Intersection(2, s);
        let xs = intersections([i2, i1]);

        expect(hit(xs)).toBe(i1);
    });

    it('should return the correct hit when some intersections have negative t', () => {
        let s = new Sphere(2);
        let i1 = new Intersection(-1, s);
        let i2 = new Intersection(1, s);
        let xs = intersections([i2, i1]);

        expect(hit(xs)).toBe(i2);
    });

    it('should return nothing when all intersections have negative t', () => {
        let s = new Sphere(3);
        let i1 = new Intersection(-2, s);
        let i2 = new Intersection(-1, s);
        let xs = intersections([i2, i1]);

        expect(hit(xs)).toBe(undefined);
    });

    it('should return the lowest nonnegative intersection every time', () => {
        let s = new Sphere(4);
        let i1 = new Intersection(5, s);
        let i2 = new Intersection(7, s);
        let i3 = new Intersection(-3, s);
        let i4 = new Intersection(2, s);
        let xs = intersections([i1, i2, i3, i4]);

        expect(hit(xs)).toBe(i4);
    });
})
