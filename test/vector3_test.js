import Vec3 from '../src/geometry/vector3.js';
const assert = require('power-assert');

describe('Vec3', () => {
    const a = new Vec3(1, 2, 3);
    const b = new Vec3(4, 1, 5);
    const c = new Vec3(1, 2, 3);

    describe('eq', () => {
        it('should return true when the a is equal to b', () => {
            assert.ok(Vec3.eq(a, c));
            assert.ok(a.eq(c));
        });
        it('should return false when the a is not equal to b', () => {
            assert.equal(Vec3.eq(a, b), false);
            assert.equal(a.eq(b), false);
        });
    });

    describe('add', () => {
        it('should return (a, b, c) + (d, e, f) = (a + d, b + e, c + f)', () => {
            assert.ok(a.add(b).eq(new Vec3(5, 3, 8)));
        });
    })

    describe('sub', () => {
        it('should return (a, b, c) - (d, e, f) = (a - d, b - e, c - f)', () => {
            assert.ok(Vec3.eq(a.sub(b), new Vec3(-3, 1, -2)));
        });
    });

    describe('mult', () => {
        it('should return (a, b, c) * (d, e, f) = (a * d, b * e, c * f)', () => {
            assert.ok(Vec3.eq(a.mult(b), new Vec3(4, 2, 15)));
        });
    });

    describe('div', () => {
        it('should return (a, b, c) / (d, e, f) = (a / d, b / e, c / f)', () => {
            assert.ok(Vec3.eq(a.div(b), new Vec3(0.25, 2, 0.6)));
        });
    });

    describe('scale', () => {
        it('should return (a, b, c) * k = (a * k, b * k, c * k)', () => {
            assert.ok(Vec3.eq(a.scale(10), new Vec3(10, 20, 30)));
        });
    });

    describe('length', () => {
        it('should return length of the vector', () => {
            assert.ok(a.length() === Math.sqrt(14));
            assert.ok(b.length() === Math.sqrt(42));
        });
    });

    describe('lengthSq', () => {
        it('should return squared length of the vector', () => {
            assert.ok(a.lengthSq() === 14);
            assert.ok(b.lengthSq() === 42);
        });
    });

    describe('normalize', () => {
        it('should return normalized vector', () => {
            assert.ok(a.normalize().eq(new Vec3(1 / Math.sqrt(14),
                                                2 / Math.sqrt(14),
                                                3 / Math.sqrt(14))));
            assert.ok(b.normalize().eq(new Vec3(4 / Math.sqrt(42),
                                                1 / Math.sqrt(42),
                                                5 / Math.sqrt(42))));
        });
    });

    describe('dot', () => {
        it('should return dot product of the vectors', () => {
            assert.equal(Vec3.dot(a, b), 21);
            assert.equal(Vec3.dot(new Vec3(3, 4, 3), new Vec3(5, 6, 2)),
                         45);
        });

        it('dot(a, a) equals to a.lengthSq()', () => {
            assert.equal(Vec3.dot(a, a), a.lengthSq());
            assert.equal(Vec3.dot(b, b), b.lengthSq());
        });
    });

    describe('cross', () => {
        it('should return cross product of the vectors', () => {
            assert(Vec3.cross(a, b).eq(new Vec3(7, 7, -7)));
        });
    });

    const d1 = new Vec3(-1, -2, -3);
    const d2 = new Vec3(1, 2, 3);

    describe('abs', () => {
        it('should return (abs(a), abs(b))', () => {
            assert.ok(d1.abs().eq(d2));
        });
    });

    describe('opposite', () => {
        it('should return (-a, -b)', () => {
            assert.ok(d2.opposite().eq(d1));
        });
    });

    describe('hasNans', () => {
        const nanVec = new Vec3(1, 1, 1);
        nanVec.x = Number.NaN;
        it('should return true when the vector has NaN', () => {
            assert(nanVec.hasNans());
            nanVec.y = Number.NaN;
            assert(nanVec.hasNans());
            nanVec.x = 1;
            assert(nanVec.hasNans());
            nanVec.z = Number.NaN;
            assert(nanVec.hasNans());
        });
        it('should return false when the vector does not have Nan', () => {
            assert.equal(a.hasNans(), false);
        });
    });
})
