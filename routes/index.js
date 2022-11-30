const router = require("express").Router();

const usersRouter = require("./users-router");
const categoriesRouter = require('./categories-router');
const productsRouter = require('./products-router');
const errorMiddleware = require("./../middleware/error-middleware");
const authenticationMiddleware = require("./../middleware/authentication-middleware");

router.use(usersRouter);
router.use(authenticationMiddleware);
router.use(categoriesRouter);
router.use(productsRouter);

router.use((req, res, next) => {
	next({ name: "PageNotFound" });
});

router.use(errorMiddleware);

module.exports = router;
