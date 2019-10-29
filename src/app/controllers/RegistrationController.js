import * as Yup from 'yup';

import Registration from '../models/Registration';
import Plan from '../models/Plan';
import Student from '../models/Student';

class RegistrationController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const registrations = await Registration.findAll({
      order: ['start_date'],
      attributes: ['id', 'start_date', 'end_date', 'price'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['title'],
        },
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
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    /** TODO: ADICIONAR VALIDAÇÕES */

    const { plan_id, student_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const end_date = plan.calculateEndDate(start_date);
    const price = plan.calculatePrice();

    const { id } = await Registration.create({
      plan_id,
      student_id,
      start_date,
      end_date,
      price,
    });

    /** TODO: ENVIAR UM EMAIL */

    return res.json({
      id,
      plan_id,
      student_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      plan_id: Yup.number()
        .positive()
        .integer()
        .required(),
      student_id: Yup.number()
        .positive()
        .integer()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }
    const registrationId = req.params.id;

    /** TODO: ADICIONAR VALIDAÇÕES */

    const { plan_id, student_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    const end_date = plan.calculateEndDate(start_date);
    const price = plan.calculatePrice();

    const { id } = await Registration.update(
      {
        plan_id,
        student_id,
        start_date,
        end_date,
        price,
      },
      { where: { id: registrationId } }
    );

    return res.json({
      id,
      plan_id,
      student_id,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const rows = await Registration.destroy({ where: { id: req.params.id } });
    return res.json(rows);
  }
}

export default new RegistrationController();
