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
	new Smithy.Tools.Type(
		CONSTANTS.LECTURE,
		Lecture,
		Smithy.Lifecycle.Transient
	),
	new Smithy.Tools.Type(
		CONSTANTS.LECTURE_REPOSITORY,
		Memory.Repository,
		{modelName: CONSTANTS.LECTURE}
	),
	
	new Smithy.Tools.Type(
		CONSTANTS.STUDENT,
		Student,
		Smithy.Lifecycle.Transient
	),
	new Smithy.Tools.Type(
		CONSTANTS.STUDENT_REPOSITORY,
		Database.Repository,
		{modelName: CONSTANTS.STUDENT}
	),
	
	new Smithy.Tools.Type(
		CONSTANTS.TEACHER,
		Teacher,
		Smithy.Lifecycle.Transient
	),
	new Smithy.Tools.Type(
		CONSTANTS.TEACHER_REPOSITORY,
		Memory.Repository,
		{modelName: CONSTANTS.TEACHER}
	)
];

var inventory = {
	CONSTANTS: CONSTANTS,
	equipment: equipment
};

export = inventory;