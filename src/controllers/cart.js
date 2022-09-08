import Cart from "../models/Cart"

class cartController{
    static async createCart(req,res){
        try {
            const newCart = new Cart(req.body)
            const cart = await newCart.save()
            return res.status(200).json({message:"product created successfully",cart})  
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
       
    }

    static async updateCart(req,res){
        try {
            const updateCart = await Cart.findByIdAndUpdate(
            req.params._id,
            {
                $set: req.body,
            },
            { new:true}
            )
            return res.status(200).json({message:"cart updated successfully", updateCart})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    //GET ALL CartS

    static async getAll(req,res){
        try {
           const carts = await Cart.find()
           return res.status(200).json({message:"all carts",carts})
           
        } catch (error) {
            
            return res.status(500).json({error:error.message})
        }
    }
    //GET USER CART
    static async getSingleCart(req,res){
        try {
            const cart = await Cart.findOne({userId: req.params.userId})
            return res.status(200).json({message:"cart found",cart })
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    static async delete(req,res){
        try {
            const id = req.params._id
            const cart = await Product.findByIdAndDelete(id)
            return res.status(200).json({message:"cart deleted successfully", cart})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

    
}

export default cartController