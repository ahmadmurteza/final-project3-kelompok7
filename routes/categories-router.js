const CategoryController = require('./../controllers/categories-controllers');
const router = require("express").Router();
const authenticationMiddleware = require("./../middleware/authentication-middleware");

router.post("/categories", CategoryController.postCategory);
router.get("/categories", CategoryController.getCategories);
router.patch("/categories/:id", CategoryController.updateCategory);
router.delete("/categories/:id", CategoryController.deleteCategory);

module.exports = router;