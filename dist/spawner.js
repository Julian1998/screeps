var spawner = {

  /** @param {int} numberOfHarvesters **/
  /** @param {int} numberOfUpgraders **/
  /** @param {int} numberOfBuilders **/
  run: function (numberOfHarvesters, numberOfUpgraders, numberOfBuilders) {
    var spawner = Game.spawns['Spawn1'];
    var body = [WORK,CARRY,MOVE];

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
      spawn.spawnCreep(body, newName,
        {memory: {role: role}});
    }
  }
};

module.exports = spawner;
