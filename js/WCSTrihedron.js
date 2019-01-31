import { Vector3, OrthographicCamera, Scene, Group, Box3, Sphere, LineBasicMaterial, BufferGeometry, BufferAttribute, LineSegments, CameraHelper } from "./three.module.js"

var WCSTrihedron = function () { //NOSONAR

	// Private variables
	var _object = null,
		_scene = null,
		_camera = null,
		_viewer = null,

		// Default variables to set
		_width = 100,
		_height = 100,
		_positionX = 10,
		_positionY = 10,

		// Event variables
		_mouseDownHandler = null,
		_mouseUpHandler = null,
		_mouseMoveHandler = null,

		// User-defined variables
		_textNodes = [];

	var _WCSTrihedron = function () {

		_createObject();
		_createScene();
		_createEventVariables.call( this );

		this.original = _object;
		this.scene = _scene;
		this.camera = _camera;
		this.size = { width: _width, height: _height };
		this.position = { x: _positionX, y: _positionY };
		this.boundingBox = new Box3().setFromObject( _object );
		this.boundingSphere = new Sphere();
		this.boundingBox.getBoundingSphere( this.boundingSphere );
		this.visible = true;
		this.onTop = true;

		this.front = true;
		this.original.userData.ignoreRenderMode = true;
	};

	_WCSTrihedron.prototype = {
		constructor: _WCSTrihedron
	};

	Object.defineProperties( _WCSTrihedron.prototype, {

		camera: {
			get: function () {
				return _camera;
			},

			set: function ( camera ) {
				_camera = camera;
			}
		},

		scene: {
			get: function () {
				return _scene;
			},

			set: function ( scene ) {
				_scene = scene;
			}
		},

		viewer: {

			set: function ( viewer ) {
				_viewer = viewer;
			}
		},

		visible: {
			get: function () {
				return _object.visible;
			},

			set: function ( value ) {
				_object.visible = value;
				if ( _viewer ) {
					_viewer.draw();
				}
			}
		}
	} );

	function _createObject () {

		_object = new Group();
		var geo;

		// Arrows - X
		var xMat = new LineBasicMaterial( { color: 0xff0000 } );
		geo = new BufferGeometry();

		var positions_array = [
			0., 0., 0., 20., 0., 0.
		];
		var indices_array = [
			0, 1
		];

		geo.setIndex( new BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geo.addAttribute( 'position', new BufferAttribute( new Float32Array( positions_array ), 3 ) );

		positions_array.length = 0;
		indices_array.length = 0;

		var arrowX = new LineSegments( geo, xMat );

		// Arrows - Y
		var yMat = new LineBasicMaterial( { color: 0x00ff00 } );
		geo = new BufferGeometry();

		positions_array = [
			0., 0., 0., 0., 20., 0.
		];
		indices_array = [
			0, 1
		];

		geo.setIndex( new BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geo.addAttribute( 'position', new BufferAttribute( new Float32Array( positions_array ), 3 ) );

		positions_array.length = 0;
		indices_array.length = 0;

		var arrowY = new LineSegments( geo, yMat );

		// Arrows - Z
		var zMat = new LineBasicMaterial( { color: 0x0000ff } );
		geo = new BufferGeometry();

		positions_array = [
			0., 0., 0., 0., 0., 20.
		];
		indices_array = [
			0, 1
		];

		geo.setIndex( new BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geo.addAttribute( 'position', new BufferAttribute( new Float32Array( positions_array ), 3 ) );

		positions_array.length = 0;
		indices_array.length = 0;

		var arrowZ = new LineSegments( geo, zMat );


		// Letters - X
		geo = new BufferGeometry();

		var positions_array = [
			1., 4., 0., 2., 4., 0., 3., 4., 0., 4., 4., 0., 1., 1., 0., 2., 1., 0.,
			3., 1., 0., 4., 1., 0., 1.5, 1., 0., 3.5, 4., 0., 1.5, 4., 0., 3.5, 1., 0.
		];

		var indices_array = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
		];

		geo.setIndex( new BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geo.addAttribute( 'position', new BufferAttribute( new Float32Array( positions_array ), 3 ) );

		positions_array.length = 0;
		indices_array.length = 0;

		var textX = new LineSegments( geo, xMat );
		textX.position.set( 20, 0, 0 );


		// Letters - Y
		geo = new BufferGeometry();

		positions_array = [
			1., 4., 0., 2., 4., 0., 3., 4., 0., 4., 4., 0., 2., 1., 0., 3., 1., 0.,
			2.5, 1., 0., 2.5, 2.5, 0., 1.5, 4., 0., 2.5, 2.5, 0., 3.5, 4., 0.
		];

		indices_array = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 10
		];

		geo.setIndex( new BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geo.addAttribute( 'position', new BufferAttribute( new Float32Array( positions_array ), 3 ) );

		positions_array.length = 0;
		indices_array.length = 0;

		var textY = new LineSegments( geo, yMat );
		textY.position.set( 0, 20, 0 );


		// Letters - Z
		geo = new BufferGeometry();

		positions_array = [
			1., 3.5, 0., 1., 4., 0., 4., 4., 0., 1., 1., 0., 4., 1., 0., 4., 1.5, 0.
		];

		indices_array = [
			0, 1, 1, 2, 2, 3, 3, 4, 4, 5
		];

		geo.setIndex( new BufferAttribute( new Uint16Array( indices_array ), 1 ) );
		geo.addAttribute( 'position', new BufferAttribute( new Float32Array( positions_array ), 3 ) );

		positions_array.length = 0;
		indices_array.length = 0;

		var textZ = new LineSegments( geo, zMat );
		textZ.position.set( 0, 0, 20 );

		_object.add( arrowX );
		_object.add( arrowY );
		_object.add( arrowZ );

		_object.add( textX );
		_object.add( textY );
		_object.add( textZ );

		_textNodes.push( textX );
		_textNodes.push( textY );
		_textNodes.push( textZ );

		xMat = null;
		yMat = null;
		zMat = null;
	}

	function _createScene () {

		_scene = new Scene();
		_width = 100;
		_height = 100;
		_camera = new OrthographicCamera( _width * -0.25, _width * 0.25, _height * 0.25, _height * -0.25, -100, 100 );

		_scene.add( _camera );
		_scene.add( _object );
	}

	function _createEventVariables () {
		_mouseDownHandler = this.mouseDown.bind( this );
		_mouseUpHandler = this.mouseUp.bind( this );
		_mouseMoveHandler = this.mouseMove.bind( this );
	}

	/**
	 * Defines how to render the WCSTrihedron
	 *
	 * @function render
	 * @memberof WCSTrihedron.prototype
	 *
	 */
	_WCSTrihedron.prototype.render = function ( renderer, camInfo ) {

		renderer.setViewport(
			_positionX,
			renderer.getSize().height - _height - _positionY,
			_width,
			_height
		);

		var camPos = new Vector3().fromArray( camInfo.perspective.pos );

		var tgt = new Vector3().fromArray( camInfo.perspective.tgt );
		camPos.sub( tgt );
		camPos.normalize();

		if ( this.boundingSphere ) {
			camPos.setLength( this.boundingSphere.radius );
		}
		else {
			camPos.setLength( 50 );
		}

		_camera.position.copy( camPos );
		_camera.up.fromArray( camInfo.perspective.up );
		_camera.lookAt( _scene.position );

		if ( _textNodes && _textNodes.length !== 0 ) {
			for ( var i = 0, len = _textNodes.length; i < len; i++ ) {
				_textNodes[ i ].up.copy( _camera.up );
				_textNodes[ i ].lookAt( new Vector3().addVectors( _camera.position, _textNodes[ i ].position ) );
			}
		}

		renderer.render( _scene, _camera );
	};

	/**
	 * Removes attached events
	 *
	 * @function removeEvents
	 * @memberof _WCSTrihedron.prototype
	 *
	 */
	_WCSTrihedron.prototype.removeEvents = function () { };

	/**
	 * Repositions the WCS trihedron.
	 *
	 * @function setPosition
	 * @memberof WCSTrihedron.prototype
	 *
	 * @param {Number} x - horizontal position in pixels from the bottom left of the viewport.
	 * @param {Number} y - vertical position in pixels from the bottom left of the viewport.
	 */
	_WCSTrihedron.prototype.setPosition = function ( x, y ) {
		_positionX = x;
		_positionY = y;
		this.position.x = x;
		this.position.y = y;

		if ( _viewer !== null ) {
			_viewer.draw();
		}
	};

	/**
	 * Queries the position of the WCS
	 *
	 * @function getPosition
	 * @memberof WCSTrihedron.prototype
	 *
	 * @returns {Number[]} represents the X (0) and Y (1) coordinates as measured from the bottom left of the viewport.
	 */
	_WCSTrihedron.prototype.getPosition = function () {
		return this.position;
	};

	/**
	 * Sets the size of the WCS.
	 *
	 * @function setSize
	 * @memberof WCSTrihedron.prototype
	 *
	 * @param {Number} w - a number used to set the width of the WCS render area.
	 * @param {Number} h - a number used to set the height of the WCS render area.
	 */
	_WCSTrihedron.prototype.setSize = function ( w, h ) {
		_width = w;
		_height = h;
		this.size.width = w;
		this.size.height = h;

		if ( _viewer !== null ) {
			_viewer.draw();
		}
	};

	/**
	 * Queries the size of the WCS.
	 *
	 * @function getSize
	 * @memberof WCSTrihedron.prototype
	 *
	 * @returns {Object} an object that contains the height and width (each as a number) of the WCS render area.
	 */
	_WCSTrihedron.prototype.getSize = function () {
		return this.size;
	};

	/**
	 * Sets whether the WCS is rendered on top of or behind the scene geometry.
	 *
	 * @function setOnTop
	 * @memberof WCSTrihedron.prototype
	 *
	 * @params {Boolean} onTop - true if on top, false if behind.
	 */
	_WCSTrihedron.prototype.setOnTop = function ( onTop ) {
		if ( this.onTop !== onTop || this.onTop === undefined ) {
			this.onTop = onTop;
			if ( onTop ) {
				this.front = true;
				this.back = false;
			}
			else {
				this.back = true;
				this.front = false;
			}
			if ( _viewer ) {
				_viewer.renderOrderSGO( this );
			}
		}
	};

	/**
	 * Queries whether the WCS is rendered on top of or behind the scene geometry.
	 *
	 * @function getOnTop
	 * @memberof WCSTrihedron.prototype
	 *
	 * @returns {Boolean} true if on top, false if behind.
	 */
	_WCSTrihedron.prototype.getOnTop = function () {
		return this.onTop;
	};

	_WCSTrihedron.prototype.mouseUp = function ( event ) { };

	_WCSTrihedron.prototype.mouseDown = function ( event ) { };

	_WCSTrihedron.prototype.mouseMove = function ( event ) { };

	return new _WCSTrihedron();
};

WCSTrihedron.prototype = {
	constructor: WCSTrihedron,
	_name: "WCSTrihedron"
};

self.WCSTrihedron = WCSTrihedron;

export default WCSTrihedron;