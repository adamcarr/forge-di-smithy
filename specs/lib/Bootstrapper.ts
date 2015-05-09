import Forge = require('forge-di');
import ModelsInventory = require('./models/Inventory');
import Smithy = require('../../src/index');

var forge = new Forge(),
	blacksmith = new Smithy.Blacksmith(forge);
	
var bootstrapped = false;
var bootstrapper = {
	forge: forge,
	blacksmith: blacksmith,
	build: () => {
		if (!bootstrapped) {
			blacksmith.registerEquipment(ModelsInventory.equipment);
			bootstrapped = true;
		}
	}
};

export = bootstrapper;