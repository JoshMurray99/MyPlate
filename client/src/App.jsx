import './App.css'
import {Routes, Route} from "react-router-dom"
import {
  Landing
} from './pages'

function App() {
  return (
    <>
     <Routes>
      <Route path="/welcome" element={<Landing/>}/>
     </Routes>
    </>
  )
}

export default App
