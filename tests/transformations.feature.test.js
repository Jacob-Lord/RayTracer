import {describe, test, it, expect} from "vitest";
import { point, vector } from "../src/libs/tuples.feature";
import { scaling, translation } from "../src/libs/transformations.feature";
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

describe(scaling, () => {
    it('scaling matrix applied to a point should result in point', () => {
        let transform = scaling(2, 3, 4);
        let p = point(-4, 6, 8);
        expect(multiplyMatrix(transform, p)).toStrictEqual(point(-8,18,32));
    });

    it('scaling matrix applied to a vector should result in a vector', () => {
        let transform = scaling(2, 3, 4);
        let v = vector(-4, 6, 8);
        expect(multiplyMatrix(transform, v)).toStrictEqual(vector(-8,18,32));
    });

    it('multiplying by inverse of scaling matrix', () => {
        let transform = scaling(2, 3, 4);
        let inv = inverse(transform);
        let v = vector(-4, 6, 8);
        expect(multiplyMatrix(inv, v)).toStrictEqual(vector(-2, 2, 2));
    });

    it('scaling by a negative value should result in refleciton', () => {
        let transform = scaling(-1, 1, 1);
        let p = point(2, 3, 4);
        expect(multiplyMatrix(transform, p)).toStrictEqual(point(-2, 3, 4));
    });
})