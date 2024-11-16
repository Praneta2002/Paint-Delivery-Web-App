// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import { assets } from '../../assets/frontend_assets/assets'
// import { Link, useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({ setShowLogin }) => {
//     const [category, setCategory] = useState("category");
//     const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

//     const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//     const navigate = useNavigate();

//     const logout = () => {
//         localStorage.removeItem("token");
//         setToken("");
//         navigate("/");
//     }

//     return (
//         <div className='navbar'>
//             <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
//             <ul className="navbar-category">
//                 <Link to='/' onClick={() => setCategory("home")} className={category === "home" ? "active" : ""}>home</Link>
//                 <a href='#explore-product' onClick={() => setCategory("category")} className={category === "category" ? "active" : ""}>category</a>
//                 <a href='#app-download' onClick={() => setCategory("mobile-app")} className={category === "mobile-app" ? "active" : ""}>mobile-app</a>
//                 <a href='#footer' onClick={() => setCategory("contact-us")} className={category === "contact-us" ? "active" : ""}>contact us</a>
//             </ul>
//             <div className="navbar-right">
//                 <img src={assets.search_icon} alt="" />
//                 <div className="navbar-search-icon">
//                     <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//                     <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//                 </div>
//                 {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
//                     : <div className='navbar-profile'>
//                         <img
//                             src={assets.profile_icon}
//                             alt=""
//                             onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown on click
//                         />
//                         {dropdownVisible && (
//                             <ul className="navbar-profile-dropdown">
//                                 <li onClick={() => navigate('/myorders')}>
//                                     <img src={assets.bag_icon} alt="" /><p>Orders</p>
//                                 </li>
//                                 <hr />
//                                 <li onClick={logout}>
//                                     <img src={assets.logout_icon} alt="" /><p>Logout</p>
//                                 </li>
//                             </ul>
//                         )}
//                     </div>}
//             </div>
//         </div>
//     )
// }

// export default Navbar;

// import React, { useContext, useState, useRef, useEffect } from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/frontend_assets/assets';
// import { Link, useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({ setShowLogin }) => {
//     const [category, setCategory] = useState("category");
//     const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
//     const dropdownRef = useRef(null); // Ref for the dropdown menu

//     const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
//     const navigate = useNavigate();

//     const logout = () => {
//         localStorage.removeItem("token");
//         setToken("");
//         navigate("/");
//     };

//     // Function to handle clicks outside the dropdown menu
//     const handleClickOutside = (event) => {
//         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//             setDropdownVisible(false);
//         }
//     };

//     useEffect(() => {
//         // Add event listener for clicks outside
//         document.addEventListener('mousedown', handleClickOutside);

//         // Cleanup the event listener on component unmount
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     return (
//         <div className='navbar'>
//             <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
//             <ul className="navbar-category">
//                 <Link to='/' onClick={() => setCategory("home")} className={category === "home" ? "active" : ""}>home</Link>
//                 <a href='#explore-product' onClick={() => setCategory("category")} className={category === "category" ? "active" : ""}>category</a>
//                 <a href='#app-download' onClick={() => setCategory("mobile-app")} className={category === "mobile-app" ? "active" : ""}>mobile-app</a>
//                 <a href='#footer' onClick={() => setCategory("contact-us")} className={category === "contact-us" ? "active" : ""}>contact us</a>
//             </ul>
//             <div className="navbar-right">
//                 <img src={assets.search_icon} alt="" />
//                 <div className="navbar-search-icon">
//                     <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//                     <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//                 </div>
//                 {!token ? <button onClick={() => setShowLogin(true)}>sign in</button>
//                     : <div className='navbar-profile'>
//                         <img
//                             src={assets.profile_icon}
//                             alt=""
//                             onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown on click
//                         />
//                         {dropdownVisible && (
//                             <ul ref={dropdownRef} className="navbar-profile-dropdown">
//                                 <li onClick={() => navigate('/myorders')}>
//                                     <img src={assets.bag_icon} alt="" /><p>Orders</p>
//                                 </li>
//                                 <hr />
//                                 <li onClick={() => navigate('/edit-profile')}>
//                                     <img src={assets.profile_icon} alt="" /><p>Profile</p>
//                                 </li>
//                                 <hr />
//                                 <li onClick={() => navigate('/art-masterpiece-hunt')}>
//                                     <img src={assets.trivia_icon} alt="" /><p>Play Art Trivia</p>
//                                 </li>
//                                 <hr />
//                                 <li onClick={logout}>
//                                     <img src={assets.logout_icon} alt="" /><p>Logout</p>
//                                 </li>
//                             </ul>
//                         )}
//                     </div>}
//             </div>
//         </div>
//     );
// };

// export default Navbar;
import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [category, setCategory] = useState("category");
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Theme state initialized from localStorage
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/");
    };

    // Toggle the website theme
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme); // Save theme to localStorage
        document.body.classList.toggle('dark-theme'); // Toggle dark-theme class on the body
    };

    useEffect(() => {
        // Apply the initial theme when the component mounts
        if (theme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    // Function to handle clicks outside the dropdown menu
    const handleClickOutside = (event) => {
        if (dropdownVisible && !event.target.closest('.navbar-profile')) {
            setDropdownVisible(false);
        }
    };

    useEffect(() => {
        if (dropdownVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownVisible]);

    return (
        <div className="navbar">
            <Link to={'/'}><img src={assets.logo} alt="Logo" className="logo" /></Link>
            <ul className="navbar-category">
                <Link to='/' onClick={() => setCategory("home")} className={category === "home" ? "active" : ""}>Home</Link>
                <a href='#explore-product' onClick={() => setCategory("category")} className={category === "category" ? "active" : ""}>Category</a>
                <a href='#app-download' onClick={() => setCategory("mobile-app")} className={category === "mobile-app" ? "active" : ""}>Mobile-app</a>
                <a href='#footer' onClick={() => setCategory("contact-us")} className={category === "contact-us" ? "active" : ""}>Contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="Search" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="Shopping Cart" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile'>
                        <img
                            src={assets.profile_icon}
                            alt="Profile"
                            onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown on click
                        />
                        {dropdownVisible && (
                            <>
                                <div className="backdrop" onClick={() => setDropdownVisible(false)}></div>
                                <ul className="navbar-profile-dropdown">
                                    <li onClick={() => navigate('/myorders')}>
                                        <img src={assets.bag_icon} alt="Orders" /><p>Orders</p>
                                    </li>
                                    <hr />
                                    <li onClick={() => navigate('/profilepage')}>
                                        <img src={assets.profile_icon} alt="Profile" /><p>Profile</p>
                                    </li>
                                    <hr />
                                    <li onClick={() => navigate('/art-masterpiece-hunt')}>
                                        <p>Spin The Wheel</p>
                                    </li>
                                    <hr />
                                    <li onClick={logout}>
                                        <img src={assets.logout_icon} alt="Logout" /><p>Logout</p>
                                    </li>
                                </ul>
                            </>
                        )}
                    </div>}
                {/* Light/Dark Mode Toggle Button */}
                <div className="theme-toggle-container">
                    <label className="theme-toggle">
                        <input type="checkbox" onChange={toggleTheme} checked={theme === 'dark'} />
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
