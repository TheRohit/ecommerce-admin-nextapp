export default async function handle(req,res){
    const {method} = req;
    await mongooseConnect();

    if(method==='POST'){
        
    }

}