import { point } from "./tuples.feature.js";

export function translation(x, y, z) {
    //define the 4x4 identity matrix
    let identity_matrix = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

    //translation respectively affects the far right column of the matrix
    identity_matrix[0][3] += x;
    identity_matrix[1][3] += y;
    identity_matrix[2][3] += z;
    
    return identity_matrix;
}

export function shearing(xy, xz, yx, yz, zx, zy) {
    //define the 4x4 identity matrix
    let identity_matrix = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

    identity_matrix[0][1] = xy;
    identity_matrix[0][2] = xz;
    identity_matrix[1][0] = yx;
    identity_matrix[1][2] = yz;
    identity_matrix[2][0] = zx;
    identity_matrix[2][1] = zy;

    return identity_matrix;
}

export function scaling(x, y, z) {
    //define the 4x4 identity matrix
    let identity_matrix = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

    //scaling affects the matrix diagonally from top left to bottom right
    identity_matrix[0][0] = x;
    identity_matrix[1][1] = y;
    identity_matrix[2][2] = z;

    return identity_matrix;     
}

export function rotation_x(radians) {
        //define the 4x4 identity matrix
        let identity_matrix = [[1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 0, 0, 1]];

        identity_matrix[1][1] = Math.cos(radians);
        identity_matrix[1][2] = -(Math.sin(radians));
        identity_matrix[2][1] = Math.sin(radians);
        identity_matrix[2][2] = Math.cos(radians);

    return identity_matrix;
}

export function rotation_y(radians) {
    //define the 4x4 identity matrix
    let identity_matrix = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

    identity_matrix[0][0] = Math.cos(radians);
    identity_matrix[0][2] = (Math.sin(radians));
    identity_matrix[2][0] = -(Math.sin(radians));
    identity_matrix[2][2] = Math.cos(radians);

    return identity_matrix;
}

export function rotation_z(radians) {
    //define the 4x4 identity matrix
    let identity_matrix = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

    identity_matrix[0][0] = Math.cos(radians);
    identity_matrix[0][1] = -(Math.sin(radians));
    identity_matrix[1][0] = Math.sin(radians);
    identity_matrix[1][1] = Math.cos(radians);

    return identity_matrix;
}
