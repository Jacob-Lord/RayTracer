import {describe, test, it, expect} from "vitest";

describe(material, () => {
    it('should have a default material', () => {
        let m = material();
        expect(m.color).toStrictEqual(color(1, 1, 1));
        expect(m.ambient).toBe(0.1);
        expect(m.diffuse).toBe(0.9);
        expect(m.specular).toBe(0.9);
        expect(m.shininess).toBe(200.0);
    });
})