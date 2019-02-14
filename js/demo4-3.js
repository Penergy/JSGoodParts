import * as THREE from './three.module.js';
import TrackballControls from './TrackballControls.js';
import WEBGL from "./WebGL.js";
import StrokeAlphabet from "./StrokeAlphabet.js";
import PMIEntity from "./PMI.js";
import { UniformsUtils, ShaderLib as THREE_ShaderLib, ShaderMaterial, DoubleSide, RawShaderMaterial, Vector3, BufferGeometry, BufferAttribute, Matrix4, Box3, Mesh, Scene, LineSegments, Object3D } from "./three.module.js";

/**
 * Demo for Perspective Camera with MouseScroll Event
 * Algorithm from: https://beta.observablehq.com/@grantcuster/understanding-scale-and-the-three-js-perspective-camera
 */

if( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var renderer, scene, camera, controls, $container, coordRefPlaneWithName;
var PIXEL = 26;

init();
animate();

function init() {
    // need both for FF and Webkit - others I haven't tested
  window.addEventListener('DOMMouseScroll', MouseWheelHandler, false);
  window.addEventListener('mousewheel', MouseWheelHandler, false);
    // set the scene size
    var WIDTH = 1200,
        HEIGHT = 900;

    // add Cube
    var geometry = new THREE.BoxGeometry(10, 10, 10);
    var cubeMaterials = [ 
        new THREE.MeshBasicMaterial({color:0xff0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({color:0x00ff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:0x0000ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        new THREE.MeshBasicMaterial({color:0xffff00, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:0xff00ff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
        new THREE.MeshBasicMaterial({color:0x00ffff, transparent:true, opacity:0.8, side: THREE.DoubleSide}), 
    ];
    // Create a MeshFaceMaterial, which allows the cube to have different materials on each face 
    var cubeMaterial = new THREE.MeshFaceMaterial(cubeMaterials); 
    var cube = new THREE.Mesh(geometry, cubeMaterial);

    // set renderer
    renderer = new THREE.WebGLRenderer();
    $container = document.getElementById('container');
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setClearColor( 0x000000, 1.0 )

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // set Camera
    var canvasWidth = renderer.domElement.clientWidth;
    var canvasHeight = renderer.domElement.clientHeight;
    var aspectRatio = canvasWidth / canvasHeight;
    console.log(aspectRatio);
    // OrthograhpicCamera( left, right, top, bottom, near, far ) 
    camera = new THREE.PerspectiveCamera( 30, aspectRatio, 1, 10000);

    // set camera position
    camera.position.set( 0, 0, 100);
    //cameraControls = new OrbitAndPanControls(camera, renderer.domElement);
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.5;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.target.set(0, 0, 0);
    
    // set scene
    scene = new THREE.Scene();
    //scene.background = new THREE.Color( 0x050505 );

    // create Texture
    var coordRefPlaneWithName = createTexture();

    // 
    scene.add(cube);
    scene.add(coordRefPlaneWithName);

    // draw!!!
    renderer.render(scene, camera);

}

function animate() 
{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

function createTexture() {

    var transform = new THREE.Matrix4(); // transform
    var pmiTextMaker = new StrokeAlphabet();
    coordRefPlaneWithName = new PMIEntity.PmiObject();
    var whiteMat = new THREE.LineBasicMaterial( { color: 0xffffff, depthTest: false } );
    var text3D = pmiTextMaker.getString("Hello World", 1, whiteMat);
    var bbox = text3D.geometry.boundingBox;
    // add a plane on the coordinate system name
    var p1 = new THREE.Vector3( bbox.min.x - 0.3, bbox.min.y - 0.3, 0 ),
        p2 = new THREE.Vector3( bbox.max.x + 0.3, bbox.min.y - 0.3, 0 ),
        p3 = new THREE.Vector3( bbox.max.x + 0.3, bbox.max.y + 0.3, 0 ),
        p4 = new THREE.Vector3( bbox.min.x - 0.3, bbox.max.y + 0.3, 0 );
    
    var geo = new THREE.BufferGeometry();
    geo.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( [
        p1.x, p1.y, -0.01, //p1.z, avoid z-buffer
        p2.x, p2.y, -0.01, //p2.z,
        p3.x, p3.y, -0.01, //p3.z,
        p4.x, p4.y, -0.01 //p4.z
    ] ), 3 ) );

    // assuming planar non-skewed rectangular polygon
    var center = new THREE.Vector3(
        ( p1.x + p3.x ) / 2.,
        ( p1.y + p3.y ) / 2.,
        ( p1.z + p3.z ) / 2.
    );
    p1.sub( center );
    p2.sub( center );
    p3.sub( center );
    p4.sub( center );

    geo.setIndex( new THREE.BufferAttribute( new Uint16Array( [ 0, 1, 3, 1, 2, 3 ] ), 1 ) );
    geo.computeVertexNormals();
    var coordUniformsRefSurface = UniformsUtils.clone( THREE_ShaderLib.basic.uniforms );
    coordUniformsRefSurface[ 'diffuse' ].value.setRGB( 0.5, 0.5, 0.5 );
    coordUniformsRefSurface[ 'opacity' ].value = 1;
    var parametersRefSurface = {
        fragmentShader: THREE_ShaderLib.basic.fragmentShader,
        vertexShader: THREE_ShaderLib.basic.vertexShader,
        uniforms: coordUniformsRefSurface,
        transparent: ( coordUniformsRefSurface[ 'opacity' ].value < 1.0 ),
        //shading: FlatShading,
        flatShading: true,
        side: DoubleSide,
        depthTest: false
    };
    var pmiCoordSysRefSurfaceMaterial = new ShaderMaterial( parametersRefSurface );
    pmiCoordSysRefSurfaceMaterial.opacity = coordUniformsRefSurface[ 'opacity' ].value;
    var refMsh = new THREE.Mesh( geo, pmiCoordSysRefSurfaceMaterial );
    var outline = geo.clone();
    outline.setIndex( new THREE.BufferAttribute( new Uint32Array( [ 0, 1, 1, 2, 2, 3, 3, 0 ] ), 1 ) );
    //var outlineMsh = new PMIEntity.PmiLine( outline, whiteMat );
    var outlineMsh = new THREE.LineSegments( outline, whiteMat );
    outlineMsh.name = "outline";
    outlineMsh.userData.pmiCategory = "pmiCoordSys";
    outlineMsh.userData.updatedmaterial = whiteMat.clone();
    outlineMsh.visible = false;
    outlineMsh.applyMatrix( transform );
    //newObj.add( outlineMsh );
    //_viewer._scene.addIndexedShape( outlineMsh );
    refMsh.renderOrder = 1;
    text3D.renderOrder = 2;

    //coordRefPlaneWithName.add( refMsh );
    coordRefPlaneWithName.add( outlineMsh );
    coordRefPlaneWithName.add( text3D );
    coordRefPlaneWithName.scale.set( 1, 1, 1 );
    coordRefPlaneWithName.position.set(-10, 0, 0);

    //
    if( coordRefPlaneWithName.addEventListener)
    {
        console.log("test");
        // IE9, Chrome, Safari, Opera
        renderer.domElement.addEventListener("wheel", MouseWheelHandler, false);
        // Firefox
        renderer.domElement.addEventListener("wheel", MouseWheelHandler, false);
    }

    return coordRefPlaneWithName;
}

function MouseWheelHandler(e) {
    var mouseEventInit = e.target.tagName;
    
    if( mouseEventInit === "CANVAS" ) {
        console.log("external:" + mouseEventInit);
        console.log("aspect: " + camera.aspect);
        console.log("fov: " + camera.fov);
        console.log("near: " + camera.near );
        console.log("far: " + camera.far);
        console.log(camera.position);
        console.log("zoom: " + camera.zoom);
        //console.log("fav_fov_height: " + getFovHeight(camera));
        var scale = getScale();
        coordRefPlaneWithName.scale.set(1/scale*PIXEL, 1/scale*PIXEL, 1/scale*PIXEL);
        console.log(getScale());
        event.preventDefault();// cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    }
    
    return false;
}

function getFovHeight( cameraObject) {
    var half_fov = cameraObject.fov / 2;
    var half_fov_radians = Math.PI / 180 * half_fov;
    var half_fov_height = Math.tan(half_fov_radians) * camera.position.z;
    return half_fov_height * 2;
}

function getScale( ) {
    var fovHeight = getFovHeight(camera);
    console.log(fovHeight);
    console.log(renderer.domElement.height);
    return renderer.domElement.height / fovHeight;
}
