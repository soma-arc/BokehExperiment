import Transform from '../src/geometry/transform.js';
import Point3 from '../src/geometry/point3.js';
import Vec3 from '../src/geometry/vector3.js';
const assert = require('power-assert');

describe('Transform', () => {
    const p = new Point3(1, 1, 1);
    const v = new Vec3(1, 1, 1);
    const v2 = new Vec3(3, 2, -4);
    const INV_SQRT_2 = 1.0 / Math.sqrt(2);

    describe('translate', () => {
        it('should return translate matrix', () => {
            const translate = Transform.translate(10, 20, -10);
            assert.ok(translate.applyToVec(v).eq(new Vec3(11, 21, -9)));
        });
    });

    describe('rotateX', () => {
        it('should return rotation matrix along X-axis', () => {
            assert.ok(Transform.rotateX(90).applyToVec(v).eq(new Vec3(1, -1, 1)));
            assert.ok(Transform.rotateX(45).applyToVec(v2).eq(
                new Vec3(3, 2 * INV_SQRT_2 + 4 * INV_SQRT_2, -4 * INV_SQRT_2 + 2 * INV_SQRT_2)));
        });
    });

    describe('rotateY', () => {
        it('should return rotation matrix along Y-axis', () => {
            assert.ok(Transform.rotateY(90).applyToVec(v).eq(new Vec3(1, 1, 1)));
            assert.ok(Transform.rotateY(45).applyToVec(v2).eq(
                new Vec3(3 * INV_SQRT_2 - 4 * INV_SQRT_2, 2, -4 * INV_SQRT_2 - 3 * INV_SQRT_2)));
        });
    });

    describe('rotateZ', () => {
        it('should return rotation matrix along Z-axis', () => {
            assert.ok(Transform.rotateZ(90).applyToVec(v).eq(new Vec3(-1, 1, 1)));
            assert.ok(Transform.rotateZ(45).applyToVec(v2).eq(
                new Vec3(3 * INV_SQRT_2 - 2 * INV_SQRT_2, 2 * INV_SQRT_2 + 3 * INV_SQRT_2, -4)));
        });
    });

    describe('scale', () => {
        it('should return scaling matrix', () => {
            assert.ok(Transform.scale(10, 20, -30).applyToVec(v).eq(new Vec3(10, 20, -30)));
        });
    });

    // describe('rotate', () => {
    //     it('should return rotation matrix', () => {
    //         console.log(Transform.rotate(45, new Vec3(1, 2, 1)).applyToVec(v2));
    //         console.log(new Vec3(0.5 + 2.5 * INV_SQRT_2 - 4.08248 * INV_SQRT_2,
    //                      1 + INV_SQRT_2 + 2.85774 * INV_SQRT_2,
    //                              0.5 - 4.5 * INV_SQRT_2 - 1.63299 * INV_SQRT_2));
    //         assert.ok(Transform.rotate(45, new Vec3(1, 2, 1)).applyToVec(v2).eq(
    //             new Vec3(0.5 + 2.5 * INV_SQRT_2 - 4.08248 * INV_SQRT_2,
    //                      1 + INV_SQRT_2 + 2.85774 * INV_SQRT_2,
    //                      0.5 - 4.5 * INV_SQRT_2 - 1.63299 * INV_SQRT_2)));
    //     });
    // });
});
