import './App.css'
import {Routes, Route} from "react-router-dom"
import {
  Landing,
  Home,
  RecipePage
} from './pages'

function App() {
  return (
    <>
     <Routes>
      <Route path="/welcome" element={<Landing/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/recipe/:recipeId" element={<RecipePage/>}/>
     </Routes>
    </>
  )
}

export default App
