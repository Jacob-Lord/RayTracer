import { equal, point } from "./tuples.feature.js";

export function matrix(size) { 
    //all matrices are square, only one parameter for size is necessary
    let matrix = new Array(size);
        for (let i = 0 ; i < size; i++) {
            matrix[i] = new Array(size);
        }
    return matrix;
}

export function areMatricesEqual(matrixA, matrixB) {
    let sizeA = matrixA.length;
    let sizeB = matrixB.length;
    
    //check that matrices are the same size
    if (sizeA != sizeB) {
        return false;
    }

    //compare matrices for equality
    else {
        for (let i = 0; i < sizeA; i++) {
            for (let j = 0; j < sizeB; j++) {
               if (!(equal(matrixA[i][j], matrixB[i][j]))) {
                return false;
               }
               }
            }
        return true;
        }
}

export function multiplyMatrix(A, B) {
    //larger matrix must be the first parameter!!!
    //this reassignment portion fixes this issue (patchwork maybe)
    const a = A;
    const b = B;
    //reassigns vars if first parameter is smaller
    if (A.length < B.length) {
        let a = B;
        let b = A;
    }

    //initialize matrix
    let size = a.length;
    let result = 0;

    console.log(typeof b[0]);
    if (typeof b[0] == 'object') {
        let M = matrix(size);
        for (let row = 0; row < a.length; row++) {
            for (let col = 0; col < b.length; col++) {
                    M[row][col] = (a[row][0] * b[0][col]) + (a[row][1] * b[1][col]) + (a[row][2] * b[2][col]) + (a[row][3] * b[3][col]);
            }
        }
        return M;
    }

    else if (typeof b[0] == 'number') {
        let N = [size];
        for (let row = 0; row < a.length; row++) {
                for (let col = 0; col < b.length; col++) {
                    N[row] = (a[row][0] * b[0]) + (a[row][1] * b[1]) + (a[row][2] * b[2]) + (a[row][3] * b[3]);
                }
            }
        return N;
        }
           

    return ;
}
