var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 0 && mode == 0) {
            cm.dispose();
            return;
        }

        if (mode == 1) {
            status++;
        } else {
            status--;
        }
    }

    if (status == 0) {
        cm.sendSimple("Hey, it's your agent Sophia!\r\n\r\nOf course I can get you a cab. Where to?\r\n\r\n#L0#Henesys#l\r\n#L1#Ellinia#l\r\n#L2#Perion#l\r\n#L3#Kerning City#l\r\n#L4#Nautilus Harbor#l\r\n");
    } else if(status == 1) {
        if(selection == 0) {
            cm.warp(100000000, 0);
        }
        else if(selection == 1) {
            cm.warp(101000000, 0);
        }
		else if(selection == 2) {
            cm.warp(102000000, 0);
        }
		else if(selection == 3) {
            cm.warp(103000000, 0);
        }
		else if(selection == 4) {
            cm.warp(120000000, 0);
        }
		
		
    }
}
