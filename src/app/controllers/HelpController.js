import * as Yup from 'yup';

import Help from '../models/Help';
import Student from '../models/Student';

class HelpController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const helps = await Help.findAll({
      where: { student_id: req.params.id },
      order: ['created_at'],
      attributes: ['id', 'question', 'answer', 'answer_at'],
      limit: 20,
      offset: (page - 1) * 20,
    });
    return res.json(helps);
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
      question: req.body.question,
      student_id: req.params.id,
    };

    const { id, question } = await Help.create(data);

    return res.json({
      id,
      question,
    });
  }
}

export default new HelpController();
