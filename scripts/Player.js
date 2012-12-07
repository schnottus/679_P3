
//rotate a direction d (0 for left, 1 for right) and an amount of force a 
function rotatePlayer(d, a)
{ 
	if(d == 0)
	{	//rotate left
		playerShip.body.ApplyTorque(-a);;
	}else if(d == 1)
	{   //rotate right
		playerShip.body.ApplyTorque(a);
	}else
	{
		//throw error
	}	
}

//apply thrust amount a in direction d (0 for reverse, 1 for forward, 2 for left, 3 for right)
function thrustPlayer(d, a)
{
	var angle = playerShip.body.GetAngle();
	//calculate forward coordinate for foward/reverse(forward is positive)
	var thrustX = Math.cos( angle ) * a;
	var thrustY = Math.sin( angle ) * a;
	//calculate coordinate for strafe thrust (right is positive)
	angle += d2r(90);
	var strafeX = Math.cos( angle ) * a;
	var strafeY = Math.sin( angle ) * a;
	
	switch(d)
	{
		case 0:	//reverse thrust
			playerShip.body.ApplyImpulse(new b2Vec2(-thrustX,-thrustY), playerShip.body.GetWorldCenter());
		break;
		case 1:	//forward thrust
			playerShip.body.ApplyImpulse(new b2Vec2(thrustX,thrustY), playerShip.body.GetWorldCenter());
			for(var i = 0; i < 3; ++i){
				jetParticleList.add(makeJetParticle());
			}
		break;
		case 2:	//left thrust
			playerShip.body.ApplyImpulse(new b2Vec2(-strafeX,-strafeY), playerShip.body.GetWorldCenter());
		break;
		case 3:	//right thrust
			playerShip.body.ApplyImpulse(new b2Vec2(strafeX,strafeY), playerShip.body.GetWorldCenter());
		break;
		default:
		alert("Invalid parameter in thrustPlayer(a, d)");
	}
	var velocity = playerShip.body.GetLinearVelocity();
	var length = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
	if (length > playerShip.speed){
		length /= playerShip.speed;
		velocity.x /= length;
		velocity.y /= length;
		playerShip.body.SetLinearVelocity(velocity);
	}
}

//param: type - type of bullet
function playerShoot( type )
{
	if(shootDisabler){
		clearInterval(shootInterval);
		canShoot = true;
	}
	else{
		bulletList.add(makeBullet( playerShip, 0, 32));
	}
}