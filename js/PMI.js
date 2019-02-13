import * as THREE from "./three.module.js";
/**
 * Common base class for scene graph node
 */
var Node = function() {};
Node.prototype = {
    constructor: Node,

    apply: function( object ) {
        object.getObjectByXtId = Node.prototype.getObjectByXtId;
        object.getScene = Node.prototype.getScene;
        object.getUnit = Node.prototype.getUnit;
    }
}

var PmiObject = function ( name ) {
    THREE.Object3D.call( this );
    this.name = name;
    this.type = "PmiObject";
};

PmiObject.prototype = Object.create( THREE.Object3D.prototype );
PmiObject.prototype.constructor = PmiObject;

Object.defineProperties( PmiObject.prototype, {
    isLoaded: {
        enumerable: true,
        writable: true,
        value: false
    },
    isLoading: {
        enumerable: true,
        writable: true,
        value: false
    }
});

var PmiNode = function() {};
Node.prototype.apply(PmiNode.prototype);
PmiNode.prototype.constructor = PmiNode;
PmiNode.prototype.apply = function( object ) {
    object.isPmi = true;
    object.getObjectByPsId = PmiNode.prototype.getObjectByPsId;
}

var PmiLine = function (geometry, material){
    THREE.LineSegments.call(this, geometry, material);
    this.type = "PmiLine";
}

PmiLine.prototype = Object.create(THREE.LineSegments.prototype);
PmiLine.prototype.constructor = PmiLine;
PmiNode.prototype.apply(PmiLine.prototype);

var PmiText = function (geometry, material) {
    PmiLine.call( this, geometry, material);
    this.type = "PmiText";
}

PmiText.prototype = Object.create( PmiLine.prototype );
PmiText.prototype.constructor = PmiText;
PmiNode.prototype.apply( PmiText.prototype );

var PmiRefPlane = function ( geometry, material ) {
    THREE.Object3D.call( this );
    this.type = "PmiRefPlane";
    this.geometry = geometry;
    this._shapeMaterial = material;
    this.matrixAutoUpdate = false;
    this.updateMatrixWorld( true );
    this.drawMode = THREE.TrianglesDrawMode;
}

PmiRefPlane.prototype = Object.create( THREE.Mesh.prototype );
PmiRefPlane.prototype.constructor = PmiRefPlane;
PmiNode.prototype.apply( PmiRefPlane.prototype );

Object.defineProperties( PmiRefPlane.prototype, {
    material: {
        enumerable: true,
        get: function() {
            return this._shapeMaterial;
        },
        set: function( value ) {
            this._shapeMaterial = value;
        }
    }
});

PmiRefPlane.prototype.clone = function ( object, recursive ) {
    if (!object) {
        object = new PmiRefPlane( this.geometry, this._shapeMaterial );
    }

    THREE.Object3D.prototype.clone.call( this, object, recursive );

    return object;
}

var PMIEntity = {
    PmiObject,
    PmiLine,
    PmiNode,
    PmiText,
    PmiRefPlane
};

export default PMIEntity;
