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

//move to own player file
//rotate a direction d (0 for left, 1 for right) and an amount of force a 
	function rotatePlayer(d, a){ 
		if(d == 0){	//rotate left
			playerShip.body.ApplyTorque(-a);;
		}else if(d == 1){   //rotate right
			playerShip.body.ApplyTorque(a);
		}else{
			//throw error
		}	
	}