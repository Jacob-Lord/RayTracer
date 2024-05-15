const EPSILON = 0.00001;

export function areTuplesEqual(a = [x1, y1, z1, w1], b = [x2, y2, z2, w2]) {
    return (a === b) ? true: false;
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
    return [x, y, z, 0];
}