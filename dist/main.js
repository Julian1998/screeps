var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder')
var spawner = require('spawner');
var memoryManager = require('memoryManager');
var roadBuilder = require('roadbuilder');
var towers = require('towers');

module.exports.loop = function () {
  //Constants
  const harvesters = 3;
  const upgraders = 3;
  const builders = 2;

  //Run memory updater/cleaner
  memoryManager.run();

  //build roads
  roadBuilder.run('Spawn1');

  //Spawn creeps if needed
  spawner.run(harvesters, upgraders, builders);

  //Run creep role actions
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    else if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    else if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }

  //Run towers
  towers.run();

  //Run creep role actions
  for(var name in Game.creeps) {
    var creep = Game.creeps[name];
    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }
    else if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }
    else if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
}
