import { point } from "./tuples.feature.js";



export function translation(x, y, z) {
    let identity_matrix = [[1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]];

    identity_matrix[0][3] += x;
    identity_matrix[1][3] += y;
    identity_matrix[2][3] += z;
    
    return identity_matrix;
}