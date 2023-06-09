import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method==='GET'){
        res.json( await Category.find().populate('parent'));
    }

    if(method==='POST'){
        const {name,parentCategory,properties}= req.body; 
        //same as const name=req.body.name
       
       const categoryDoc= await Category.create({
        name,
        parent:parentCategory || undefined,
        properties:properties,
    });

    
       res.json(categoryDoc);
    }
    if(method==='PUT'){
        const {name,parentCategory,properties,_id,}= req.body; 
        //same as const name=req.body.name
       
       const categoryDoc= await Category.updateOne({_id},{name,
        parent:parentCategory || undefined
        ,properties:properties,
    });

    
       res.json(categoryDoc);
    }

    if(method==='DELETE'){
        const {_id}= req.query;
      await  Category.deleteOne({_id});
      res.json('ok');
    }

}  