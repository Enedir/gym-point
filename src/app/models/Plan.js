import Sequelize, { Model } from 'sequelize';
import { parseISO, addMonths } from 'date-fns';

class Plan extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.DECIMAL(10, 2),
      },
      {
        sequelize,
      }
    );

    return this;
  }

  calculateEndDate(start_date) {
    return addMonths(parseISO(start_date), this.duration);
  }

  calculatePrice() {
    return this.price * this.duration;
  }
}

export default Plan;
