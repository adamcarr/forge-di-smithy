/// <reference path="../declarations/chai.d.ts" />

var expect: chai.ExpectStatic = require('chai').expect;

import Forge = require('forge-di');
import bootstrapper = require('./lib/Bootstrapper');
import Contracts = require('./lib/Contracts');
import ModelsContracts = require('./lib/models/Contracts');

import Lecture = require('./lib/models/Lecture');
import Student = require('./lib/models/Student');
import Teacher = require('./lib/models/Teacher');

import Database = require('./lib/storage/DatabaseRepository');
import Memory = require('./lib/storage/MemoryRepository');

describe('Smithy.Blacksmith', () => {
	var forge: Forge;
	bootstrapper.build();
	forge = bootstrapper.forge;

	it('should create a forge object', () => {
		expect(forge).to.be.an.instanceOf(Forge);
	});
	
	describe('given equipment registered for each repository', () => {
		it("should resolve 'lectureRepository' as Memory.Repository", () => {
			var lectureRepository = forge.get('lectureRepository');
			expect(lectureRepository).to.be.an.instanceOf(Memory.Repository);
		});
		
		it("should resolve 'studentRepository' as Database.Repository", () => {
			var studentRepository = forge.get('studentRepository');
			expect(studentRepository).to.be.an.instanceOf(Database.Repository);
		});
		
		it("should resolve 'teacherRepository' as Memory.Repository", () => {
			var teacherRepository = forge.get('teacherRepository');
			expect(teacherRepository).to.be.an.instanceOf(Memory.Repository);
		});
		
		it("should generate new Lecture when LectureRepository.getNew is called", () => {
			var lectureRepository = forge.get<ModelsContracts.ILectureRepository<Contracts.IPerson>>('lectureRepository');
			var newLecture = lectureRepository.getNew();
			expect(newLecture).to.be.an.instanceOf(Lecture);
		});
		
		it("should generate new Student when StudentRepository.getNew is called", () => {
			var studentRepository = forge.get<ModelsContracts.ILectureRepository<Contracts.IPerson>>('studentRepository');
			var newStudent = studentRepository.getNew();
			expect(newStudent).to.be.an.instanceOf(Student);
		});
		
		it("should generate new Teacher when LectureRepository.getNew is called", () => {
			var teacherRepository = forge.get<ModelsContracts.ILectureRepository<Contracts.IPerson>>('teacherRepository');
			var newTeacher = teacherRepository.getNew();
			expect(newTeacher).to.be.an.instanceOf(Teacher);
		});
	});

	describe('given equipment registered for each type', () => {
		it("should resolve 'lecture' as Lecture with memory repository", () => {
			var lecture = forge.get('lecture');
			expect(lecture).to.be.an.instanceOf(Lecture);
			expect((<any>lecture).repository).to.be.an.instanceOf(Memory.Repository);
		});
		
		it("should resolve 'student' as Student with database repository", () => {
			var student = forge.get('student');
			expect(student).to.be.an.instanceOf(Student);
			expect((<any>student).repository).to.be.an.instanceOf(Database.Repository);
		});
		
		it("should resolve 'teacher' as Teacher with memory repository", () => {
			var teacher = forge.get('teacher');
			expect(teacher).to.be.an.instanceOf(Teacher);
			expect((<any>teacher).repository).to.be.an.instanceOf(Memory.Repository);
		});
		
		describe('given transient models and singleton repositories', () => {
			it("should resolve separate instances of 'lecture' with the same repository instance", () => {
				var lecture1 = forge.get('lecture');
				var lecture2 = forge.get('lecture');
				
				expect(lecture1).not.to.be.equal(lecture2);
				expect((<any>lecture1).repository).to.be.equal((<any>lecture2).repository);
			});
			it("should resolve separate instances of 'student' with the same repository instance", () => {
				var student1 = forge.get('student');
				var student2 = forge.get('student');
				
				expect(student1).not.to.be.equal(student2);
				expect((<any>student1).repository).to.be.equal((<any>student2).repository);
			});
			it("should resolve separate instances of 'teacher' with the same repository instance", () => {
				var teacher1 = forge.get('teacher');
				var teacher2 = forge.get('teacher');
				
				expect(teacher1).not.to.be.equal(teacher2);
				expect((<any>teacher1).repository).to.be.equal((<any>teacher2).repository);
			});
		});
	});

});