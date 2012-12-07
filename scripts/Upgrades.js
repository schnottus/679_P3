//Selections in purchase menu

//CURRENTLY: nothing happens if player purchases something twice, except wasting their resources
// maybe we might want to add doubled speed/ weapon damage/ missiles etc (after the playtest)?

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
        updateSidebar();
    }
}

function speed(){
    //if not enough crystals
    if(playerShip.crystals < 20){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Speed increased");
        playerShip.crystals -= 20;
        playerShip.speedIncrease = true;
        updateHUD();
        updateSidebar();
    }
}

function damage(){
    //if not enough crystals
    if(playerShip.crystals < 30){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Weapon damage increased");
        playerShip.crystals -= 30;
        playerShip.weaponDamage = true;
        updateHUD();
        updateSidebar();
    }
}

function missiles(){
    //if not enough crystals
    if(playerShip.crystals < 40){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Missiles acquired");
        playerShip.crystals -= 30;
        playerShip.missilesEnabled = true;
        updateHUD();
        updateSidebar();
    }
}

function gun(){
    //if not enough crystals
    if(playerShip.crystals < 40){
        showInfo("Not enough resources");
    }
    else{
        showInfo("Scatter gun acquired");
        playerShip.crystals -= 30;
        playerShip.gunEnabled = true;
        updateHUD();
        updateSidebar();
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

