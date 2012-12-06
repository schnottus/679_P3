//selection in purchase menu
function strafe(){
    //if not enough crystals
    if(playerShip.crystals < 10){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Strafe enabled");
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

function showInfo(message){
    var info = document.getElementById("purchaseInfo");
    info.innerHTML = message;
    setTimeout(function(){info.innerHTML = ""},3000);
}

