var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder')
var spawner = require('spawner');

module.exports.loop = function () {
  //Constants
  const harvesters = 2;
  const upgraders = 2;
  const builders = 1;

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

  //Clear unnused memory
  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }
}
