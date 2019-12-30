var spawner = {

  /** @param {int} numberOfHarvesters **/
  /** @param {int} numberOfUpgraders **/
  /** @param {int} numberOfBuilders **/
  run: function (numberOfHarvesters, numberOfUpgraders, numberOfBuilders) {
    var spawner = Game.spawns['Spawn1'];
    var body = [WORK,CARRY,MOVE];
    var energyNeeded = 200;

    if(spawner.room.energyAvailable < energyNeeded) {
      return;
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    if(harvesters.length < numberOfHarvesters) {
      module.exports.spawn('harvester', spawner, body);
    }
    else if(upgraders.length < numberOfUpgraders) {
      module.exports.spawn('upgrader', spawner, body);
    }
    else if( builders.length < numberOfBuilders) {
      module.exports.spawn('builder', spawner, body);
    }

    //Visualize
    if (spawner.spawning) {
      var spawningCreep = Game.creeps[spawner.spawning.name];
      spawner.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawner.pos.x + 1,
        spawner.pos.y,
        {align: 'left', opacity: 0.8});
    }
  },

  //Spawns a creeper
  /** @param {String} role **/
  /** @param {object} spawn **/
  /** @param {array} body **/
  spawn: function (role, spawn, body) {
    var newName = role + Game.time;
    console.log('Spawning new ' + role + ': ' + newName);
    var sources = Memory.sources;
    sources.sort((a, b) => {
      if (a.number < b.number ){
        return -1;
      }
      if (a.number > b.number){
        return 1;
      }
      return 0;
    });
    var sourceId = sources[0].sourceId;
    sources[0].number += 1;
    var options = {memory: {role: role, sourceId: sourceId}};
    spawn.spawnCreep(body, newName, options);
  }
};

module.exports = spawner;
