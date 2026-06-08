import {generateResponse} from "../config/openRouter.js"
import { extractJson } from "../utils/extractJson.js"
export const getCurrentUser = async(req,res)=>{
    try{
        if(!req.user){
            return res.json({user:null})
        }
        return res.json(req.user)
    }catch(error){
        return res.status(500).json({message:`get current user error ${error}`})
    }
}

export const demoController = async(req,res)=>{
    try{
        const data = await generateResponse("hello");
        const result = data.choices[0].content
        return res.status(200).json(data)
    }catch(error){
        return res.status(500).json(error)
        
    }
}