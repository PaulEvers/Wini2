

var status;

// function start() { // starts the NPC
//     status = -1; // sets the status of the NPC to -1
//     action(1, 0, 0); // sets the mode to 1, type to 0, and selection to 0 for the NPC
// } // closes off the start function

// function action(mode, type, selection) { // calls what you set above in function start, almost all actions are done here
//     if (mode == 1) { // the mode is set to 1 because of the function start, as shown above
//         status++; // advances the NPC to the next status, in this case, status 0
//     }else{ // if mode does not equal 1
//         status--; // does not advance the NPC to the next status.
//     }
    
//     if (status == 0) { // if mode was 1, status would move from -1 to 0. If status is 0, these actions will happen
//         if (cm.haveItem(1142308)) {
//             cm.sendOk("Hello #h #!\r\nIt seems like you have already received your #t[1142308]#");
//             cm.dispose();
//         } else {
//             cm.gainItem(1142308, 1);
//             cm.sendOk("Hello and welcome #h #! This is the wonderous world of Olympus. Because you're one of the first players here, have this!\r\n\r\n#v[1142308]##t[1142308]#")
//             cm.dispose();
//         }
//     }
// } 



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
        cm.sendNext("Hello and welcome to the wonderous world of Olympus #h #!");
    } else if (status == 1) {
        if (cm.haveItem(1142308)) {
            cm.sendOk("It seems like you have already received your Early Joiner Medal.");
            cm.dispose();
        } else {
            cm.gainItem(1142308, 1);
            cm.sendOk("Because you're one of the first players here, have this Early Joiner Medal")
            cm.dispose();
        }
    }
}