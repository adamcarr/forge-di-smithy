import Contracts = require('../Contracts');
import PersistentModelBase = require('./PersistentModelBase');

class PersonBase<TPerson extends Contracts.IPerson>
	extends PersistentModelBase<TPerson>
	implements Contracts.IPerson {
		
	public email: string;
	public name: string;
	public age: number;

	constructor(
		repository: Contracts.IRepository<TPerson>) {
		super(repository);
	}
}

export = PersonBase;