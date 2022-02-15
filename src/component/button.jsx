/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import classes from '../css/button.module.css';

const Button = ({ type, className, children, ...rest }) => (
    <button type={type} className={`${classes.button} ${className}`} {...rest}>
        {children}
    </button>
);

export default Button;
