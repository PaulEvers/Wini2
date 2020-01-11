/*
Made by: xxandycxx Of RageZone
Based off of Sera - First NPC on Map 0
This NPC Reset's SP.
*/

var wui = 0;

function start() {
	cm.sendOk ("Hey, Having trouble adding SP to your skills, after rebirth? Then I'm the dude to talk to! I'll reset your SP to 0, so you should be able to Add stats.");
}

function action(mode, type, selection) {
	if (mode == 0 || wui == 1) {
		cm.dispose();
	} else {
		wui = 1;
		var statup = new java.util.ArrayList();
		var p = cm.c.getPlayer();
		p.setRemainingSp(0);
		statup.add (new net.sf.odinms.tools.Pair(net.sf.odinms.client.MapleStat.AVAILABLESP, java.lang.Integer.valueOf(0)));

		p.getClient().getSession().write (net.sf.odinms.tools.MaplePacketCreator.updatePlayerStats(statup));
		cm.sendOk ("Have a great time!");
	}
}