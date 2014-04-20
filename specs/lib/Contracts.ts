/// <reference path="../../declarations/bluebird.d.ts" />

module Contracts {
	export interface IRepository<TModel extends IPersistentModel> {
		getByFilter(filter: Object): Promise<TModel[]>;
		getByFilter(filter: (item: TModel) => boolean): Promise<TModel[]>;
		getAll(): Promise<TModel[]>;
		getNew(): TModel;
		save(model: TModel): Promise<TModel>;
		delete(model: TModel): Promise<boolean>;
	}
	
	export interface IPersistentModel {
		save(): Promise<IPersistentModel>;
		delete(): Promise<boolean>;
	}
	
	export interface IEmailable extends IPersistentModel {
		email: string;
	}
	
	export interface IPerson extends IPersistentModel, IEmailable {
		name: string;
		age: number;
	}
}

export = Contracts;