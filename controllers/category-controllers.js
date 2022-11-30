const { Category } = require("./../models/index");
const { compare } = require("./../helpers/hash");
const category = require("../models/category");

class CategoryController {
    static async createCategory(req, res, next) {
		try {
			let { type, sold_product_amount} = req.body;
			const { id } = req.category;
			const category = await Category.findOne(
				{ where: { id } }
			);

			if (!category) {
				throw { type: "ErrNotFound" }
			} else if (category.id !== id) {
				throw { type: "not allowed" }
			} 
			
			const result = await Category.update(
                res.json({message: "Success"})
            )
		} catch (err) {
			next(err)
		}
	}

	static async updateCategory(req, res, next) {
		try {
			let { type, sold_product_amount} = req.body;
			const { id } = req.category;
			const category = await Category.findOne(
				{ where: { id } }
			);

			if (!category) {
				throw { type: "ErrNotFound" }
			} else if (category.id !== id) {
				throw { type: "not allowed" }
			} 
			
			const result = await Category.update(
                res.json({message: "Success"})
            )
		} catch (err) {
			next(err)
		}
	}

	static async deleteCatagory(req, res, next) {
		try {
			const { id } = req.category
			const category = await Category.findOne(
				{ where: { id } }
			)
			if (!category) {
				throw { type: "ErrNotFound" }
			}
			if (id !== type.id) {
				throw { type: "not allowed" }
			}
			await Category.destroy({ where: { id } })
			res.json({ message: "Successfully deleted" })
		} catch (err) {
			next(err)
		}
	}
}

module.exports = UsersController;
