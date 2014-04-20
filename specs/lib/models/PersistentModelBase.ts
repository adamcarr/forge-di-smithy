import Contracts = require('../Contracts');

class PersistentModelBase<TModel extends Contracts.IPersistentModel>
	implements Contracts.IPersistentModel {

	constructor(public repository: Contracts.IRepository<TModel>) {

	}

	public save(): Promise<TModel> {
		return this.repository.save(<any>this);
	}

	public delete(): Promise<boolean> {
		return this.repository.delete(<any>this);
	}
}

export = PersistentModelBase;