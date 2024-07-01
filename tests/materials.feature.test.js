import {describe, test, it, expect} from "vitest";
import { lighting, Material } from "../src/libs/materials.feature";
import { areColorsEqual, areTuplesEqual, color, normalize, point, vector } from "../src/libs/tuples.feature";
import { Point_light } from "../src/libs/lights.feature";

describe(Material, () => {
    it('should have a default material', () => {
        let m = new Material(1);
        expect(m.color).toStrictEqual(color(1, 1, 1));
        expect(m.ambient).toBe(0.1);
        expect(m.diffuse).toBe(0.9);
        expect(m.specular).toBe(0.9);
        expect(m.shininess).toBe(200.0);
    });
})

describe(lighting, () => {
    it("should return the correct lighting values with the eye between the light and surface", () => {
        let m = new Material(1);
        let position = point(0, 0, 0);
        let eyev = vector(0, 0, -1);
        let normalv = vector(0, 0, -1);
        let light = new Point_light(point(0, 0, -10), color(1, 1, 1));
        let result = lighting(m, light, position, eyev, normalv);
        expect(areColorsEqual(result, color(1.9, 1.9, 1.9))).toBe(true);
    });

    it("should return correct lighting values with the eye between the light and surface, eye offset 45 degrees", () => {
        let m = new Material(2);
        let position = point(0, 0, 0);
        let eyev = vector(0, Math.sqrt(2)/2, -Math.sqrt(2)/2);
        let normalv = vector(0, 0, -1);
        let light = new Point_light(point(0, 0, -10), color(1, 1, 1));
        let result = lighting(m, light, position, eyev, normalv);
        expect(areColorsEqual(result, color(1.0, 1.0, 1.0))).toBe(true);
    });

    it("lighting with eye opposite surface, light offset 45 degrees", () => {
        let m = new Material(3);
        let position = point(0, 0, 0);
        let eyev = vector(0, 0, -1);
        let normalv = vector(0, 0, -1);
        let light = new Point_light(point(0, 10, -10), color(1, 1, 1));
        let result = lighting(m, light, position, eyev, normalv);
        expect(areColorsEqual(result, color(0.7364, 0.7364, 0.7364))).toBe(true);
    });

    it("lighting with eye in the path of reflection vector", () => {
        let m = new Material(4);
        let position = point(0, 0, 0);
        let eyev = vector(0, -Math.sqrt(2)/2, -Math.sqrt(2)/2);
        let normalv = vector(0, 0, -1);
        let light = new Point_light(point(0, 10, -10), color(1, 1, 1));
        let result = lighting(m, light, position, eyev, normalv);
        expect(areColorsEqual(result, color(1.6364, 1.6364, 1.6364))).toBe(true);
    });

    it("lighting with light behind the surface", () => {
        let m = new Material(5);
        let position = point(0, 0, 0);
        let eyev = vector(0, 0, -1);
        let normalv = vector(0, 0, -1);
        let light = new Point_light(point(0, 0, 10), color(1, 1, 1));
        let result = lighting(m, light, position, eyev, normalv);
        expect(areColorsEqual(result, color(0.1, 0.1, 0.1))).toBe(true);
    });
})