import Vec2 from '../src/geometry/vector2.js';
const assert = require('power-assert');

describe('Vec2', () => {
    const a = new Vec2(1, 5);
    const b = new Vec2(4, 1);
    const c = new Vec2(1, 5);

    describe('eq', () => {
        it('should return true when the a is equal to b', () => {
            assert.ok(Vec2.eq(a, c));
            assert.ok(a.eq(c));
        });
        it('should return false when the a is not equal to b', () => {
            assert.equal(Vec2.eq(a, b), false);
            assert.equal(a.eq(b), false);
        });
    });

    describe('add', () => {
        it('should return (a, b) + (c, d) = (a + c, b + d)', () => {
            assert.ok(a.add(b).eq(new Vec2(5, 6)));
        });
    })

    describe('sub', () => {
        it('should return (a, b) - (c, d) = (a - c, b - d)', () => {
            assert.ok(Vec2.eq(a.sub(b), new Vec2(-3, 4)));
        });
    });

    describe('mult', () => {
        it('should return (a, b) * (c, d) = (a * c, b * d)', () => {
            assert.ok(Vec2.eq(a.mult(b), new Vec2(4, 5)));
        });
    });

    describe('div', () => {
        it('should return (a, b) / (c, d) = (a / c, b / d)', () => {
            assert.ok(Vec2.eq(a.div(b), new Vec2(0.25, 5)));
        });
    });

    describe('scale', () => {
        it('should return (a, b) * k = (a * k, b * k)', () => {
            assert.ok(Vec2.eq(a.scale(10), new Vec2(10, 50)));
        });
    });

    describe('length', () => {
        it('should return length of the vector', () => {
            assert.ok(a.length() === Math.sqrt(26));
            assert.ok(b.length() === Math.sqrt(17));
        });
    });

    describe('lengthSq', () => {
        it('should return squared length of the vector', () => {
            assert.ok(a.lengthSq() === 26);
            assert.ok(b.lengthSq() === 17);
        });
    });

    describe('normalize', () => {
        it('should return normalized vector', () => {
            assert.ok(a.normalize().eq(new Vec2(1 / Math.sqrt(26),
                                                5 / Math.sqrt(26))));
            assert.ok(b.normalize().eq(new Vec2(4 / Math.sqrt(17),
                                                1 / Math.sqrt(17))));
        });
    });

    describe('dot', () => {
        it('should return dot product of the vectors', () => {
            assert.equal(Vec2.dot(a, b), 9);
            assert.equal(Vec2.dot(new Vec2(3, 4), new Vec2(5, 6)),
                         39);
        });

        it('dot(a, a) equals to a.lengthSq()', () => {
            assert.equal(Vec2.dot(a, a), a.lengthSq());
            assert.equal(Vec2.dot(b, b), b.lengthSq());
        });
    });

    const d1 = new Vec2(-1, -2);
    const d2 = new Vec2(1, 2);

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
        const nanVec = new Vec2(1, 1);
        nanVec.x = Number.NaN;
        it('should return true when the vector has NaN', () => {
            assert(nanVec.hasNans());
            nanVec.y = Number.NaN;
            assert(nanVec.hasNans());
            nanVec.x = 1;
            assert(nanVec.hasNans());
        });
        it('should return false when the vector does not have Nan', () => {
            assert.equal(a.hasNans(), false);
        });
    });
});
