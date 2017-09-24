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

    describe('toString', () => {
        it('should return string expression of the matrix', () => {
            assert.equal(a.toString(),
                         `[ [1, 5, 9, 13]\n` +
                         `  [2, 6, 10, 14]\n` +
                         `  [3, 7, 11, 15]\n` +
                         `  [4, 8, 12, 16] ]`)
        })
    });
});
