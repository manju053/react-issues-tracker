import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';
import { AiFillCaretDown } from 'react-icons/ai';
import { useGlobalContext } from '../context';

const Navbar = () => {
    const { userInfo } = useGlobalContext();
    const [ showUserDropDown, setShowUserDropdown ] = useState(false);
    const btnRef = React.createRef(null);
    const userRef = React.createRef(null);
    let history = useHistory();
    const openDropdown = (e) => {
        const btnPosition = btnRef.current.getBoundingClientRect();
        console.log(btnPosition);
        setShowUserDropdown(!showUserDropDown);
        console.log(userRef.current);
        userRef.current.style.top = (btnPosition.top + 25) + 'px';
        userRef.current.style.left = btnPosition.left + 'px';
        userRef.current.style.width = btnPosition.width + 'px';
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('userInfo');
        history.push('/');
    }
    return (
        <>
            <nav>
                <h2 className="logo">ISSUE TRACKER</h2>
                <FaBars className="toggle" />
                <ul className="nav-links">
                    <li>
                        <Link to="/create" >Create</Link>
                    </li>
                    <li>
                        <Link to="/faq" >FAQ</Link>
                    </li>
                    <button className="btn user-btn" ref={btnRef} onClick={openDropdown}>
                        {userInfo.username}
                        <AiFillCaretDown />
                    </button>
                </ul>

            </nav>
            
           <div className={ showUserDropDown ? 'user-dropdown show-dropdown' : 'user-dropdown'} ref={userRef}>
                    <ul className="links">
                    <li>
                        <Link to="/profile" >Profile</Link>
                    </li>
                        <li>
                            <a href="" onClick={logout}>Logout</a>
                        </li>
                        
                    </ul>
            </div>
            

        </>
    )
}

export default Navbar
