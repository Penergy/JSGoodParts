import * as THREE from "./three.module.js";

// Adding events to a custom object

var Car = function () {

    this.start = function () {

        this.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );

    };

};

// Mixing the EventDispatcher.prototype with the custom object prototype

Object.assign( Car.prototype, THREE.EventDispatcher.prototype );

// Using events with the custom object

var car = new Car();

car.addEventListener( 'start', function ( event ) {
    alert( event.message );

} );

car.addEventListener( 'end', function ( event ) {
    alert( event.message );
} );

//car.start();
car.dispatchEvent( { type: 'start', message: 'vroom vroom!' } );
car.dispatchEvent( { type: 'end', message: 'test!!!!'} );