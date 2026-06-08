import stripe from "../config/stripe.js";
import User from "../models/auth.model.js";

export const stripeWebHook = async(req,res)=>{
    const signature = req.headers["stripe-signature"];
    let event;
    try{
        event=stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        )


    }catch(error){
        
        return res.status(500).json({message:`webhook error ${error}`})
    }

    if(event.type==="checkout.session.completed"){
        const session = event.data.object
        const userId = session.metadata.userId
        const credits = Number(session.metadata.credits)
        const plan = session.metadata.plan

        await User.findByIdAndUpdate(userId,{
            $inc:{credits},
            plan
        })
    }
    return res.json({creditRecived:true});
}