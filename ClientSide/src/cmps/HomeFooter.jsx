import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function HomeFooter() {
    return (
        <footer>
            <Link to="/">         
              <img src="https://cdn3.iconfinder.com/data/icons/shoulder-and-neck-muscle-building-exercises/297/shoulder-neck-exercises-024-256.png" alt="Logo" />
            </Link>
            <Link to="/">
                <h3>Workout Scheduler</h3>
            </Link>
            <div className="links">
                <NavLink to="/about">About</NavLink>
            </div>
        </footer>
    )
}
