import {describe, test, it, expect} from "vitest";
import { areTuplesEqual, multiplyTuple, point, vector } from "../src/libs/tuples.feature";
import { position, Ray } from "../src/libs/rays.feature";

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