import {describe, test, it, expect} from "vitest";
import { point, vector } from "../src/libs/tuples.feature";
import { intersect, Sphere } from "../src/libs/spheres.feature";
import { Ray } from "../src/libs/rays.feature";

describe(sphere, () => {
    it('should have the ray intersect the sphere at two points', () => {
        let r = new Ray(point(0,0,-5), vector(0,0,1));
        let s = new Sphere(1);
        let xs = intersect(s, r);
        expect(xs.count).toBe(2);
        expect(xs[0]).toBe(4.0);
        expect(xs[1]).toBe(6.0);
    });

    it('should intersect a sphere at a tangent', () => {
        let r = new Ray(point(0,1,-5), vector(0,0,1));
        let s = new Sphere(2);
        let xs = intersect(s, r);
        expect(xs.count).toBe(2);
        expect(xs[0]).toBe(5.0);
        expect(xs[1]).toBe(5.0);
    });

    it('should miss the sphere', () => {
        let r = new Ray(point(0,2,-5), vector(0,0,1));
        let s = new Sphere(3);
        let xs = intersect(s, r);
        expect(xs.count).toBe(0);
    });

    it('should originate inside a sphere', () => {
        let r = new Ray(point(0,0,0), vector(0,0,1));
        let s = new Sphere(2);
        let xs = intersect(s, r);
        expect(xs.count).toBe(2);
        expect(xs[0]).toBe(-1.0);
        expect(xs[1]).toBe(1.0);
    });

    it('sphere is behind a ray', () => {
        let r = new Ray(point(0,0,5), vector(0,0,1));
        let s = new Sphere(2);
        let xs = intersect(s, r);
        expect(xs.count).toBe(2);
        expect(xs[0]).toBe(-6.0);
        expect(xs[1]).toBe(-4.0);
    });

})

