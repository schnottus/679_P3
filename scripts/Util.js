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
