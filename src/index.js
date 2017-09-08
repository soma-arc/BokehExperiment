import Canvas3d from './canvas3d.js';
const glMatrix = require('gl-matrix');

window.addEventListener('load', () => {
    const canvas = new Canvas3d('canvas');

    const renderLoop = function() {
        canvas.render();
        requestAnimationFrame(renderLoop);
    }

    renderLoop();
});
