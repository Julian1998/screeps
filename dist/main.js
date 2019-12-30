var roleHarvester = require('roleHarvester');
var roleUpgrader = require('roleUpgrader');
var roleBuilder = require('roleBuilder')
var spawner = require('spawner');

module.exports.loop = function () {
  //Constants
  const harvesters = 3;
  const upgraders = 3;
  const builders = 2;

  //create memory source instance if neccessary, otherwise update
  if(!Memory.sources) {
    var sources = Game.spawns["Spawn1"].room.find(FIND_SOURCES);
    Memory.sources = [];
    sources.forEach((source) => {
      Memory.sources.push({sourceId: source.id, number: 0});
    });
  }

  //Update source memory
  for(var name in Memory.creeps) {
    var creep = Game.creeps[name];
    if(creep && creep.ticksToLive == 1) {
      Memory.sources.forEach((source) => {
        if(source.sourceId == creep.sourceId) {
          source.number -= 1;
        }
      });
    }
  }

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
