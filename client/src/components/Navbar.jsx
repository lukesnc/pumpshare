import React, { useState, useContext } from "react";
import { navLinks } from "../constants";
import { Link, NavLink } from "react-router-dom";
import { layout } from "../style";
import { UserContext } from "../contexts/userContext";

const Navbar = () => {
  const [menuIcon, setMenuIcon] = useState(layout.navUnclicked);
  const [showMenu, setShowMenu] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const toggleMenu = () => {
    if (!isMenuClicked) {
      setMenuIcon(layout.navClicked);
      setShowMenu("menu visible");
    } else {
      setMenuIcon(layout.navUnclicked);
      setShowMenu("menu hidden");
    }
    setIsMenuClicked(!isMenuClicked);
  };

  const handleLogout = () => {
    setUser({ email: null, posts: [] });
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toggleMenu();
  };
  /*********  NOTE: THERE IS A KNOWN BUG WHERE CLICKING ON PROFILE WHILE VISITING A NON-EXISTENT 
                    PROFILE WILL ALSO SHOW A "USER NOT FOUND" FOR LOGGED IN USER *********/
  return (
    <header>
      <div className="flex flex-row fixed top-0 w-full h-[60px] bg-tealGreen z-50 fixed">
        <nav className="navbar">
          <Link
            to="/"
            className="font-poppins text-tertiary my-auto ml-5 text-[26px]"
            onClick={showMenu === "menu visible" ? toggleMenu : undefined}
          >
            PumpShare
          </Link>

          <div className="my-auto ml-auto">
            {user.email && (
              <Link
                to={`/log`}
                className="my-auto ml-auto mr-[1em] text-white"
                onClick={showMenu === "menu visible" ? toggleMenu : undefined}
              >
                <i className="fa-solid fa-circle-plus ml-2 text-[35px] drop-shadow-xl"></i>
              </Link>
            )}
          </div>
          <div className="my-auto ml-auto">
            {user.email && (
              <Link
                to={`/${user.username}`}
                className="my-auto ml-auto mr-[1em] text-white"
                onClick={showMenu === "menu visible" ? toggleMenu : undefined}
              >
                <i className="fa-solid fa-user fa-lg"></i>
              </Link>
            )}
            <div className={menuIcon} onClick={toggleMenu}></div>
          </div>
        </nav>
      </div>
      <div className={`${showMenu} z-50`}>
        {/* NavLink has prop for active link - Currently not working (probably until backend API is functioning) */}
        {user.email ? (
          <>
            <NavLink to="/" className="nav-link" onClick={toggleMenu}>
              <div>
                <i className="fa-solid fa-house mr-4 fa-xl menu-icon"></i>
                Home
              </div>
            </NavLink>
            <NavLink to="/dashboard" className="nav-link" onClick={toggleMenu}>
              <div>
                <i className="fa-solid fa-gauge mr-4 fa-xl menu-icon"></i>
                Dashboard
              </div>
            </NavLink>
            <NavLink to="/library" className="nav-link" onClick={toggleMenu}>
              <div>
                <i className="fa-solid fa-book mr-4 fa-xl menu-icon"></i>
                Exercise Library
              </div>
            </NavLink>
            <NavLink to="/activity" className="nav-link" onClick={toggleMenu}>
              <div>
                <i className="fa-solid fa-users-line mr-3 fa-xl menu-icon"></i>
                Activity Feed
              </div>
            </NavLink>
            <NavLink to="/settings" className="nav-link" onClick={toggleMenu}>
              <div>
                <i className="fa-solid fa-gears mr-3 fa-xl menu-icon"></i>
                Settings
              </div>
            </NavLink>
            <NavLink
              to="/"
              className="nav-link text-[#C03939]"
              onClick={handleLogout}
            >
              <div>
                <i className="fa-solid fa-arrow-right-from-bracket mr-4 fa-xl opacity-70"></i>
                Logout
              </div>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/" className="nav-link" onClick={toggleMenu}>
              Home
            </NavLink>
            <NavLink to="/signup" className="nav-link" onClick={toggleMenu}>
              Sign-Up
            </NavLink>
            <NavLink to="/login" className="nav-link" onClick={toggleMenu}>
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;

// Use mapping to create links later on
// {navLinks.map((link) => (
//     <Link key={link.id} href={link.url} className="">{link.text}</Link>
// ))}
