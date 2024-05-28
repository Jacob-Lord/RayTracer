const EPSILON = 0.00001;

export function areTuplesEqual([x1, y1, z1, w1], [x2, y2, z2, w2]) {
    if (Math.abs(x1-x2) < EPSILON && Math.abs(y1-y2) < EPSILON && Math.abs(z1-z2) < EPSILON && Math.abs(w1-w2) < EPSILON) {
        return true;
    }
    else {
        return false;
    }
}

export function equal(a, b) {
    if (Math.abs(a-b) < EPSILON) {
        return true;
    }
    else {
        return false;
    }
}

export function isVector(x, y, z, w) {
    return (w == 1.0) ? false : true;
}

export function point(x, y, z) {
    return [x, y, z, 1.0];
}

export function vector(x, y, z) {
    let vector = [x, y, z, 0];
    return vector;
}

export function addTuples([x1, y1, z1, w1], [x2, y2, z2, w2]) {
    return (w1 == 1 && w2 == 1) ? undefined : [(x1+x2), (y1+y2), (z1+z2), (w1+w2)];
}

export function subtractTuples([x1, y1, z1, w1], [x2, y2, z2, w2]) {
    return [(x1-x2), (y1-y2), (z1-z2), (w1-w2)];
}

export function negateTuple([x, y, z, w]) {
    return [(0-x), (0-y), (0-z), (0-w)];
}

export function multiplyTuple(tuple, value) {
    return [(tuple[0]*value), (tuple[1]*value), (tuple[2]*value), (tuple[3]*value)]
}

export function magnitude(tuple) {
    return Math.sqrt((tuple[0]**2) + (tuple[1]**2) + (tuple[2]**2) + (tuple[3]**2));
}

export function normalize(vector)  {
    const val = multiplyTuple(vector, (1/magnitude(vector)));
    return val;
}

export function dot(vectorA, vectorB) {
    return (vectorA[0] * vectorB[0]) + (vectorA[1] * vectorB[1]) + (vectorA[2] * vectorB[2] + (vectorA[3] * vectorB[3]));
}

export function cross(vectorA, vectorB) {
    return vector(((vectorA[1]*vectorB[2]) - (vectorA[2] * vectorB[1])), ((vectorA[2] * vectorB[0]) - (vectorA[0] * vectorB[2])), ((vectorA[0] * vectorB[1]) - (vectorA[1] * vectorB[0])));
}

export function color(red, green, blue) {
    let c = {
        red: red,
        green: green,
        blue: blue
    };
    return c;
}

export function addColors(c1, c2) {
    return color((c1.red + c2.red), (c1.green + c2.green), (c1.blue + c2.blue));    
}

export function subtractColors(c1, c2) {
    return color((c1.red - c2.red).toPrecision(), (c1.green - c2.green), (c1.blue - c2.blue));  
}

export function multiplyColor(c, factor) {
    return (color((c.red * factor), (c.green * factor), (c.blue * factor)));
}

export function hadamard_product(c1, c2) {
    //multiple two colors together as a method of blending colors
    return color((c1.red * c2.red), (c1.green * c2.green), (c1.blue * c2.blue))
}

