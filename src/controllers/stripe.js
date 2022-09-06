const stripe = require("stripe")(process.env.STRIPE_KEY)

class paymentController{

    static async payment(req,res){
         stripe.charges.create({
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
         },(stripeErr, stripeRes)=>{
            if(stripeErr){
                res.status(500).json({error:error.message})
            }else{
                res.status(200).json({message:"payment successfully",stripeRes})
            }
         });
    }
}

export default paymentController