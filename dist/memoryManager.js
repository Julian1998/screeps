var memoryManager = {

  run: function () {
    //create memory source instance if neccessary, otherwise update
    if(!Memory.sources) {
      var sources = Game.spawns["Spawn1"].room.find(FIND_SOURCES);
      Memory.sources = [];
      sources.forEach((source) => {
        Memory.sources.push({sourceId: source.id, number: 0});
      });
    }

    //Clear unnused memory
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        //Update sources before clearing
        Memory.sources.forEach((source) => {
          if(source.sourceId == Memory.creeps[name].sourceId) {
            source.number--;
          }
        });
        //clear
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  }
};

module.exports = memoryManager;
