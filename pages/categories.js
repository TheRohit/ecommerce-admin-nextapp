import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Categories() {
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    useEffect(() => {
        fetchCategories()
    } , [] )

    function fetchCategories(){
        axios.get('/api/categories').then(result => {
            setCategories(result.data);
        })
    }
   async function saveCategory(ev){
        ev.preventDefault();
        await axios.post('/api/categories',{name, parentCategory});
        setName('');
        fetchCategories()
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
            <select className="my-0" 
            onChange={ev => setParentCategory(ev.target.value)}
            value={parentCategory}
            >
                <option value="0">No parent category</option>
                {categories.length > 0 && categories.map(category => (
                    <option value={category._id}>{category.name}</option>
                 ))} 

            </select>
            <button type="submit" className="btn-primary py-1">Submit</button>
            </form>
            
            <table className="basic mt-4">
                <thead>
                <tr>
                <td> Category Name</td>
                </tr>
                </thead>
                <tbody>
                 {categories.length > 0 && categories.map(category => (
                    <tr>
                        <td>{category.name}</td>
                    </tr>
                 ))} 
                </tbody>
            </table>
        </Layout>
    )

}

