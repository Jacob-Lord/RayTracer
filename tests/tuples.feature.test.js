import {describe, test, it, expect} from "vitest";
import { isVector, point, vector, equal, areTuplesEqual, addTuples, subtractTuples, negateTuple, multiplyTuple, magnitude, normalize } from "../src/libs/tuples.feature";

describe('isVector', () => {
    it('should return false if w is equal to 1 (a point)', () => {
        expect(isVector(4.3, -4.2, 3.1, 1.0)).toBe(false)
    });
    it('should return true if w is equal to 0 (a vector)', () => {
        expect(isVector(4.3, -4.2, 3.1, 0.0)).toBe(true)
    });
})

describe('point', () => {
    it('should return a point where w = 1.0', () => {
        expect(point(4, -4, 3)).toStrictEqual([4, -4, 3, 1])
    });
})

describe('vector', () => {
    it('should return a vector where w = 0', () => {
        expect(vector(4, -4, 3)).toStrictEqual([4, -4, 3, 0])
    });
})

describe('equal', () => {
    it('should return true if floating point numbers are equal', () => {
        expect(equal(3.14597, 3.14597)).toBe(true)
    });
    it('should return false if floating point numbers are not equal', () => {
        expect(equal(1.24124, 1.24125)).toBe(false)
    });
})

describe('areTuplesEqual', () => {
    it('should return true if args are equal', () => {
        expect(areTuplesEqual([4.0, -4.0, 3.0, 1.0], [4.0, -4.0, 3.0, 1.0])).toBe(true)
    });

    it('should return false if args are not equal due to small floating point diff', () => {
        expect(areTuplesEqual([4.0, -4.0, 3.0, 1.0], [4.0001, -4.0, 3.0, 1.0])).toBe(false)
    });
})

describe('addTuples', () => {
    it('should return a point if args are point and vector', () => {
        expect(addTuples([3, -2, 5, 1], [-2, 3, 1, 0])).toStrictEqual([1, 1, 6, 1])
    });

    it('should return a vector if args are both vectors', () => {
        expect(addTuples([3.001, -2, 5, 0], [-2.001, 3, 1, 0])).toStrictEqual([1, 1, 6, 0])
    });

    it('should return undefined if args are both points', () => {
        expect(addTuples([3.001, -2, 5, 1], [-2.001, 3, 1, 1])).toBe(undefined)
    });
})

describe('subtractTuples', () => {
    it('should return a vector if args are two points', () => {
        expect(subtractTuples([3, 2, 1, 1], [5, 6, 7, 1])).toStrictEqual([-2, -4, -6, 0])
    });

    it('should return a point if args are point and vector', () => {
        expect(subtractTuples([3, 2, 1, 1], [5, 6, 7, 0])).toStrictEqual([-2, -4, -6, 1])
    });

    it('should return a vector if args are two vectors', () => {
        expect(subtractTuples([3, 2, 1, 0], [5, 6, 7, 0])).toStrictEqual([-2, -4, -6, 0])
    });
})

describe('negateTuple', () => {
    it('should return the opposite of the tuple', () => {
        expect(negateTuple([1, -2, 3, 0])).toStrictEqual([-1, 2, -3, 0])
    });

    it('should return an error message if arg is a point', () => {
        expect(negateTuple([1, -2, 3, 1])).toBe(undefined)
    });
})

describe('multiplyTuple', () => {
    it('should return the tuple scaled by the arg scalar value', () => {
        expect(multiplyTuple([1, -2, 3, -4], 3.5)).toStrictEqual([3.5, -7, 10.5, -14])
    });

    it('should return the tuple scaled by the arg fraction value', () => {
        expect(multiplyTuple([1, -2, 3, -4], 0.5)).toStrictEqual([0.5, -1, 1.5, -2])
    });
})

describe('magnitude', () => {
    it('should return 1 as magnitue if arg is 1, 0, 0', () => {
        expect(magnitude([1, 0, 0])).toBe(1)
    });

    it('should return 1 as magnitue if arg is 0, 1, 0', () => {
        expect(magnitude([0, 1, 0])).toBe(1)
    });

    it('should return 1 as magnitue if arg is 1, 0, 0', () => {
        expect(magnitude([0, 0, 1])).toBe(1)
    });

    it('should return sqrt(14) as magnitude if arg is 1, 2, 3', () => {
        expect(magnitude([1, 2, 3])).toBe(Math.sqrt(14))
    });

    it('should return sqrt(14) as magnitude if arg is -1, -2, -3', () => {
        expect(magnitude([-1, -2, -3])).toBe(Math.sqrt(14))
    });
})

describe('normalize', () => {
    it('should return a vector(1, 0, 0) if arg is vector(4, 0, 0)', () => {
        expect(normalize(vector(4, 0, 0))).toStrictEqual(vector(1, 0, 0)) 
    });

    it('should return a vector(0.26726, 0.53452, 0.80178) if arg is vector(4, 0, 0)', () => {
        //rough implementation
        const x = 1;
        const y = 2;
        const z = 3;
        const myVector = vector(x, y, z, 0);
        const result = normalize(myVector);
        expect(result[0]).toBeCloseTo(0.26726, 5);
        expect(result[1]).toBeCloseTo(0.53452, 5);
        expect(result[2]).toBeCloseTo(0.80178, 5);
    });
})