import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import 'materialize-css'
import { useRoutes } from './routes'
import { Navbar } from './Components/Navbar/Navbar'
import './App.css'

export default function App() {
  const routes = useRoutes()
  return (
    <div className="main">
      <Router>
        <Navbar />
        <div className="container">
          {routes}
        </div>
      </Router>
    </div>
  )
}