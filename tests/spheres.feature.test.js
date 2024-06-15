import {describe, test, it, expect} from "vitest";
import { point, vector } from "../src/libs/tuples.feature";
import { sphere } from "../src/libs/spheres.feature";
import { Ray } from "../src/libs/rays.feature";

describe(sphere, () => {
    it('should have the ray intersect the sphere at two points', () => {
        let r = new Ray(point(0,0,-5), vector(0,0,1));
        let s = sphere();
        let xs = intersects(s, r);
        expect(xs.count).toBe(2);
        expect(xs[0]).toBe(4.0);
        expect(xs[1]).toBe(6.0);
    });
})

