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
	
	relativePosition.x += relativeVelocity.x * t + 10*(.5 - Math.random());
	relativePosition.y += relativeVelocity.y * t + 10*(.5 - Math.random());
	relativePosition.x /= t;
	relativePosition.y /= t;
	return relativePosition;
}

function freeFloating(thing, sumVec) {
    var vec = thing.body.GetLinearVelocity();
    var length = Math.sqrt(vec.x * vec.x + vec.y * vec.y);
    if (length >= thing.speed / thing.body.GetMass()) {
        sumVec.x = -vec.x / length;
        sumVec.y = -vec.y / length;
    }
    else {
        sumVec.x = 0;
        sumVec.y = 0;
    }
}

function weightVector(vec, bubble){
	var length = Math.sqrt(vec.x * vec.x + vec.y * vec. y) - bubble;
	length *= length;
	vec.x /= length;
	vec.y /= length;
}

function predictCollision(A, B, sumVec){
    var R = A.radius + B.radius;
    R = R * R;
    var V = vectorSubtraction(B.body.GetLinearVelocity(), A.body.GetLinearVelocity());
    var P = vectorSubtraction(B.body.GetPosition(), A.body.GetPosition());
    var a = V.x*V.x + V.y*V.y;
    var b = 2*dotProduct(V,P);
    var c = P.x*P.x + P.y*P.y - R;
		var bubble = 2;
		weightVector(P, bubble);
		vectorAdditionAssignment(sumVec, P);
		
	if (b * b >= 4 * a * c && (b < 0)) {
		return 1;
    }
	else return 0;
}