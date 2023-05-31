import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

 function Categories({swal}) {
    const [editedCategory, setEditedCategory] = useState(null)
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
        const data= {name, parentCategory};
        if(editedCategory){
            data._id= editedCategory._id;
            await axios.put('/api/categories',data);
            setEditedCategory(null);
        }
        else{
            await axios.post('/api/categories',data);
        }
        
        setName('');
        fetchCategories()
    }
    function editCategory(category){
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
         
    }

    function deleteCategory(category){
        swal.fire({
            title: 'Are you sure bruh?',
            text: `Do you want to bonk ${category.name}?` ,
            showCancelButton:true,
            cancelButtonText:'Cancel',
            confirmButtonText:'Yes,Delete!',
            confirmButtonColor:'#d55',
            reverseButtons:true

            


            
        }).then(async result => {
            // when confirmed and promise resolved...
            if(result.isConfirmed){
                const {_id}=category;
                await axios.delete('/api/categories?_id='+ _id);
                fetchCategories();
            }


        });
    }
    
    return(
        
        <Layout>
            <h1>
                Categories
            </h1>
            <label>
            {editedCategory 
            ? `Edit Category ${editedCategory.name}`
            : 'New Category Name'}
            </label>
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
                        <td>{category?.parent?.name}</td>
                        <td >
                        <div className="flex">
                            <button 
                            onClick={() => editCategory(category)} 
                            className ="btn-primary mr-1"
                            >
                            Edit
                            </button>
                            <button 
                            onClick={()=> deleteCategory(category)}
                            className="btn-primary">Delete</button>
                            </div>
                        </td>
                    </tr>
                 ))} 
                </tbody>
            </table>
        </Layout>
    )

}

export default withSwal(({swal},ref) => 
(<Categories swal={swal} />
 ));


