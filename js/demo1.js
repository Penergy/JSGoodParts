import * as THREE from './three.module.js';
import TrackballControls from './TrackballControls.js';
import WCSTrihedron from './WCSTrihedron.js';

/**
 * Demo: flatten function to screen 
 */

var _wcsTrihedron = new WCSTrihedron();

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
controls.rotateSpeed = 1.0;
controls.zoomSpeed = 1.2;
controls.panSpeed = 0.8;
controls.noZoom = false;
controls.noPan = false;
controls.staticMoving = true;
controls.dynamicDampingFactor = 0.3;
controls.keys = [ 65, 83, 68 ];

/**
 * Implement for flatten to screen
 * @param {THREE.Group} obj 
 */
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
			console.log(_camera.position);
			console.log(obj.children[i].position);
			obj.children[ i ].lookAt( new THREE.Vector3().addVectors( _camera.position, obj.children[ i ].position ) );
		}
	}

	renderer.render( scene, _camera );
}
            
function animate() 
{
    requestAnimationFrame( animate );
    controls.update();
    testRender(combine);
    renderer.render( scene, camera );
}

animate();
