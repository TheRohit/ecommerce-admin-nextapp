import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method==='POST'){
        const {name}= req.body; 
        //same as const name=req.body.name
       
       const categoryDoc= await Category.create({name});
       res.json(categoryDoc);
    }

}