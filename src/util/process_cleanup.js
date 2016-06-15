"use strict";

var treeUtil = require("testarmada-tree-kill");
var pid = process.pid;
var settings = require("../settings");

// Max time before we forcefully kill child processes left over after a suite run
var ZOMBIE_POLLING_MAX_TIME = 15000;

module.exports = function (callback) {
  if (settings.debug) {
    console.log("Checking for zombie processes...");
  }

  treeUtil.getZombieChildren(pid, ZOMBIE_POLLING_MAX_TIME, function (zombieChildren) {
    if (zombieChildren.length > 0) {
      console.log("Giving up waiting for zombie child processes to die. Cleaning up..");

      var killNextZombie = function () {
        if (zombieChildren.length > 0) {
          var nextZombieTreePid = zombieChildren.shift();
          console.log("Killing pid and its child pids: " + nextZombieTreePid);
          treeUtil.kill(nextZombieTreePid, "SIGKILL", killNextZombie);
        } else {
          console.log("Done killing zombies.");
          return callback();
        }
      };

      return killNextZombie();
    } else {
      if (settings.debug) {
        console.log("No zombies found.");
      }
      return callback();
    }
  });
};
