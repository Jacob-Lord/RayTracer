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


    //initialize matrix
    let size = A.length;
    let result = 0;


    if (typeof B[0] == 'object') {
        let M = matrix(size);
        for (let row = 0; row < A.length; row++) {
            for (let col = 0; col < B.length; col++) {
                    M[row][col] = (A[row][0] * B[0][col]) + (A[row][1] * B[1][col]) + (A[row][2] * B[2][col]) + (A[row][3] * B[3][col]);
            }
        }
        return M;
    }

    else if (typeof B[0] == 'number') {
        let N = [size];
        for (let row = 0; row < A.length; row++) {
                for (let col = 0; col < B.length; col++) {
                    N[row] = (A[row][0] * B[0]) + (A[row][1] * B[1]) + (A[row][2] * B[2]) + (A[row][3] * B[3]);
                }
            }
        return N;
        }
           
        

    // for (let row = 0; row < A.length; row++) {
    //     for (let col = 0; col < B.length; col++) {
    //         console.log(typeof B[col]);
    //         if (typeof B[col] == 'object') {
    //             M[row][col] = (A[row][0] * B[0][col]) + (A[row][1] * B[1][col]) + (A[row][2] * B[2][col]) + (A[row][3] * B[3][col]);
    //         }
    //         else if (typeof B[col] == 'number') {
    //             N[row] = (A[row][0] * B[col]) + (A[row][1] * B[col]) + (A[row][2] * B[col]) + (A[row][3] * B[col]);
    //         }
    //     }
    // }

    return ;
}
