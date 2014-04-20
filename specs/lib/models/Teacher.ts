import ModelsContracts = require('./Contracts');
import PersonBase = require('./PersonBase');

class Teacher
	extends PersonBase<ModelsContracts.ITeacher>
	implements ModelsContracts.ITeacher {

	constructor(
		teacherRepository: ModelsContracts.ITeacherRepository) {
		super(teacherRepository);
	}
}

export = Teacher;