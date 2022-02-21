/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import classes from '../css/navbar.module.css';
import logo from '../images/logo-bg.png';

const Nav = () => {
    const { currentUser, logout } = useAuth();

    return (
        <nav className={classes.nav}>
            <ul>
                <li>
                    <Link to="/" className={classes.brand}>
                        <img src={logo} alt="Learn with Sumit Logo" />
                        <h3>Quiz App</h3>
                    </Link>
                </li>
            </ul>
            <div className={classes.account}>
                {currentUser ? (
                    <>
                        <span className="material-icons-outlined" title="Account">
                            account_circle
                        </span>
                        <span>{currentUser.displayName}</span>
                        <span className="material-icons-outlined" title="Logout" onClick={logout}>
                            {' '}
                            logout{' '}
                        </span>
                    </>
                ) : (
                    <>
                        <Link to="/singup">Signup</Link>
                        <Link to="/login">Login</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Nav;
