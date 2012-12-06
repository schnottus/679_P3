//selection in purchase menu
function strafe(){
    //if not enough crystals
    if(playerShip.crystals < 10)
        ;//do something
    else{
        playerShip.crystals -= 10;
        playerShip.strafeEnabled = true;
        updateHUD();
    }
}

function resume(){
    if(playerDocked){	    
        gamePaused = false;
        playerDocked = false;
        purchaseMenu();
		    
	}
}