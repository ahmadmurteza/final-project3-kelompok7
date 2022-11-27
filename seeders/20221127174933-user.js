'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
		const timeNow = new Date();
		await queryInterface.bulkInsert(
			"Users",
			[
				{
					full_name: "ahmad",
					password: "Pas12345!",
					gender: "male",
					email: "ahmad@gmail.com",
					role: "admin",
					createdAt: timeNow,
					updatedAt: timeNow,
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("Users", null, {});
	},
};
