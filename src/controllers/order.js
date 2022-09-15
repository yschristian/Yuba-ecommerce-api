import Order from "../models/Order"

class orderController{
    static async createOrder(req,res){
        try {
            const newOrder = new Order(req.body)
            const order = await newOrder.save()
            return res.status(200).json({message:"order created successfully",order})  
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
       
    }

    static async updateOrder(req,res){
        try {
            const updateOrder = await Order.findByIdAndUpdate(
            req.params._id,
            {
                $set: req.body,
            },
            { new:true}
            )
            return res.status(200).json({message:"order updated successfully", updateOrder})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    //GET ALL OrderS

    static async getAll(req,res){
        try {
           const orders = await Order.find()
           return res.status(200).json({message:"all orders",orders })
           
        } catch (error) {
            
            return res.status(500).json({error:error.message})
        }
    }
    //GET USER ORDERs
    static async getSingleOrder(req,res){
        try {
            const orders = await Order.find({userId: req.params.userId})
            return res.status(200).json({message:"orders  found",orders })
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
    static async delete(req,res){
        try {
            const id = req.params._id
            const order = await Order.findByIdAndDelete(id)
            return res.status(200).json({message:"order has been deleted successfully", order})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }

    // GET MONTHLY INCOME
    static async income(req,res){
        const productId = req.query.pid
        const date = new Date()
        const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
        const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1))
        try {
            const income = await Order.aggregate([
                { $match: {createdAt : {$gte : previousMonth }, 
                ...(productId && {
                    products:{$elemMatch: {productId}}
                })}},
                {
                    $project:{
                        month:{ $month:"$createdAt" },
                        sales:"$amount",
                    },
                },
                {
                    $group:{
                        _id:"$month",
                        total:{ $sum : "$sales"},
                    },
                },
            ]);
            return res.status(200).json({message:"income monthly",income})
        } catch (error) {
            return res.status(500).json({error:error.message})
        }
    }
}

export default orderController