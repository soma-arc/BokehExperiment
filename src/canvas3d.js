import Canvas from './canvas.js';
import { GetWebGL2Context, CreateSquareVbo, AttachShader,
         LinkProgram, CreateRGBTextures } from './glUtils';

const RENDER_VERTEX = require('./shader/render.vert');
const RENDER_FRAGMENT = require('./shader/render.frag');

const RAYTRACE_FRAG = require('./shader/raytrace.frag');

export default class Canvas3d extends Canvas {
    constructor(canvasId) {
        super(canvasId);
        this.canvasID = canvasId;
        this.gl = GetWebGL2Context(this.canvas);

        this.vertexBuffer = CreateSquareVbo(this.gl);

        this.renderCanvasProgram = this.gl.createProgram();
        AttachShader(this.gl, RENDER_VERTEX,
                     this.renderCanvasProgram, this.gl.VERTEX_SHADER);
        AttachShader(this.gl, RENDER_FRAGMENT,
                     this.renderCanvasProgram, this.gl.FRAGMENT_SHADER);
        LinkProgram(this.gl, this.renderCanvasProgram);
        this.renderCanvasVAttrib = this.gl.getAttribLocation(this.renderCanvasProgram,
                                                             'a_vertex');

        this.numSamples = 0;
        this.maxSamples = 10;
        this.lowResRatio = 0.5;
        this.compileRenderShader();
        this.initRenderTextures();
        this.texturesFrameBuffer = this.gl.createFramebuffer();

        this.isKeepingSampling = true;
        this.isRenderingLowRes = false;
        this.renderTimer = undefined;
    }

    compileRenderShader() {
        this.numSamples = 0;
        this.renderProgram = this.gl.createProgram();
        AttachShader(this.gl, RENDER_VERTEX, this.renderProgram, this.gl.VERTEX_SHADER);
        AttachShader(this.gl,
                     RAYTRACE_FRAG,
                     this.renderProgram, this.gl.FRAGMENT_SHADER);
        LinkProgram(this.gl, this.renderProgram);
        this.renderVAttrib = this.gl.getAttribLocation(this.renderProgram, 'a_vertex');
        this.getRenderUniformLocations();
    }

    initRenderTextures() {
        this.renderTextures = CreateRGBTextures(this.gl, this.canvas.width,
                                                this.canvas.height, 2);
        this.lowResTextures = CreateRGBTextures(this.gl,
                                                this.canvas.width * this.lowResRatio,
                                                this.canvas.height * this.lowResRatio, 2);
    }

    getRenderUniformLocations() {
        this.uniLocations = [];
        this.uniLocations.push(this.gl.getUniformLocation(this.renderProgram,
                                                          'u_accTexture'));
        this.uniLocations.push(this.gl.getUniformLocation(this.renderProgram,
                                                          'u_resolution'));
        this.uniLocations.push(this.gl.getUniformLocation(this.renderProgram,
                                                          'u_textureWeight'));
        this.uniLocations.push(this.gl.getUniformLocation(this.renderProgram,
                                                          'u_numSamples'));
    }

    setRenderUniformValues(width, height, texture) {
        let i = 0;

        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.uniform1i(this.uniLocations[i++], 0);
        this.gl.uniform2f(this.uniLocations[i++], width, height);
        this.gl.uniform1f(this.uniLocations[i++], this.numSamples / (this.numSamples + 1));
        this.gl.uniform1f(this.uniLocations[i++], this.numSamples);
    }

    renderToTexture(textures, width, height) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.texturesFrameBuffer);
        this.gl.viewport(0, 0, width, height);
        this.gl.useProgram(this.renderProgram);
        this.setRenderUniformValues(width, height, textures[0]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.COLOR_ATTACHMENT0,
                                     this.gl.TEXTURE_2D, textures[1], 0);
        this.gl.enableVertexAttribArray(this.renderVAttrib);
        this.gl.vertexAttribPointer(this.renderVAttrib, 2, this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        textures.reverse();
    }

    renderTexturesToCanvas(textures) {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.useProgram(this.renderCanvasProgram);
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, textures[0]);
        const tex = this.gl.getUniformLocation(this.renderProgram, 'u_texture');
        this.gl.uniform1i(tex, textures[0]);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.vertexAttribPointer(this.renderCanvasVAttrib, 2,
                                    this.gl.FLOAT, false, 0, 0);
        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
        this.gl.flush();
    }

    render() {
        if (this.numSamples >= this.maxSamples) return;
        this.renderToTexture(this.renderTextures,
                             this.canvas.width, this.canvas.height);
        this.renderTexturesToCanvas(this.renderTextures);
        if (this.isKeepingSampling) {
            this.numSamples++;
        }
    }

    renderLowRes() {
        if (this.renderTimer !== undefined) window.clearTimeout(this.renderTimer);
        this.renderToTexture(this.lowResTextures,
                             this.canvas.width * this.lowResRatio,
                             this.canvas.height * this.lowResRatio);
        this.renderTexturesToCanvas(this.lowResTextures);
        if (this.isKeepingSampling === false) {
            this.renderTimer = window.setTimeout(this.render.bind(this), 200);
        }
    }
}
