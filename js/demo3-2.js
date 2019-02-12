//import jQuery from "../node_modules/jquery/dist/jquery.js";
import * as THREE from "./three.module.js";
import WEBGL from "./WebGL.js";

/**
 * Source from: https://aerotwist.com/tutorials/an-introduction-to-shaders-part-2/ 
 */

if( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var renderer, scene, camera;
var sphere, uniforms;
var displacement, noise;

init();
animate();

function init() {
    // set the scene size
    var WIDTH = 400,
        HEIGHT = 300;

    // set some camera attributes
    var VIEW_ANGLE = 45,
        ASPECT = WIDTH / HEIGHT,
        NEAR = 0.1,
        FAR = 10000;

    // get the DOM element to attach to 
    // - assume we've got jQuery to hand
    var $container = $('#container');

    // create a WebGL renderer, camera
    // and a scene
    renderer = new THREE.WebGLRenderer();
    camera = new THREE.PerspectiveCamera( VIEW_ANGLE,
                                ASPECT,
                                NEAR,
                                FAR);
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x050505 );
    
    uniforms = {
        "amplitude": {value: 1.0 },
        "color": {value: new THREE.Color( 0xff2200 )}
    };

    // the camera starts at 0,0,0 so pull it back
    camera.position.z = 300;

    // start the renderer
    renderer.setSize(WIDTH, HEIGHT);

    // attach the render-supplied DOM element
    $container.append(renderer.domElement);

    // create the sphere's material
    var vShader = $('#vertexshader');
    var fShader = $('#fragmentshader');

    // create the material and now
    // include the attributes property
    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vShader.text(),
        fragmentShader: fShader.text()
    });

    // set up the sphere vars
    var radius = 50, segments = 16, rings = 16;

    // create a new mesh with sphere geometry -
    // we will cover the sphereMaterial next;
    var geometry = new THREE.SphereBufferGeometry( radius, segments, rings );
    displacement = new Float32Array( geometry.attributes.position.count );
    noise = new Float32Array( geometry.attributes.position.count );

    for ( var i = 0; i < displacement.length; i++ ){
        noise[i] = Math.random()* 5;
    }
    
    // create a bufferAttribute used in shaderMaterial
    geometry.addAttribute('displacement', new THREE.BufferAttribute( displacement, 1));

    sphere = new THREE.Mesh(
        geometry,
        shaderMaterial
    );

    // add the sphere to the scene
    scene.add(sphere);

    // draw!!!
    renderer.render(scene, camera);

    // 
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render(){
    // let sphere rotate
    var time = Date.now() * 0.01;
    sphere.rotation.y = sphere.rotation.z = 0.01 * time;
    
    //
    uniforms["amplitude"].value = 2.5 * Math.sin( sphere.rotation.y * 0.125 );
    uniforms["color"].value.offsetHSL( 0.0005, 0, 0 );

    for ( var i = 0; i < displacement.length; i ++ ) {
        displacement[ i ] = Math.sin( 0.1 * i + time );
        
        noise[ i ] += 0.5 * ( 0.5 - Math.random() );
        noise[ i ] = THREE.Math.clamp( noise[ i ], -5, 5 );

        displacement[ i ] += noise[ i ];
    }
    sphere.geometry.attributes.displacement.needsUpdate = true;
    renderer.render( scene, camera );
}

