/******************
* File: Background.js
* Authors: Scott Larson, Joseph Francke, Mik Xin Tan, Dongyoung Cho
* Date: 5 Dec 2012
*******************/
var floorTexture = new THREE.ImageUtils.loadTexture( 'resources/space2.jpg' ); 

var mapA = THREE.ImageUtils.loadTexture( "resources/blue_nebula.png" );
var mapB = THREE.ImageUtils.loadTexture( "resources/earth.png" );
var mapC = THREE.ImageUtils.loadTexture( "resources/or_nebula.png" );
var mapD = THREE.ImageUtils.loadTexture( "resources/glow_star.png" );

var mapE = THREE.ImageUtils.loadTexture( "resources/red_nebula.png" );
var mapF = THREE.ImageUtils.loadTexture( "resources/plasma.png" );

var blueNebula;
var scale = 1;

function updateBackground()
{
	
	//update the corresponding background for each level
	switch(currentWorld)
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
	floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.repeat.set(5, 5);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(width * 20, height * 20, 1, 1);
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);    
	floor.position.z = 400.0;
	floor.doubleSided = true;
	background.add(floor);
	
	//sprites
	
    spriteGroup = new THREE.Object3D();

    blueNebula = new THREE.Sprite( { map: mapA, useScreenCoordinates: false} );
    var sprite2 = new THREE.Sprite( { map: mapB, useScreenCoordinates: false} );
    var sprite3 = new THREE.Sprite( { map: mapC, useScreenCoordinates: false} );
    
    var sprite4;
    for(var i = 0; i < 60; i++){
        sprite4 = new THREE.Sprite( { map: mapD, useScreenCoordinates: false} );
        sprite4.position.set(Math.random() * width * 2 - width/2, Math.random() * height * 2, 30.0 );
        sprite4.scale.set( 0.025, 0.025, 1.0 );
        sprite4.color.setHSV( 0.9 * Math.random(), 0.5 * Math.random(), 1 );
        spriteGroup.add( sprite4 );
    }

    blueNebula.position.set( 0,10, 350.0 );
    sprite2.position.set(300,100,350.0 );
    sprite3.position.set(100, 30, 300.0 );
    
        
    spriteGroup.add( blueNebula );
    spriteGroup.add( sprite2 );
    spriteGroup.add(sprite3);

    background.add( spriteGroup );
    
}

function updateBackground1(){
    blueNebula.rotation += 0.005;  
    // if(scale < 0){
//         scale = 0;
//         scale += 0.01;
//         }
//     else 
//         scale -= 0.01;
//     sprite.scale.set( scale, scale, 1.0 );
}

function background2(width, height){

    //simple background image
	floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.repeat.set(6, 6);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(width * 20 , height * 20, 1, 1); 
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);
	floor.position.z = 500.0;
	floor.doubleSided = true;
	background.add(floor);
	
	//sprites

	
    spriteGroup = new THREE.Object3D();

    var sprite = new THREE.Sprite( { map: mapE, useScreenCoordinates: false} );
    var sprite2 = new THREE.Sprite( { map: mapB, useScreenCoordinates: false} );
    var sprite3 = new THREE.Sprite( { map: mapF, useScreenCoordinates: false} );
    
    var sprite4;
    for(var i = 0; i < 150; i++){
        sprite4 = new THREE.Sprite( { map: mapD, useScreenCoordinates: false} );
        sprite4.position.set(Math.random() * width * 2 - width/2, Math.random() * height * 2, 30.0 );
        sprite4.scale.set( 0.025, 0.025, 1.0 );
        sprite4.color.setHSV( 0.9 * Math.random(), 0.5 * Math.random(), 1 );
        spriteGroup.add( sprite4 );
    }

    sprite.position.set( 0,10, 300.0 );
    sprite2.position.set(300,100,350.0 );
    sprite3.position.set(100, 30, 200.0 );
    
        
    spriteGroup.add( sprite );
    spriteGroup.add( sprite2 );
    spriteGroup.add( sprite3 );


    background.add( spriteGroup );
}

function updateBackground2(){
}

function background3(width, height){
    //simple background image
	floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.wrapS = THREE.RepeatWrapping;
	floorTexture.repeat.set(6, 6);
	var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture } );
	var floorGeometry = new THREE.PlaneGeometry(width * 20 , height * 20, 1, 1); 
	var floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.rotation.x = d2r(90);
	floor.position.z = 500.0;
	floor.doubleSided = true;
	background.add(floor);
	
	//sprites
	
    spriteGroup = new THREE.Object3D();

    var sprite = new THREE.Sprite( { map: mapE, useScreenCoordinates: false} );
    var sprite2 = new THREE.Sprite( { map: mapB, useScreenCoordinates: false} );
    var sprite3 = new THREE.Sprite( { map: mapC, useScreenCoordinates: false} );
    
    var sprite4;
    for(var i = 0; i < 200; i++){
        sprite4 = new THREE.Sprite( { map: mapD, useScreenCoordinates: false} );
        sprite4.position.set(Math.random() * width * 2 - width/2, Math.random() * height * 2, 30.0 );
        sprite4.scale.set( 0.025, 0.025, 1.0 );
        sprite4.color.setHSV( 0.9 * Math.random(), 0.5 * Math.random(), 1 );
        spriteGroup.add( sprite4 );
    }


    sprite.position.set( -50,10, 300.0 );
    sprite2.position.set(300,100,350.0 );
    sprite3.position.set(100, 30, 300.0 );
    
        
    spriteGroup.add( sprite );
    spriteGroup.add( sprite2 );
    spriteGroup.add( sprite3 );

    background.add( spriteGroup );
    
}

function updateBackground3(){
}