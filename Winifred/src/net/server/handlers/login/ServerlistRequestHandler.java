/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package net.server.handlers.login;

import client.MapleClient;
import constants.game.GameConstants;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import net.AbstractMaplePacketHandler;
import net.server.Server;
import net.server.world.World;
import tools.DatabaseConnection;
import tools.MaplePacketCreator;
import tools.data.input.SeekableLittleEndianAccessor;

public final class ServerlistRequestHandler extends AbstractMaplePacketHandler {

    @Override
    public final void handlePacket(SeekableLittleEndianAccessor slea, MapleClient c) {
        Server server = Server.getInstance();
        List<World> worlds = server.getWorlds();
        c.requestedServerlist(worlds.size());

        int i = 0;
        for (World world : worlds) {

            if (i != 1) {
                c.announce(MaplePacketCreator.getServerList(world.getId(), GameConstants.WORLD_NAMES[world.getId()], world.getFlag(), world.getEventMessage(), world.getChannels()));

            } else if (hasRebirthed(c)) {
                c.announce(MaplePacketCreator.getServerList(world.getId(), GameConstants.WORLD_NAMES[world.getId()], world.getFlag(), world.getEventMessage(), world.getChannels()));
            }

            i++;
        }
        c.announce(MaplePacketCreator.getEndOfServerList());
        c.announce(MaplePacketCreator.selectWorld(0));//too lazy to make a check lol
        c.announce(MaplePacketCreator.sendRecommended(server.worldRecommendedList()));
    }

    private boolean hasRebirthed(MapleClient c) {
        int id = c.getAccID();
        int size = 0;
         try {
            Connection con = DatabaseConnection.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT reborns FROM characters WHERE accountid = ? AND reborns > 0")) {
                ps.setString(1, String.valueOf(id));
                try (ResultSet rs = ps.executeQuery()) {
                    if (!rs.next()) {
                        rs.close();
                        ps.close();
                        return false;
                    }
                    rs.last();
                    size = rs.getRow();
                }
            } finally {
                con.close();
            }
            return size > 0;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
       
    }
}
