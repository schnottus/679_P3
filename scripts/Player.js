
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

//apply thrust amount a in direction d (1 for forward, 0 for reverse)
function thrustPlayer(d, a)
{
	var angle = playerShip.body.GetAngle();
	var thrustX = Math.cos( angle ) * a;
	var thrustY = Math.sin( angle ) * a;

	if(d == 1)  //thrust forward
	{
		playerShip.body.ApplyImpulse(new b2Vec2(thrustX,thrustY), playerShip.body.GetWorldCenter());
	}else if(d == 0)  //thrust backward
	{
		playerShip.body.ApplyImpulse(new b2Vec2(-thrustX,-thrustY), playerShip.body.GetWorldCenter());
	}else
	{
		//throw error
	}
}

//param: type - type of bullet
function playerShoot( type )
{
	bulletList.add(makeBullet( playerShip, 0, 10, 10));
	player.firstShotFired = true;
}