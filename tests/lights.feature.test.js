import { describe, expect, it } from "vitest";
import { Point_light } from "../src/libs/lights.feature";
import { color, point } from "../src/libs/tuples.feature";
describe(Point_light, () => {
    it('point light should have a position and intensity', () => {
        let intensity = color(1, 1, 1);
        let position = point(0, 0, 0);
        let light = new Point_light(position, intensity);
        expect(light.position).toBe(position);
        expect(light.intensity).toBe(intensity);
    });
})