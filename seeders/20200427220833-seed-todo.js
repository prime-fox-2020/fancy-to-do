'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Todos', [
      {
        title: 'Sahur',
        description: 'Makan dan minum sebelum fajar',
        status: 'Done',
        due_date: new Date(2020, 4, 28),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Puasa',
        description: 'Tidak makan dan minum dari fajar hingga terbenam matahari',
        status: 'Done',
        due_date: new Date(2020, 4, 28),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Buka puasa',
        description: 'Makan dan minum setelah terbenam matahari',
        status: 'Done',
        due_date: new Date(2020, 4, 28),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});    
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Todos', null, {});
  }
};
