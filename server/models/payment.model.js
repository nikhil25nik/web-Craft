import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    amount:Number,
    credits:Number,
    razorpayOrderId:String,
    razorpayPaymentId:String,
    status:{
        type:String,
        enum:["credted","paid","failed"],
        default:"created"
    }
},{timestamps:true})

const Payment = mongoose.model("Payment",paymentSchema);

export default Payment;