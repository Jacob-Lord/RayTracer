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
    if (w == 0) {
        return [(0-x), (0-y), (0-z), w];
    }
    else {
        return console.log('cannot negate a point, only a vector');
    }
}

export function multiplyTuple(tuple, value) {
    return [(tuple[0]*value), (tuple[1]*value), (tuple[2]*value), (tuple[3]*value)]
}

export function magnitude(tuple) {
    return Math.sqrt((tuple[0]**2) + (tuple[1]**2) + (tuple[2]**2));
}

export function normalize(vector)  {
    const val = multiplyTuple(vector, (1/magnitude(vector)));
    return val;

}