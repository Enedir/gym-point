import Sequelize, { Model } from 'sequelize';

class Helps extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.BIGINT,
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Helps;
