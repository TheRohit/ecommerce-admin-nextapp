import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";

export default function Categories() {
    const [name, setName] = useState([]);
    function saveCategory(){
        axios.post('/api/categories',{name});
        setName('');
    }
    return(
        
        <Layout>
            <h1>
                Categories
            </h1>
            <label>New Category Name</label>
            <form onSubmit={saveCategory} className="flex gap-1">
            <input 
            className="my-0"
            type="text"
            placeholder={"Category Name"} 
            onChange={(e) => setName(e.target.value)}
            value={name}    
            />
            <button type="submit" className="btn-primary py-1">Submit</button>
            </form>
            
        </Layout>
    )

}
