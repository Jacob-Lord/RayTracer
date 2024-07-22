import {describe, expect, it } from "vitest";
import { Point_light } from "../src/libs/lights.feature";
import { color, point } from "../src/libs/tuples.feature";
import { Sphere } from "../src/libs/spheres.feature";
import { scaling } from "../src/libs/transformations.feature";

describe(World, () => {
    it('should be an empty world when initialized', () => {
        let w = new World();
        expect(w.objects).toBe(null);
        expect(w.light).toBe(null);
    })
})

describe(default_world, () => {
    it('world should be configured to default values', () => {
        //initialize expected default light source
        let light = new Point_light(point(-10, 10, -10), color(1, 1, 1));
        //initialize first sphere and its material properties
        let s1 = new Sphere(1);
        s1.material.color = color(0.8, 1.0, 0.6);
        s1.material.diffuse = 0.7;
        s1.material.specular = 0.2;

        //initialize second sphere and its transformation
        let s2 = new Sphere(2);
        s2.transform = scaling(0.5, 0.5, 0.5);

        //initialize default world
        let w = default_world();
        
        //test expectations
        expect(w.light).toStrictEqual(light);
        expect(w.objects).toContain(s1);
        expect(w.objects).toContain(s2);
    })
})

describe(intersect_world, () => { //intersect_world must return intersections in sorted order to work
    it('intersect a world with a ray', () => {
        let w = default_world()
        let r = new Ray(point(0, 0, 0-5), vector(0, 0, 1))
        let xs = intersect_world(w, r)
        expect(xs.length).toBe(4)
        expect(xs[0].t).toBe(4)
        expect(xs[0].t).toBe(4.5)
        expect(xs[0].t).toBe(5.5)
        expect(xs[0].t).toBe(6)
    })
})