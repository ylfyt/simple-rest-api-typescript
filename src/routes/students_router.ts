import Express from 'express';

import { getStudent, getStudentByNim, insertStudent, deleteStudent, updateStudent } from '../controllers/student_controller';

const router = Express.Router();

router.get('/', getStudent);
router.post('/', insertStudent);
router.get('/:nim', getStudentByNim);
router.delete('/:nim', deleteStudent);
router.put('/:nim', updateStudent);

export default router;
