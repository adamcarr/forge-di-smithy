/// <reference path="../../../declarations/bluebird.d.ts" />

import Contracts = require('../Contracts');

module ModelsContracts {
	export interface ILecture<TAttendee extends Contracts.IEmailable> extends Contracts.IPersistentModel {
		name: string;
		getAttendees(): Promise<TAttendee[]>;
		enroll(attendee: TAttendee): Promise<boolean>;
		disenroll(attendee: TAttendee): Promise<boolean>;
	}

	export interface IStudent extends Contracts.IPerson { }

	export interface ITeacher extends Contracts.IPerson { }

	export interface ILectureRepository<TAttendee extends Contracts.IEmailable> extends Contracts.IRepository<ILecture<TAttendee>> { }

	export interface IStudentRepository extends Contracts.IRepository<IStudent>{}

	export interface ITeacherRepository extends Contracts.IRepository<ITeacher>{}

}

export = ModelsContracts;