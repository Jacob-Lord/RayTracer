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
                console.log('pass)');
                return false;
               }
               }
            }
        return true;
        }
}

export function inverse(A) {
    if (determinant(A) != 0) {
        let invertedMatrix = matrix(4);

        for (let i = 0; i < A.length; i++) {
            for (let j = 0; j < A[i].length; j++) {
                let c = cofactor(A, i, j);
                invertedMatrix[j][i] = (c / determinant(A)); //matrix[col][row] instead of [row][col] accomplishes the transpose operation!
            }
        }
        return invertedMatrix;
    }
    else {
        return;
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

export function transpose(A) {
    const size = A.length;
    let temp = matrix(size);

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            temp[col][row] = A[row][col];
        }
    }

    return temp;

}

export function determinant(A) {
    //if matrix is 2x2, calculate determinant using ad - bc
    if(A.length == 2) {
        let ad = A[0][0] * A[1][1];
        let bc = A[0][1] * A[1][0];
        return (ad - bc);
    }
    //if matrix is 3x3 or larger, multiply a row by the cofactor and sum to calculate determinant
    else {
        let determinant = 0;
        for (let i = 0; i < A[0].length; i++) {
            determinant += (A[0][i] * cofactor(A, 0, i));
        }
        return determinant;
    }
}

export function submatrix(A, row, col) {
    let size = A.length;
    //submatrix will be a step down from the 
    let result_matrix = matrix(size-1);
    let row_count = 0;
    let col_count = -1; //offset by one for iteration in double loop

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (i != row && j != col) {
                if (col_count < result_matrix.length-1) {
                    col_count++;
                }
                else {
                    col_count = 0;
                    row_count++;
                }
                result_matrix[row_count][col_count] = A[i][j];
            }
        }   
    }
    return result_matrix;
}

export function minor(A, row, col) {
    let B = submatrix(A, row, col);
    return determinant(B);
}

export function cofactor(A, row, col) {
    let m = minor(A, row, col);

    if((row + col) % 2 == 0) {
        return m;
    }
    else {
        return m * -1;
    }
}