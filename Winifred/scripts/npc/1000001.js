var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendNext("Greetings... Terrible monsters are ravaging Olympus as we speak. We need your help defeating them.");
    } else if (status == 1) {
        if (cm.getChar().getReborns() < 1) {
            cm.sendOk("You are not ready yet. You need to be reborn at least 1 time before I can warp you.");
            cm.dispose();
        } else {
            cm.sendSimple("Which boss do you want to face?\r\n\r\n#L0#Pianus#l\r\n#L1#Papulatus#l\r\n#L2#Zakum#l\r\n#L3#Horntail#l\r\n#L4#Pink Bean#l\r\n#L5#Balrog#l\r\n");
        }
    } else if(status == 2) {
        if(selection == 0) {
            cm.warp(230040410, 0);
        }
        else if(selection == 1) {
            cm.gainItem(4031179, 1);
            cm.warp(220080000, 0);
        }
		else if(selection == 2) {
            cm.gainItem(4001017, 1);
            cm.warp(211042400, 0);
        }
		else if(selection == 3) {
            cm.warp(240050400, 0);
        }
		else if(selection == 4) {
            cm.warp(270050000, 0);
        }
        else if(selection == 5) {
            cm.warp(105100100, 0);
        }
    }
}