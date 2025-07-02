import { useState } from 'react'
import './App.css'
import Pokedex from './components/Pokedex/Pokedex'

function App() {
  const [count, setCount] = useState(0)

  // The function of Pokedex is to render the Pokedex component.
  // It likely displays a list of Pokémon or related information.
  return (
    <>
      <Pokedex />
    </>
  )
}

export default App
