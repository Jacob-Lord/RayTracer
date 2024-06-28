import {describe, test, it, expect} from "vitest";
import { point, vector } from "../src/libs/tuples.feature";
import { intersect, normal_at, set_transform, Sphere } from "../src/libs/spheres.feature";
import { Ray, transform } from "../src/libs/rays.feature";
import { scaling, translation } from "../src/libs/transformations.feature";

describe(Sphere, () => {
    it('should have the ray intersect the sphere at two points', () => {
        let r = new Ray(point(0,0,-5), vector(0,0,1));
        let s = new Sphere(1);
        let xs = intersect(s, r);
        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(4.0);
        expect(xs[1].t).toBe(6.0);
    });

    it('should intersect a sphere at a tangent', () => {
        let r = new Ray(point(0,1,-5), vector(0,0,1));
        let s = new Sphere(2);
        let xs = intersect(s, r);
        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(5.0);
        expect(xs[1].t).toBe(5.0);
    });

    it('should miss the sphere', () => {
        let r = new Ray(point(0,2,-5), vector(0,0,1));
        let s = new Sphere(3);
        let xs = intersect(s, r);
        expect(xs.length).toThrowError;
    });

    it('should originate inside a sphere', () => {
        let r = new Ray(point(0,0,0), vector(0,0,1));
        let s = new Sphere(4);
        let xs = intersect(s, r);
        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(-1.0);
        expect(xs[1].t).toBe(1.0);
    });

    it('sphere is behind a ray', () => {
        let r = new Ray(point(0,0,5), vector(0,0,1));
        let s = new Sphere(5);
        let xs = intersect(s, r);
        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(-6.0);
        expect(xs[1].t).toBe(-4.0);
    });

    it('intersect sets the object on the intersection', () => {
        let r = new Ray(point(0,0,-5), vector(0,0,1));
        let s = new Sphere(6);
        let xs = intersect(s, r);
        expect(xs.length).toBe(2);
        expect(xs[0].object).toBe(s);
        expect(xs[1].object).toBe(s);
    })
})

describe(transform, () => {
    it('a sphere should have a default transformation', () => {
        //define the 4x4 identity matrix
        let identity_matrix = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];
        let s = new Sphere(7);
        expect(s.transform).toStrictEqual(identity_matrix);
    });

    it('should change the sphere transformation', () => {
        let s = new Sphere(8);
        let t = translation(2, 3, 4);
        set_transform(s, t);
        expect(s.transform).toBe(t);
    });

    it('should intersect a scaled sphere with a ray', () => {
        let r = new Ray(point(0,0,-5), vector(0,0,1));
        let s = new Sphere(9);
        set_transform(s, scaling(2, 2, 2));
        let xs = intersect(s, r);

        expect(xs.length).toBe(2);
        expect(xs[0].t).toBe(3);
        expect(xs[1].t).toBe(7);
    });

    it('should intersect a translated sphere with a ray', () => {
        let r = new Ray(point(0,0,-5), vector(0,0,1));
        let s = new Sphere(10);
        set_transform(s, translation(5, 0, 0));
        let xs = intersect(s, r);

        expect(xs.length).toBe(0);
    });
})

describe(normal_at, () => {
    it('should compute the normal on a sphere at a point on the x axis', () => {
        let s = Sphere(1);
        let n = normal_at(s, point(1,0,0));
        expect(n).toStrictEqual(vector(1, 0, 0));
    });

    it('should compute the normal on a sphere at a point on the y axis', () => {
        let s = Sphere(2);
        let n = normal_at(s, point(0,1,0));
        expect(n).toStrictEqual(vector(0, 1, 0));
    });

    it('should compute the normal on a sphere at a point on the z axis', () => {
        let s = Sphere(3);
        let n = normal_at(s, point(0,0,1));
        expect(n).toStrictEqual(vector(0, 0, 1));
    });

    it('should compute the normal on a sphere at a nonaxial point', () => {
        let s = Sphere(4);
        let n = normal_at(s, point(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));
        expect(n).toStrictEqual(vector(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));
    });

    it('should compute the normal on a sphere at a nonaxial point', () => {
        let s = Sphere(5);
        let n = normal_at(s, point(Math.sqrt(3)/3, Math.sqrt(3)/3, Math.sqrt(3)/3));
        expect(n).toStrictEqual(normalize(n));
    });
})
