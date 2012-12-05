/******************
* File: Global.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*******************/

/***GLOBAL VARIABLES***/

//box2d vars
	//creating names for common calls so you don't have to type so much
	var	b2Vec2 = Box2D.Common.Math.b2Vec2,
		b2AABB = Box2D.Collision.b2AABB,
		b2BodyDef = Box2D.Dynamics.b2BodyDef,
		b2Body = Box2D.Dynamics.b2Body,
		b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
		b2Fixture = Box2D.Dynamics.b2Fixture,
		b2World = Box2D.Dynamics.b2World,
		b2MassData = Box2D.Collision.Shapes.b2MassData,
		b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
		b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
		b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
		b2MouseJointDef =  Box2D.Dynamics.Joints.b2MouseJointDef;
	//box2d world (contains all box2d objects and has global properties such as gravity)
	var world = new b2World(
				new b2Vec2(0, 0),    //no gravity
				true                 //allow sleep
			);
	
	var playerShip;
	var asteroidList = newDLL();
	var enemyList = newDLL();
	var bulletList = newDLL();
	var crystalList = newDLL();
	var destroyList = new Array();
	var homeStation;

//three.js vars
	var scene = new THREE.Scene();
	var geometries = {
		asteroid : null,
		player: null,
		station: null
	};

	var container,
	camera,
	renderer,
	controls;
	var SCREEN_WIDTH = window.innerWidth;
		SCREEN_HEIGHT = window.innerHeight;
	var keyboard = new THREEx.KeyboardState();
	var VIEW_ANGLE = 45; //camera view angle
	var start = Date.now();
	
	// Stats.js var
	var stats = null; 
	
//player controls
	var MAX_PLAYER_ROTATION_VELOCITY = 6;  //in radians per second
	var playerRotateForce = 50;  //force applied when rotating, larger = faster turning
	var playerThrustForce = 1.3; //a mulitiplier on forward thrust
	var dampPlayerRotation = true;
	var playerRotationDampValue = 0.88;  //between 0 and 1, larger == less dampening
	var canShoot = true;
	var shootInterval;
	var shootDisabler = false;
	
//game state
	var gamePaused = false;
