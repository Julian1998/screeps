var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creep) {
    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say('🔄 harvest');
    }
    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say('🚧 build');
    }

    if(creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      //build
      if(targets.length) {
        if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
      //move away
      else {
        var damagedTarget = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(damagedTarget) {
          if(creep.repair(damagedTarget) == ERR_NOT_IN_RANGE) {
              creep.moveTo(damagedTarget, {visualizePathStyle: {stroke: '#ffaa00'}});
          }
        }
        else {
          creep.moveTo(Game.spawns["Spawn1"].pos);
        }
      }
    }
    else {
      var source = Game.getObjectById(creep.memory.sourceId);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
      }
    }
  }
};

module.exports = roleBuilder;
