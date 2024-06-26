import {describe, test, it, expect} from "vitest";
import { canvas , write_pixel, pixel_at, canvas_to_ppm} from "../src/libs/canvas.feature";
import { color } from "../src/libs/tuples.feature";
import { readFile, unlink } from "fs";

describe('canvas', () => {
    it('should return  a 10px x 20px canvas if args are width = 10 and height = 20. Every pixel should be initialized to black color(0, 0, 0)', () => {
        let w = 10;
        let h = 20;
        let myCanvas = canvas(w, h)

        expect(myCanvas.length).toBe(20);
        
        //for (let x = 0; x < w; x++) {
            //expect(myCanvas[x].length).toBe(20);
            myCanvas.forEach((val) => expect(val.length).toBe(10)); //multiple for loops (could be optimized for sure)
            myCanvas.forEach((val) => val.forEach((c) => expect(c).toStrictEqual(color(0, 0, 0)))); 
    });
})

describe('write_pixel', () => {
    it('should convert pixel_at(c, 2, 3) to red when given the args (c, 2, 3, red)', () => {
        let c = canvas(10, 20);
        let red = color(1, 0, 0);
        write_pixel(c, 2, 3, red);
        let pixel = pixel_at(c, 2, 3)
        expect(pixel).toBe(red);
    });
})

describe('canvas_to_ppm', () => {
    // it('should create a file with a PPM-formatted header', () => {
    //     const w = 5;
    //     const h = 3;
    //     let c = canvas(w, h);
    //     let ppm = canvas_to_ppm(c);
    //     readFile('myPPMfile.ppm', 'utf8', (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }
    //         expect(data).toBe(ppm);

    //         //delete file after use
    //         unlink('myPPMfile.ppm', function (err) {
    //             if (err) throw err;
    //           });
    //     });
    // });

    // it('should have pixel data constructed correctly for a canvas with 3 pixels colored', () => {
    //     const w = 5;
    //     const h = 3;
    //     let c = canvas(w, h);
    //     const c1 = color(1.5, 0, 0);
    //     const c2 = color(0, 0.5, 0);
    //     const c3 = color(-0.5, 0, 1);
    //     write_pixel(c, 0, 0, c1);
    //     write_pixel(c, 2, 1, c2);
    //     write_pixel(c, 4, 2, c3);
    //     const ppm = canvas_to_ppm(c);
        
    //     readFile('myPPMfile.ppm', 'utf8', (err, data) => {
    //         if (err) {
    //             console.error(err);
    //             return;
    //         }    
    //         expect(data).toBe(ppm);
            
    //         //delete file after use
    //         unlink('myPPMfile.ppm', function (err) {
    //             if (err) throw err;
    //           });
    //     });
    // });

    it('given a canvas where every pixel is a color, ensure pixel data lines are < 70 characters.', () => {
        const w = 10;
        const h = 2;
        const c = canvas(w, h);
        const c1 = color(1, 0.8, 0.6);

        //color each pixel in canvas the same color
        for (let i = 0; i < c.length; i++) {
            for (let j = 0; j < c[i].length; j++) {
                write_pixel(c, j, i, c1);
            }
        }

        const ppm = canvas_to_ppm(c);
        readFile('myPPMfile.ppm', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }    
            
            expect(data).toMatch(ppm);
        });
    });

    it('should end with a newline character for image processors that require it', () => {
        readFile('myPPMfile.ppm', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }    
            expect(data[data.length-1]).toBe('\n');
        });
    })
})

