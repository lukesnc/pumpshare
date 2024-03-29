import React, { useState } from 'react'
import { navLinks } from '../constants'
import { Link, NavLink } from 'react-router-dom'
import { layout } from '../style'

const Navbar = () => {
    const [menuIcon, setMenuIcon] = useState(layout.navUnclicked)
    const [showMenu, setShowMenu] = useState("menu hidden")
    const [isMenuClicked, setIsMenuClicked] = useState(false)

    const toggleMenu = () => {
        if(!isMenuClicked) {
            setMenuIcon(layout.navClicked)
            setShowMenu("menu visible")
        } else {
            setMenuIcon(layout.navUnclicked)
            setShowMenu("menu hidden")
        }
        setIsMenuClicked(!isMenuClicked)
    }

    return (
    <header>
        <nav className="navbar">
            <Link to="/" className="font-poppins text-tertiary my-auto ml-5 text-[26px]">PumpShare</Link>
            <div className={menuIcon} onClick={toggleMenu}></div>
        </nav>
        <div className={showMenu}>
            {/* NavLink has prop for active link - Currently not working (probably until backend API is functioning) */}
            <NavLink to="/" className="nav-link" onClick={toggleMenu}>Home</NavLink>
            <NavLink to="/signup" className="nav-link" onClick={toggleMenu}>Sign-Up</NavLink>
            <NavLink to="/login" className="nav-link" onClick={toggleMenu}>Login</NavLink>
            <NavLink to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</NavLink>
            <NavLink to="/library" className="nav-link" onClick={toggleMenu}>Exercise Library</NavLink>
            <NavLink to="/activity" className="nav-link" onClick={toggleMenu}>Activity Feed</NavLink>
        </div>
    </header>
    )
}

export default Navbar

// Use mapping to create links later on
// {navLinks.map((link) => (
//     <Link key={link.id} href={link.url} className="">{link.text}</Link>
// ))}