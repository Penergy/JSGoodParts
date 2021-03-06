//import jQuery from "../node_modules/jquery/dist/jquery.js";
import * as THREE from "./three.module.js";
/**
 * Source from: https://aerotwist.com/tutorials/an-introduction-to-shaders-part-1/
 */

// export for others scripts to use
// window.$ = jQuery;
// window.jQuery = jQuery;

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
var renderer = new THREE.WebGLRenderer();
var camera = new THREE.PerspectiveCamera( VIEW_ANGLE,
                               ASPECT,
                               NEAR,
                               FAR);
var scene = new THREE.Scene();

// the camera starts at 0,0,0 so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// create the sphere's material
var shaderMaterial = new THREE.ShaderMaterial({
    vertexShader: $("#vertexshader").text(),
    fragmentShader: $("#fragmentshader").text()
});

// set up the sphere vars
var radius = 50, segments = 16, rings = 16;

// create a new mesh with sphere geometry -
// we will cover the sphereMaterial next;
var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(radius, segments, rings),
    shaderMaterial
);

// add the sphere to the scene
scene.add(sphere);

// draw!!!
renderer.render(scene, camera);