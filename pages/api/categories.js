export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method==='POST'){
        const {name}= req.body; 
        //same as const name=req.body.name
       
    }

}