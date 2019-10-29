import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class HelpOrderController {
  async index(req, res) {
    // const { page = 1 } = req.query;
    // const registrations = await Checkin.findAll({
    //   where: { student_id: req.params.id },
    //   order: ['created_at'],
    //   attributes: ['id', 'created_at'],
    //   limit: 20,
    //   offset: (page - 1) * 20,
    //   include: [
    //     {
    //       model: Student,
    //       as: 'student',
    //       attributes: ['name'],
    //     },
    //   ],
    // });
    // return res.json(registrations);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' });
    }

    const data = {
      question: 'sdfsdfgsdfsdf',
      student_id: 1,
      answer: 'sdasdasdasdas',
      answer_at: new Date(),
    };

    const { id, student_id, question, created_at } = await HelpOrder.create(
      data
    );

    return res.json({
      id,
      student_id,
      question,
      created_at,
    });
  }
}

export default new HelpOrderController();
