import Mat4 from '../src/geometry/mat4.js';
const assert = require('power-assert');

describe('Mat4', () => {
    const a = new Mat4(1, 2, 3, 4,
                       5, 6, 7, 8,
                       9, 10, 11, 12,
                       13, 14, 15, 16);
    const b = new Mat4(4, 3, 2, 1,
                       1, 2, 3, 4,
                       4, 3, 2, 1,
                       4, 3, 2, 1);

    describe('eq', () => {
        it('should return true when the a is equal to b', () => {
            assert.ok(Mat4.eq(a, a));
            assert.ok(a.eq(a));
        });
        it('should return false when the a is not equal to b', () => {
            assert.equal(Mat4.eq(a, b), false);
            assert.equal(a.eq(b), false);
        });
    });

    describe('IDENTITY', () => {
        it('should return identity matrix', () => {
            assert.ok(Mat4.IDENTITY.eq(new Mat4(1, 0, 0, 0,
                                                0, 1, 0, 0,
                                                0, 0, 1, 0,
                                                0, 0, 0, 1)));
        });
    });

    describe('isIdentity', () => {
        it('should return true when the matrix is identity', () => {
            assert.ok(Mat4.IDENTITY.isIdentity());
        });
        it('should return false when the matrix is not identity', () => {
            assert.equal(a.isIdentity(), false);
            assert.equal(b.isIdentity(), false);
        })
    });

    describe('transpose', () => {
        it('should return transposed matrix', () => {
            assert.ok(a.transpose().eq(new Mat4(1, 5, 9, 13,
                                                2, 6, 10, 14,
                                                3, 7, 11, 15,
                                                4, 8, 12, 16)));
            assert.ok(b.transpose().eq(new Mat4(4, 1, 4, 4,
                                                3, 2, 3, 3,
                                                2, 3, 2, 2,
                                                1, 4, 1, 1)));
        });
    });

    describe('inverse', () => {
        it('should return inverted matrix', () => {
            const t = new Mat4(1, 0, 0, 0,
                               0, 1, 0, 0,
                               0, 0, 1, 0,
                               10, 20, 30, 1);
            assert.ok(t.inverse().eq(new Mat4(1, 0, 0, 0,
                                             0, 1, 0, 0,
                                             0, 0, 1, 0,
                                             -10, -20, -30, 1)));
        });
        it('should return undefined when given matrix is singular', () => {
            assert.equal(a.inverse(), undefined);
            assert.equal(b.inverse(), undefined);
        })
    });

    describe('prod', () => {
        it('should return product of given matrixes', () => {
            assert.ok(Mat4.prod(a, b).eq(new Mat4(50, 60, 70, 80,
                                                  90, 100, 110, 120,
                                                  50, 60, 70, 80,
                                                  50, 60, 70, 80)));
            assert.ok(Mat4.prod(b, a).eq(new Mat4(34, 28, 22, 16,
                                                  86, 72, 58, 44,
                                                  138, 116, 94, 72,
                                                  190, 160, 130, 100)));
        });
    });

    describe('prodOut', () => {
        it('should set product of given matrixes to out', () => {
            const ab = Mat4.IDENTITY;
            const ba = Mat4.IDENTITY;
            Mat4.prodOut(a, b, ab);
            Mat4.prodOut(b, a, ba);
            assert.ok(ab.eq(new Mat4(50, 60, 70, 80,
                                     90, 100, 110, 120,
                                     50, 60, 70, 80,
                                     50, 60, 70, 80)));
            assert.ok(ba.eq(new Mat4(34, 28, 22, 16,
                                     86, 72, 58, 44,
                                     138, 116, 94, 72,
                                     190, 160, 130, 100)));
        });
    });

    describe('toString', () => {
        it('should return string expression of the matrix', () => {
            assert.equal(a.toString(),
                         `[ [1, 5, 9, 13]\n` +
                         `  [2, 6, 10, 14]\n` +
                         `  [3, 7, 11, 15]\n` +
                         `  [4, 8, 12, 16] ]`)
            assert.equal(b.toString(),
                         `[ [4, 1, 4, 4]\n` +
                         `  [3, 2, 3, 3]\n` +
                         `  [2, 3, 2, 2]\n` +
                         `  [1, 4, 1, 1] ]`)
        });
    });
});
