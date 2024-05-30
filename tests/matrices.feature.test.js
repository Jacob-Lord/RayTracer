import {describe, test, it, expect} from "vitest";
import { equal, point } from "../src/libs/tuples.feature";
import { matrix, areMatricesEqual, multiplyMatrix } from "../src/libs/matrices.feature";

const identity_matrix = [[1, 0, 0, 0],
                         [0, 1, 0, 0],
                         [0, 0, 1, 0],
                         [0, 0, 0, 1]];


describe(matrix, () => {
    it('should return a 4x4 matrix with 16 values', () => {

        //initialize matrix values
        let size = 4;
        let test_data = [1, 2, 3, 4];
        let passct = 0;

        //create empty 4x4 matrix
        let myMatrix = matrix(size);

        //initialize matrix with test data from book by James Buck
        for (let i = 0 ; i < size; i++) {
            for (let j = 0; j < size; j++) {
                myMatrix[i][j] = test_data[j];

                //creates test_data from the book, the pattern is one row is +4.5 the following is +3.5
                if(passct % 2 == 0) {
                 test_data[j] += 4.5;
                }
                else {
                    test_data[j] += 3.5;
                }
            }
            passct++;
        }

        //test to make sure values are in correct locations in matrix
        expect(myMatrix[0][0]).toBe(1);
        expect(myMatrix[0][3]).toBe(4);
        expect(myMatrix[1][0]).toBe(5.5);
        expect(myMatrix[1][2]).toBe(7.5);
        expect(myMatrix[2][2]).toBe(11);
        expect(myMatrix[3][0]).toBe(13.5);
        expect(myMatrix[3][2]).toBe(15.5);
    })

    it('should return a 2x2 matrix with the proper values', () => {
        let myMatrix = matrix(2);
        let row1 = [-3, 5];
        let row2 = [1, -2];
        for (let i = 0; i < 2; i++) {
            myMatrix[0][i] = row1[i];
            myMatrix[1][i] = row2[i];
        }

        expect(myMatrix[0][0]).toBe(-3);
        expect(myMatrix[0][1]).toBe(5);
        expect(myMatrix[1][0]).toBe(1);
        expect(myMatrix[1][1]).toBe(-2);
    })

    it('should return a 3x3 matrix with the proper values', () => {
        //initialize variables
        let size = 3;
        let myMatrix = matrix(size);
        let row1 = [-3, 5, 0];
        let row2 = [1, -2, -7];
        let row3 = [0, 1, 1];

        //initialize matrix with values
        for (let i = 0; i < size; i++) {
            myMatrix[0][i] = row1[i];
            myMatrix[1][i] = row2[i];
            myMatrix[2][i] = row3[i];
        }

        //test that matrix is correctly formatted
        expect(myMatrix[0][0]).toBe(-3);
        expect(myMatrix[1][1]).toBe(-2);
        expect(myMatrix[2][2]).toBe(1);
    })
})

describe(areMatricesEqual, () => {
    it('should return true if matrices are equal', () => {
        let size = 4;
        let myMatrixA = matrix(size);
        let myMatrixB = matrix(size);
        let row1 = [1, 2, 3, 4];
        let row2 = [5, 6, 7, 8];
        let row3 = [9, 8, 7, 6];
        let row4 = [5, 4, 3, 2];

        //initialize first matrix with vals
        for (let i = 0; i < size; i++) {
            myMatrixA[0][i] = row1[i];
            myMatrixA[1][i] = row2[i];
            myMatrixA[2][i] = row3[i];
            myMatrixA[3][i] = row4[i];
        }

        //initialize second matrix with vals
        for (let i = 0; i < size; i++) {
            myMatrixB[0][i] = row1[i];
            myMatrixB[1][i] = row2[i];
            myMatrixB[2][i] = row3[i];
            myMatrixB[3][i] = row4[i];
        }

        //compare matrices for equality
        let result = areMatricesEqual(myMatrixA, myMatrixB);

        //test result
        expect(result).toBe(true);
    })

    it('should return false if matrices are not equal', () => {

        //set values for matrix
        let size = 4;
        let myMatrixA = matrix(size);
        let myMatrixB = matrix(size);
        let row1 = [1, 2, 3, 4];
        let row2 = [5, 6, 7, 8];
        let row3 = [9, 8, 7, 6];
        let row4 = [5, 4, 3, 2];

        //initialize first matrix with vals
        for (let i = 0; i < size; i++) {
            myMatrixA[0][i] = row1[i];
            myMatrixA[1][i] = row2[i];
            myMatrixA[2][i] = row3[i];
            myMatrixA[3][i] = row4[i];
        }

        //update values for second matrix
        row1 = [2, 3, 4, 5];
        row2 = [6, 7, 8, 9];
        row3 = [8, 7, 6, 5];
        row4 = [4, 3, 2, 1];

        //initialize second matrix with vals
        for (let i = 0; i < size; i++) {
            myMatrixB[0][i] = row1[i];
            myMatrixB[1][i] = row2[i];
            myMatrixB[2][i] = row3[i];
            myMatrixB[3][i] = row4[i];
        }

        //compare matrices for equality
        let result = areMatricesEqual(myMatrixA, myMatrixB);

        //test result
        expect(result).toBe(false);
    })
})

describe(multiplyMatrix, () => {
    it('should return the correct 4x4 matrix', () => {

        //initialize values for matrix A
        const size = 4;
        let A = matrix(size);
        let row1 = [1, 2, 3, 4];
        let row2 = [5, 6, 7, 8];
        let row3 = [9, 8, 7, 6];
        let row4 = [5, 4, 3, 2];

        //initialize first matrix with vals
        for (let i = 0; i < size; i++) {
            A[0][i] = row1[i];
            A[1][i] = row2[i];
            A[2][i] = row3[i];
            A[3][i] = row4[i];
        }

        //initialize values for matrix B
        row1 = [-2, 1, 2, 3];
        row2 = [3, 2, 1, -1];
        row3 = [4, 3, 6, 5];
        row4 = [1, 2, 7, 8];

        //initialize second matrix 
        let B = matrix(size);
        for (let i = 0; i < size; i++) {
            B[0][i] = row1[i];
            B[1][i] = row2[i];
            B[2][i] = row3[i];
            B[3][i] = row4[i];
        }

        //initialize values for expected matrix mult. result
        let C = matrix(size);
        row1 = [20, 22, 50, 48];
        row2 = [44, 54, 114, 108];
        row3 = [40, 58, 110, 102];
        row4 = [16, 26, 46, 42];

        //set values for expected matrix
        for (let i = 0; i < size; i++) {
            C[0][i] = row1[i];
            C[1][i] = row2[i];
            C[2][i] = row3[i];
            C[3][i] = row4[i];
        }

        let result = multiplyMatrix(A, B);
        //test result
        expect(result).toStrictEqual(C);
    })

    it('should return the correct tuple when args are matrix and a tuple', () => {

        //init values for matrix
        let size = 4;
        let A = matrix(size);
        let row1 = [1, 2, 3, 4];
        let row2 = [2, 4, 4, 2];
        let row3 = [8, 6, 4, 1];
        let row4 = [0, 0, 0, 1];

        //initialize matrix with vals
        for (let i = 0; i < size; i++) {
            A[0][i] = row1[i];
            A[1][i] = row2[i];
            A[2][i] = row3[i];
            A[3][i] = row4[i];
        }

        //init tuple
        let b = point(1, 2, 3, 1);
        let result = multiplyMatrix(A, b);
        
        //test result
        expect(result).toStrictEqual(point(18, 24, 33, 1));
    })

    it('should return the same matrix when multiplied by the identity matrix', () => {        
        //set values for matrix A
        const row1 = [0, 1, 2, 4];
        const row2 = [1, 2, 4, 8];
        const row3 = [2, 4, 8, 16];
        const row4 = [4, 8, 16, 32];

        //initialize matrix A
        let A = matrix(4);
        for (let i = 0; i < 4; i++) {
            A[0][i] = row1[i];
            A[1][i] = row2[i]; 
            A[2][i] = row3[i];
            A[3][i] = row4[i];
        }

        const result = multiplyMatrix(A, identity_matrix);

        //test result
        expect(result).toStrictEqual(A);
    })

    it('should return the same tuple when multipled by the identity matrix', () => {
        const a = [1, 2, 3, 4];
        const result = multiplyMatrix(identity_matrix, a);
        expect(result).toStrictEqual(a);
    })

})