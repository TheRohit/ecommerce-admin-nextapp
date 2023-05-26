import Layout from "@/components/Layout";
import axios from "axios";
import { useState } from "react";


export default function Categories() {
    // Define a state variable called "name" and a function called "setName" to update it
    const [name, setName] = useState('');

    // Define a function called "saveCategory" that is called when the form is submitted
    async function saveCategory(ev){
        // Prevent the default form submission behavior
        ev.preventDefault();
        // Send a POST request to the "/api/categories" endpoint with the "name" state variable as the request body
        await axios.post('/api/categories',{name});
        // Set the "name" state variable to an empty string
        setName('');
    }

    // Return a JSX element that renders a form to create new categories
    return (
        <form onSubmit={saveCategory}>
            <label>
                Name:
                {/* Bind the input field to the "name" state variable and update it when the user types in the input field */}
                <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </label>
            {/* Trigger the form submission when the submit button is clicked */}
            <button type="submit">Save</button>
        </form>
    );
}
