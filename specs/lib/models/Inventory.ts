import Smithy = require('../../../build/Smithy');
import Forge = require('forge-di');
import Lecture = require('./Lecture');
import Student = require('./Student');
import Teacher = require('./Teacher');
import Contracts = require('../Contracts');

import Database = require('../storage/DatabaseRepository');
import Memory = require('../storage/MemoryRepository');

var CONSTANTS = {
	LECTURE: 'lecture',
	LECTURE_REPOSITORY: 'lectureRepository',
	STUDENT: 'student',
	STUDENT_REPOSITORY: 'studentRepository',
	TEACHER: 'teacher',
	TEACHER_REPOSITORY: 'teacherRepository',
};

var equipment: Smithy.IEquipment = [
	new Smithy.Tools.Type({
		name: CONSTANTS.LECTURE,
		target: Lecture,
		lifecycle: Smithy.Lifecycle.Transient
	}),
	new Smithy.Tools.Type({
		name: CONSTANTS.LECTURE_REPOSITORY,
		target: Memory.Repository,
		bindingArguments: {modelName: CONSTANTS.LECTURE}
	}),
	
	new Smithy.Tools.Type({
		name: CONSTANTS.STUDENT,
		target: Student,
		lifecycle: Smithy.Lifecycle.Transient
	}),
	new Smithy.Tools.Type({
		name: CONSTANTS.STUDENT_REPOSITORY,
		target: Database.Repository,
		bindingArguments: {modelName: CONSTANTS.STUDENT}
	}),
	
	new Smithy.Tools.Type({
		name: CONSTANTS.TEACHER,
		target: Teacher,
		lifecycle: Smithy.Lifecycle.Transient
	}),
	new Smithy.Tools.Type({
		name: CONSTANTS.TEACHER_REPOSITORY,
		target: Memory.Repository,
		bindingArguments: {modelName: CONSTANTS.TEACHER}
	})
];

var inventory = {
	CONSTANTS: CONSTANTS,
	equipment: equipment
};

export = inventory;