import * as Yup from 'yup';

import Help from '../models/Help';

class AnswerController {
  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const help = await Help.findByPk(req.params.id);

    if (!help) {
      return res.status(400).json({ error: 'Student not exists.' });
    }

    const data = {
      answer: req.body.answer,
      answer_at: new Date(),
    };

    const { id, question, answer, answer_at } = await help.update(data);

    /** TODO: Mandar email para o aluno */

    return res.json({
      id,
      question,
      answer,
      answer_at,
    });
  }
}

export default new AnswerController();
