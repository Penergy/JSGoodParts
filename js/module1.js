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
var combine = new THREE.Group();

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
combine.add(cube);

// Another cube
var cube2 = cube.clone();
cube2.position.set(0, 0, 15);
combine.add(cube2);

camera.position.x = 50;
camera.position.y = 20;
camera.position.z = 50;
scene.add(_wcsTrihedron.original);
scene.add( combine );

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

var testRender = function (obj) {
    var _camera = camera.clone();
    var camPos = new THREE.Vector3().fromArray( camera.position.toArray() );
	var tgt = new THREE.Vector3().fromArray( controls.target.toArray() );
    
    camPos.sub( tgt );
	camPos.normalize();

	camPos.setLength( 50 );

	_camera.position.copy( camPos );
	_camera.up.fromArray( camera.up.toArray() );
	_camera.lookAt( scene.position );

	if ( obj.children && obj.children.length !== 0 ) {
		for ( var i = 0, len = obj.children.length; i < len; i++ ) {
			obj.children[ i ].up.copy( _camera.up );
			obj.children[ i ].lookAt( new THREE.Vector3().addVectors( _camera.position, obj.children[ i ].position ) );
		}
	}

	renderer.render( scene, _camera );
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
    //_wcsTrihedron.render(renderer, getCameraInfo() );
    testRender(combine);
    renderer.render( scene, camera );
}

animate();
// renderer.render( scene, camera );
