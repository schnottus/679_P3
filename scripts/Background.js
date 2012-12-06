/******************
* File: Background.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 5 Dec 2012
*******************/

function updateBackground( level )
{
	
	//update the corresponding background for each level
	switch(level)
		{
			case 1: 
				updateBackground1();
				break;
			case 2: 
				updateBackground2();
				break;
			case 3:
				updateBackground3();
				break;
			default:
			    updateBackground1();
		}
}

function background1(width, height){
    //simple background image (changed to a tileable + less noise backgrd, easier for expansion of plane)
	var floorTexture = new THREE.ImageUtils.loadTexture( 'resources/space2.jpg' ); 
	floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.repeat.set(5, 5);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(width * 20, height * 20, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);    
	floor.position.z = 400.0;
	floor.doubleSided = true;
	scene.add(floor);
	
	//testing sprites
	var mapA = THREE.ImageUtils.loadTexture( "resources/blue_nebula.png" );
	var mapB = THREE.ImageUtils.loadTexture( "resources/earth.png" );
	
    spriteGroup = new THREE.Object3D();

    sprite = new THREE.Sprite( { map: mapA, useScreenCoordinates: false} );
    var sprite2 = new THREE.Sprite( { map: mapB, useScreenCoordinates: false} );

    sprite.position.set( Math.random(),
                         Math.random(),
                         100.0 );
    sprite2.position.set(300,
                         100,
                         350.0 );
    
        
    spriteGroup.add( sprite );
    spriteGroup.add( sprite2 );

    scene.add( spriteGroup );
    
}

function updateBackground1(){
    sprite.rotation += 0.05;   
}

function background2(width, height){
    //simple background image
	var floorTexture = new THREE.ImageUtils.loadTexture( 'resources/space1.jpg' );
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(height , width, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);
	floor.position.z = 500.0;
	floor.doubleSided = true;
	scene.add(floor);
}

function updateBackground2(){
}