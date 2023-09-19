

import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom'

export default function Home () {
    const API_KEY = import.meta.env.VITE_API_KEY

    const [query, setQuery] = useState('')
    const [cuisine, setCuisine] = useState('')
    const [sort, setSort] = useState('protein')
    const [sortDirection, setSortDirection] = useState('desc')
    const [recipes, setRecipes] = useState([])

    const toggleSortDirection = (e) => {
        e.preventDefault()
        if(sortDirection === 'desc'){
            setSortDirection('asc')
        } else{
            setSortDirection('desc')
        }
    }

    useEffect(() => {
        searchRecipes()
    }, [sortDirection])

    
    async function searchRecipes() {
        const options = {
            method: 'GET',
            url: 'https://api.spoonacular.com/recipes/complexSearch',
            params: {
                query: `${query}`,
                cuisine: `${cuisine}`,
                sort: `${sort}`,
                sortDirection: `${sortDirection}`,
                'apiKey': `${API_KEY}`
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setRecipes(response.data.results)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <form className='recipeForm' onSubmit={(e) => {
            e.preventDefault()
            searchRecipes()
            }}>
            <input type="text" name="query" placeholder="search recipes" onChange={(e) => setQuery(e.target.value)}/>
            <input type="text" name="cuisine" placeholder="cuisine" onChange={(e) => setCuisine(e.target.value)}/>
            <>sort by:</>
            <select onChange={(e) => setSort(e.target.value)}>
                <option value="protein">protein</option>
                <option value="calories">calories</option>
                <option value="healthiness">healthiness</option>
                <option value="price">price</option>
            </select>
            <button type="button" onClick={e => toggleSortDirection(e)}>
                {sortDirection === 'desc'? 
                (<FontAwesomeIcon icon={faSortDown} size='xl'/>)
                : 
                ( <FontAwesomeIcon icon={faSortUp} size='xl'/>)}
            </button>
            <button type="submit">search</button>
        </form>

        <div>
        <h2>Recipes:</h2>
        
                {recipes.map((recipe, index) => (
                    
                    <div key={index}>
                        <h2>{recipe.title}</h2>
                        <Link to = {`/recipe/${recipe.id}`}>
                        <img src={recipe.image} />
                        </Link>
                            {sort==="healthiness" || sort==="price"? (null):(recipe.nutrition.nutrients.map((nutrient, nutrientIndex) => (
                                <p key={nutrientIndex}>
                                    {nutrient.name}: {nutrient.amount} {nutrient.unit}
                                </p>
                            )))}
                        
                    </div>
                    
                ))}

      </div>


        </>

    )
}