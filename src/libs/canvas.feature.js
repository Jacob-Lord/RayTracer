//import { color } from "../libs/tuples.feature";
import * as fs from "fs";
//const fs = require('fs');

export function canvas(width, height) {
    let canvas= new Array(width);

    for (let i = 0; i < canvas.length; i++) {
      canvas[i] = new Array(height);
      for (let j = 0; j < canvas[i].length; j++) {
        canvas[i][j] = color(0, 0, 0);
      }
    }
    return canvas;
}

export function pixel_at(c, x, y) {
    let pixel = c[x][y];
    return pixel;
}

export function write_pixel(c, x, y, color) {
    c[x][y] = color;
}

export function canvas_to_ppm(c) {
  let w = c.length;
  let h = c[w-1].length; //display is rectangular, so first 
  const file_contents = ("P3\n" + w + " " + h + "\n255 ");
  const file_name = "myPPMfile.txt";
  fs.writeFile(file_name, file_contents, err => {
    if (err) {
      console.error(err);
      return;
    }
  })
  return file_contents;
}


export function color(red, green, blue) {
  let c = {
      red: red,
      green: green,
      blue: blue
  };
  return c;
}


let c = canvas(5, 3);
let ppm = canvas_to_ppm(c);

console.log(ppm);
