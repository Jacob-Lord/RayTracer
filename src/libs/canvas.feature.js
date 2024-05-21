import { color } from "../libs/tuples.feature";

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
