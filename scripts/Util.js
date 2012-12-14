/******************
* File: Util.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 9 Nov 2012
*
*Purpose: contains all helpful utility functions (math conversion, etc)
*******************/

//convert degrees to radians
function d2r( deg )
{
	return(deg * (Math.PI / 180));
}

//angle between 2 points in radians
function angleTwoPoints( x1, y1, x2, y2 )
{
	var deltaX = x2 - x1;
	var deltaY = y2 - y1;
	
	var angle = Math.atan(deltaY / deltaX);
	
	if(deltaX < 0 ) angle += Math.PI;
	
	return angle;
}

function dotProduct(a,b) {
	return a.x*b.x + a.y*b.y
 }
 
function vectorSubtraction(a, b){
		var temp = {
		x : a.x-b.x,
		y : a.y-b.y
	}
	return temp;
 }
 
function vectorAddition(a, b){
	var temp = {
		x : a.x+b.x,
		y : a.y+b.y
	}
	return temp;
 }
 
 function vectorAdditionAssignment(a, b){
	a.x = a.x + b.x;
	a.y = a.y + b.y;
 }
 
function normalizeVector(vec){
	if (vec.x == 0 && vec.y == 0){}
	else{
	var length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
	vec.x /= length;
	vec.y /= length;
	}
}

var Sound = function ( sources, radius, volume ) {
	var audio = document.createElement( 'audio' );

	for ( var i = 0; i < sources.length; i ++ ) {
		var source = document.createElement( 'source' );
		source.src = sources[ i ];
		audio.appendChild( source );
	}

	this.position = new THREE.Vector3();

	this.play = function () {
		audio.play();
	}
	this.update = function ( camera ) {
		var distance = this.position.distanceTo( camera.position );
		if ( distance <= radius ) {
			audio.volume = volume * ( 1 - distance / radius );

		} else {
			audio.volume = 0;
		}
	}
}	
