import Contracts = require('../Contracts');
import Promise = require('bluebird');
import Forge = require('forge-di');

var _: _.LoDashStatic = require('lodash');

// Using memory store here for simplicity
module Database {
	var storageContainer: any[];
	
	export class Repository<TModel extends Contracts.IPersistentModel> implements Contracts.IRepository<TModel> {
		public getNew: () => TModel;
		
		constructor(forge: Forge, modelName: string) {
			storageContainer = [];
			this.getNew = () => forge.get<TModel>(modelName);
		}
		
		public getByFilter(filter: Object): Promise<TModel[]>;
		public getByFilter(filter: (item: TModel) => boolean): Promise<TModel[]>;
		public getByFilter(filter: any): Promise<TModel[]> {
			if (_.isObject(filter)) {
				return Promise.resolve(_.where<TModel, Object>(<TModel[]>storageContainer, filter));
			} else if (_.isFunction(filter)) {
				return Promise.resolve(_.filter<TModel>(<TModel[]>storageContainer, filter));
			} else {
				throw 'Filter must be either an object or function.';
			}
		}
		
		public getAll(): Promise<TModel[]> {
			return Promise.resolve(<TModel[]>storageContainer);
		}
		
		public save(model: TModel): Promise<TModel> {
			if (!_.contains(storageContainer, model)) {
				storageContainer.push(model);
			}
			
			return Promise.resolve(model);
		}
		
		public delete(model: TModel): Promise<boolean> {
			var index = storageContainer.indexOf(model);
			var removed = false;
			if (index > -1) {
				removed = true;
				storageContainer.splice(index, 1);
			}
			
			return Promise.resolve(removed);
		}
	}
}

export = Database;
