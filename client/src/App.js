import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes'
import { Navbar } from './Components/Navbar'
import './App.css'

export default function App() {
  const routes = useRoutes()
  return (
    <Router>
      <Navbar />
      <div className="container" style={{margin: 10}}>
        {routes}
      </div>
    </Router>
  )
}