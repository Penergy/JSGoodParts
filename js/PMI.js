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

var PMIEntity = {
    PmiLine,
    PmiNode,
    PmiText
};

export default PMIEntity;
