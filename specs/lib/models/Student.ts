import ModelsContracts = require('./Contracts');
import PersonBase = require('./PersonBase');

class Student
	extends PersonBase<ModelsContracts.IStudent>
	implements ModelsContracts.IStudent {

	constructor(
		studentRepository: ModelsContracts.IStudentRepository) {
		super(studentRepository);
	}
}

export = Student;