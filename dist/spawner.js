var spawner = {

  /** @param {int} numberOfHarvesters **/
  /** @param {int} numberOfUpgraders **/
  /** @param {int} numberOfBuilders **/
  run: function (numberOfHarvesters, numberOfUpgraders, numberOfBuilders) {
    var spawner = Game.spawns['Spawn1'];
    var body = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];

    if(spawner.room.energyAvailable < 400) {
      return;
    }

    module.exports.spawn('harvester', numberOfHarvesters, spawner, body);
    module.exports.spawn('upgrader', numberOfUpgraders, spawner, body);
    module.exports.spawn('builder', numberOfBuilders, spawner, body);

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
  /** @param {int} number **/
  /** @param {object} spawn **/
  /** @param {array} body **/
  spawn: function (role, number, spawn, body) {
    var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

    if (creeps.length < number) {
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
  }
};

module.exports = spawner;
