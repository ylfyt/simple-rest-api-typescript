import Students from '../models/Student';
import { Request, Response } from 'express';

export const getStudent = async (req: Request, res: Response) => {
	try {
		const students = await Students.find();
		res.json(students);
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};

export const getStudentByNim = async (req: Request, res: Response) => {
	const nim = req.params.nim;
	try {
		const student = await Students.findOne({ nim: nim });
		if (student) {
			res.json(student);
		} else {
			res.status(404).json({ error: 'Student not found' });
		}
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};

export const insertStudent = async (req: Request, res: Response) => {
	const student = {
		nim: req.body.nim,
		name: req.body.name,
		email: req.body.email,
	};

	try {
		const newStudent = new Students(student);
		const savedStudent = await newStudent.save();
		res.status(200).json(savedStudent);
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};

export const deleteStudent = async (req: Request, res: Response) => {
	const nim = req.params.nim;

	try {
		const removedStudent = await Students.findOneAndRemove({ nim: nim });
		if (removedStudent) {
			res.json(removedStudent);
		} else {
			res.status(404).json({ error: 'Student not found' });
		}
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};

export const updateStudent = async (req: Request, res: Response) => {
	const nim = req.params.nim;

	try {
		const newData = {
			name: req.body.name,
			email: req.body.email,
		};
		const updatedStudent = await Students.updateOne({ nim: nim }, { $set: newData });
		res.json(updatedStudent);
	} catch (error) {
		let result = (error as Error).message;
		res.status(404).json({ error: result });
	}
};
