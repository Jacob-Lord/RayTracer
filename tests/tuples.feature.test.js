import {describe, test, it, expect} from "vitest";
import { isVector, point, vector, equal, areTuplesEqual, addTuples, subtractTuples, negateTuple, multiplyTuple, magnitude, normalize, dot, cross, color, addColors, reflect, subtractColors, multiplyColor, hadamard_product } from "../src/libs/tuples.feature";

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
    it('should return 1 as magnitude if arg is 1, 0, 0', () => {
        expect(magnitude(vector(1, 0, 0))).toBe(1)
    });

    it('should return 1 as magnitude if arg is 0, 1, 0', () => {
        expect(magnitude(vector(0, 1, 0))).toBe(1)
    });

    it('should return 1 as magnitude if arg is 1, 0, 0', () => {
        expect(magnitude(vector(0, 0, 1))).toBe(1)
    });

    it('should return sqrt(14) as magnitude if arg is 1, 2, 3', () => {
        expect(magnitude(vector(1, 2, 3))).toBe(Math.sqrt(14))
    });

    it('should return sqrt(14) as magnitude if arg is -1, -2, -3', () => {
        expect(magnitude(vector(-1, -2, -3))).toBe(Math.sqrt(14))
    });
})

describe('normalize', () => {
    it('should return a vector(1, 0, 0) if arg is vector(4, 0, 0)', () => {
        expect(normalize(vector(4, 0, 0))).toStrictEqual(vector(1, 0, 0)) 
    });

    it('should return a vector(0.26726, 0.53452, 0.80178) if arg is vector(4, 0, 0)', () => {
        //rough implementation
        const result = normalize(vector(1, 2, 3));
        expect(result[0]).toBeCloseTo(0.26726, 5);
        expect(result[1]).toBeCloseTo(0.53452, 5);
        expect(result[2]).toBeCloseTo(0.80178, 5);
    });
})

describe('dot', () => {
    it('should return scalar value of 20 if arg is vector(1, 2, 3) and vector(2, 3, 4)', ()  => {
        const vectorA = vector(1, 2, 3);
        const vectorB = vector(2, 3, 4);
        expect(dot(vectorA, vectorB)).toBe(20)
    });
})

describe('cross', () => {
    it('should return a vector(-1, 2, -1)', () => {
        const vectorA = vector(1, 2, 3);
        const vectorB = vector(2, 3, 4);
        expect(cross(vectorA, vectorB)).toStrictEqual(vector(-1, 2, -1));
    });

    it('should return a vector(1, -2, 1)', () => {
        const vectorA = vector(1, 2, 3);
        const vectorB = vector(2, 3, 4);
        expect(cross(vectorB, vectorA)).toStrictEqual(vector(1, -2, 1));
    });
})

describe('color', () => {
    it('should have correct properties if arg is color(-0.5, 0.4, 1.7)', () => {
        let c = color(-0.5, 0.4, 1.7);
        expect(c.red).toBe(-0.5);
        expect(c.green).toBe(0.4);
        expect(c.blue).toBe(1.7);
    });
})

describe('addColors', () => {
    it('should return color(1.6, 0.7, 1.0)', () => {
        let c1 = color(0.9, 0.6, 0.75);
        let c2 = color(0.7, 0.1, 0.25);
        expect(addColors(c1, c2)).toStrictEqual(color(1.6, 0.7, 1.0))
    });
})

describe('subtractColors', () => {
    it('should return color(0.2, 0.5, 0.5)', () => {
        let c1 = color(0.9, 0.6, 0.75);
        let c2 = color(0.7, 0.1, 0.25);
        let c3 = subtractColors(c1, c2);
        expect(c3.red).toBeCloseTo(0.2);
        expect(c3.green).toBeCloseTo(0.5);
        expect(c3.blue).toBeCloseTo(0.5);
    });
})

describe('multiplyColor', () => {
    it('should return color(0.4, 0.6, 0.8)', () => {
        let c = color(0.2, 0.3, 0.4);
        expect(multiplyColor(c, 2)).toStrictEqual(color(0.4, 0.6, 0.8));
    });
})

describe('hadamard_product', () => {
    it('should return color(0.9, 0.2, 0.04)', () => {
        let c1 = color(1, 0.2, 0.4);
        let c2 = color(0.9, 1, 0.1);
        let c3 = hadamard_product(c1, c2);
        expect(c3.red).toBeCloseTo(0.9);
        expect(c3.green).toBeCloseTo(0.2);
        expect(c3.blue).toBeCloseTo(0.04);
    });
})

describe('reflect', () => {
    it('should reflect a vector approaching at 45 degrees', () => {
        let v = vector(1, -1, 0);
        let n = vector(0, 1, 0);
        let r = reflect(v, n);
        expect(areTuplesEqual(r, vector(1, 1, 0))).toBe(true);
    });

    it('should reflect a vector off a slanted surface', () => {
        let v = vector(0, -1, 0);
        let n = vector(Math.sqrt(2)/2, Math.sqrt(2)/2, 0);
        let r = reflect(v, n);
        expect(areTuplesEqual(r,vector(1, 0, 0))).toBe(true);
    })
})