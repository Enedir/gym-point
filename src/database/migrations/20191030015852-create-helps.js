module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('helps', {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      question: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      answer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      answer_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      student_id: {
        type: Sequelize.BIGINT,
        references: { model: 'students', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('helps');
  },
};
