import classes from '../css/layout.module.css';
import Nav from './navbar';

const Layout = ({ children }) => (
    <>
        <Nav />
        <main className={classes.main}>
            <div className={classes.container}>{children}</div>
        </main>
    </>
);

export default Layout;
