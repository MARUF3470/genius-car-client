import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.svg'
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
const Header = () => {
    const { logOut, user } = useContext(AuthContext)
    const menuItems = <>
        <li><Link to='/' className='btn btn-ghost'>Home</Link></li>
        {
            user ? <> <li><Link to='/orders' className='btn btn-ghost' >Orders</Link></li>  <li><Link onClick={logOut} className='btn btn-ghost' >SignOut</Link></li></> : <li><Link to='/login' className='btn btn-ghost' >Login</Link></li>
        }

    </>
    const userSignout = () => {
        logOut()
            .then(() => { })
            .catch(err => console.error(err))
    }
    return (
        <div className="navbar bg-base-100 h-20 mb-12  pt-12">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menuItems}
                    </ul>
                </div>
                <Link className='w-24'><img src={logo} alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0">
                    {menuItems}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn btn-outline btn-error">Appointment</a>
            </div>
        </div>
    );
};

export default Header;