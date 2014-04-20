import Contracts = require('../Contracts');
import ModelsContracts = require('./Contracts');
import PersistentModelBase = require('./PersistentModelBase');
var _: _.LoDashStatic = require('lodash');

class Lecture<TAttendee extends Contracts.IEmailable> 
	extends PersistentModelBase<ModelsContracts.ILecture<TAttendee>> 
	implements ModelsContracts.ILecture<TAttendee> {
	
	private _attendees: TAttendee[];
	
	public name: string;
		
	constructor (
		lectureRepository: ModelsContracts.ILectureRepository<TAttendee>) {
		super(lectureRepository);
	}
	
	public getAttendees(): Promise<TAttendee[]> {
		return Promise.resolve(this._attendees);
	}
	
	public enroll(attendee: TAttendee): Promise<boolean> {
		if (!_.contains(this._attendees, attendee)) {
			this._attendees.push(attendee);
		}
		
		return Promise.resolve(true);
	}
	
	public disenroll(attendee: TAttendee): Promise<boolean> {
		_.remove(this._attendees, (enrolledAttendee) => enrolledAttendee === attendee);
		
		return Promise.resolve(true);
	}
}

export = Lecture;