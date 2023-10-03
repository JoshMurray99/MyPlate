import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import axios from "axios";
import './RecipePage.css'

export default function RecipePage() {
    let {recipeId} = useParams()
    const [recipeSteps, setRecipeSteps] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [nutrition, setNutrition] = useState([])
    const [cookTime, setCookTime] = useState('')
    const API_KEY = import.meta.env.VITE_API_KEY

    async function getRecipeInformation() {
        const options = {
            method: 'GET',
            url: `https://api.spoonacular.com/recipes/${recipeId}/information`,
            params: {
                'includeNutrition': 'true' ,
                'apiKey': `${API_KEY}`
            }
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setRecipeSteps(response.data.analyzedInstructions[0].steps)
            setIngredients(response.data.extendedIngredients)
            setTitle(response.data.title)
            setImage(response.data.image)
            const nutrientNamesToRender = ['Calories', 'Protein', 'Carbohydrates', 'Fat', 'Saturated Fat', 'Sugar' ]
            const filteredNutrients = response.data.nutrition.nutrients.filter(nutrient => 
                nutrientNamesToRender.includes(nutrient.name))
            setNutrition(filteredNutrients)
            setCookTime(response.data.readyInMinutes)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getRecipeInformation()
    }, [])

    
  return (
    <div className="recipe-page">
    <h1>{title}</h1>
    <h3>Ready in: {cookTime} minutes</h3>
    <img src={image} alt={`Image of ${title}`} className="recipe-image"/>
    <h2>Nutrition</h2>
    <div className="nutrition-grid">
    {nutrition.map((object) => (
        <div key={object.name}>
            {object.name}: {object.amount} {object.unit}
        </div>
    ))}
    </div>
    <h2>Ingredients</h2>
    <ul>
        {ingredients.map((object, index) => (
            <li key={index}>
                { object.original}
            </li>
        ))}
        </ul>

        <h2>Steps</h2>
            <ol>
        {recipeSteps.map((object) => (
            <li key={object.number}>
                { object.step}
                </li>
        )) }
        </ol>
        
        
        
    </div>
  )
}
