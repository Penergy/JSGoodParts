var container, scene, camera, renderer, controls, effectController;
var canvasWidth, canvasHeight;
var sceneGrid, cameraGrid, sceneText;
var frustumCam, frustumTarget;
var sceneFrustum;
var cube, corner, cornerGeometry;
var helpSprite;
var light;
var groundGrid, moreGround, axis1, axis2, xGrid, zGrid;
var spritey = [];
var sphereMaterial, cubeMaterial;
var fullWireMaterial;
var lineMaterial = [];
var viewMode, prevTextScale;
var TEXT_SCALE = 0.83;
var EXTRA_CUSHION = 3;
var boxSize;
var clearColor = 0xfffaf3;
var prevMatrixWorld = new THREE.Matrix4();
var prevPtm = new THREE.Vector4();
var prevMatrixWorldInverse = new THREE.Matrix4();
var prevPtv = new THREE.Vector4();
var prevProjectionMatrix = new THREE.Matrix4();
var prevPtvp = new THREE.Vector4();
var prevPtndc = new THREE.Vector4();
var prevWindowMatrix = new THREE.Matrix4();
var prevPtpix = new THREE.Vector4();
var firstRenderTarget, screenMaterial;
var EPSILON = 0.00001;
var oldViewport = '';
var frustumPoints = [];
var lineGeometry = [];
var depthFaceGeometry = [];
var sideFaceGeometry = [];
var tipGeometry = [];

function init() {
    firstRenderTarget = new THREE.WebGLRenderTarget(512, 512, {
        format: THREE.RGBFormat
    });
    screenMaterial = new THREE.MeshBasicMaterial({
        map: firstRenderTarget,
        transparent: true,
        opacity: 0.7
    });
    boxSize = new THREE.Vector3(8, 10, 6);
    scene = new THREE.Scene();
    sceneText = new THREE.Scene();
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    var headerElement = document.getElementById("myID");
    if (headerElement !== null) {
        canvasHeight -= headerElement.offsetHeight;
    }
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColorHex(clearColor, 1.0);
    renderer.autoClear = false;
    container = document.getElementById('container');
    if (container === null) {
        container = document.createElement('div');
        document.body.appendChild(container);
    }
    container.appendChild(renderer.domElement);
    var aspect = canvasWidth / canvasHeight;
    camera = new THREE.PerspectiveCamera(effectController.fov, aspect, effectController.near, effectController.far);
    camera.position.set(21, 24, 31);
    frustumTarget = new THREE.Vector3();
    frustumTarget.set(0, 0, 0);
    controls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0);
    window.addEventListener('resize', onWindowResize, false);
    light = new THREE.PointLight(0xffffff);
    light.position.set(0, 25, 0);
    scene.add(light);
    lineMaterial = [];
    var colors = [0x0, 0x636363, 0x888888, 0xa3a3a3, 0xbababa];
    for (var i = 0; i < 5; i++) {
        lineMaterial[i] = new THREE.LineBasicMaterial({
            color: colors[i]
        });
    }
    fullWireMaterial = new THREE.MeshLambertMaterial({
        color: 0x00000000,
        wireframe: true
    });
    groundGrid = new THREE.Mesh(new THREE.PlaneGeometry(60, 60, 6, 6), fullWireMaterial);
    groundGrid.rotation.x = -Math.PI / 2;
    scene.add(groundGrid);
    moreGround = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 20, 20), fullWireMaterial);
    moreGround.rotation.x = -Math.PI / 2;
    scene.add(moreGround);
    axis1 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 10, 8, 1, true), fullWireMaterial);
    axis1.rotation.z = 90 * Math.PI / 180;
    axis1.position.x = -5;
    scene.add(axis1);
    axis2 = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 10, 8, 1, true), fullWireMaterial);
    axis2.rotation.x = -90 * Math.PI / 180;
    axis2.position.z = -5;
    scene.add(axis2);
    xGrid = new THREE.Mesh(new THREE.PlaneGeometry(20, 10, 20, 10), new THREE.MeshBasicMaterial({
        color: 0xaa0000,
        wireframe: true
    }));
    xGrid.rotation.y = -Math.PI / 2;
    xGrid.position.y = 5;
    scene.add(xGrid);
    zGrid = new THREE.Mesh(new THREE.PlaneGeometry(20, 10, 20, 10), new THREE.MeshBasicMaterial({
        color: 0x0000aa,
        wireframe: true
    }));
    zGrid.position.y = 5;
    scene.add(zGrid);
    Coordinates.drawAllAxes({
        axisLength: 16.2,
        axisRadius: 0.2,
        axisTess: 20
    });
    var cubeGeometry = new THREE.CubeGeometry(boxSize.x, boxSize.y, boxSize.z);
    cubeMaterial = new THREE.MeshLambertMaterial({
        color: 0xff99ff,
        ambient: 0xff99ff
    });
    cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(0, boxSize.y / 2, 0);
    cube.name = "Cube";
    scene.add(cube);
    cornerGeometry = new THREE.SphereGeometry(0.3);
    sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x00cccc
    });
    corner = new THREE.Mesh(cornerGeometry, sphereMaterial);
    corner.position.set(boxSize.x / 2, boxSize.y / 2, boxSize.z / 2);
    corner.name = "corner";
    cube.add(corner);
    createHelp();
    createText(true);
    createGridScene();
}

function createGridScene() {
    sceneGrid = new THREE.Scene();
    cameraGrid = new THREE.OrthographicCamera(-0.5 * canvasWidth, 0.5 * canvasWidth, -0.5 * canvasHeight, 0.5 * canvasHeight, -0.5, 0.5);
    sceneGrid.add(cameraGrid);
    var ndcGrid = new THREE.Mesh(new THREE.PlaneGeometry(canvasWidth, canvasHeight, 8, 8), new THREE.MeshBasicMaterial({
        color: 0x0,
        wireframe: true
    }));
    sceneGrid.add(ndcGrid);
}

function onWindowResize() {
    var headerElement = document.getElementById("myID");
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight - headerElement.offsetHeight;
    renderer.setSize(canvasWidth, canvasHeight);
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    removeHelp();
    createHelp();
}

function makeTextSprite(messageList, parameters) {
    if (parameters === undefined) parameters = {};
    var metrics;
    var fontface = parameters.hasOwnProperty("fontface") ? parameters.fontface : "Courier New";
    var fontsize = parameters.hasOwnProperty("fontsize") ? parameters.fontsize : 16;
    var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters.borderThickness : 1.5;
    var borderColor = parameters.hasOwnProperty("borderColor") ? parameters.borderColor : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
    };
    var textColor = parameters.hasOwnProperty("textColor") ? parameters.textColor : {
        r: 60,
        g: 60,
        b: 60,
        a: 1.0
    };
    var highlightColor = parameters.hasOwnProperty("highlightColor") ? parameters.highlightColor : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
    };
    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ? parameters.backgroundColor : {
        r: 0,
        g: 0,
        b: 0,
        a: 1.0
    };
    var useScreenCoordinates = parameters.hasOwnProperty("useScreenCoordinates") ? parameters.useScreenCoordinates : false;
    var spriteAlignment = parameters.hasOwnProperty("spriteAlignment") ? parameters.spriteAlignment : THREE.SpriteAlignment.topLeft;
    var textAlignment = parameters.hasOwnProperty("textAlignment") ? parameters.textAlignment : 'left';
    var fill = parameters.hasOwnProperty("fill") ? parameters.fill : true;
    var showRect = parameters.hasOwnProperty("showRect") ? parameters.showRect : true;
    var canvas = document.createElement('canvas');
    canvas.width = 660;
    canvas.height = 660;
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g +
        "," + borderColor.b + "," + borderColor.a + ")";
    var offsetx = 0;
    for (var mchunk = 0; mchunk < messageList.length; mchunk++) {
        var dofill = true;
        var message = messageList[mchunk];
        var rawStringList = [];
        rawStringList = message.split("\n");
        var lines = rawStringList.length;
        var normalText = 1;
        var normalStringList = [];
        var highlightStringList = [];
        var cleanStringList = [];
        for (var ln = 0; ln < rawStringList.length; ln++) {
            var buffer = rawStringList[ln];
            normalStringList[ln] = "";
            highlightStringList[ln] = "";
            cleanStringList[ln] = "";
            for (var chpos = 0; chpos < buffer.length; chpos++) {
                if (buffer.charAt(chpos) == '=')
                    dofill = false;
                if (buffer.charAt(chpos) == '*') {
                    normalText = 1 - normalText;
                } else {
                    cleanStringList[ln] += buffer.charAt(chpos);
                    if (normalText) {
                        normalStringList[ln] += buffer.charAt(chpos);
                        highlightStringList[ln] += " ";
                    } else {
                        normalStringList[ln] += " ";
                        highlightStringList[ln] += buffer.charAt(chpos);
                    }
                }
            }
        }
        if (dofill) {
            context.font = "Bold " + fontsize + "px " + fontface;
        } else {
            context.font = "Bold " + 1.5 * fontsize + "px " + fontface;
        }
        var textWidth = -99;
        for (var i = 0; i < cleanStringList.length; i++) {
            metrics = context.measureText(cleanStringList[i]);
            if (metrics.width > textWidth)
                textWidth = metrics.width;
        }
        if (showRect && dofill) {
            context.lineWidth = borderThickness;
            context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g +
                "," + backgroundColor.b + "," + backgroundColor.a + ")";
            roundRect(context, offsetx, borderThickness / 2, borderThickness / 2, textWidth + borderThickness + 2 * EXTRA_CUSHION, fontsize * (1.2 * lines + 0.2) + borderThickness + 2 * EXTRA_CUSHION, 6, fill);
        }
        for (var style = 0; style < 2; style++) {
            if (style === 0) {
                context.fillStyle = "rgba(" + textColor.r + "," + textColor.g +
                    "," + textColor.b + "," + textColor.a + ")";
            } else {
                context.fillStyle = "rgba(" + highlightColor.r + "," + highlightColor.g +
                    "," + highlightColor.b + "," + highlightColor.a + ")";
            }
            for (i = 0; i < cleanStringList.length; i++) {
                metrics = context.measureText(cleanStringList[i]);
                context.fillText(style ? highlightStringList[i] : normalStringList[i], offsetx + borderThickness + EXTRA_CUSHION + (textAlignment == 'right' ? textWidth - metrics.width : 0), (i + 1) * (fontsize * 1.2) + borderThickness + EXTRA_CUSHION);
            }
        }
        context.font = "Bold " + fontsize + "px " + fontface;
        offsetx += textWidth + 2.5 * borderThickness + 2 * EXTRA_CUSHION;
    }
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;
    var spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        useScreenCoordinates: false,
        alignment: spriteAlignment
    });
    spriteMaterial.useScreenCoordinates = useScreenCoordinates;
    spriteMaterial.depthTest = false;
    spriteMaterial.sizeAttenuation = true;
    var sprite = new THREE.Sprite(spriteMaterial);
    var diff = new THREE.Vector3();
    diff.copy(camera.position);
    diff.sub(controls.target);
    var scale = (useScreenCoordinates ? 1.0 : diff.length()) * TEXT_SCALE * effectController.textscale;
    sprite.scale.set(scale, scale, 1.0);
    return sprite;
}

function roundRect(ctx, offsetx, x, y, w, h, r, fill) {
    ctx.beginPath();
    ctx.moveTo(offsetx + x + r, y);
    ctx.lineTo(offsetx + x + w - r, y);
    ctx.quadraticCurveTo(offsetx + x + w, y, offsetx + x + w, y + r);
    ctx.lineTo(offsetx + x + w, y + h - r);
    ctx.quadraticCurveTo(offsetx + x + w, y + h, offsetx + x + w - r, y + h);
    ctx.lineTo(offsetx + x + r, y + h);
    ctx.quadraticCurveTo(offsetx + x, y + h, offsetx + x, y + h - r);
    ctx.lineTo(offsetx + x, y + r);
    ctx.quadraticCurveTo(offsetx + x, y, offsetx + x + r, y);
    ctx.closePath();
    if (fill) ctx.fill();
    ctx.stroke();
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

function setVector4Highlights(pt, prevPt, hl) {
    hl[0] = hl[1] = (Math.abs(pt.x - prevPt.x) < EPSILON) ? "" : "*";
    hl[2] = hl[3] = (Math.abs(pt.y - prevPt.y) < EPSILON) ? "" : "*";
    hl[4] = hl[5] = (Math.abs(pt.z - prevPt.z) < EPSILON) ? "" : "*";
    hl[6] = hl[7] = (Math.abs(pt.w - prevPt.w) < EPSILON) ? "" : "*";
}

function setHighlights(val, prevVal, hl) {
    hl[0] = hl[1] = (Math.abs(val - prevVal) < EPSILON) ? "" : "*";
}

function setTextVisibility(visible) {
    for (var i = 0; i < spritey.length; i++) {
        spritey[i].visible = visible;
    }
}

function removeText() {
    for (var i = 0; i < spritey.length; i++) {
        sceneText.remove(spritey[i]);
    }
}

function createHelp() {
    var message = ['This demo shows how a single vertex', 'of a box, marked with a light blue dot,', 'is transformed by the rendering pipeline.', 'Red numbers are those that change.', 'Each transform is shown in OpenGL/WebGL', 'order: the untransformed vector is', 'on the right, the matrix multiplies it,', 'and the resulting vector is on the left.', 'The box begins transformed up by 5 units.', 'XYZ axes are marked with RGB arrows.', ].join('\n');
    var messageList = [];
    messageList[0] = message;
    helpSprite = makeTextSprite(messageList, {
        fontsize: 24,
        fontface: "Georgia",
        borderColor: {
            r: 0,
            g: 186,
            b: 0,
            a: 1.0
        },
        textColor: {
            r: 0,
            g: 0,
            b: 0,
            a: 1.0
        },
        highlightColor: {
            r: 255,
            g: 0,
            b: 0,
            a: 1.0
        },
        backgroundColor: {
            r: 255,
            g: 255,
            b: 255,
            a: 0.9
        },
        useScreenCoordinates: true,
        spriteAlignment: THREE.SpriteAlignment.centerLeft,
        fill: true
    });
    helpSprite.position.set(canvasWidth - 0.70 * canvasHeight, canvasHeight, 0.5);
    sceneText.add(helpSprite);
}

function removeHelp() {
    sceneText.remove(helpSprite);
}

function displayHelp() {
    helpSprite.visible = effectController.help;
}

function displayGrid() {
    groundGrid.visible = moreGround.visible = axis1.visible = axis2.visible = effectController.grid;
    xGrid.visible = effectController.xgrid;
    zGrid.visible = effectController.zgrid;
}

function matrixMatch(mtx1, mtx2) {
    for (var i = 0; i < 16; i++) {
        if (mtx1.elements[i] != mtx2.elements[i])
            return false;
    }
    return true;
}

function createText(force) {
    var pt = new THREE.Vector4(corner.position.x, corner.position.y, corner.position.z);
    var ptm = new THREE.Vector4();
    ptm.copy(pt);
    ptm.applyMatrix4(cube.matrixWorld);
    var ptv = new THREE.Vector4();
    ptv.copy(ptm);
    ptv.applyMatrix4(camera.matrixWorldInverse);
    var ptvp = new THREE.Vector4();
    ptvp.copy(ptv);
    ptvp.applyMatrix4(camera.projectionMatrix);
    var ptndc = new THREE.Vector4();
    ptndc.copy(ptvp);
    ptndc.divideScalar(ptvp.w);
    var windowMatrix = new THREE.Matrix4(canvasWidth / 2, 0, 0, canvasWidth / 2, 0, canvasHeight / 2, 0, canvasHeight / 2, 0, 0, 0.5, 0.5, 0, 0, 0, 1);
    var ptpix = new THREE.Vector4();
    ptpix.copy(ptndc);
    ptpix.applyMatrix4(windowMatrix);
    if (!force) {
        if (matrixMatch(prevMatrixWorld, cube.matrixWorld) && prevPtm.equals(ptm) && matrixMatch(prevMatrixWorldInverse, camera.matrixWorldInverse) && prevPtv.equals(ptv) && matrixMatch(prevProjectionMatrix, camera.projectionMatrix) && prevPtvp.equals(ptvp) && prevPtndc.equals(ptndc) && matrixMatch(prevWindowMatrix, windowMatrix) && prevPtpix.equals(ptpix)) {
            return;
        }
    }
    removeText();
    var anchor = new THREE.Vector4();
    anchor.copy(ptm);
    var myfontsize = 16;
    var hl = [];
    var screenlock = false;
    var displayList = [viewMode];
    if (viewMode == 'all') {
        displayList = ['model', 'view', 'projection', 'window'];
        screenlock = true;
    }
    var messageList = [];
    for (var modenum = 0; modenum < displayList.length; modenum++) {
        if (screenlock)
            anchor.set(10, 10 + modenum * canvasHeight * effectController.textscale / 5, 0.5);
        messageList = [];
        var i = 0;
        var c, r;
        switch (displayList[modenum]) {
            default:
            case 'model':
                messageList[i] = " world-space \n point\n";
                setVector4Highlights(ptm, prevPtm, hl);
                messageList[i] += sprintf("%s%9.2f%s\n%s%9.2f%s\n%s%9.2f%s\n%s%6.0f%s", hl[0], ptm.x, hl[1], hl[2], ptm.y, hl[3], hl[4], ptm.z, hl[5], hl[6], ptm.w, hl[7]);
                i++;
                messageList[i] = "\n\n\n=";
                i++;
                messageList[i] = " Model (World) Matrix \n\n";
                for (c = 0; c < 4; c++) {
                    for (r = 0; r < 4; r++) {
                        setHighlights(cube.matrixWorld.elements[r * 4 + c], prevMatrixWorld.elements[r * 4 + c], hl);
                        messageList[i] += sprintf("%s%6.2f%s", hl[0], cube.matrixWorld.elements[r * 4 + c], hl[1]);
                        messageList[i] += " ";
                    }
                    if (c < 3)
                        messageList[i] += "\n";
                }
                i++;
                messageList[i] = " model \n point\n";
                messageList[i] += sprintf("%6.2f\n%6.2f\n%6.2f\n%3.0f  ", pt.x, pt.y, pt.z, pt.w);
                i++;
                break;
            case 'view':
                messageList[i] = " view-space \n point\n";
                setVector4Highlights(ptv, prevPtv, hl);
                messageList[i] += sprintf("%s%9.2f%s\n%s%9.2f%s\n%s%9.2f%s\n%s%6.0f%s", hl[0], ptv.x, hl[1], hl[2], ptv.y, hl[3], hl[4], ptv.z, hl[5], hl[6], ptv.w, hl[7]);
                i++;
                messageList[i] = "\n\n\n=";
                i++;
                messageList[i] = " View Matrix\n\n";
                for (c = 0; c < 4; c++) {
                    for (r = 0; r < 4; r++) {
                        setHighlights(camera.matrixWorldInverse.elements[r * 4 + c], prevMatrixWorldInverse.elements[r * 4 + c], hl);
                        messageList[i] += sprintf("%s%7.2f%s", hl[0], camera.matrixWorldInverse.elements[r * 4 + c], hl[1]);
                    }
                    if (c < 3)
                        messageList[i] += " \n";
                }
                i++;
                messageList[i] = " world\n\n";
                setVector4Highlights(ptm, prevPtm, hl);
                messageList[i] += sprintf("%s%6.2f%s \n%s%6.2f%s \n%s%6.2f%s \n%s%3.0f%s   ", hl[0], ptm.x, hl[1], hl[2], ptm.y, hl[3], hl[4], ptm.z, hl[5], hl[6], ptm.w, hl[7]);
                i++;
                break;
            case 'projection':
                messageList[i] = " W-divide \n for NDC \n";
                setVector4Highlights(ptndc, prevPtndc, hl);
                messageList[i] += sprintf("%s%7.3f%s\n%s%7.3f%s\n%s%7.3f%s\n%s%3.0f%s ", hl[0], ptndc.x, hl[1], hl[2], ptndc.y, hl[3], hl[4], ptndc.z, hl[5], hl[6], ptndc.w, hl[7]);
                i++;
                messageList[i] = "\n\n\n<=";
                i++;
                if (ptndc.x < -1 || ptndc.x > 1 || ptndc.y < -1 || ptndc.y > 1 || ptndc.z < -1 || ptndc.z > 1) {
                    messageList[i] = " *clip* \n";
                    sphereMaterial.color.set(0xff0000);
                } else {
                    messageList[i] = " clip \n";
                    sphereMaterial.color.set(0x00cccc);
                }
                messageList[i] += " coords \n";
                setVector4Highlights(ptvp, prevPtvp, hl);
                messageList[i] += sprintf("%s%6.2f%s\n%s%6.2f%s\n%s%6.2f%s\n%s%6.2f%s ", hl[0], ptvp.x, hl[1], hl[2], ptvp.y, hl[3], hl[4], ptvp.z, hl[5], hl[6], ptvp.w, hl[7]);
                i++;
                messageList[i] = "\n\n\n=";
                i++;
                messageList[i] = " Projection Matrix\n\n";
                for (c = 0; c < 4; c++) {
                    setHighlights(camera.projectionMatrix.elements[c], prevProjectionMatrix.elements[c], hl);
                    messageList[i] += sprintf("%s%6.2f%s", hl[0], camera.projectionMatrix.elements[c], hl[1]);
                    setHighlights(camera.projectionMatrix.elements[4 + c], prevProjectionMatrix.elements[4 + c], hl);
                    messageList[i] += sprintf("%s%6.2f%s", hl[0], camera.projectionMatrix.elements[4 + c], hl[1]);
                    setHighlights(camera.projectionMatrix.elements[8 + c], prevProjectionMatrix.elements[8 + c], hl);
                    messageList[i] += sprintf("%s%7.2f%s", hl[0], camera.projectionMatrix.elements[8 + c], hl[1]);
                    setHighlights(camera.projectionMatrix.elements[12 + c], prevProjectionMatrix.elements[12 + c], hl);
                    messageList[i] += sprintf("%s%7.2f%s ", hl[0], camera.projectionMatrix.elements[12 + c], hl[1]);
                    if (c < 3)
                        messageList[i] += "\n";
                }
                i++;
                messageList[i] = " view\n point\n";
                setVector4Highlights(ptv, prevPtv, hl);
                messageList[i] += sprintf("%s%6.2f%s \n%s%6.2f%s \n%s%6.2f%s \n%s%3.0f%s ", hl[0], ptv.x, hl[1], hl[2], ptv.y, hl[3], hl[4], ptv.z, hl[5], hl[6], ptv.w, hl[7]);
                i++;
                break;
            case 'window':
                messageList[i] = " window \n coords\n";
                setVector4Highlights(ptpix, prevPtpix, hl);
                messageList[i] += sprintf("%s%7.1f%s\n%s%7.1f%s\n%s%7.3f%s\n%s%4.0f%s ", hl[0], ptpix.x, hl[1], hl[2], ptpix.y, hl[3], hl[4], ptpix.z, hl[5], hl[6], ptpix.w, hl[7]);
                i++;
                messageList[i] = "\n\n\n=";
                i++;
                messageList[i] = " Window (Screen) Matrix\n\n";
                for (c = 0; c < 4; c++) {
                    setHighlights(windowMatrix.elements[c], prevWindowMatrix.elements[c], hl);
                    messageList[i] += sprintf("%s%7.2f%s", hl[0], windowMatrix.elements[c], hl[1]);
                    setHighlights(windowMatrix.elements[4 + c], prevWindowMatrix.elements[4 + c], hl);
                    messageList[i] += sprintf("%s%7.2f%s", hl[0], windowMatrix.elements[4 + c], hl[1]);
                    setHighlights(windowMatrix.elements[8 + c], prevWindowMatrix.elements[8 + c], hl);
                    messageList[i] += sprintf("%s%5.2f%s", hl[0], windowMatrix.elements[8 + c], hl[1]);
                    setHighlights(windowMatrix.elements[12 + c], prevWindowMatrix.elements[12 + c], hl);
                    messageList[i] += sprintf("%s%7.2f%s ", hl[0], windowMatrix.elements[12 + c], hl[1]);
                    if (c < 3)
                        messageList[i] += "\n";
                }
                i++;
                messageList[i] = " NDC  \n\n";
                setVector4Highlights(ptndc, prevPtndc, hl);
                messageList[i] += sprintf("%s%7.3f%s \n%s%7.3f%s \n%s%7.3f%s \n%s%3.0f%s ", hl[0], ptndc.x, hl[1], hl[2], ptndc.y, hl[3], hl[4], ptndc.z, hl[5], hl[6], ptndc.w, hl[7]);
                i++;
                break;
        }
        spritey[modenum] = makeTextSprite(messageList, {
            fontsize: myfontsize,
            fontface: "Courier New",
            borderColor: {
                r: 0,
                g: 0,
                b: 255,
                a: 1.0
            },
            textColor: {
                r: 50,
                g: 50,
                b: 50,
                a: 1.0
            },
            highlightColor: {
                r: 255,
                g: 0,
                b: 0,
                a: 1.0
            },
            backgroundColor: {
                r: 255,
                g: 255,
                b: 255,
                a: 0.8
            },
            fill: true,
            useScreenCoordinates: (viewMode == 'all') ? true : false
        });
        spritey[modenum].position.copy(anchor);
        if (viewMode != 'all') {
            spritey[modenum].position.x += 0.5;
            spritey[modenum].position.z += 0.5;
        }
        sceneText.add(spritey[modenum]);
    }
    prevMatrixWorld.copy(cube.matrixWorld);
    prevPtm.copy(ptm);
    prevMatrixWorldInverse.copy(camera.matrixWorldInverse);
    prevPtv.copy(ptv);
    prevProjectionMatrix.copy(camera.projectionMatrix);
    prevPtvp.copy(ptvp);
    prevPtndc.copy(ptndc);
    prevWindowMatrix.copy(windowMatrix);
    prevPtpix.copy(ptpix);
}

function createFrustum(pointsForDepth, faces, refresh) {
    if (refresh) {
        sceneFrustum = new THREE.Scene();
        if (faces)
            sceneFrustum.fog = new THREE.Fog(clearColor, 30, 140);
    }
    var world = new THREE.Vector4();
    var v;
    var x, y, z;
    for (x = 0; x <= 1; x++) {
        for (y = 0; y <= 1; y++) {
            for (z = 0; z < pointsForDepth; z++) {
                var ndc = new THREE.Vector4(x * 2 - 1, y * 2 - 1, (z / (pointsForDepth - 1)) * 2 - 1);
                getWorldLocation(ndc, world);
                frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + z] = new THREE.Vector3(world.x, world.y, world.z);
            }
        }
    }
    var line, mtl, mesh, vcount;
    var gcount = 0;
    for (x = 0; x <= 1; x++) {
        for (y = 0; y <= 1; y++) {
            if (refresh) {
                lineGeometry[gcount] = new THREE.Geometry();
                lineGeometry[gcount].vertices.push(camera.position);
                lineGeometry[gcount].vertices.push(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + (pointsForDepth - 1)]);
                line = new THREE.Line(lineGeometry[gcount++], lineMaterial[0]);
                sceneFrustum.add(line);
            } else {
                lineGeometry[gcount++].verticesNeedUpdate = true;
            }
        }
    }
    for (z = 0; z < pointsForDepth; z++) {
        if (refresh) {
            lineGeometry[gcount] = new THREE.Geometry();
            for (v = 0; v < 5; v++) {
                x = Math.floor(v / 2) % 2;
                y = Math.floor((v + 1) / 2) % 2;
                lineGeometry[gcount].vertices.push(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + z]);
            }
            mtl = lineMaterial[z];
            line = new THREE.Line(lineGeometry[gcount++], mtl);
            sceneFrustum.add(line);
        } else {
            lineGeometry[gcount++].verticesNeedUpdate = true;
        }
    }
    if (refresh) {
        depthFaceGeometry[0] = new THREE.Geometry();
        var uvs = [];
        for (v = 0; v < 4; v++) {
            x = Math.floor(v / 2) % 2;
            y = Math.floor((v + 1) / 2) % 2;
            depthFaceGeometry[0].vertices.push(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth]);
            uvs.push(new THREE.Vector2(0.0, 0.0));
            uvs.push(new THREE.Vector2(0.0, 1.0));
            uvs.push(new THREE.Vector2(1.0, 1.0));
            uvs.push(new THREE.Vector2(1.0, 0.0));
        }
        depthFaceGeometry[0].faces.push(new THREE.Face3(2, 1, 0));
        depthFaceGeometry[0].faceVertexUvs[0].push([uvs[2], uvs[1], uvs[0]]);
        depthFaceGeometry[0].faces.push(new THREE.Face3(0, 3, 2));
        depthFaceGeometry[0].faceVertexUvs[0].push([uvs[0], uvs[3], uvs[2]]);
        mtl = screenMaterial;
        mesh = new THREE.Mesh(depthFaceGeometry[0], mtl);
        sceneFrustum.add(mesh);
    } else {
        for (v = 0; v < 4; v++) {
            x = Math.floor(v / 2) % 2;
            y = Math.floor((v + 1) / 2) % 2;
            depthFaceGeometry[0].vertices[v].copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth]);
        }
        depthFaceGeometry[0].verticesNeedUpdate = true;
    }
    if (effectController.viewport === 'depths') {
        if (refresh) {
            for (z = 1; z < pointsForDepth; z++) {
                depthFaceGeometry[z] = new THREE.Geometry();
                for (v = 0; v < 4; v++) {
                    x = Math.floor(v / 2) % 2;
                    y = Math.floor((v + 1) / 2) % 2;
                    depthFaceGeometry[z].vertices.push(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + z]);
                }
                depthFaceGeometry[z].faces.push(new THREE.Face3(0, 1, 2));
                depthFaceGeometry[z].faces.push(new THREE.Face3(2, 3, 0));
                mtl = new THREE.MeshBasicMaterial({
                    color: lineMaterial[z].color,
                    transparent: true,
                    opacity: 0.05 + 0.25 * (pointsForDepth - z) / pointsForDepth,
                    side: (z == pointsForDepth - 1) ? THREE.BackSide : THREE.DoubleSide
                });
                mesh = new THREE.Mesh(depthFaceGeometry[z], mtl);
                sceneFrustum.add(mesh);
            }
        } else {
            for (z = 1; z < pointsForDepth; z++) {
                vcount = 0;
                for (v = 0; v < 4; v++) {
                    x = Math.floor(v / 2) % 2;
                    y = Math.floor((v + 1) / 2) % 2;
                    depthFaceGeometry[z].vertices[vcount++].copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + z]);
                }
                depthFaceGeometry[z].verticesNeedUpdate = true;
            }
        }
    }
    var side;
    if (faces) {
        if (refresh) {
            for (side = 0; side < 4; side++) {
                sideFaceGeometry[side] = new THREE.Geometry();
                for (v = 0; v < 4; v++) {
                    x = Math.floor((side * 4 + v + 6) / 8) % 2;
                    y = Math.floor((side * 4 + v + 2) / 8) % 2;
                    z = Math.floor((v + 1) / 2) % 2;
                    sideFaceGeometry[side].vertices.push(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + z * (pointsForDepth - 1)]);
                }
                sideFaceGeometry[side].faces.push(new THREE.Face3(0, 1, 2));
                sideFaceGeometry[side].faces.push(new THREE.Face3(2, 3, 0));
                mtl = new THREE.MeshBasicMaterial({
                    color: (side % 2 === 0) ? 0x00ff00 : 0xff0000,
                    transparent: true,
                    opacity: 0.2
                });
                mesh = new THREE.Mesh(sideFaceGeometry[side], mtl);
                sceneFrustum.add(mesh);
            }
        } else {
            for (side = 0; side < 4; side++) {
                vcount = 0;
                for (v = 0; v < 4; v++) {
                    x = Math.floor((side * 4 + v + 6) / 8) % 2;
                    y = Math.floor((side * 4 + v + 2) / 8) % 2;
                    z = Math.floor((v + 1) / 2) % 2;
                    sideFaceGeometry[side].vertices[vcount++].copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + z * (pointsForDepth - 1)]);
                }
                sideFaceGeometry[side].verticesNeedUpdate = true;
            }
        }
    }
    if (refresh) {
        sideFaceGeometry[4] = new THREE.Geometry();
        for (v = 0; v < 4; v++) {
            x = Math.floor(v / 2) % 2;
            y = Math.floor((v + 1) / 2) % 2;
            sideFaceGeometry[4].vertices.push(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + (pointsForDepth - 1)]);
        }
        sideFaceGeometry[4].faces.push(new THREE.Face3(0, 1, 2));
        sideFaceGeometry[4].faces.push(new THREE.Face3(2, 3, 0));
        mtl = new THREE.MeshBasicMaterial({
            color: 0x0000ff,
            transparent: true,
            opacity: 0.2
        });
        mesh = new THREE.Mesh(sideFaceGeometry[4], mtl);
        sceneFrustum.add(mesh);
    } else {
        vcount = 0;
        for (v = 0; v < 4; v++) {
            x = Math.floor(v / 2) % 2;
            y = Math.floor((v + 1) / 2) % 2;
            sideFaceGeometry[4].vertices[vcount++].copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth + (pointsForDepth - 1)]);
        }
        sideFaceGeometry[4].verticesNeedUpdate = true;
    }
    var lerpVal = 0.85;
    var vertex;
    if (refresh) {
        for (side = 0; side < 4; side++) {
            tipGeometry[side] = new THREE.Geometry();
            for (v = 0; v < 2; v++) {
                x = Math.floor((side * 2 + v + 3) / 4) % 2;
                y = Math.floor((side * 2 + v + 1) / 4) % 2;
                vertex = new THREE.Vector3();
                vertex.copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth]);
                vertex.lerp(camera.position, lerpVal);
                tipGeometry[side].vertices.push(vertex);
            }
            tipGeometry[side].vertices.push(camera.position);
            tipGeometry[side].faces.push(new THREE.Face3(0, 1, 2));
            mtl = new THREE.MeshBasicMaterial({
                color: (side % 2 === 0) ? 0x00ff00 : 0xff0000
            });
            mesh = new THREE.Mesh(tipGeometry[side], mtl);
            sceneFrustum.add(mesh);
        }
    } else {
        vertex = new THREE.Vector3();
        for (side = 0; side < 4; side++) {
            vcount = 0;
            for (v = 0; v < 2; v++) {
                x = Math.floor((side * 2 + v + 3) / 4) % 2;
                y = Math.floor((side * 2 + v + 1) / 4) % 2;
                vertex.copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth]);
                vertex.lerp(camera.position, lerpVal);
                tipGeometry[side].vertices[vcount++].copy(vertex);
            }
            tipGeometry[side].vertices[vcount++].copy(camera.position);
            tipGeometry[side].verticesNeedUpdate = true;
        }
    }
    if (refresh) {
        tipGeometry[4] = new THREE.Geometry();
        for (v = 0; v < 4; v++) {
            x = Math.floor(v / 2) % 2;
            y = Math.floor((v + 1) / 2) % 2;
            vertex = new THREE.Vector3();
            vertex.copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth]);
            vertex.lerp(camera.position, lerpVal);
            tipGeometry[4].vertices.push(vertex);
        }
        tipGeometry[4].faces.push(new THREE.Face3(0, 1, 2));
        tipGeometry[4].faces.push(new THREE.Face3(2, 3, 0));
        mtl = new THREE.MeshBasicMaterial({
            color: 0x0000ff
        });
        mesh = new THREE.Mesh(tipGeometry[4], mtl);
        sceneFrustum.add(mesh);
    } else {
        vcount = 0;
        for (v = 0; v < 4; v++) {
            x = Math.floor(v / 2) % 2;
            y = Math.floor((v + 1) / 2) % 2;
            vertex.copy(frustumPoints[x * 2 * pointsForDepth + y * pointsForDepth]);
            vertex.lerp(camera.position, lerpVal);
            tipGeometry[side].vertices[vcount++].copy(vertex);
        }
        tipGeometry[4].verticesNeedUpdate = true;
    }
}

function getWorldLocation(ndc, world) {
    var view = new THREE.Vector4();
    view.copy(ndc);
    var invMatrix = new THREE.Matrix4();
    invMatrix.getInverse(camera.projectionMatrix);
    view.applyMatrix4(invMatrix);
    view.divideScalar(view.w);
    world.copy(view);
    world.applyMatrix4(camera.matrixWorld);
}

function setupGui() {
    effectController = {
        fov: 40,
        near: 20,
        far: 80,
        transx: 0,
        transy: 5,
        transz: 0,
        rotx: 0,
        roty: 0,
        rotz: 0,
        scale: 1,
        matrix: 'all',
        perm: true,
        viewport: 'off',
        grid: true,
        xgrid: false,
        zgrid: false,
        ndc: false,
        textscale: 1,
        help: false
    };
    var gui = new dat.GUI();
    gui.add(effectController, "matrix", ['model', 'view', 'projection', 'window', 'all']).name("Watch matrix");
    var f1 = gui.addFolder('Model manipulation');
    f1.add(effectController, "transx", -20.0, 20.0).name("X translation");
    f1.add(effectController, "transy", -20.0, 20.0).name("Y translation");
    f1.add(effectController, "transz", -20.0, 20.0).name("Z translation");
    f1.add(effectController, "rotx", 0, 360.0).name("X rotation");
    f1.add(effectController, "roty", 0, 360.0).name("Y rotation");
    f1.add(effectController, "rotz", 0, 360.0).name("Z rotation");
    f1.add(effectController, "scale", 0.1, 2.0).name("Scale");
    var f2 = gui.addFolder('Camera manipulation');
    f2.add(effectController, "fov", 1.0, 179.0).name("Field of view");
    f2.add(effectController, "near", 1.0, 50.0).name("Near plane");
    f2.add(effectController, "far", 50.0, 100.0).name("Far plane");
    gui.add(effectController, "viewport", ['off', 'volume', 'near/far', 'depths']).name("Show frustum");
    var f3 = gui.addFolder('Controls');
    f3.add(effectController, "perm").name("Keep highlit");
    f3.add(effectController, "grid").name("Show ground");
    f3.add(effectController, "xgrid").name("Show X grid");
    f3.add(effectController, "zgrid").name("Show Z grid");
    f3.add(effectController, "ndc").name("Show NDC");
    f3.add(effectController, "textscale", 0.2, 1.28).name("Text scale");
    f3.add(effectController, "help").name("Help");
}

function render() {
    controls.update();
    cube.position.x = effectController.transx;
    cube.position.y = effectController.transy;
    cube.position.z = effectController.transz;
    cube.rotation.x = effectController.rotx * Math.PI / 180;
    cube.rotation.y = effectController.roty * Math.PI / 180;
    cube.rotation.z = effectController.rotz * Math.PI / 180;
    cube.scale.set(effectController.scale, effectController.scale, effectController.scale);
    camera.fov = effectController.fov;
    camera.near = effectController.near;
    camera.far = effectController.far;
    camera.updateProjectionMatrix();
    light.position.copy(camera.position);
    var force = (viewMode != effectController.matrix);
    if (prevTextScale != effectController.textscale) {
        force = 1;
        prevTextScale = effectController.textscale;
    }
    viewMode = effectController.matrix;
    displayHelp();
    displayGrid();
    createText(force || !effectController.perm);
    if (effectController.viewport != 'off') {
        corner.scale.set(3, 3, 3);
        renderer.clear();
        renderer.render(scene, camera, firstRenderTarget, true);
        corner.scale.set(1, 1, 1);
    }
    renderer.clear();
    renderer.render(scene, camera);
    if (effectController.ndc)
        renderer.render(sceneGrid, cameraGrid);
    if (effectController.viewport != 'off') {
        corner.scale.set(3, 3, 3);
        var viewSize = 60;
        setTextVisibility(false);
        axis1.visible = axis2.visible = false;
        var aspect = canvasWidth / canvasHeight;
        if (effectController.viewport === 'volume') {
            frustumCam = new THREE.PerspectiveCamera(60, aspect, 1, 150);
            frustumCam.position.set(60, 35, 0);
            frustumCam.lookAt(new THREE.Vector3(0, 0, 0));
        } else {
            frustumCam = new THREE.OrthographicCamera(-aspect * viewSize / 2, aspect * viewSize / 2, viewSize / 2, -viewSize / 2, -0, 500);
            var verticalOffset = 0;
            frustumCam.position.set(250, verticalOffset, 0);
            frustumTarget.set(0, verticalOffset, 0);
            frustumCam.lookAt(frustumTarget);
        }
        light.position.copy(frustumCam.position);
        renderer.enableScissorTest(true);
        var viewsize = 0.45;
        var borderh = 4 / canvasWidth;
        var borderv = 4 / canvasHeight;
        var margin = 0.00;
        renderer.setClearColorHex(0x0, 1.0);
        renderer.setScissor((1.0 - margin - viewsize - borderh) * canvasWidth, margin * canvasHeight, (viewsize + borderh) * canvasWidth, (viewsize + borderv) * canvasHeight);
        renderer.setViewport((1.0 - margin - viewsize - borderh) * canvasWidth, margin * canvasHeight, (viewsize + borderh) * canvasWidth, (viewsize + borderv) * canvasHeight);
        renderer.clear();
        renderer.setClearColorHex(clearColor, 1.0);
        renderer.setScissor((1.0 - margin - viewsize - borderh / 2) * canvasWidth, (margin + borderv / 2) * canvasHeight, viewsize * canvasWidth, viewsize * canvasHeight);
        renderer.setViewport((1.0 - margin - viewsize - borderh / 2) * canvasWidth, (margin + borderv / 2) * canvasHeight, viewsize * canvasWidth, viewsize * canvasHeight);
        renderer.clear();
        renderer.render(scene, frustumCam);
        createFrustum((effectController.viewport == 'depths') ? 5 : 2, (effectController.viewport == 'volume'), oldViewport !== effectController.viewport);
        oldViewport = effectController.viewport;
        renderer.render(sceneFrustum, frustumCam);
        corner.scale.set(1, 1, 1);
        setTextVisibility(true);
        renderer.setViewport(0, 0, canvasWidth, canvasHeight);
        renderer.enableScissorTest(false);
    }
    renderer.render(sceneText, camera);
}
setupGui();
init();
animate();