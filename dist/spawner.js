var spawner = {

  /** @param {int} numberOfHarvesters **/
  /** @param {int} numberOfUpgraders **/
  /** @param {int} numberOfBuilders **/
  run: function (numberOfHarvesters, numberOfUpgraders, numberOfBuilders) {
    var spawn = Game.spawns['Spawn1'];
    var body = [WORK,CARRY,MOVE];

    spawn('harvester', numberOfHarvesters, spawn, body);
    spawn('upgrader', numberOfUpgraders, spawn, body);
    spawn('builder', numberOfBuilders, spawn, body);

    //Visualize
    if (spawn.spawning) {
      var spawningCreep = Game.creeps[spawn.spawning.name];
      spawn.room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        spawn.pos.x + 1,
        spawn.pos.y,
        {align: 'left', opacity: 0.8});
    }
  }
};

//Spawns a creeper
/** @param {String} role **/
/** @param {int} number **/
/** @param {object} spawn **/
/** @param {array} body **/
function spawn(role, number, spawn, body) {
  var creeps = _.filter(Game.creeps, (creep) => creep.memory.role == role);

  if (creeps.length < number) {
    var newName = role + Game.time;
    console.log('Spawning new ' + role + ': ' + newName);
    spawn.spawnCreep(body, newName,
      {memory: {role: role}});
  }
}

module.exports = spawner;
