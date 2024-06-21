import {describe, test, it, expect} from "vitest";
import { areTuplesEqual, multiplyTuple, point, vector } from "../src/libs/tuples.feature";
import { position, Ray, transform } from "../src/libs/rays.feature";
import { scaling, translation } from "../src/libs/transformations.feature";

describe(Ray, () => {
    it('should create and query a ray object', () => {
        let origin = point(1, 2, 3);
        let direction = vector(4, 5, 6);
        let r = new Ray(origin, direction);
        expect(r.origin).toBe(origin);
        expect(r.direction).toBe(direction);
    });
})

describe(position, () => {
    it('should compute a point from a distance', () => {
        let r = new Ray(point(2, 3, 4), vector(1, 0, 0));
        expect(position(r, 0)).toStrictEqual(point(2, 3, 4));
        expect(position(r, 1)).toStrictEqual(point(3, 3, 4));
        expect(position(r, -1)).toStrictEqual(point(1, 3, 4));
        expect(position(r, 2.5)).toStrictEqual(point(4.5, 3, 4));
    });
})

describe(transform, () => {
    it('should translate a ray', () => {
        let r = new Ray(point(1,2,3), vector(0,1,0));
        let m = translation(3, 4, 5);
        let r2 = transform(r, m);

        expect(r2.origin).toStrictEqual(point(4, 6, 8));
        expect(r2.direction).toStrictEqual(vector(0,1,0));
    });

    it('should scale a ray', () => {
        let r = new Ray(point(1,2,3), vector(0,1,0));
        let m = scaling(2, 3, 4);
        let r2 = transform(r, m);

        expect(r2.origin).toStrictEqual(point(2, 6, 12));
        expect(r2.direction).toStrictEqual(vector(0,3,0));
    });

})