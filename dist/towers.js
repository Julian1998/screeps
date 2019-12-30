var towers = {

  /** @param {object} tower **/
  run: function() {
    var room = Game.spawns["Spawn1"].room;
    var towers = room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_TOWER);
      }
    });
    towers.forEach((tower) => {
      var closestDamagedStructure = target.findClosestByRange(FIND_STRUCTURES, {
          filter: (structure) => structure.hits < structure.hitsMax
      });
      if(closestDamagedStructure) {
        target.repair(closestDamagedStructure);
      }
      var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if(closestHostile) {
        tower.attack(closestHostile);
      }
    });
  }
};

module.exports = towers;
