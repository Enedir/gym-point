import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const registrations = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: ['created_at'],
      attributes: ['id', 'created_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });
    return res.json(registrations);
  }

  async store(req, res) {
    const student_id = req.params.id;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists.' });
    }

    const now = new Date();
    const startDate = subDays(now, 7);

    const count = await Checkin.count({
      where: {
        student_id,
        created_at: {
          [Op.between]: [startOfDay(startDate), endOfDay(now)],
        },
      },
    });

    if (count >= 7) {
      return res
        .status(400)
        .json({ error: 'You have 7 checkin in this week.' });
    }

    const { id, created_at } = await Checkin.create({ student_id });

    return res.json({
      id,
      message: 'Ckeck in efetuado',
      created_at,
    });
  }
}

export default new CheckinController();
