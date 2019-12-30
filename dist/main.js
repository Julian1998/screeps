var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder')
var spawner = require('spawner');
var memoryManager = require('memoryManager');

module.exports.loop = function () {
  //Constants
  const harvesters = 3;
  const upgraders = 3;
  const builders = 2;

  //Run memory updater/cleaner
  memoryManager.run();

  //Spawn creeps if needed
  spawner.run(harvesters, upgraders, builders);

  //Run role actions
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
