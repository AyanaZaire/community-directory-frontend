import { useState } from 'react'
import Main from "../components/Main"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function App() {
  // fetch user for navbar
    // update state
    // pass as props to navbar and main
    // why does main need the user object? for CRUD functionality 
  return (
    <div>
      <Navbar />
      <Main />
      <Footer />
    </div>
  )
}

export default App
