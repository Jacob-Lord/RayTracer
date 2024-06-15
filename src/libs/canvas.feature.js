import { color, multiplyColor } from "./tuples.feature.js";
import * as fs from "fs";

export function canvas(width, height) {
    let canvas= new Array(height);

    for (let i = 0; i < canvas.length; i++) {
      canvas[i] = new Array(width);
      for (let j = 0; j < canvas[i].length; j++) {
        canvas[i][j] = color(0, 0, 0);
      }
    }
    return canvas;
}

export function pixel_at(c, x, y) {
    let pixel = c[y][x];
    return pixel;
}

export function write_pixel(c, x, y, color) {
  if (y < c.length && y >= 0) {
    c[y][x] = color;
  }
}

export function canvas_to_ppm(c) {

  //initialize height and width
  let h = c.length;
  let w = c[h-1].length; //display is rectangular, so first 

  //initialize ppm file header 
  const file_header = ("P3\n" + w + " " + h + "\n255\n");

  //will hold pixel data
  let file_body = "";
  let file_string = "";

  //iterate and create string representing pixels from canvas to be added to file
  c.forEach(element => {
    element.forEach(pixel => {

      //reduce pixel colors to a range of (0, 1)
      pixel.red = scalePixel(pixel.red);
      pixel.green = scalePixel(pixel.green);
      pixel.blue = scalePixel(pixel.blue);

      //scale colors by 255 (maximum color value given in header)
      pixel = multiplyColor(pixel, 255);

      let red = pixel.red;
      let green = pixel.green;
      let blue = pixel.blue;

      //round values to whole numbers
      red = Math.round(red);
      green = Math.round(green);
      blue = Math.round(blue);


      //add pixel values to file body
      if (check_file_size(file_string)) {
        //temp var to store original file_body
        let temp = file_string;
        temp += (red + " ");
        temp += (green + " ");
        temp += (blue + " ");
        
        if(!check_file_size(temp)) {
          file_string += "\n"
          file_string += (red + " ");
          file_string += (green + " ");
          file_string += (blue + " ");
          file_body += file_string;
          file_string = "";
        }
        else {
          file_body += temp;
        }
      }
    
    });
    file_body += "\n";
  });

  const file_contents = file_header + file_body;

  const file_name = "myPPMfile.ppm";
  fs.writeFile(file_name, file_contents, err => {
    if (err) {
      console.error(err);
      return;
    }
  })


  return file_contents;

  function check_file_size(string) {
    if (string.length < 70) { 
      return true;
  }
  else {
    return false;
  }
  }
  function scalePixel(pixel_color) {
    if (pixel_color > 1) {
      pixel_color = 1;
    }
    else if (pixel_color < 0) {
      pixel_color = 0;
    }
    return pixel_color;
  }
}