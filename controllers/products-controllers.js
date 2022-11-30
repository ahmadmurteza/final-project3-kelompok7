const { User, Category, Product } = require("./../models/index");
const { compare } = require("./../helpers/hash");
const { sign } = require("./../helpers/jwt");

class ProductController {
	static async postProduct(req, res, next) {
        try {
            const { title, price, stock, CategoryId } = req.body;
			const result = await Product.create({ title, price, stock, CategoryId });
			res.status(201).json({category: { 
                title: result.title, 
                price: result.price, 
                stock: result.stock,
                CategoryId: result.CategoryId,
                createdAt: result.createdAt, 
                updatedAt: result.updatedAt, 
            }});
		} catch (error) {
			next(error);
		}
    }
    
    static async getProducts(req, res, next) {
        try {
            const result = await Product.findAll({ order:[['id','ASC']] });
            res.status(200).json({products: result});
        } catch (error) {
			next(error);
        }
    }

    static async updateProduct(req, res, next) {
        try {
            let { title, price, stock } = req.body;
            const { id } = req.params;
            const userRole = req.user.role;
            
            const product = await Product.findOne({where:{id}});
            
            if (!product){
                throw {name: 'ErrNotFound'}
            } else if (userRole !== 'admin'){
                throw {name: "not allowed"}
            } else if (title === null){
                title = product.title;
            } else if (price === null){
                price = product.price;
            } else if (stock === null){
                stock = product.stock;
            }
            
            const result = await Product.update({ title, price, stock },
                                {where:{id},returning:true});
            
            res.status(200).json(result[1]);
        }catch (err){
            next(err)
        }
    }

    static async updateCategoryProduct(req, res, next) {
        try {
            let { CategoryId } = req.body;
            const { id } = req.params;
            const userRole = req.user.role;
            
            const product = await Product.findOne({where:{id}});
            
            if (!product){
                throw {name: 'ErrNotFound'}
            } else if (userRole !== 'admin'){
                throw {name: "not allowed"}
            } else if (CategoryId === null){
                CategoryId = product.CategoryId;
            } 
            
            const result = await Product.update({ CategoryId },
                                {where:{id},returning:true});
            
            res.status(200).json(result[1]);
        }catch (err){
            next(err)
        }
    }

    static async deleteProduct(req, res, next) {
        try{
            const {id} = req.params;
            const userRole = req.user.role;
            
            const category = await Product.findOne({where:{id}});

            if (!category){
                throw {name: 'ErrNotFound'}
            } else if (userRole !== 'admin'){
                throw {name: "not allowed"}
            }

            await Product.destroy(
                {where:{id}}
            )
            
            res.status(200).json({message:"Product has been successfully deleted"})
        }catch (err){
            next(err)
        }
    }
}

module.exports = ProductController;
