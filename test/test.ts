import Forge = require('forge-di');
import Smithy = require('../build/Smithy');

var forge = new Forge();

var blacksmith = new Smithy.Blacksmith(forge);

class Blah {}
var blah = new Blah();

var equipment: Smithy.IEquipment = [
  new Smithy.Tools.Instance('blah', blah),
  new Smithy.Tools.Type('blah', Blah),
  new Smithy.Tools.Function('test', () => 'test')
];

blacksmith.registerEquipment(equipment);