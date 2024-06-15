import {describe, test, it, expect} from "vitest";
import { areTuplesEqual, multiplyTuple, point, vector } from "../src/libs/tuples.feature";
import { rotation_x, rotation_y, rotation_z, scaling, shearing, translation } from "../src/libs/transformations.feature";
import { areMatricesEqual, inverse, multiplyMatrix } from "../src/libs/matrices.feature";

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

describe(rotation_x, () => {
    it('should rotate properly around the x axis', () => {
        let p = point(0, 1, 0);
        let half_quarter = rotation_x(Math.PI / 4);
        let full_quarter = rotation_x(Math.PI / 2);
        expect(areTuplesEqual(multiplyMatrix(half_quarter, p), point(0, Math.sqrt(2)/2, Math.sqrt(2)/2))).toBe(true);
        expect(areTuplesEqual(multiplyMatrix(full_quarter, p), point(0, 0, 1))).toBe(true);
    });

    it('inverse of rotation_x matrix rotates in opposite direction', () => {
        let p = point(0, 1, 0);
        let half_quarter = rotation_x(Math.PI / 4);
        let inv = inverse(half_quarter);
        expect(areTuplesEqual(multiplyMatrix(inv, p), point(0, Math.sqrt(2)/2, -(Math.sqrt(2)/2)))).toBe(true);
    });
})

describe(rotation_y, () => {
    it('rotating a point around the y axis', () => {
        let p = point(0, 0, 1);
        let half_quarter = rotation_y(Math.PI / 4);
        let full_quarter = rotation_y(Math.PI / 2);
        expect(areTuplesEqual(multiplyMatrix(half_quarter, p), point(Math.sqrt(2)/2, 0, Math.sqrt(2)/2))).toBe(true);
        expect(areTuplesEqual(multiplyMatrix(full_quarter, p), point(1, 0, 0))).toBe(true);
    })
})

describe(rotation_z, () => {
    it('rotating a point around the z axis', () => {
        let p = point(0, 1, 0);
        let half_quarter = rotation_z(Math.PI / 4);
        let full_quarter = rotation_z(Math.PI / 2);
        expect(areTuplesEqual(multiplyMatrix(half_quarter, p), point(-(Math.sqrt(2)/2), Math.sqrt(2)/2, 0))).toBe(true);
        expect(areTuplesEqual(multiplyMatrix(full_quarter, p), point(-1, 0, 0))).toBe(true);
    })
})

describe(shearing, () => {
    it('should move x in proportion to y', () => {
        let transform = shearing(1, 0, 0, 0, 0, 0);
        let p = point(2, 3, 4);
        expect(areTuplesEqual(multiplyMatrix(transform, p), point(5, 3, 4))).toBe(true);
    });

    it('should move x in proportion to z', () => {
        let transform = shearing(0, 1, 0, 0, 0, 0);
        let p = point(2, 3, 4);
        expect(areTuplesEqual(multiplyMatrix(transform, p), point(6, 3, 4))).toBe(true);
    });

    it('should move y in proportion to x', () => {
        let transform = shearing(0, 0, 1, 0, 0, 0);
        let p = point(2, 3, 4);
        expect(areTuplesEqual(multiplyMatrix(transform, p), point(2, 5, 4))).toBe(true);
    });

    it('should move y in proportion to z', () => {
        let transform = shearing(0, 0, 0, 1, 0, 0);
        let p = point(2, 3, 4);
        expect(areTuplesEqual(multiplyMatrix(transform, p), point(2, 7, 4))).toBe(true);
    });

    it('should move z in proportion to x', () => {
        let transform = shearing(0, 0, 0, 0, 1, 0);
        let p = point(2, 3, 4);
        expect(areTuplesEqual(multiplyMatrix(transform, p), point(2, 3, 6))).toBe(true);
    });

    it('should move z in proportion to y', () => {
        let transform = shearing(0, 0, 0, 0, 0, 1);
        let p = point(2, 3, 4);
        expect(areTuplesEqual(multiplyMatrix(transform, p), point(2, 3, 7))).toBe(true);
    });
})

it('Individual transformations applied in sequence', () => {

    let p = point(1, 0, 1);
    let A = rotation_x(Math.PI/2);
    let B = scaling(5, 5, 5);
    let C = translation(10, 5, 7);

    //apply rotation first
    let p2 = multiplyMatrix(A, p);
    expect(areTuplesEqual(p2, point(1, -1, 0))).toBe(true);

    //then apply scaling
    let p3 = multiplyMatrix(B, p2);
    expect(areTuplesEqual(multiplyMatrix(B, p2), point(5, -5, 0))).toBe(true);

    //then apply translation
    let p4 = multiplyMatrix(C, p3);
    expect(areTuplesEqual(multiplyMatrix(C, p3), point(15, 0, 7))).toBe(true);
})

it('Chained transformations must be applied in reverse order', () => {
    let p = point(1, 0 ,1);
    let A = rotation_x(Math.PI/2);
    let B = scaling(5, 5, 5);
    let C = translation(10, 5, 7);

    let T = multiplyMatrix(C, multiplyMatrix(B, A));
    expect(areTuplesEqual(multiplyMatrix(T, p), point(15, 0, 7))).toBe(true);
})