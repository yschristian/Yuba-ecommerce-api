import Product from "../models/Product"

class productController{
    static async createProduct(req,res){
        try {
            const newProduct = new Product(req.body)
            const product = await newProduct.save()
            return res.status(200).json({message:"product created successfully",product})  
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
       
    }

    static async updateProduct(req,res){
        try {
            const updateProduct = await Product.findByIdAndUpdate(
            req.params._id,
            {
                $set: req.body,
            },
            { new:true}
            )
            return res.status(200).json({message:"user updated successfully", updateProduct})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    //GET ALL PRODUCTS

    static async getAll(req,res){
        const qNew = req.query.new
        const qCategory = req.query.category
        try {
           let products;
           if(qNew){
            products = await Product.find().sort({createdAt: -1 }).limit(5)

           }else if(qCategory){ 
             products = await Product.find({categories:{
                $in:[qCategory], 
             }});

           }else{
            products = await Product.find( )
           }
           return res.status(200).json(products)
        } catch (error) {
            
            return res.status(500).json({error:error.message})
        }
    }
    static async getSingleProduct(req,res){
        try {
            const id = req.params._id
            const product = await Product.findById(id)
            return res.status(200).json({message:"user found",product })
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    static async delete(req,res){
        try {
            const id = req.params._id
            const product = await Product.findByIdAndDelete(id)
            return res.status(200).json({message:"product deleted successfully", product})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

    
}

export default productController