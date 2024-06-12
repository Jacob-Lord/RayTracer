import {describe, test, it, expect} from "vitest";
import { point, vector } from "../src/libs/tuples.feature";
import { translation } from "../src/libs/transformations.feature";
import { inverse, multiplyMatrix } from "../src/libs/matrices.feature";

describe(translation, () => {
    it('multiplying a translating matrix by a point', () => {
        let transform = translation(5, -3, 2);
        let p = point(-3, 4, 5);
        expect(multiplyMatrix(transform, p)).toStrictEqual(point(2, 1, 7));
    });

    it('multiplying by the inverse of a translation matrix', () => {
        let transform = translation(5, -3, 2);
        let inv = inverse(transform);
        let p = point(-3, 4, 5);
        expect(multiplyMatrix(inv, p)).toStrictEqual(point(-8, 7, 3));
    });

    it('multiplying by the inverse of a translation matrix', () => {
        let transform = translation(5, -3, 2);
        let v = vector(-3, 4, 5);
        expect(multiplyMatrix(transform, v)).toStrictEqual(v);
    });
})