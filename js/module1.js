import {show} from './module2.js';
import * as THREE from './three.module.js';
import TrackballControls from './TrackballControls.js';
import WCSTrihedron from './WCSTrihedron.js';

show();

var test = (a, b) => a + b;

var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;

console.log(f());
console.log(test(1, 2));

var _wcsTrihedron = new WCSTrihedron();
console.log(_wcsTrihedron);

// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xbbbbbb, 1.0 );
document.body.appendChild( renderer.domElement );
            
// add Cube
var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({ color: 0x089998 });
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
// var cube = new THREE.Mesh( geometry, material);
            
camera.position.x = 50;
camera.position.y = 20;
camera.position.z = 50;
scene.add(_wcsTrihedron.original);
//scene.add( cube );

// 
var controls;
controls = new TrackballControls(camera);
console.log(controls);
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];
//controls.addEventListener( 'change', renderer );

var getCameraInfo = function () {
    var infoObject = {};
    infoObject.perspective = {
			pos: camera.position.toArray(),
			rot: camera.quaternion.toArray(),
			tgt: controls.target.toArray(),
			up: camera.up.toArray(),
			zoom: camera.zoom,
			fov: camera.fov,
			aspect: camera.aspect,
			near: camera.near,
			far: camera.far
        };
    return infoObject;
}
            
function animate() 
{
    requestAnimationFrame( animate );
    //cube.rotation.x += 0.01;
    //cube.rotation.y += 0.01;
    controls.update();
    //console.log(cube.matrix.elements);
    //console.log(cube.matrixWorld.elements);
    //console.log(cube.matrix);
    //console.log(camera.matrix);
    //cube.lookAt(camera.position);
    var cubeTest = cube;
    _wcsTrihedron.render(renderer, getCameraInfo() );
    renderer.render( scene, camera );
}

animate();
// renderer.render( scene, camera );
