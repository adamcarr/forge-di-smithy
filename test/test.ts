import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

var forge = new Forge();

var blacksmith = new Smithy.Blacksmith(forge);

class Blah {}

var equipment: Smithy.IEquipment = [
  new Smithy.TypeTool('blah', Blah),
  new Smithy.TypeTool('blah', Blah)
];

blacksmith.registerEquipment(equipment);