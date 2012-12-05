function autoAimVector(shooterBody, shootAtBody, bulletSpeed){
	var relativePosition = vectorSubtraction(shootAtBody.GetPosition(), shooterBody.GetPosition());
	var relativeVelocity = vectorSubtraction(shootAtBody.GetLinearVelocity(), shooterBody.GetLinearVelocity());
	var a = dotProduct(relativeVelocity, relativeVelocity) - (bulletSpeed * bulletSpeed);
	var b = 2 * dotProduct(relativeVelocity, relativePosition);
	var c = dotProduct(relativePosition, relativePosition);
	var p = -b / (2 * a);
	var temp = (b * b) - 4 * a * c;
	if (temp < 0){
		console.log("AI miss");
		temp = relativePosition.x * relativePosition.x + relativePosition.y * relativePosition.y;
		temp /= bulletSpeed;
		relativePosition.x /= temp;
		relativePosition.y /= temp;
		return relativePosition;
	}
	var q = Math.sqrt((b * b) - 4 * a * c) / (2 * a);

	var t1 = p - q;
	var t2 = p + q;
	var t;

	if (t1 > t2 && t2 > 0)
	{
		t = t2;
	}
	else
	{
		t = t1;
	}
	
	relativePosition.x += relativeVelocity.x * t;
	relativePosition.y += relativeVelocity.y * t;
	relativePosition.x /= t;
	relativePosition.y /= t;
	return relativePosition;
}

function freeFloating(thing, sumVec) {
    var vec = thing.body.GetLinearVelocity();
    var length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    if (length >= thing.speed/thing.body.GetMass()) {
        sumVec.x = -vec.x / length;
        sumVec.y = -vec.y / length;
    }
}