const CategoryController = require("./../controllers/category-controllers");
const router = require("express").Router();
const authenticationMiddleware = require("./../middleware/authentication-middleware");


router.post("/category", CategoryController.createCategory);

router.put("/category", authenticationMiddleware, CategoryController.updateCategory);
router.delete("/category", authenticationMiddleware, CategoryController.deleteCategory);

module.exports = router;
