import * as THREE from './three.module.js';
import TrackballControls from './TrackballControls.js';
import WCSTrihedron from './WCSTrihedron.js';
import StrokeAlphabet from "./StrokeAlphabet.js";
//import UniformsUtils from "./renderers/UniformsUtils.js";
//import THREE_ShaderLib from "./renderers/"
import { UniformsUtils, ShaderLib as THREE_ShaderLib, ShaderMaterial, DoubleSide, RawShaderMaterial, Vector3, BufferGeometry, BufferAttribute, Matrix4, Box3, Mesh, Scene, LineSegments, Object3D } from "./three.module.js";
/**
 * Demo: Material rendering order 
 */

var _wcsTrihedron = new WCSTrihedron();
var pmiTextMaker = new StrokeAlphabet();

// Our Javascript will go here.
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xbbbbbb, 1.0 );
document.body.appendChild( renderer.domElement );

// Handle Event 
console.log(renderer.domElement);
            
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

// Add Texture with plane
var whiteMat = new THREE.LineBasicMaterial( { color: 0xffffff, depthTest: false } );
var origin = new THREE.Vector3(),
	long = new THREE.Vector3(),
	tall = new THREE.Vector3(),
	eye = new THREE.Vector3(),
	center = new THREE.Vector3(),
	up = new THREE.Vector3();
var offset = new THREE.Matrix4(), // offset
	rotation = new THREE.Matrix4(), // rotation
	translation = new THREE.Matrix4(), // translation
	scaleNew = new THREE.Matrix4(), // scale
    transform = new THREE.Matrix4(); // transform
var text3D = pmiTextMaker.getString("Hello World", 1, whiteMat);
var bbox = text3D.geometry.boundingBox;
// add a plane on the coordinate system name
var p1 = new THREE.Vector3( bbox.min.x - 0.3, bbox.min.y - 0.3, 0 ),
	p2 = new THREE.Vector3( bbox.max.x + 0.3, bbox.min.y - 0.3, 0 ),
	p3 = new THREE.Vector3( bbox.max.x + 0.3, bbox.max.y + 0.3, 0 ),
	p4 = new THREE.Vector3( bbox.min.x - 0.3, bbox.max.y + 0.3, 0 );
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

var geo = new THREE.BufferGeometry();
geo.addAttribute( 'position', new THREE.BufferAttribute( new Float32Array( [
	p1.x, p1.y, -0.01, //p1.z, avoid z-buffer
	p2.x, p2.y, -0.01, //p2.z,
	p3.x, p3.y, -0.01, //p3.z,
	p4.x, p4.y, -0.01 //p4.z
] ), 3 ) );

geo.setIndex( new THREE.BufferAttribute( new Uint16Array( [ 0, 1, 3, 1, 2, 3 ] ), 1 ) );
geo.computeVertexNormals();
geo.computeBoundingBox();
var coordUniformsRefSurface = UniformsUtils.clone( THREE_ShaderLib.basic.uniforms );



camera.position.x = 50;
camera.position.y = 20;
camera.position.z = 50;
scene.add(_wcsTrihedron.original);
scene.add( cube );

// Add TrackballCtl 
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

function animate() 
{
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );
}

animate();
