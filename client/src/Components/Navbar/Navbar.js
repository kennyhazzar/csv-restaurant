import React from 'react'
import { NavLink } from 'react-router-dom'
export const Navbar = () => {
    return (
        //  style={{ display: 'inline-flex' }}
        <div className="navbar-fixed">
            <nav>
                <div className="nav-wrapper green darken-1" style={{ padding: '0 2rem', }}>
                    <span className="brand-logo">csv-restaurant</span>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        <li><NavLink to={`/generate`}>Создать</NavLink></li>
                        <li><NavLink to={`/menu`}>Последние добавленные</NavLink></li>
                        <li><NavLink to={`/rules`}>Как пользоваться</NavLink></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}