import * as THREE from './three.module.js';
import TrackballControls from './TrackballControls.js';
import OrbitAndPanControls from './OrbitAndPanControls.js';
import WEBGL from "./WebGL.js";

/**
 * Demo for Orthographic Camera 
 */

if( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var renderer, scene, camera, controls;

init();
animate();

function init() {
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
    var $container = document.getElementById('container');
    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // set Camera
    var canvasWidth = renderer.domElement.clientWidth;
    var canvasHeight = renderer.domElement.clientHeight;
    var viewSize = 100;
    var aspectRatio = canvasWidth / canvasHeight;
    console.log(aspectRatio);
    // OrthograhpicCamera( left, right, top, bottom, near, far ) 
    camera = new THREE.OrthographicCamera( 
        -aspectRatio*viewSize / 2,
        aspectRatio*viewSize / 2,
        viewSize / 2,
        -viewSize / 2,
        -viewSize, viewSize
    );

    // set camera position
    camera.position.set( 1, 0, 0);
    //cameraControls = new OrbitAndPanControls(camera, renderer.domElement);
    controls = new TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.target.set(0, 0, 0);
    
    // set scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x050505 );

    // 
    scene.add(cube);

    // draw!!!
    renderer.render(scene, camera);

}

function animate() 
{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

