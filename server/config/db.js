import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL || "mongodb+srv://nikhilkurane25_db_user:Nikhil1234@cluster0.n18mkqu.mongodb.net/webCraft?appName=Cluster0");
        console.log("Connected DB");
    }catch(err){
        console.log(err);
    }
}

export default connectDB;
